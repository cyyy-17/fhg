import { NextResponse } from "next/server";
import { clearAdminSessionCookie } from "@/lib/auth";
import { addAuditLog } from "@/lib/storage";

export async function POST() {
  try {
    await clearAdminSessionCookie();
    await addAuditLog({
      action: "auth.logout",
      actor: "admin",
      details: "Admin session ended via deliberate logout.",
    });

    return NextResponse.json({
      success: true,
      message: "Admin session cleared successfully.",
    });
  } catch (error) {
    console.error("Admin logout error:", error);
    return NextResponse.json(
      { error: "Internal server error during sign out." },
      { status: 500 }
    );
  }
}
