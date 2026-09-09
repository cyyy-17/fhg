import Link from "next/link";
import { HardHat, Award, ShieldCheck, HeartPulse, CheckCircle2, Siren } from "lucide-react";
import { companyData } from "@/data/company";

const pillars = [
  {
    icon: HardHat,
    metric: "100% Certified",
    title: "DOLE COSH & BOSH Certified",
    desc: "On-site safety officers oversight across all crane rigging, climbing, and 90-chainsaw heavy felling operations.",
  },
  {
    icon: Award,
    metric: "3,000,000 Safe Hours",
    title: "Zero Lost-Time Incident (LTI) Record",
    desc: "Flawless incident-free track record officially recognized by Giga ACE 6, Inc. on January 21, 2026 for the Quezon North Wind Project.",
  },
  {
    icon: ShieldCheck,
    metric: "CARI & CGL Active",
    title: "Comprehensive Insurance Shield",
    desc: "Active Contractor's All Risk and Comprehensive General Liability covering personnel and client property across all job sites.",
  },
  {
    icon: HeartPulse,
    metric: "OSHA & DOLE Compliant",
    title: "Ballistic PPE Standards",
    desc: "Stihl ballistic chaps, ANSI climbing harnesses, steel-toed boots, and radio-equipped arborist helmets for all crews.",
  },
];

export default function ProfileSafetyTab() {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className="rounded-xl bg-[#0a150c] border border-white/10 p-6 flex flex-col justify-between group hover:border-[#c5a059]/40 transition-colors"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#060d07] border border-white/10 flex items-center justify-center text-[#c5a059] mb-4 group-hover:border-[#c5a059]/50 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-semibold text-[#dfbe76] tracking-wider uppercase block mb-1">
                  {pillar.metric}
                </span>
                <h3 className="text-base font-bold font-heading text-[#f6f7f4] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#9aa89b] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-mono text-[#f6f7f4]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Verified Standard Protocol</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Metric Substantiation Footnote */}
      <p className="text-[11px] font-mono text-[#9aa89b]/70 italic text-center">
        *Safe man-hours substantiated by Plaque of Special Recognition for 3,000,000 Safe Manhours Without Lost Time Incident issued on January 21, 2026 by Giga ACE 6, Inc. for the Quezon North Wind Project under DOLE COSH / BOSH guidelines (DO 198-18).
      </p>

      {/* Tree Survival Warranty Guarantee Banner */}
      <div className="rounded-2xl bg-[#0a150c] border border-white/10 p-8 sm:p-10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <div className="w-14 h-14 rounded-xl bg-[#060d07] border border-white/10 flex items-center justify-center text-[#c5a059] shrink-0">
            <Siren className="w-7 h-7" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#dfbe76] uppercase tracking-wider mb-1">
              <span>Formal Tree Survival Warranty</span>
              <span className="text-white/20">•</span>
              <span>{companyData.warranty.period}</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold font-heading text-[#f6f7f4] mb-2">
              100% Free Specimen Replacement Guarantee
            </h4>
            <p className="text-xs sm:text-sm text-[#9aa89b] max-w-2xl leading-relaxed">
              {companyData.warranty.coverage}. Backed by our Batangas nursery reserves and bi-weekly arborist monitoring during early acclimatization.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-lg font-semibold text-xs uppercase tracking-wider bg-[#c5a059] hover:bg-[#dfbe76] text-[#060d07] shadow-md transition-colors"
          >
            Request EHS Plan
          </Link>
          <Link
            href="#vault"
            className="px-5 py-2.5 rounded-lg font-medium text-xs text-[#f6f7f4] bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            Inspect Safety Dossiers
          </Link>
        </div>
      </div>
    </div>
  );
}
