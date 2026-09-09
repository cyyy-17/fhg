"use client";

import { motion } from "framer-motion";
import { TreePine, Recycle, Sprout, Award, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function ValuePillars() {
  const pillars = [
    {
      num: "01",
      icon: TreePine,
      title: "Industrial Earthballing & Specimen Relocation",
      desc: "Hydraulic root-ball excavation, certified rigging, and long-distance transport preserving mature, heritage, and endangered trees with a verified 98.7% survival rate.",
      tag: "Arboricultural Preservation",
      action: "/services#earthballing",
    },
    {
      num: "02",
      icon: Recycle,
      title: "Controlled Sectional Felling & Timber Salvage",
      desc: "Controlled dismantling using our 89 DENR-permitted chainsaw fleet. High-value timber salvage, on-site chipping, and zero environmental infractions.",
      tag: "DENR & PCA Certified",
      action: "/services#tree-cutting",
    },
    {
      num: "03",
      icon: Sprout,
      title: "150,000+ Native Saplings & Nursery Reserves",
      desc: "Twin Batangas facilities in Brgy. Tumaway and Brgy. Aya supplying indigenous forest saplings, ornamentals, and statutory compensatory planting stocks.",
      tag: "Twin Batangas Nurseries",
      action: "/nurseries",
    },
    {
      num: "04",
      icon: Award,
      title: "28-Year Conglomerate Track Record",
      desc: "Pre-qualified subcontractor for San Miguel, Ayala Land, SM Prime, EEI, and DMCI across premier civil infrastructure corridors and commercial masterplans.",
      tag: "Founded June 10, 1998",
      action: "/projects",
    },
  ];

  return (
    <section id="why-choose" className="py-24 bg-[#060d07] relative z-20 border-t border-white/5">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header: Monograph Format */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c5a059] tracking-widest uppercase mb-3">
              <span>[ 01 / CORE PILLARS ]</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-heading text-[#f6f7f4] tracking-tight leading-tight max-w-2xl">
              Engineered for Scale, <br />
              <span className="font-editorial italic font-normal text-[#dfbe76]">
                Rooted in Discipline.
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#9aa89b] max-w-md leading-relaxed">
            Every operation is executed with industrial precision, certified arborists, and compliance dockets verified with regional environmental bureaus.
          </p>
        </div>

        {/* 4-Column Monograph Ledger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="rounded-xl bg-[#0a150c] border border-white/10 p-7 flex flex-col justify-between group hover:border-[#c5a059]/40 transition-all duration-300"
              >
                <div>
                  {/* Ledger Index & Icon Row */}
                  <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                    <span className="font-editorial italic font-normal text-3xl text-[#dfbe76]">
                      {pillar.num}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-[#060d07] border border-white/10 flex items-center justify-center text-[#c5a059] group-hover:border-[#c5a059]/50 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold font-heading text-[#f6f7f4] mb-3 leading-snug group-hover:text-[#dfbe76] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9aa89b] leading-relaxed mb-6">
                    {pillar.desc}
                  </p>
                </div>

                {/* Footer Tag & Action */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#9aa89b]">
                    {pillar.tag}
                  </span>
                  <Link
                    href={pillar.action}
                    className="text-[#dfbe76] hover:text-[#f6f7f4] transition-colors p-1"
                    aria-label={`Learn more about ${pillar.title}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
