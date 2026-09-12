import { cookies } from "next/headers";
import type { AuthSession } from "@/types/admin";

const SESSION_COOKIE_NAME = "fhg_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// Helper to retrieve the secret key for HMAC signing
function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET || process.env.ADMIN_SESSION_SECRET;
  if (!secret && process.env.NODE_ENV === "production") {
    console.warn(
      "[SECURITY WARNING] Neither SESSION_SECRET nor ADMIN_SESSION_SECRET is configured in environment variables. Using static fallback."
    );
  }
  return secret || "fhg-secret-fallback-key-batch-2026-batangas";
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "admin1234";
}

export function isDefaultPasswordSet(): boolean {
  return getAdminPassword() === "admin1234";
}

// HMAC-SHA256 signing using standard Web Crypto API
async function getCryptoKey(): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyData = enc.encode(getSessionSecret());
  return await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createSessionToken(): Promise<string> {
  const issuedAt = Date.now();
  const payload = `admin:${issuedAt}`;
  const key = await getCryptoKey();
  const enc = new TextEncoder();
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  const signatureHex = bufferToHex(signatureBuffer);
  return `${payload}.${signatureHex}`;
}

export async function verifySessionToken(token?: string | null): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const payload = parts[0];
  const signatureHex = parts[1];

  const subParts = payload.split(":");
  if (subParts.length !== 2 || subParts[0] !== "admin") return false;

  const issuedAt = parseInt(subParts[1], 10);
  if (isNaN(issuedAt)) return false;

  // Expired check (7 days)
  if (Date.now() - issuedAt > SESSION_MAX_AGE * 1000) {
    return false;
  }

  try {
    const key = await getCryptoKey();
    const enc = new TextEncoder();
    const expectedSig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
    const expectedHex = bufferToHex(expectedSig);
    return expectedHex === signatureHex;
  } catch {
    return false;
  }
}

export async function setAdminSessionCookie(): Promise<string> {
  const token = await createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return token;
}

export async function clearAdminSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getAdminSession(): Promise<AuthSession | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(SESSION_COOKIE_NAME);
  if (!cookie?.value) return null;

  const isValid = await verifySessionToken(cookie.value);
  if (!isValid) return null;

  const parts = cookie.value.split(".");
  const subParts = parts[0].split(":");
  const issuedAt = parseInt(subParts[1], 10) || Date.now();

  return {
    authenticated: true,
    role: "admin",
    issuedAt,
  };
}
