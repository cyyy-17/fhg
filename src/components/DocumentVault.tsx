"use client";

import { FileCheck, Download, ExternalLink, ShieldCheck, FileText, Lock } from "lucide-react";
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
    description: "Route map to 4th Floor Luna Building, Malvar St., Poblacion 8, Talisay, Batangas for vendor onboarding and in-person meetings.",
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
          <p className="mt-4 text-base sm:text-lg text-[#a8d5a8]">
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
              <p className="text-xs text-[#a8d5a8]">All files are authentic certified corporate documents ready for bidding envelopes.</p>
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
                <div className="mb-4 rounded-xl overflow-hidden border border-white/10">
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
                <h3 className="text-lg font-bold font-heading text-white mb-2 group-hover:text-[#ffd600] transition-colors leading-snug">
                  {doc.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#a8d5a8] leading-relaxed mb-4">
                  {doc.description}
                </p>
              </div>

              {/* Bottom Download Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#a8d5a8]">
                  {doc.fileSize}
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title="View Document in Browser"
                    aria-label={`View ${doc.title}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href={doc.fileUrl}
                    download
                    className="px-4 py-2 rounded-lg bg-[#2e7d32] hover:bg-[#4caf50] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
