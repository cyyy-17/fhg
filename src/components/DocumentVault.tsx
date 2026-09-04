"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FileCheck, Download, ExternalLink, ShieldCheck, FileText, Lock, Eye, X } from "lucide-react";
import MediaPlaceholder from "./MediaPlaceholder";

interface DocumentItem {


  id: string;
  title: string;
  category: "Legal Registration" | "Tax Compliance" | "Project Audit" | "Logistics & Site";
  docNumber: string;
  fileUrl: string;
  fileSize: string;
  description: string;
  status: "Audited & Active" | "Official Certified";
}

const documents: DocumentItem[] = [
  {
    id: "company-profile",
    title: "Official Company Profile & Capability Dossier",
    category: "Legal Registration",
    docNumber: "DTI Cert. No. 1729753",
    fileUrl: "/docs/company-profile.pdf",
    fileSize: "305 KB PDF",
    description: "Comprehensive corporate profile detailing 26+ years of history, management, machinery assets, and signature infrastructure projects.",
    status: "Official Certified",
  },
  {
    id: "bir-cor",
    title: "BIR Certificate of Registration (COR)",
    category: "Tax Compliance",
    docNumber: "TIN Registered Enterprise",
    fileUrl: "/docs/bir-cor.pdf",
    fileSize: "1.15 MB PDF",
    description: "Official Bureau of Internal Revenue registered sole proprietorship status for commercial contract bidding and billing compliance.",
    status: "Audited & Active",
  },
  {
    id: "bir-2303",
    title: "BIR Form 2303 Tax Exemption & Filing Record",
    category: "Tax Compliance",
    docNumber: "BIR RDO 059 Batangas",
    fileUrl: "/docs/bir-2303.pdf",
    fileSize: "2.58 MB PDF",
    description: "Statutory tax clearance for enterprise withholding, corporate invoicing, and government procurement pre-qualification.",
    status: "Audited & Active",
  },
  {
    id: "clients-projects",
    title: "Audited List of Clients & Completed Works",
    category: "Project Audit",
    docNumber: "Track Record Archive 1998–2024",
    fileUrl: "/docs/clients-and-projects.pdf",
    fileSize: "170 KB PDF",
    description: "Certified list of infrastructure and commercial developers including San Miguel, Ayala Land, SM Prime, EEI, DMCI, and DPWH contracts.",
    status: "Official Certified",
  },
  {
    id: "office-map",
    title: "Head Office Location Map & Dispatch Hub",
    category: "Logistics & Site",
    docNumber: "Talisay Batangas HQ",
    fileUrl: "/docs/office-location-map.pdf",
    fileSize: "208 KB PDF",
    description: "Route guide to Sitio Sto. Niño, Banga, Talisay, Batangas (Plus Code: 32V9+5P) operations hub for vendor onboarding and in-person meetings.",
    status: "Official Certified",
  },

  {
    id: "nursery-map",
    title: "Twin Plant Nursery Facilities Location Guide",
    category: "Logistics & Site",
    docNumber: "Tumaway & Aya Facilities",
    fileUrl: "/docs/nursery-location-map.pdf",
    fileSize: "141 KB PDF",
    description: "Access coordinates and site map for client tree inspection at Brgy. Tumaway and Brgy. Aya propagation farms.",
    status: "Official Certified",
  },
];

export default function DocumentVault() {
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and handle ESC key
  useEffect(() => {
    if (!previewDoc) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewDoc(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewDoc]);

  return (
    <section id="vault" className="py-24 bg-[#050e07] relative z-20">
      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#ffd600] bg-[#ffd600]/10 border border-[#ffd600]/20 mb-4">
            Vendor Pre-Qualification Center
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
            Corporate Compliance & Document Vault
          </h2>
          <p className="mt-4 text-base sm:text-lg text-forest-muted">
            Instant access to verified legal registrations, BIR tax clearances, and audited track records for expedited procurement onboarding.
          </p>
        </div>

        {/* Security / Verification Assurance Strip */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#102414]/90 border border-[#4caf50]/30 shadow-xl mb-12 flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ffd600]/20 text-[#ffd600] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">PhilGEPS Blue Member & DTI Verified</h4>
              <p className="text-xs text-forest-muted">All files are authentic certified corporate documents ready for bidding envelopes.</p>
            </div>
          </div>
          <a
            href="#estimate"
            className="px-5 py-2 rounded-full bg-[#ffd600] text-[#050e07] text-xs font-bold uppercase tracking-wider hover:brightness-110 shrink-0"
          >
            Request Custom Vendor Pack
          </a>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Visual Technical Asset */}
                <div
                  className="mb-4 rounded-xl overflow-hidden border border-white/10 cursor-pointer"
                  onClick={() => setPreviewDoc(doc)}
                >
                  <MediaPlaceholder
                    variant="document-scan"
                    aspect="16/9"
                    title={doc.title}
                    subtitle={doc.docNumber}
                    badge={doc.category}
                    tag={doc.fileSize}
                  />
                </div>

                {/* Top Badge & Status */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#ffd600]/15 text-[#ffd600] border border-[#ffd600]/30">
                    {doc.docNumber}
                  </span>
                  <span className="text-[10px] font-bold text-[#76c442] flex items-center gap-1">
                    <FileCheck className="w-3.5 h-3.5" />
                    {doc.status}
                  </span>
                </div>

                {/* Title */}
                <h3
                  onClick={() => setPreviewDoc(doc)}
                  className="text-lg font-bold font-heading text-white mb-2 group-hover:text-[#ffd600] transition-colors leading-snug cursor-pointer"
                >
                  {doc.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-forest-muted leading-relaxed mb-4">
                  {doc.description}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#a8d5a8]">
                  {doc.fileSize}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewDoc(doc)}
                    className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Preview Document inside App"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#ffd600]" />
                    <span>Preview</span>
                  </button>
                  <a
                    href={doc.fileUrl}
                    download
                    className="px-3.5 py-2 rounded-lg bg-[#2e7d32] hover:bg-[#4caf50] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* In-App PDF Preview Modal */}
      {previewDoc && mounted && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-9999 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setPreviewDoc(null)}
        >
          <div
            className="relative w-full max-w-5xl h-[90vh] rounded-3xl bg-[#061409] border border-[#4caf50]/40 shadow-2xl p-4 sm:p-6 flex flex-col text-white my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#ffd600]/20 text-[#ffd600]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-heading line-clamp-1">
                    {previewDoc.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#a8d5a8]">
                    <span>{previewDoc.docNumber}</span>
                    <span>•</span>
                    <span className="text-[#ffd600]">{previewDoc.fileSize}</span>
                  </div>
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
                  aria-label="Close Preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Embedded PDF Viewer */}
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
    </section>
  );
}

