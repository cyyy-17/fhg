import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { resetToDefaults } from "@/lib/storage";

export async function POST() {
  try {
    const session = await getAdminSession();
    if (!session?.authenticated) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const resetStore = await resetToDefaults();
    return NextResponse.json({
      success: true,
      message: "Admin storage successfully reset to default authoritative configuration.",
      store: resetStore,
    });
  } catch (error) {
    console.error("Admin reset error:", error);
    return NextResponse.json(
      { error: "Failed to reset store to defaults." },
      { status: 500 }
    );
  }
}
