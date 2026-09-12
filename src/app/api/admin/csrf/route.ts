import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { CSRF_COOKIE_NAME, generateCsrfToken } from "@/lib/csrf";

export async function GET() {
  const cookieStore = await cookies();
  let token = cookieStore.get(CSRF_COOKIE_NAME)?.value;

  if (!token) {
    token = generateCsrfToken();
  }

  const response = NextResponse.json({ csrfToken: token });
  response.cookies.set(CSRF_COOKIE_NAME, token, {
    httpOnly: false, // Accessible to JavaScript for Double Submit Cookie pattern
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return response;
}
