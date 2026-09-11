import { NextResponse } from "next/server";
import { clearAdminSessionCookie } from "@/lib/auth";

export async function POST() {
  try {
    await clearAdminSessionCookie();
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
