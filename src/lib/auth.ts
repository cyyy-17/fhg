import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import type { AuthSession } from "@/types/admin";

const SESSION_COOKIE_NAME = "fhg_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// Generated runtime fallback key to prevent forging with known hardcoded secrets in production if env is omitted
let runtimeFallbackSecret: string | null = null;

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET || process.env.ADMIN_SESSION_SECRET;
  if (secret && secret.trim().length >= 16) {
    return secret.trim();
  }

  if (process.env.NODE_ENV === "production") {
    console.error(
      "[SECURITY ALERT] SESSION_SECRET is not configured or too short in production! Using process-scoped ephemeral secret."
    );
  }

  if (!runtimeFallbackSecret) {
    runtimeFallbackSecret = `fhg_ephemeral_${crypto.randomUUID()}_${Date.now()}`;
  }
  return runtimeFallbackSecret;
}

export function getDefaultAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "admin1234";
}

/**
 * Hashes a plaintext password using bcrypt with 10 salt rounds
 */
export async function hashPassword(plain: string): Promise<string> {
  return await bcrypt.hash(plain, 10);
}

/**
 * Compares plaintext against stored credential. Supports both bcrypt hashes ($2*) and legacy plaintext.
 */
export async function comparePassword(plain: string, storedCandidate: string): Promise<boolean> {
  if (!storedCandidate) return false;
  if (storedCandidate.startsWith("$2a$") || storedCandidate.startsWith("$2b$") || storedCandidate.startsWith("$2y$")) {
    return await bcrypt.compare(plain, storedCandidate);
  }
  // Plaintext comparison for zero-downtime migration
  return plain === storedCandidate;
}

/**
 * Checks if a candidate password/hash matches the factory default "admin1234"
 */
export async function isDefaultPasswordMatch(candidate: string): Promise<boolean> {
  return await comparePassword("admin1234", candidate);
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
  try {
    cookieStore.set(SESSION_COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    });
  } catch {
    // Cookie store deletion was performed
  }
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
