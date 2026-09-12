export const CSRF_COOKIE_NAME = "fhg_csrf_token";
export const CSRF_HEADER_NAME = "x-csrf-token";

export function generateCsrfToken(): string {
  return crypto.randomUUID();
}

/**
 * Validates double-submit CSRF cookie vs request header.
 * Both values must exist and match exactly.
 */
export function validateCsrfToken(cookieToken?: string | null, headerToken?: string | null): boolean {
  if (!cookieToken || !headerToken) return false;
  if (cookieToken.length < 16 || headerToken.length < 16) return false;
  return cookieToken === headerToken;
}

/**
 * Client-side helper to retrieve CSRF token from document cookie.
 */
export function getClientCsrfToken(): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(new RegExp(`(^|;\\s*)${CSRF_COOKIE_NAME}=([^;]*)`));
  return match ? decodeURIComponent(match[2]) : "";
}
