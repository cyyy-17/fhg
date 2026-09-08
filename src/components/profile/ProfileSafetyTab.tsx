import Link from "next/link";
import { HardHat, Award, ShieldCheck, HeartPulse, CheckCircle2, Siren } from "lucide-react";
import { companyData } from "@/data/company";

const pillars = [
  {
    icon: HardHat,
    metric: "100% Certified",
    title: "DOLE COSH & BOSH Certified",
    desc: "On-site safety officers oversight across all crane rigging, climbing, and power saw felling operations.",
  },
  {
    icon: Award,
    metric: "1,240,000+ Safe Hours",
    title: "Zero Lost-Time Accident Record",
    desc: "Flawless incident-free track record maintained across expressway corridors and subway station access shafts.",
  },
  {
    icon: ShieldCheck,
    metric: "CARI & CGL Active",
    title: "Comprehensive Insurance Shield",
    desc: "Active Contractor's All Risk and Comprehensive General Liability covering personnel and client property.",
  },
  {
    icon: HeartPulse,
    metric: "OSHA & DOLE Compliant",
    title: "Ballistic PPE Standards",
    desc: "Stihl ballistic chaps, ANSI climbing harnesses, steel-toed boots, and radio-equipped arborist helmets.",
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
              className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between border border-white/10"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#2e7d32]/25 border border-[#4caf50]/30 flex items-center justify-center text-[#76c442] mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-[#ffd600] tracking-wider uppercase block mb-1">
                  {pillar.metric}
                </span>
                <h3 className="text-lg font-bold font-heading text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#a8d5a8] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-white/10 flex items-center gap-2 text-[11px] font-semibold text-[#76c442]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Standard Protocol</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Metric Substantiation Footnote */}
      <p className="text-[11px] text-[#a8d5a8]/70 italic text-center">
        *Safe man-hours and zero lost-time accident records substantiated under DOLE COSH / BOSH monitoring guidelines (DO 198-18). Compliance rating verified across historical DENR, PCA, and DPWH project audits (1998–2024).
      </p>

      {/* Tree Survival Warranty Guarantee Banner */}
      <div className="rounded-3xl bg-linear-to-r from-[#0d2812] via-[#103017] to-[#081b0c] border border-[#4caf50]/40 p-8 sm:p-10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-[#ffd600]/20 border border-[#ffd600]/40 flex items-center justify-center text-[#ffd600] shrink-0">
            <Siren className="w-8 h-8" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#ffd600] uppercase tracking-wider mb-1">
              <span>Formal Tree Survival Warranty</span>
              <span>•</span>
              <span>{companyData.warranty.period}</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">
              100% Free Specimen Replacement Guarantee
            </h4>
            <p className="text-xs sm:text-sm text-[#a8d5a8] max-w-2xl leading-relaxed">
              {companyData.warranty.coverage}. Backed by our twin Batangas nursery reserves and bi-weekly arborist monitoring during early acclimatization.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
          <Link
            href="#estimate"
            className="px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-[#ffd600] text-[#050e07] hover:brightness-110 shadow-lg shadow-[#ffd600]/20 transition-all"
          >
            Request EHS Project Plan
          </Link>
          <Link
            href="#vault"
            className="px-6 py-3 rounded-full font-semibold text-xs text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all"
          >
            Inspect Safety Dossiers
          </Link>
        </div>
      </div>
    </div>
  );
}
