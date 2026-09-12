import { NextResponse } from "next/server";
import { addInquiryRecord, getSettingsData, addAuditLog } from "@/lib/storage";
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
  type?: "Commercial" | "Government" | "General" | "RFP";
  estimatedValue?: string;
  preferredContactMethod?: "email" | "phone" | "either";
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
      type: body.type || "General",
      estimatedValue: body.estimatedValue?.trim() ? body.estimatedValue.trim() : undefined,
      preferredContactMethod: body.preferredContactMethod || "either",
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

    const {
      fullName: clientName,
      email,
      phone,
      subject,
      message,
      company,
      type,
      estimatedValue,
      preferredContactMethod,
    } = parsed.data;

    const settings = await getSettingsData().catch(() => null);
    const destinationEmail =
      settings?.contactEmail ||
      process.env.CONTACT_EMAIL ||
      companyData.headOffice.emails[0] ||
      "edluna1971@yahoo.com";

    // 3. Compile Technical Dossier
    const timestamp = new Date().toISOString();
    const compiledDossier =
      `[FOREST HILLS GARDEN - INQUIRY DOSSIER]\n` +
      `Timestamp: ${timestamp}\n` +
      `Client/Contact: ${clientName}${company ? ` (${company})` : ""}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n` +
      `Type: ${type || "General"}\n` +
      `Estimated Value: ${estimatedValue || "To be scoped"}\n` +
      `Preferred Contact: ${preferredContactMethod || "either"}\n` +
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
        type,
        estimatedValue,
        preferredContactMethod,
        subject,
        message,
        dossierText: compiledDossier,
      });

      await addAuditLog({
        action: "inquiry.received",
        actor: "public_client",
        details: `Inquiry received from ${clientName}${company ? ` (${company})` : ""} regarding ${subject}`,
      });
    } catch (storeErr) {
      console.warn("Failed to persist inquiry in admin inbox:", storeErr);
    }

    // 5. External dispatch via Resend (Decision 5: Admin notification alert)
    const notificationsAllowed = settings?.notificationEnabled !== false;
    const resendApiKey = process.env.RESEND_API_KEY?.trim()
      .replace(/^["']|["']$/g, "")
      .replace(/[\r\n\s]+/g, "");

    if (resendApiKey && destinationEmail && notificationsAllowed) {
      try {
        const recipientList = destinationEmail
          .split(",")
          .map((e) => e.trim())
          .filter((e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));

        const finalRecipients = recipientList.length > 0 ? recipientList : [destinationEmail];
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fhg-two.vercel.app";

        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Forest Hills Garden Alert <onboarding@resend.dev>",
            to: finalRecipients,
            reply_to: email,
            subject: `[NEW INQUIRY] ${clientName}${company ? ` (${company})` : ""} — ${subject}`,
            html: `
              <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px;">
                <div style="background: #0a170d; padding: 16px 20px; border-radius: 6px; margin-bottom: 20px;">
                  <h2 style="color: #4ade80; margin: 0; font-size: 18px; letter-spacing: 0.05em; text-transform: uppercase;">New Project Inquiry</h2>
                  <p style="color: #9ca3af; margin: 4px 0 0 0; font-size: 13px;">Forest Hills Garden Operations Portal</p>
                </div>
                
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                  <tr><td style="padding: 8px 0; color: #6b7280; width: 140px;">Client:</td><td style="padding: 8px 0; font-weight: 600; color: #111827;">${clientName}</td></tr>
                  ${company ? `<tr><td style="padding: 8px 0; color: #6b7280;">Company:</td><td style="padding: 8px 0; font-weight: 600; color: #111827;">${company}</td></tr>` : ""}
                  <tr><td style="padding: 8px 0; color: #6b7280;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #16a34a;">${email}</a></td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280;">Phone:</td><td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #16a34a;">${phone}</a></td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280;">Classification:</td><td style="padding: 8px 0; font-weight: 500;">${type || "General"}</td></tr>
                  ${estimatedValue ? `<tr><td style="padding: 8px 0; color: #6b7280;">Est. Budget:</td><td style="padding: 8px 0; font-weight: 500;">${estimatedValue}</td></tr>` : ""}
                  <tr><td style="padding: 8px 0; color: #6b7280;">Contact via:</td><td style="padding: 8px 0; text-transform: capitalize;">${preferredContactMethod || "either"}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280;">Subject:</td><td style="padding: 8px 0; font-weight: 600; color: #111827;">${subject}</td></tr>
                </table>

                <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px; margin-bottom: 24px;">
                  <h4 style="margin: 0 0 8px 0; color: #374151; font-size: 13px; text-transform: uppercase;">Message & Scope</h4>
                  <p style="margin: 0; color: #1f2937; line-height: 1.6; white-space: pre-wrap; font-size: 14px;">${message}</p>
                </div>

                <div style="text-align: center;">
                  <a href="${siteUrl}/admin/inquiries" style="display: inline-block; background: #15803d; color: #ffffff; padding: 10px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">Open Admin Inbox</a>
                </div>
              </div>
            `,
            text: compiledDossier,
          }),
        });
      } catch (err) {
        console.warn("External email dispatch failed; relying on inbox registration:", err);
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
