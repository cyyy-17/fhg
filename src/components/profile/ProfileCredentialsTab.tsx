import Link from "next/link";
import { Award, ShieldCheck, ArrowUpRight, FileCheck } from "lucide-react";
import { companyData } from "@/data/company";
import type { CompanyData } from "@/types/admin";

interface ProfileCredentialsTabProps {
  company?: CompanyData;
}

export default function ProfileCredentialsTab({ company }: ProfileCredentialsTabProps = {}) {
  const credentials = company?.credentials && company.credentials.length > 0 ? company.credentials : companyData.credentials;
  const awards = company?.awards && company.awards.length > 0 ? company.awards : companyData.awards;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {credentials.map((cred, idx) => (
          <div
            key={idx}
            className="rounded-xl bg-[#0a170d] border border-white/10 p-7 flex flex-col justify-between group hover:border-[#22c55e]/40 hover:shadow-[0_0_20px_rgba(34,197,94,0.1)] transition-all"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#050d07] border border-white/10 flex items-center justify-center text-[#f59e0b] mb-5 group-hover:border-[#22c55e]/50 transition-colors">
                <Award className="w-5 h-5" />
              </div>

              <h3 className="text-base sm:text-lg font-bold font-heading text-[#f6f7f4] mb-2 group-hover:text-[#4ade80] transition-colors">
                {cred.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#9aa89b] leading-relaxed mb-4">
                {cred.detail}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#f6f7f4]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#22c55e]" />
                <span>Audited Active Standing</span>
              </div>
              <Link
                href="#vault"
                className="text-xs font-semibold text-[#f59e0b] hover:text-[#4ade80] flex items-center gap-1 transition-colors"
              >
                <span>View Dossier</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Official Industry Awards & Special Citations */}
      {awards && awards.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#f59e0b]" />
            <h3 className="text-lg font-bold font-heading text-[#f6f7f4]">
              Official Industry Awards &amp; Special Citations
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {awards.map((award, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-[#0a170d] border border-white/10 p-6 flex flex-col justify-between group hover:border-[#f59e0b]/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f59e0b]/10 text-[#fbbf24] border border-[#f59e0b]/30 font-semibold">
                      {award.date}
                    </span>
                    <span className="text-xs font-mono text-[#9aa89b] truncate">
                      {award.conferredBy}
                    </span>
                  </div>
                  <h4 className="text-base font-bold font-heading text-[#f6f7f4] mb-1 group-hover:text-[#fbbf24] transition-colors">
                    {award.title}
                  </h4>
                  {award.project && (
                    <div className="text-xs text-[#22c55e] font-mono mb-2">
                      Project: {award.project}
                    </div>
                  )}
                  <p className="text-xs text-[#9aa89b] leading-relaxed">
                    {award.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Procurement Assurance Strip */}
      <div className="p-5 rounded-xl bg-[#0a170d] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <FileCheck className="w-5 h-5 text-[#22c55e] shrink-0" />
          <div>
            <h4 className="text-sm font-semibold text-[#f6f7f4]">Direct Tender Envelopes Pre-Qualified</h4>
            <p className="text-xs text-[#9aa89b]">All BIR, PhilGEPS, and DTI registrations are available for review in our Document Vault.</p>
          </div>
        </div>
        <Link
          href="#vault"
          className="px-5 py-2.5 rounded-lg bg-linear-to-r from-[#f59e0b] to-[#d97706] hover:from-[#fbbf24] hover:to-[#f59e0b] text-[#050d07] text-xs uppercase tracking-wider transition-all shrink-0 font-bold shadow-md"
        >
          Inspect Official Vault
        </Link>
      </div>

      <p className="text-[11px] font-mono text-[#9aa89b]/70 italic text-center">
        *Heavy chainsaw fleet of 90 registered units operated strictly pursuant to RA 9175 under authorized DENR-CENRO Lipa cutting permits with authority to operate in projects outside its jurisdiction. All statutory registrations subject to regular regulatory renewal.
      </p>
    </div>
  );
}
