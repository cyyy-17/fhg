import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession, comparePassword } from "@/lib/auth";
import {
  getAdminStore,
  saveAdminStore,
  saveCompanyData,
  saveServicesData,
  saveProjectsData,
  saveClientsData,
  saveEquipmentData,
  saveSpeciesData,
  saveFaqsData,
  saveProtocolData,
  saveDocumentsData,
  saveSettingsData,
  resetToDefaults,
  getKvConfig,
  getAdminPasswordHash,
  setAdminPassword,
  addAuditLog,
} from "@/lib/storage";
import {
  companyDataSchema,
  serviceItemSchema,
  projectItemSchema,
  clientItemSchema,
  equipmentItemSchema,
  speciesItemSchema,
  faqItemSchema,
  protocolStepSchema,
  documentItemSchema,
  adminSettingsSchema,
} from "@/lib/schemas";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session?.authenticated) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const section = searchParams.get("section");
  const store = await getAdminStore();

  if (section === "system-status") {
    const kvConfig = getKvConfig();
    const hasBlob = !!process.env.BLOB_READ_WRITE_TOKEN;
    return NextResponse.json({
      success: true,
      section: "system-status",
      storageType: kvConfig ? "Vercel KV / Redis (Atomic Mode)" : "Local JSON / Static Mode",
      kvConnected: !!kvConfig,
      blobConnected: hasBlob,
      nodeEnv: process.env.NODE_ENV,
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://fhg-two.vercel.app",
      lastUpdated: store.lastUpdated,
    });
  }

  if (section && section in store) {
    return NextResponse.json({
      success: true,
      section,
      data: store[section as keyof typeof store],
      lastUpdated: store.lastUpdated,
    });
  }

  return NextResponse.json({
    success: true,
    store,
  });
}

