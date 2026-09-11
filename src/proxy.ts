import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken } from "@/lib/auth";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory rate limiting map (sliding window)
const rateLimitMap = new Map<string, RateLimitEntry>();

function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (entry.count >= limit) {
    return true;
  }

  entry.count += 1;
  return false;
}

// Prune expired entries periodically to prevent memory growth
function pruneRateLimitMap(): void {
  if (rateLimitMap.size > 1500) {
    const now = Date.now();
    for (const [k, v] of rateLimitMap.entries()) {
      if (now > v.resetAt) {
        rateLimitMap.delete(k);
      }
    }
  }
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "127.0.0.1";
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = getClientIp(request);
  pruneRateLimitMap();

  // 1. Rate Limiting on Inquiry Submissions (10 per 10 minutes)
  if (pathname === "/api/inquiry" && request.method === "POST") {
    const isLimited = checkRateLimit(`inquiry:${ip}`, 10, 10 * 60 * 1000);
    if (isLimited) {
      return NextResponse.json(
        { error: "Too many inquiry submissions from this network. Please wait a few minutes." },
        { status: 429, headers: { "Retry-After": "600" } }
      );
    }
  }

  // 2. Rate Limiting on Admin Login Attempts (10 per 15 minutes)
  if (pathname === "/api/admin/auth/login" && request.method === "POST") {
    const isLimited = checkRateLimit(`login:${ip}`, 10, 15 * 60 * 1000);
    if (isLimited) {
      return NextResponse.json(
        { error: "Too many authentication attempts. Access locked for 15 minutes." },
        { status: 429, headers: { "Retry-After": "900" } }
      );
    }
  }

  // 3. Protect /admin Web Pages
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      // If already logged in and navigating to login, redirect to /admin dashboard
      const token = request.cookies.get("fhg_admin_session")?.value;
      if (token && (await verifySessionToken(token))) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.next();
    }

    // Check authentication for all other /admin routes
    const token = request.cookies.get("fhg_admin_session")?.value;
    const isValid = await verifySessionToken(token);

    if (!isValid) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 4. Protect /api/admin Routes (except login)
  if (pathname.startsWith("/api/admin")) {
    if (pathname.startsWith("/api/admin/auth/login")) {
      return NextResponse.next();
    }

    const token = request.cookies.get("fhg_admin_session")?.value;
    const isValid = await verifySessionToken(token);

    if (!isValid) {
      return NextResponse.json({ error: "Unauthorized administrative request." }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/api/inquiry"],
};
