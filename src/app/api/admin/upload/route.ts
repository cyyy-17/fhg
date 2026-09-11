import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import fs from "fs";
import path from "path";
import { put } from "@vercel/blob";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

// Allowed extensions and MIME types
const ALLOWED_EXTENSIONS = [".pdf", ".png", ".jpg", ".jpeg", ".webp", ".svg", ".doc", ".docx"];
const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25MB max

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session?.authenticated) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No valid file uploaded." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "File exceeds maximum permitted size of 25MB." },
        { status: 400 }
      );
    }

    const originalName = (file as File).name || "uploaded-file";
    const ext = path.extname(originalName).toLowerCase();

    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json(
        { error: `File type not supported. Allowed formats: ${ALLOWED_EXTENSIONS.join(", ")}` },
        { status: 400 }
      );
    }

    // Sanitize file name
    const sanitizedBase = path
      .basename(originalName, ext)
      .replace(/[^a-zA-Z0-9-_]/g, "_")
      .substring(0, 40);
    const uniqueName = `${sanitizedBase}_${Date.now()}${ext}`;

    // 1. Cloud Storage Provider: Vercel Blob (Production)
    const rawBlobToken = process.env.BLOB_READ_WRITE_TOKEN;
    const cleanBlobToken = rawBlobToken
      ? rawBlobToken.trim().replace(/^["']|["']$/g, "").replace(/[\r\n\s]+/g, "")
      : undefined;

    const isBlobConfigured = Boolean(cleanBlobToken);
    const provider = process.env.UPLOAD_PROVIDER || (isBlobConfigured ? "blob" : "local");
    const isVercel = Boolean(process.env.VERCEL);

    if (provider === "blob" || isBlobConfigured) {
      if (!cleanBlobToken) {
        return NextResponse.json(
          { error: "Vercel Blob storage is enabled but BLOB_READ_WRITE_TOKEN is missing or empty." },
          { status: 500 }
        );
      }

      try {
        const blobResult = await put(`uploads/${uniqueName}`, file, {
          access: "public",
          token: cleanBlobToken,
        });

        return NextResponse.json({
          success: true,
          provider: "blob",
          url: blobResult.url,
          fileName: uniqueName,
          fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          mimeType: file.type,
        });
      } catch (blobErr) {
        const message = blobErr instanceof Error ? blobErr.message : String(blobErr);
        console.error("Vercel Blob upload failed:", blobErr);

        // On Vercel, the local filesystem is read-only (/var/task). Local fallback will crash.
        if (isVercel || provider === "blob") {
          return NextResponse.json(
            {
              error: `Cloud upload failed: ${message}. Please check your BLOB_READ_WRITE_TOKEN in Vercel settings.`,
            },
            { status: 502 }
          );
        }
        console.warn("Attempting local filesystem fallback in local development...");
      }
    }

    // 2. Local Filesystem Provider (Local Development fallback ONLY)
    if (isVercel) {
      return NextResponse.json(
        { error: "Local filesystem storage is not available in Vercel production. Please configure BLOB_READ_WRITE_TOKEN." },
        { status: 500 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    const filePath = path.join(UPLOAD_DIR, uniqueName);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${uniqueName}`;

    return NextResponse.json({
      success: true,
      provider: "local",
      url: publicUrl,
      fileName: uniqueName,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      mimeType: file.type,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload and store file." },
      { status: 500 }
    );
  }
}
