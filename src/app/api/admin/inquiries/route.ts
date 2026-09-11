import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import {
  getInquiriesData,
  updateInquiryStatus,
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
    const { id, status } = body;

    if (!id || !status || !["unread", "read", "archived"].includes(status)) {
      return NextResponse.json({ error: "Invalid status parameters." }, { status: 400 });
    }

    const success = await updateInquiryStatus(id, status);
    if (!success) {
      return NextResponse.json({ error: "Inquiry not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Inquiry status updated to ${status}.`,
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
