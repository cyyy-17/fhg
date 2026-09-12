"use client";

import { useState, useRef } from "react";
import { UploadCloud, CheckCircle2, AlertCircle, Copy, Check, Loader2 } from "lucide-react";

interface FileUploadWidgetProps {
  onUploadComplete?: (url: string, fileName: string, fileSize: string) => void;
  label?: string;
  accept?: string;
  helperText?: string;
}

export default function FileUploadWidget({
  onUploadComplete,
  label = "Upload File or Document",
  accept = ".pdf,.png,.jpg,.jpeg,.webp",
  helperText = "PDF or images up to 25MB. Uploads are stored securely in cloud storage.",
}: FileUploadWidgetProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);
    setUploadedUrl(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to upload file.");
      }

      setUploadedUrl(json.url);
      if (onUploadComplete) {
        onUploadComplete(json.url, json.fileName, json.fileSize);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred during upload.";
      setError(msg);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  function handleCopy() {
    if (!uploadedUrl) return;
    navigator.clipboard.writeText(uploadedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="p-4 rounded-xl bg-[#0a170d] border border-white/10 space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono uppercase tracking-wider text-[#22c55e] font-semibold">
          {label}
        </label>
        {isUploading && (
          <span className="flex items-center gap-1.5 text-xs text-[#fbbf24] font-mono animate-pulse">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Uploading...
          </span>
        )}
      </div>

      <div
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 ${
          isUploading
            ? "border-amber-500/40 bg-amber-500/5 cursor-wait"
            : "border-white/15 hover:border-[#22c55e]/60 hover:bg-white/5"
        }`}
      >
        <UploadCloud className="w-6 h-6 text-[#22c55e]" />
        <div className="text-xs font-medium text-[#f6f7f4]">
          Click to browse or select a file to upload
        </div>
        <div className="text-[11px] text-[#9aa89b] max-w-xs">{helperText}</div>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          disabled={isUploading}
          className="hidden"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-300">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {uploadedUrl && (
        <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
          <div className="flex items-center gap-2 min-w-0">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span className="truncate font-mono">{uploadedUrl}</span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white transition flex items-center gap-1 shrink-0 cursor-pointer text-[11px]"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                Copy URL
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
