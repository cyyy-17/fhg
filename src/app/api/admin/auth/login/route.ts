import { NextResponse } from "next/server";
import { setAdminSessionCookie, comparePassword, isDefaultPasswordMatch } from "@/lib/auth";
import { getAdminPasswordHash, setAdminPassword, addAuditLog } from "@/lib/storage";

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "127.0.0.1";
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  try {
    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Admin password is required." },
        { status: 400 }
      );
    }

    const storedHash = await getAdminPasswordHash();
    const isMatch = await comparePassword(password, storedHash);

    if (!isMatch) {
      await addAuditLog({
        action: "auth.login_failed",
        actor: "unauthenticated",
        ip,
        details: "Failed administrative login attempt with incorrect credentials.",
      });

      return NextResponse.json(
        { error: "Invalid administrator password credentials." },
        { status: 401 }
      );
    }

    // Zero-downtime migration: if stored credential is not yet a bcrypt hash, upgrade it immediately
    if (!storedHash.startsWith("$2a$") && !storedHash.startsWith("$2b$") && !storedHash.startsWith("$2y$")) {
      await setAdminPassword(password);
    }

    await setAdminSessionCookie();

    const isDefault = await isDefaultPasswordMatch(password);

    await addAuditLog({
      action: "auth.login_success",
      actor: "admin",
      ip,
      details: `Successful administrator session authenticated${isDefault ? " (Default password active)" : ""}.`,
    });

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
