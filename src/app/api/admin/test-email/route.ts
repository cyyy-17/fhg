import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getSettingsData } from "@/lib/storage";
import { companyData } from "@/data/company";

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session?.authenticated) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    let recipientEmail = "";
    try {
      const body = await request.json();
      if (body.recipientEmail && typeof body.recipientEmail === "string") {
        recipientEmail = body.recipientEmail.trim();
      }
    } catch {
      // Body is optional
    }

    if (!recipientEmail) {
      const settings = await getSettingsData().catch(() => null);
      recipientEmail =
        settings?.contactEmail ||
        process.env.CONTACT_EMAIL ||
        companyData.headOffice.emails[0] ||
        "edluna1971@yahoo.com";
    }

    const resendApiKey = process.env.RESEND_API_KEY?.trim()
      .replace(/^["']|["']$/g, "")
      .replace(/[\r\n\s]+/g, "");

    if (!resendApiKey) {
      return NextResponse.json(
        {
          success: false,
          error:
            "RESEND_API_KEY is not set in environment variables. To send live emails, add RESEND_API_KEY in your Vercel project settings.",
        },
        { status: 400 }
      );
    }

    const recipientList = recipientEmail
      .split(",")
      .map((e) => e.trim())
      .filter((e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));

    const finalRecipients = recipientList.length > 0 ? recipientList : [recipientEmail];

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Forest Hills Garden <onboarding@resend.dev>",
        to: finalRecipients,
        subject: `[FHG System Test] Live Email Verification - ${new Date().toLocaleDateString()}`,
        text:
          `[FOREST HILLS GARDEN - SYSTEM TEST TRANSMISSION]\n` +
          `Timestamp: ${new Date().toISOString()}\n` +
          `Recipients: ${finalRecipients.join(", ")}\n\n` +
          `This is an automated test verifying that your Resend API integration and outbound mailbox routing are functioning correctly.\n\n` +
          `All public inquiries and RFP tender submissions will be routed to these verified mailboxes.`,
      }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMsg =
        data?.message || data?.error || `Resend API returned status code ${response.status}.`;
      return NextResponse.json(
        {
          success: false,
          error: `Email delivery test failed: ${errorMsg}`,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Test email dispatched successfully to ${finalRecipients.join(", ")}. Check your inbox or spam folder.`,
      id: data?.id,
    });
  } catch (error) {
    console.error("Test email route error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error testing email.",
      },
      { status: 500 }
    );
  }
}