export async function PUT(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session?.authenticated) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const body = await request.json();
    const { section, data, action } = body;

    if (action === "reset" || section === "reset") {
      const resetStore = await resetToDefaults();
      return NextResponse.json({
        success: true,
        message: "System baseline configuration successfully restored to default state.",
        store: resetStore,
      });
    }

    if (!section) {
      if (typeof data === "object" && data !== null) {
        const updated = await saveAdminStore(data);
        await addAuditLog({
          action: "store.full_update",
          actor: "admin",
          details: "Restored or saved complete store snapshot",
        });
        return NextResponse.json({
          success: true,
          message: "Entire store updated successfully.",
          store: updated,
        });
      }
      return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
    }

    switch (section) {
      case "company": {
        const parsed = companyDataSchema.safeParse(data);
        if (!parsed.success) {
          return NextResponse.json(
            { error: "Invalid company schema.", details: parsed.error.format() },
            { status: 422 }
          );
        }
        const updated = await saveCompanyData(parsed.data as typeof import("@/data/company").companyData);
        await addAuditLog({
          action: "content.company_update",
          actor: "admin",
          details: "Updated company profile information and legal credentials",
        });
        return NextResponse.json({ success: true, section, data: updated });
      }
      case "services": {
        const parsed = z.array(serviceItemSchema).safeParse(data);
        if (!parsed.success) {
          return NextResponse.json(
            { error: "Invalid services schema.", details: parsed.error.format() },
            { status: 422 }
          );
        }
        const updated = await saveServicesData(parsed.data);
        await addAuditLog({
          action: "content.services_update",
          actor: "admin",
          details: `Updated ${parsed.data.length} services`,
        });
        return NextResponse.json({ success: true, section, data: updated });
      }
      case "projects": {
        const parsed = z.array(projectItemSchema).safeParse(data);
        if (!parsed.success) {
          return NextResponse.json(
            { error: "Invalid projects schema.", details: parsed.error.format() },
            { status: 422 }
          );
        }
        const updated = await saveProjectsData(parsed.data);
        await addAuditLog({
          action: "content.projects_update",
          actor: "admin",
          details: `Updated ${parsed.data.length} project portfolio items`,
        });
        return NextResponse.json({ success: true, section, data: updated });
      }
      case "clients": {
        const parsed = z.array(clientItemSchema).safeParse(data);
        if (!parsed.success) {
          return NextResponse.json(
            { error: "Invalid clients schema.", details: parsed.error.format() },
            { status: 422 }
          );
        }
        const updated = await saveClientsData(parsed.data);
        await addAuditLog({
          action: "content.clients_update",
          actor: "admin",
          details: `Updated ${parsed.data.length} enterprise clients`,
        });
        return NextResponse.json({ success: true, section, data: updated });
      }
      case "equipment": {
        const parsed = z.array(equipmentItemSchema).safeParse(data);
        if (!parsed.success) {
          return NextResponse.json(
            { error: "Invalid equipment schema.", details: parsed.error.format() },
            { status: 422 }
          );
        }
        const updated = await saveEquipmentData(parsed.data);
        await addAuditLog({
          action: "content.equipment_update",
          actor: "admin",
          details: `Updated ${parsed.data.length} equipment assets`,
        });
        return NextResponse.json({ success: true, section, data: updated });
      }
      case "species": {
        const parsed = z.array(speciesItemSchema).safeParse(data);
        if (!parsed.success) {
          return NextResponse.json(
            { error: "Invalid species schema.", details: parsed.error.format() },
            { status: 422 }
          );
        }
        const updated = await saveSpeciesData(parsed.data);
        await addAuditLog({
          action: "content.species_update",
          actor: "admin",
          details: `Updated ${parsed.data.length} nursery species`,
        });
        return NextResponse.json({ success: true, section, data: updated });
      }
      case "faqs": {
        const parsed = z.array(faqItemSchema).safeParse(data);
        if (!parsed.success) {
          return NextResponse.json(
            { error: "Invalid faqs schema.", details: parsed.error.format() },
            { status: 422 }
          );
        }
        const updated = await saveFaqsData(parsed.data);
        await addAuditLog({
          action: "content.faqs_update",
          actor: "admin",
          details: `Updated ${parsed.data.length} FAQs`,
        });
        return NextResponse.json({ success: true, section, data: updated });
      }
      case "protocol": {
        const parsed = z.array(protocolStepSchema).safeParse(data);
        if (!parsed.success) {
          return NextResponse.json(
            { error: "Invalid protocol schema.", details: parsed.error.format() },
            { status: 422 }
          );
        }
        const updated = await saveProtocolData(parsed.data);
        await addAuditLog({
          action: "content.protocol_update",
          actor: "admin",
          details: `Updated ${parsed.data.length} protocol steps`,
        });
        return NextResponse.json({ success: true, section, data: updated });
      }
      case "documents": {
        const parsed = z.array(documentItemSchema).safeParse(data);
        if (!parsed.success) {
          return NextResponse.json(
            { error: "Invalid documents schema.", details: parsed.error.format() },
            { status: 422 }
          );
        }
        const updated = await saveDocumentsData(parsed.data);
        await addAuditLog({
          action: "content.documents_update",
          actor: "admin",
          details: `Updated ${parsed.data.length} statutory compliance documents`,
        });
        return NextResponse.json({ success: true, section, data: updated });
      }
      case "settings": {
        // Check for password change request
        if (data.newPassword && typeof data.newPassword === "string" && data.newPassword.trim().length > 0) {
          if (!data.currentPassword || typeof data.currentPassword !== "string") {
            return NextResponse.json(
              { error: "Current administrator password is required to set a new password." },
              { status: 400 }
            );
          }

          const storedHash = await getAdminPasswordHash();
          const isCurrentValid = await comparePassword(data.currentPassword, storedHash);

          if (!isCurrentValid) {
            await addAuditLog({
              action: "auth.password_change_failed",
              actor: "admin",
              details: "Failed attempt to change administrator password: wrong current password.",
            });
            return NextResponse.json(
              { error: "Current password does not match. Password was not changed." },
              { status: 403 }
            );
          }

          if (data.newPassword.length < 8) {
            return NextResponse.json(
              { error: "New password must be at least 8 characters long." },
              { status: 400 }
            );
          }

          await setAdminPassword(data.newPassword);
          await addAuditLog({
            action: "auth.password_changed",
            actor: "admin",
            details: "Administrator password successfully updated and re-hashed with bcrypt.",
          });
        }

        // Clean password fields before saving settings
        const settingsPayload = { ...data };
        delete settingsPayload.currentPassword;
        delete settingsPayload.newPassword;
        delete settingsPayload.adminPassword;
        const parsed = adminSettingsSchema.safeParse(settingsPayload);
        if (!parsed.success) {
          return NextResponse.json(
            { error: "Invalid settings schema.", details: parsed.error.format() },
            { status: 422 }
          );
        }
        const updated = await saveSettingsData(parsed.data);
        await addAuditLog({
          action: "settings.update",
          actor: "admin",
          details: "Updated platform settings and notification preferences",
        });
        return NextResponse.json({
          success: true,
          section,
          data: updated,
          passwordUpdated: !!data.newPassword,
        });
      }
      default:
        return NextResponse.json(
          { error: `Unrecognized section: ${section}` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Admin data PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update business data." },
      { status: 500 }
    );
  }
}
