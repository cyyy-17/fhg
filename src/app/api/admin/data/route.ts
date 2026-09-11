import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/auth";
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
        return NextResponse.json({ success: true, section, data: updated });
      }
      case "settings": {
        const parsed = adminSettingsSchema.safeParse(data);
        if (!parsed.success) {
          return NextResponse.json(
            { error: "Invalid settings schema.", details: parsed.error.format() },
            { status: 422 }
          );
        }
        const updated = await saveSettingsData(parsed.data);
        return NextResponse.json({ success: true, section, data: updated });
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
