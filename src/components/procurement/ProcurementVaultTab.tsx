"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  ShieldCheck,
  Download,
  Eye,
  CheckCircle2,
  FileText,
  X,
} from "lucide-react";
import { documents, type DocumentItem } from "@/data/documents";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useLenisScrollLock } from "@/hooks/useLenisScrollLock";

export default function ProcurementVaultTab() {
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
  const mounted = useIsMounted();

  useLenisScrollLock(Boolean(previewDoc));

  useEffect(() => {
    if (!previewDoc) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewDoc(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewDoc]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0a1f0e] border border-[#ffd600]/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto mb-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-[#ffd600] shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-white">Vendor Pre-Qualification Center</h4>
            <p className="text-xs text-[#a8d5a8]">
              Instant access to verified legal registrations, BIR clearances, and completed works archives.
            </p>
          </div>
        </div>
        <a
          href="/docs/company-profile.pdf"
          download
          className="px-5 py-2.5 rounded-full bg-[#ffd600] text-[#050e07] text-xs font-bold uppercase tracking-wider hover:brightness-110 shrink-0 cursor-pointer flex items-center gap-2 shadow-lg shadow-[#ffd600]/20"
        >
          <Download className="w-4 h-4" />
          <span>Download Master Capability Dossier (PDF)</span>
        </a>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between border border-white/10 group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#ffd600]/15 text-[#ffd600] border border-[#ffd600]/30">
                  {doc.docNumber}
                </span>
                <span className="text-[10px] font-bold text-[#76c442] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {doc.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#ffd600] transition-colors leading-snug">
                {doc.title}
              </h3>
              <p className="text-xs text-[#a8d5a8] leading-relaxed mb-4">
                {doc.description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#a8d5a8]">{doc.fileSize}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewDoc(doc)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Preview document"
                >
                  <Eye className="w-3.5 h-3.5 text-[#ffd600]" />
                  <span>Preview</span>
                </button>
                <a
                  href={doc.fileUrl}
                  download
                  className="px-3 py-1.5 rounded-lg bg-[#2e7d32] hover:bg-[#4caf50] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-[#a8d5a8]/70 italic text-center mt-6">
        *All certificate scans are authentic records of Forest Hills Garden. Bidders must verify current validity dates with our administration desk prior to formal envelope submission.
      </p>

      {/* PDF PREVIEW MODAL */}
      {previewDoc && mounted && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-9999 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeInSimple"
          onClick={() => setPreviewDoc(null)}
        >
          <div
            className="relative w-full max-w-5xl h-[90vh] rounded-3xl bg-[#061409] border border-[#4caf50]/40 shadow-2xl p-4 sm:p-6 flex flex-col text-white my-auto animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#ffd600]/20 text-[#ffd600]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-heading line-clamp-1">{previewDoc.title}</h3>
                  <span className="text-xs text-[#a8d5a8]">{previewDoc.docNumber} • {previewDoc.fileSize}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={previewDoc.fileUrl}
                  download
                  className="px-4 py-2 rounded-xl bg-[#2e7d32] hover:bg-[#4caf50] text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download PDF</span>
                </a>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ffd600] hover:text-[#050e07] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 w-full mt-4 rounded-xl overflow-hidden bg-black/40 border border-white/10">
              <iframe
                src={`${previewDoc.fileUrl}#toolbar=1&navpanes=0`}
                className="w-full h-full border-0"
                title={previewDoc.title}
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
