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
            className="rounded-xl bg-[#0a150c] border border-white/10 p-7 flex flex-col justify-between group hover:border-[#c5a059]/40 transition-colors"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#060d07] border border-white/10 flex items-center justify-center text-[#c5a059] mb-5 group-hover:border-[#c5a059]/50 transition-colors">
                <Award className="w-5 h-5" />
              </div>

              <h3 className="text-base sm:text-lg font-bold font-heading text-[#f6f7f4] mb-2 group-hover:text-[#dfbe76] transition-colors">
                {cred.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#9aa89b] leading-relaxed mb-4">
                {cred.detail}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#f6f7f4]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Audited Active Standing</span>
              </div>
              <Link
                href="#vault"
                className="text-xs font-semibold text-[#dfbe76] hover:text-[#f6f7f4] flex items-center gap-1 transition-colors"
              >
                <span>View Dossier</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Procurement Assurance Strip */}
      <div className="p-5 rounded-xl bg-[#0a150c] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <FileCheck className="w-5 h-5 text-[#c5a059] shrink-0" />
          <div>
            <h4 className="text-sm font-semibold text-[#f6f7f4]">Direct Tender Envelopes Pre-Qualified</h4>
            <p className="text-xs text-[#9aa89b]">All BIR, PhilGEPS, and DTI registrations are available for review in our Document Vault.</p>
          </div>
        </div>
        <Link
          href="#vault"
          className="px-5 py-2.5 rounded-lg bg-[#c5a059] hover:bg-[#dfbe76] text-[#060d07] text-xs font-semibold uppercase tracking-wider transition-colors shrink-0"
        >
          Inspect Official Vault
        </Link>
      </div>

      <p className="text-[11px] font-mono text-[#9aa89b]/70 italic text-center">
        *Heavy chainsaw fleet operated strictly pursuant to RA 9175 under authorized DENR/CENRO cutting permits. All business permits and statutory registrations subject to regular regulatory renewal.
      </p>
    </div>
  );
}
