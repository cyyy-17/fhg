import Link from "next/link";
import { Award, ShieldCheck, ArrowUpRight, FileCheck } from "lucide-react";
import { companyData } from "@/data/company";

export default function ProfileCredentialsTab() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companyData.credentials.map((cred, idx) => (
          <div
            key={idx}
            className="glass-panel glass-panel-hover rounded-2xl p-7 flex flex-col justify-between border border-white/10 group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#ffd600]/15 border border-[#ffd600]/30 flex items-center justify-center text-[#ffd600] mb-5 group-hover:scale-105 group-hover:bg-[#ffd600] group-hover:text-[#050e07] transition-all duration-300">
                <Award className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-bold font-heading text-white mb-2 group-hover:text-[#ffd600] transition-colors">
                {cred.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#a8d5a8] leading-relaxed mb-4">
                {cred.detail}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] font-semibold text-[#76c442]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Audited Active Standing</span>
              </div>
              <Link
                href="#vault"
                className="text-[11px] font-bold text-[#ffd600] hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>View PDF</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Procurement Assurance Strip */}
      <div className="p-5 rounded-2xl bg-[#0a1f0e] border border-[#ffd600]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <FileCheck className="w-6 h-6 text-[#ffd600] shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-white">Direct Tender Envelopes Pre-Qualified</h4>
            <p className="text-xs text-[#a8d5a8]">All BIR, PhilGEPS, and DTI registrations are ready for download in our Document Vault.</p>
          </div>
        </div>
        <Link
          href="#vault"
          className="px-5 py-2.5 rounded-full bg-[#ffd600] text-[#050e07] text-xs font-bold uppercase tracking-wider hover:brightness-110 shrink-0"
        >
          Inspect Official Vault
        </Link>
      </div>
    </div>
  );
}
