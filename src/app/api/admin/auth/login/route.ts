import { NextResponse } from "next/server";
import { getAdminPassword, setAdminSessionCookie } from "@/lib/auth";
import { getSettingsData } from "@/lib/storage";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Admin password is required." },
        { status: 400 }
      );
    }

    const settings = await getSettingsData().catch(() => null);
    const expectedPassword =
      settings?.adminPassword && settings.adminPassword.trim().length > 0
        ? settings.adminPassword
        : getAdminPassword();

    if (password !== expectedPassword) {
      return NextResponse.json(
        { error: "Invalid administrator password credentials." },
        { status: 401 }
      );
    }

    await setAdminSessionCookie();

    const isDefault = expectedPassword === "admin1234";

    return NextResponse.json({
      success: true,
      isDefaultPassword: isDefault,
      message: "Admin authentication successful.",
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Internal server error during authentication." },
      { status: 500 }
    );
  }
}
