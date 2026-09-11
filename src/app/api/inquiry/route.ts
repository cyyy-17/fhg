import { NextResponse } from "next/server";
import { addInquiryRecord, getSettingsData } from "@/lib/storage";

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

    const clientName = (body.fullName || body.name || "").trim();
    const email = (body.email || "").trim();
    const phone = (body.phone || "").trim();
    const subject = (body.subject || "Arboricultural Contract Inquiry").trim();
    const message = (body.message || "").trim();
    const company = (body.company || "").trim();

    // 2. Field Validations
    if (!clientName) {
      return NextResponse.json(
        { success: false, error: "Client name is required." },
        { status: 400 }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!phone) {
      return NextResponse.json(
        { success: false, error: "A contact phone number is required." },
        { status: 400 }
      );
    }

    if (!body.consent) {
      return NextResponse.json(
        { success: false, error: "Consent to data processing under RA 10173 is mandatory." },
        { status: 400 }
      );
    }

    const settings = await getSettingsData().catch(() => null);
    const destinationEmail = settings?.contactEmail || process.env.CONTACT_EMAIL || "edluna1971@yahoo.com";

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

    // 5. Optional external dispatch (e.g. if RESEND_API_KEY or SMTP is configured)
    if (process.env.RESEND_API_KEY && destinationEmail) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Forest Hills Garden <onboarding@resend.dev>",
            to: [destinationEmail],
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
