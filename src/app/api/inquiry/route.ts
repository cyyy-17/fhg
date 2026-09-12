import { NextResponse } from "next/server";
import { addInquiryRecord, getSettingsData } from "@/lib/storage";
import { inquirySubmissionSchema } from "@/lib/schemas";
import { companyData } from "@/data/company";

interface InquiryPayload {
  fullName?: string;
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  company?: string;
  consent?: boolean;
  website?: string; // Honeypot field
}

export async function POST(request: Request) {
  try {
    const body: InquiryPayload = await request.json();

    // 1. Bot Honeypot Protection: If hidden field 'website' is filled, silently ignore
    if (body.website && body.website.trim().length > 0) {
      return NextResponse.json(
        { success: true, message: "Inquiry accepted for processing." },
        { status: 200 }
      );
    }

    // 2. Normalize and validate with Zod schema
    const normalized = {
      fullName: (body.fullName || body.name || "").trim(),
      email: (body.email || "").trim(),
      phone: (body.phone || "").trim(),
      subject: (body.subject || "Arboricultural Contract Inquiry").trim(),
      message: (body.message || "No project notes provided.").trim(),
      company: body.company?.trim() ? body.company.trim() : undefined,
      consent: Boolean(body.consent),
      website: body.website || "",
    };

    const parsed = inquirySubmissionSchema.safeParse(normalized);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Validation failed.";
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const { fullName: clientName, email, phone, subject, message, company } = parsed.data;

    const settings = await getSettingsData().catch(() => null);
    const destinationEmail =
      settings?.contactEmail ||
      process.env.CONTACT_EMAIL ||
      companyData.headOffice.emails[0] ||
      "edluna1971@yahoo.com";

    // 3. Compile Standard Technical Dossier
    const timestamp = new Date().toISOString();
    const compiledDossier =
      `[FOREST HILLS GARDEN - INQUIRY DOSSIER]\n` +
      `Timestamp: ${timestamp}\n` +
      `Client/Contact: ${clientName}${company ? ` (${company})` : ""}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n` +
      `Subject: ${subject}\n\n` +
      `Details / Requirements:\n${message}\n\n` +
      `Destination: ${destinationEmail}`;

    // 4. Register into Admin Storage Inbox
    try {
      await addInquiryRecord({
        clientName,
        email,
        phone,
        company: company || undefined,
        subject,
        message,
        dossierText: compiledDossier,
      });
    } catch (storeErr) {
      console.warn("Failed to persist inquiry in admin inbox:", storeErr);
    }

    // 5. Optional external dispatch via Resend if RESEND_API_KEY is configured
    const resendApiKey = process.env.RESEND_API_KEY?.trim()
      .replace(/^["']|["']$/g, "")
      .replace(/[\r\n\s]+/g, "");

    if (resendApiKey && destinationEmail) {
      try {
        const recipientList = destinationEmail
          .split(",")
          .map((e) => e.trim())
          .filter((e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));

        const finalRecipients = recipientList.length > 0 ? recipientList : [destinationEmail];

        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Forest Hills Garden <onboarding@resend.dev>",
            to: finalRecipients,
            reply_to: email,
            subject: `[Web Inquiry] ${subject} - ${clientName}`,
            text: compiledDossier,
          }),
        });
      } catch (err) {
        console.warn("External email dispatch failed; relying on client fallback:", err);
      }
    }

    return NextResponse.json({
      success: true,
      dossier: compiledDossier,
      message: "Inquiry successfully validated and registered in the administrative portal.",
    });
  } catch (error) {
    console.error("Error processing inquiry:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error occurred while processing inquiry." },
      { status: 500 }
    );
  }
}
