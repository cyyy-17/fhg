import { NextResponse } from "next/server";
import { clearAdminSessionCookie } from "@/lib/auth";
import { addAuditLog } from "@/lib/storage";

export async function POST() {
  try {
    await clearAdminSessionCookie();

    try {
      await addAuditLog({
        action: "auth.logout",
        actor: "admin",
        details: "Admin session ended via deliberate logout.",
      });
    } catch (auditErr) {
      console.warn("Could not write audit log for logout:", auditErr);
    }

    const response = NextResponse.json({
      success: true,
      message: "Admin session cleared successfully.",
    });

    response.cookies.set("fhg_admin_session", "", {
      path: "/",
      maxAge: 0,
      expires: new Date(0),
      httpOnly: true,
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("Admin logout error:", error);
    const response = NextResponse.json(
      { error: "Internal server error during sign out." },
      { status: 500 }
    );
    response.cookies.set("fhg_admin_session", "", {
      path: "/",
      maxAge: 0,
      expires: new Date(0),
      httpOnly: true,
      sameSite: "lax",
    });
    return response;
  }
}

export async function GET(request: Request) {
  try {
    await clearAdminSessionCookie();
  } catch {
    // silent ignore
  }

  const url = new URL(request.url);
  const loginUrl = new URL("/admin/login?message=logged_out", url.origin);
  const response = NextResponse.redirect(loginUrl);

  response.cookies.set("fhg_admin_session", "", {
    path: "/",
    maxAge: 0,
    expires: new Date(0),
    httpOnly: true,
    sameSite: "lax",
  });

  return response;
}
