"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { companyData } from "@/data/company";
import { speciesData } from "@/data/species";

type CategoryFilter = "all" | "native" | "ornamental" | "bamboo" | "mature-balled";

export default function NurseryHub() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSpecies = useMemo(() => {
    return speciesData.filter((item) => {
      const matchesCat = activeCategory === "all" || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.commonName.toLowerCase().includes(q) ||
        item.scientificName.toLowerCase().includes(q) ||
        item.offsetCompliance.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section
      id="nurseries"
      className="py-20 md:py-28 bg-[#060d07] relative z-20 overflow-hidden border-t border-white/5 scroll-mt-20"
      aria-label="Batangas Propagation Nurseries & Ecological Species Inventory"
    >
      {/* Anchor targets */}
      <span id="catalog" className="absolute -top-24 pointer-events-none" />
      <span id="nursery" className="absolute -top-24 pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c5a059] tracking-widest uppercase mb-3">
            <span>[ 06 / NURSERY BASE &amp; SPECIES DOCKET ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading text-[#f6f7f4] tracking-tight leading-tight">
            Batangas Propagation Nurseries &amp; <br />
            <span className="font-editorial italic font-normal text-[#dfbe76]">
              Species Inventory
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#9aa89b]">
            Direct contractor supplier of hardened native forest saplings, mature balled specimens, and statutory DENR compensatory planting stocks.
          </p>
        </motion.div>

        {/* Unified 3-Facility Nursery Capacity Banner */}
        <div className="rounded-2xl bg-[#0a150c] p-6 sm:p-10 border border-white/10 shadow-2xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#dfbe76]">
                <span>Micro-Climate Controlled Acclimatization</span>
                <span className="text-white/20">•</span>
                <span>Talisay, Batangas (12+ Hectares)</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#f6f7f4] leading-snug">
                Guaranteed Sapling Survival for Infrastructure Offsets
              </h3>

              <p className="text-xs sm:text-sm text-[#9aa89b] leading-relaxed">
                Operating under rigorous root conditioning and micro-irrigation schedules across 3 specialized Batangas facilities. Every sapling designated for DENR 1:50 or 1:100 compensatory compliance is nursery-hardened for superior root establishment before site deployment.
              </p>

              {/* Three Facilities Metric Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-white/10">
                <div className="p-3 rounded-xl bg-[#060d07] border border-white/5">
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-xl sm:text-2xl font-bold font-heading text-[#f6f7f4]">100K</span>
                    <span className="text-xs font-editorial italic text-[#dfbe76]">+</span>
                  </div>
                  <strong className="text-xs font-semibold text-[#f6f7f4] block truncate">Sitio Latag</strong>
                  <span className="text-[10px] font-mono text-[#9aa89b]">Native hardwoods</span>
                </div>

                <div className="p-3 rounded-xl bg-[#060d07] border border-white/5">
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-xl sm:text-2xl font-bold font-heading text-[#f6f7f4]">80K</span>
                    <span className="text-xs font-editorial italic text-[#dfbe76]">+</span>
                  </div>
                  <strong className="text-xs font-semibold text-[#f6f7f4] block truncate">Tumaway Farm</strong>
                  <span className="text-[10px] font-mono text-[#9aa89b]">Heavy balled stocks</span>
                </div>

                <div className="p-3 rounded-xl bg-[#060d07] border border-white/5">
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-xl sm:text-2xl font-bold font-heading text-[#dfbe76]">50K</span>
                    <span className="text-xs font-editorial italic text-[#c5a059]">+</span>
                  </div>
                  <strong className="text-xs font-semibold text-[#f6f7f4] block truncate">Aya Nursery</strong>
                  <span className="text-[10px] font-mono text-[#9aa89b]">Endemic &amp; ornamentals</span>
                </div>

                <div className="p-3 rounded-xl bg-[#060d07] border border-white/5">
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-xl sm:text-2xl font-bold font-heading text-[#c5a059]">230K</span>
                    <span className="text-xs font-editorial italic text-[#dfbe76]">+</span>
                  </div>
                  <strong className="text-xs font-semibold text-[#f6f7f4] block truncate">Total Reserve</strong>
                  <span className="text-[10px] font-mono text-[#9aa89b]">DENR 1:50 / 1:100</span>
                </div>
              </div>
            </div>

            {/* Right Image Asset with Location Guide Chips for All 3 Sites */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="relative h-56 sm:h-64 rounded-xl overflow-hidden border border-white/10 shadow-xl">
                <Image
                  src="/images/nursery.jpg"
                  alt="Forest Hills Garden Plant Nursery in Talisay Batangas"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover object-center"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                <a
                  href={companyData.nurseries[0].googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[#f6f7f4] flex items-center justify-center gap-1 transition-colors"
                >
                  <MapPin className="w-3 h-3 text-[#c5a059] shrink-0" />
                  <span className="truncate">Sitio Latag</span>
                </a>
                <a
                  href={companyData.nurseries[1].googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[#f6f7f4] flex items-center justify-center gap-1 transition-colors"
                >
                  <MapPin className="w-3 h-3 text-[#c5a059] shrink-0" />
                  <span className="truncate">Tumaway Farm</span>
                </a>
                <a
                  href={companyData.nurseries[2].googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[#f6f7f4] flex items-center justify-center gap-1 transition-colors"
                >
                  <MapPin className="w-3 h-3 text-[#dfbe76] shrink-0" />
                  <span className="truncate">Aya Nursery</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Live Species Catalog Explorer Bar */}
        <div className="p-4 rounded-xl bg-[#0a150c] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {[
              { key: "all", label: "All Species" },
              { key: "native", label: "Native Hardwoods" },
              { key: "ornamental", label: "Ornamental & Flowering" },
              { key: "bamboo", label: "Bamboo Bio-Engineering" },
              { key: "mature-balled", label: "Mature Balled Heritage" },
            ].map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key as CategoryFilter)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.key
                    ? "bg-[#c5a059] text-[#060d07] shadow-md"
                    : "bg-[#060d07] text-[#9aa89b] hover:text-[#f6f7f4] border border-white/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#9aa89b] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search species name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg form-input text-xs"
            />
          </div>
        </div>

        {/* Species Cards Grid or Empty Search State */}
        {filteredSpecies.length === 0 ? (
          <div className="text-center py-16 px-6 rounded-2xl bg-[#0a150c] border border-white/10 max-w-xl mx-auto">
            <h4 className="text-base font-semibold text-[#f6f7f4] mb-1">
              No Species Matching &ldquo;{searchQuery}&rdquo;
            </h4>
            <p className="text-xs text-[#9aa89b] leading-relaxed mb-5">
              We propagate over 150,000+ native and exotic saplings across our three Batangas nursery facilities. Contact our nursery coordinators directly for custom contract propagation or rare native stocks.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="px-5 py-2 rounded-lg bg-[#c5a059] text-[#060d07] text-xs font-semibold uppercase tracking-wider hover:bg-[#dfbe76] transition-colors cursor-pointer"
            >
              Reset Filter &amp; Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSpecies.map((item) => (
              <div
                key={item.id}
                className="rounded-xl bg-[#0a150c] border border-white/10 p-5 flex flex-col justify-between group hover:border-[#c5a059]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#060d07] text-[#9aa89b] font-medium border border-white/5">
                      {item.facility.split(" ")[0]}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        item.stockStatus === "Immediate Bulk Delivery"
                          ? "bg-[#060d07] text-[#dfbe76] border border-[#c5a059]/30"
                          : "bg-[#060d07] text-[#9aa89b] border border-white/10"
                      }`}
                    >
                      {item.stockStatus}
                    </span>
                  </div>

                  <h4 className="text-base font-bold font-heading text-[#f6f7f4] mb-1 group-hover:text-[#dfbe76] transition-colors leading-snug">
                    {item.commonName}
                  </h4>
                  <p className="text-xs font-mono text-[#9aa89b] italic mb-3">
                    {item.scientificName}
                  </p>

                  <div className="space-y-1.5 text-xs text-[#9aa89b] pt-3 border-t border-white/10">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#9aa89b]/70">Specs:</span>
                      <span className="text-[#f6f7f4] text-right line-clamp-1">{item.availableSizes.split("•")[0]}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#9aa89b]/70">Compliance:</span>
                      <span className="text-[#dfbe76] text-right line-clamp-1">{item.offsetCompliance.split(" ")[0]} Ready</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#9aa89b]">{item.growthRate}</span>
                  <Link
                    href="/contact"
                    className="text-xs font-semibold text-[#dfbe76] hover:text-[#f6f7f4] flex items-center gap-1 transition-colors"
                  >
                    <span>Request Lot</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
