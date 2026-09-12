import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import {
  getInquiriesData,
  updateInquiryStatus,
  updateInquiryNote,
  deleteInquiryRecord,
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
    const { id, status, internalNote } = body;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Inquiry ID is required." }, { status: 400 });
    }

    let updatedAny = false;

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

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Inquiry ID is required." }, { status: 400 });
    }

    const success = await deleteInquiryRecord(id);
    if (!success) {
      return NextResponse.json({ error: "Inquiry record not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry record removed from inbox.",
    });
  } catch (error) {
    console.error("Admin inquiry DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete inquiry." }, { status: 500 });
  }
}
