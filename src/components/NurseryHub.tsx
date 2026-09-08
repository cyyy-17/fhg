"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sprout,
  Search,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { companyData } from "@/data/company";

interface SpeciesItem {
  id: string;
  commonName: string;
  scientificName: string;
  category: "native" | "ornamental" | "bamboo" | "mature-balled";
  facility: "Tumaway (100K+)" | "Aya (50K+)";
  availableSizes: string;
  growthRate: string;
  offsetCompliance: string;
  stockStatus: "Immediate Bulk Delivery" | "Acclimatized Balled" | "Batch In Production";
}

const speciesData: SpeciesItem[] = [
  {
    id: "narra",
    commonName: "Narra (Philippine National Tree)",
    scientificName: "Pterocarpus indicus",
    category: "native",
    facility: "Tumaway (100K+)",
    availableSizes: "1.5m to 3.5m Saplings • 15–30cm Caliper",
    growthRate: "Medium to Fast Hardwood",
    offsetCompliance: "DENR Priority Reforestation Hardwood",
    stockStatus: "Immediate Bulk Delivery",
  },
  {
    id: "banaba",
    commonName: "Banaba (Pride of India / Lavender Bloom)",
    scientificName: "Lagerstroemia speciosa",
    category: "ornamental",
    facility: "Aya (50K+)",
    availableSizes: "1.0m to 2.5m Seedling Bags • 10–20cm Balled",
    growthRate: "Moderate Flowering Tree",
    offsetCompliance: "Urban Green Corridor & DPWH Roadside",
    stockStatus: "Immediate Bulk Delivery",
  },
  {
    id: "molave",
    commonName: "Molave (Philippine Teak)",
    scientificName: "Vitex parviflora",
    category: "native",
    facility: "Tumaway (100K+)",
    availableSizes: "1.2m to 2.0m Polybagged Saplings",
    growthRate: "Slow-Growing Dense Hardwood",
    offsetCompliance: "High-Value DENR Conservation Species",
    stockStatus: "Immediate Bulk Delivery",
  },
  {
    id: "balitbitan",
    commonName: "Balitbitan (Pink Silk Tassel Tree)",
    scientificName: "Cynometra ramiflora",
    category: "native",
    facility: "Tumaway (100K+)",
    availableSizes: "1.5m to 3.0m Containerized Specimens",
    growthRate: "Moderate Coastal & Riparian",
    offsetCompliance: "Riverbank & Water Basin Stabilization",
    stockStatus: "Immediate Bulk Delivery",
  },
  {
    id: "giant-bamboo",
    commonName: "Giant Bamboo / Kawayan Tinik",
    scientificName: "Bambusa blumeana / Gigantochloa",
    category: "bamboo",
    facility: "Tumaway (100K+)",
    availableSizes: "Rooted Culms • 2.0m to 4.0m Clump Clones",
    growthRate: "Rapid Soil Bio-Engineering",
    offsetCompliance: "NIA & DPWH Slope Anti-Erosion Mandate",
    stockStatus: "Immediate Bulk Delivery",
  },
  {
    id: "mature-mango",
    commonName: "Heritage Carabao Mango (Balled Specimen)",
    scientificName: "Mangifera indica",
    category: "mature-balled",
    facility: "Aya (50K+)",
    availableSizes: "30cm to 65cm Caliper Root-Ball (2.5m Ø)",
    growthRate: "Full Mature Canopy Heritage",
    offsetCompliance: "Estate Masterplan Replanting Standard",
    stockStatus: "Acclimatized Balled",
  },
  {
    id: "kupang",
    commonName: "Kupang (Philippine Locust Tree)",
    scientificName: "Parkia timoriana",
    category: "native",
    facility: "Tumaway (100K+)",
    availableSizes: "1.5m to 2.8m Seedling Stocks",
    growthRate: "Fast Canopy Umbrella Hardwood",
    offsetCompliance: "DENR Watershed Greening Program",
    stockStatus: "Immediate Bulk Delivery",
  },
  {
    id: "tindalo",
    commonName: "Tindalo (Precious Red Hardwood)",
    scientificName: "Afzelia rhomboidea",
    category: "native",
    facility: "Tumaway (100K+)",
    availableSizes: "1.0m to 2.2m Hardened Seedlings",
    growthRate: "Slow Dense Heritage Hardwood",
    offsetCompliance: "National Greening Program Compensatory",
    stockStatus: "Batch In Production",
  },
];

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
      className="py-20 md:py-28 bg-[#030903] relative z-20 overflow-hidden border-t border-[#4caf50]/15 scroll-mt-20"
      aria-label="Batangas Propagation Nurseries & Ecological Species Inventory"
    >
      {/* Anchor targets */}
      <span id="catalog" className="absolute -top-24 pointer-events-none" />
      <span id="nursery" className="absolute -top-24 pointer-events-none" />

      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#76c442] bg-[#4caf50]/10 border border-[#4caf50]/20 mb-3">
            <Sprout className="w-3.5 h-3.5 text-[#76c442]" />
            <span>Batangas Production Base • 150,000+ Reserve Capacity</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
            Twin Propagation Nurseries & Species Inventory
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#a8d5a8]">
            Direct supplier of hardened native forest saplings, mature balled trees, and DENR compensatory planting stocks.
          </p>
        </motion.div>

        {/* Unified Twin Nursery Capacity Banner */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-[#4caf50]/25 shadow-2xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ffd600]">
                <span>Micro-Climate Controlled Acclimatization</span>
                <span>•</span>
                <span>Talisay, Batangas</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-display text-white leading-snug">
                Guaranteed Sapling Survival for Infrastructure Offsets
              </h3>

              <p className="text-xs sm:text-sm text-[#a8d5a8] leading-relaxed">
                Operating under rigorous root conditioning and micro-irrigation schedules. Every sapling designated for DENR 1:50 or 1:100 compensatory compliance is nursery-hardened for superior root establishment before site deployment.
              </p>

              {/* Dual Facility Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-2xl font-black font-display text-white">100K</span>
                    <span className="text-sm font-bold text-[#ffd600]">+</span>
                  </div>
                  <strong className="text-xs font-bold text-white block">Tumaway Facility</strong>
                  <span className="text-[10px] text-[#a8d5a8]">Native forest hardwoods</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-2xl font-black font-display text-[#ffd600]">50K</span>
                    <span className="text-sm font-bold text-[#76c442]">+</span>
                  </div>
                  <strong className="text-xs font-bold text-white block">Aya Facility</strong>
                  <span className="text-[10px] text-[#a8d5a8]">Ornamental & balled stocks</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-2xl font-black font-display text-[#76c442]">1:50</span>
                    <span className="text-xs font-bold text-white">/ 1:100</span>
                  </div>
                  <strong className="text-xs font-bold text-white block">DENR Ratio</strong>
                  <span className="text-[10px] text-[#a8d5a8]">Compensatory compliance</span>
                </div>
              </div>
            </div>

            {/* Right Image Asset with Location Guide Chips */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden border border-white/15 shadow-xl">
                <Image
                  src="/images/nursery.jpg"
                  alt="Forest Hills Garden Plant Nursery in Talisay Batangas"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover object-center"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                <a
                  href={companyData.nurseries[0].googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center gap-1.5 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#ffd600]" />
                  <span>Tumaway Farm Directions</span>
                </a>
                <a
                  href={companyData.nurseries[1].googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center gap-1.5 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#76c442]" />
                  <span>Aya Farm Directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Live Species Catalog Explorer Bar */}
        <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
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
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat.key
                    ? "bg-[#ffd600] text-[#050e07] shadow-md shadow-[#ffd600]/20"
                    : "bg-white/5 text-[#a8d5a8] hover:text-white hover:bg-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#a8d5a8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search species name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl form-input text-xs"
            />
          </div>
        </div>

        {/* Species Cards Grid or Empty Search State */}
        {filteredSpecies.length === 0 ? (
          <div className="text-center py-16 px-6 glass-panel rounded-3xl border border-white/10 max-w-xl mx-auto">
            <Sprout className="w-10 h-10 text-[#ffd600] mx-auto mb-3 opacity-60" />
            <h4 className="text-base font-bold text-white mb-1">
              No Species Matching &ldquo;{searchQuery}&rdquo;
            </h4>
            <p className="text-xs text-[#a8d5a8] leading-relaxed mb-5">
              We propagate over 150,000+ native and exotic saplings across our twin Batangas farms. Contact our nursery coordinators directly for custom contract propagation or rare native stocks.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="px-5 py-2 rounded-full bg-[#ffd600] text-[#050e07] text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer"
            >
              Reset Filter &amp; Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSpecies.map((item) => (
              <div
                key={item.id}
                className="glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col justify-between border border-white/10 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white font-bold">
                      {item.facility.split(" ")[0]}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.stockStatus === "Immediate Bulk Delivery"
                          ? "bg-[#2e7d32]/30 text-[#76c442] border border-[#76c442]/30"
                          : "bg-[#ffd600]/15 text-[#ffd600] border border-[#ffd600]/30"
                      }`}
                    >
                      {item.stockStatus}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-1 group-hover:text-[#ffd600] transition-colors leading-snug">
                    {item.commonName}
                  </h4>
                  <p className="text-xs font-mono text-[#a8d5a8] italic mb-3">
                    {item.scientificName}
                  </p>

                  <div className="space-y-1.5 text-xs text-white/80 pt-3 border-t border-white/10">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#a8d5a8]">Specs:</span>
                      <span className="text-white text-right line-clamp-1">{item.availableSizes.split("•")[0]}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#a8d5a8]">Compliance:</span>
                      <span className="text-[#76c442] text-right line-clamp-1">{item.offsetCompliance.split(" ")[0]} Ready</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#ffd600]">{item.growthRate}</span>
                  <Link
                    href="#estimate"
                    className="text-xs font-bold text-white hover:text-[#ffd600] flex items-center gap-1 transition-colors"
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
