"use client";

import { ShieldCheck, HardHat, Award, HeartPulse, CheckCircle2, Siren } from "lucide-react";
import { companyData } from "@/data/company";

export default function SafetyEhsSection() {
  const ehsPillars = [
    {
      icon: HardHat,
      title: "DOLE COSH & BOSH Certified",
      desc: "Mandatory on-site Construction Occupational Safety and Health (COSH) officers overseeing all rigging, climbing, and heavy equipment operations.",
      metric: "100% Certified Safety Officers"
    },
    {
      icon: Award,
      title: "Zero Lost-Time Accident Record",
      desc: "Over 1.24 million safe man-hours achieved across high-risk expressway corridors, subway station shafts, and high-voltage transmission lines.",
      metric: "1,240,000+ Safe Man-Hours"
    },
    {
      icon: ShieldCheck,
      title: "Comprehensive Insurance Shield",
      desc: "Fully active Contractor's All Risk Insurance (CARI) and Comprehensive General Liability (CGL) protecting property and personnel on every project.",
      metric: "CARI & CGL Active Coverage"
    },
    {
      icon: HeartPulse,
      title: "Full-Arrest & Ballistic PPE Standards",
      desc: "Industrial-grade Stihl ballistic chainsaw chaps, ANSI-certified climbing harnesses, steel-toed chainsaw boots, and communication-integrated helmets.",
      metric: "OSHA & DOLE PPE Compliant"
    }
  ];

  return (
    <section id="safety-ehs" className="py-24 bg-[#040d06] relative z-20 overflow-hidden border-t border-[#4caf50]/15">
      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#ffd600] bg-[#ffd600]/10 border border-[#ffd600]/20 mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-[#ffd600]" />
            <span>Environmental, Health & Safety (EHS)</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
            Institutional Safety & Risk Mitigation Matrix
          </h2>
          <p className="mt-4 text-base sm:text-lg text-forest-muted">
            High-risk tree felling and crane-assisted earthballing demand uncompromising safety discipline. We safeguard our crews, your property, and project timelines.
          </p>
        </div>

        {/* 4-Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {ehsPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#2e7d32]/25 border border-[#4caf50]/30 flex items-center justify-center text-[#76c442] mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-[#ffd600] tracking-wider uppercase block mb-1">
                    {pillar.metric}
                  </span>
                  <h3 className="text-lg font-bold font-heading text-white mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-forest-muted leading-relaxed">
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
        <p className="text-[11px] text-[#a8d5a8]/70 italic text-center mb-8">
          *Safe man-hours and zero lost-time accident records substantiated under DOLE COSH / BOSH monitoring guidelines (DO 198-18). Compliance rating verified across historical DENR, PCA, and DPWH project audits (1998–2024).
        </p>

        {/* Operational Warranty & Safety Assurance Banner */}
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
              <p className="text-xs sm:text-sm text-forest-muted max-w-2xl leading-relaxed">
                {companyData.warranty.coverage}. Backed by our twin Batangas nursery reserves and bi-weekly arborist monitoring during early acclimatization.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <a
              href="#estimate"
              className="px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-[#ffd600] text-[#050e07] hover:brightness-110 shadow-lg shadow-[#ffd600]/20 transition-all"
            >
              Request EHS Project Plan
            </a>
            <a
              href="#vault"
              className="px-6 py-3 rounded-full font-semibold text-xs text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all"
            >
              Inspect Safety Dossiers
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
