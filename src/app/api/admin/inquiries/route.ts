import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import {
  getInquiriesData,
  updateInquiryStatus,
  updateInquiryNote,
  deleteInquiryRecord,
  bulkUpdateInquiryStatus,
  bulkDeleteInquiries,
  recordInquiryReply,
  addAuditLog,
} from "@/lib/storage";

export async function GET() {
  const session = await getAdminSession();
  if (!session?.authenticated) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  const inquiries = await getInquiriesData();
  return NextResponse.json({
    success: true,
    inquiries,
  });
}

export async function PATCH(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session?.authenticated) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const body = await request.json();
    const { id, ids, status, internalNote, markReplied } = body;

    // Support bulk status update
    if (Array.isArray(ids) && ids.length > 0 && status) {
      if (!["unread", "read", "archived"].includes(status)) {
        return NextResponse.json({ error: "Invalid status parameters." }, { status: 400 });
      }
      const count = await bulkUpdateInquiryStatus(ids, status);
      await addAuditLog({
        action: "inquiry.bulk_status",
        actor: "admin",
        details: `Updated ${count} inquiries to status "${status}"`,
      });
      return NextResponse.json({
        success: true,
        message: `Successfully updated ${count} inquiries to "${status}".`,
        count,
      });
    }

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Inquiry ID is required." }, { status: 400 });
    }

    let updatedAny = false;

    if (markReplied) {
      await recordInquiryReply(id);
      await addAuditLog({
        action: "inquiry.reply_recorded",
        actor: "admin",
        details: `Recorded dispatch reply for inquiry ${id}`,
      });
      updatedAny = true;
    }

    if (status !== undefined) {
      if (!["unread", "read", "archived"].includes(status)) {
        return NextResponse.json({ error: "Invalid status parameters." }, { status: 400 });
      }
      const success = await updateInquiryStatus(id, status);
      if (!success) {
        return NextResponse.json({ error: "Inquiry not found." }, { status: 404 });
      }
      updatedAny = true;
    }

    if (internalNote !== undefined) {
      if (typeof internalNote !== "string") {
        return NextResponse.json({ error: "Internal note must be a string." }, { status: 400 });
      }
      const success = await updateInquiryNote(id, internalNote);
      if (!success) {
        return NextResponse.json({ error: "Inquiry not found." }, { status: 404 });
      }
      updatedAny = true;
    }

    if (!updatedAny) {
      return NextResponse.json({ error: "No valid fields provided to update." }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry record updated successfully.",
    });
  } catch (error) {
    console.error("Admin inquiry PATCH error:", error);
    return NextResponse.json({ error: "Failed to update inquiry." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session?.authenticated) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    // Support both single ID via searchParams or JSON body with { ids: [...] }
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const success = await deleteInquiryRecord(id);
      if (!success) {
        return NextResponse.json({ error: "Inquiry record not found." }, { status: 404 });
      }
      await addAuditLog({
        action: "inquiry.delete",
        actor: "admin",
        details: `Deleted inquiry ${id}`,
      });
      return NextResponse.json({
        success: true,
        message: "Inquiry record removed from inbox.",
      });
    }

    // Check JSON body for bulk delete
    const body = await request.json().catch(() => null);
    if (body?.ids && Array.isArray(body.ids) && body.ids.length > 0) {
      const count = await bulkDeleteInquiries(body.ids);
      await addAuditLog({
        action: "inquiry.bulk_delete",
        actor: "admin",
        details: `Deleted ${count} inquiries in bulk`,
      });
      return NextResponse.json({
        success: true,
        message: `Successfully deleted ${count} inquiry records.`,
        count,
      });
    }

    return NextResponse.json({ error: "Inquiry ID or IDs array is required." }, { status: 400 });
  } catch (error) {
    console.error("Admin inquiry DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete inquiry." }, { status: 500 });
  }
}
