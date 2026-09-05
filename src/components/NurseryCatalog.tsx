"use client";

import { useState, useMemo } from "react";
import { Sprout, Search, ShieldCheck, ArrowRight } from "lucide-react";
import MediaPlaceholder from "./MediaPlaceholder";

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

export default function NurseryCatalog() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSpecies = useMemo(() => {
    return speciesData.filter((item) => {
      const matchesCat = activeCategory === "all" || item.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.commonName.toLowerCase().includes(query) ||
        item.scientificName.toLowerCase().includes(query) ||
        item.offsetCompliance.toLowerCase().includes(query);
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="catalog" className="py-24 bg-[#030a04] relative z-20">
      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#76c442] bg-[#4caf50]/10 border border-[#4caf50]/20 mb-4">
            Compensatory Planting & Native Inventory
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
            Nursery Species Catalog & Ready Stock
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#a8d5a8]">
            Pre-hardened indigenous forest saplings and balled mature trees meeting DENR seedling replacement guidelines (1:50 & 1:100 ratios).
          </p>
        </div>

        {/* Search & Categories Bar */}
        <div className="flex flex-col items-center gap-6 mb-12">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a8d5a8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by species (e.g. Narra, Banaba, Bamboo, Molave)..."
              className="w-full pl-13 pr-6 py-3.5 rounded-full form-input text-sm shadow-lg"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2.5">
            {[
              { key: "all", label: "All Species" },
              { key: "native", label: "Native Hardwoods" },
              { key: "ornamental", label: "Avenue & Flowering" },
              { key: "bamboo", label: "Slope Bamboo" },
              { key: "mature-balled", label: "Balled Specimen Trees" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveCategory(tab.key as CategoryFilter)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeCategory === tab.key
                    ? "bg-[#ffd600] text-[#050e07] shadow-lg shadow-[#ffd600]/20 scale-105 font-black"
                    : "bg-[#102414]/80 text-[#a8d5a8] hover:text-white border border-[#4caf50]/20 hover:border-[#76c442]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Species Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
          {filteredSpecies.map((species) => (
            <div
              key={species.id}
              className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Visual Technical Asset */}
                <div className="mb-4 rounded-xl overflow-hidden border border-white/10">
                  <MediaPlaceholder
                    variant="nursery-propagation"
                    aspect="16/9"
                    title={species.commonName}
                    subtitle={species.scientificName}
                    badge={species.facility}
                    tag={species.stockStatus.toUpperCase()}
                  />
                </div>

                {/* Status & Facility */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#76c442]/20 text-[#76c442] border border-[#76c442]/30 flex items-center gap-1">
                    <Sprout className="w-3 h-3" />
                    {species.facility}
                  </span>
                  <span className="text-[10px] font-mono text-[#ffd600] font-bold">
                    {species.stockStatus}
                  </span>
                </div>

                {/* Common Name & Scientific Name */}
                <h3 className="text-lg font-bold font-heading text-white mb-1 group-hover:text-[#ffd600] transition-colors leading-snug">
                  {species.commonName}
                </h3>
                <p className="text-xs italic font-serif text-[#a8d5a8] mb-4">
                  {species.scientificName}
                </p>

                {/* Specs List */}
                <div className="space-y-2 py-3 border-y border-white/10 text-xs">
                  <div>
                    <span className="text-[#a8d5a8]/70 block text-[10px] uppercase font-mono">Available Stock Sizes:</span>
                    <span className="text-white font-medium">{species.availableSizes}</span>
                  </div>
                  <div>
                    <span className="text-[#a8d5a8]/70 block text-[10px] uppercase font-mono">Statutory Offset Role:</span>
                    <span className="text-[#76c442] font-medium">{species.offsetCompliance}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Trigger to RFP Requisition */}
              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] text-[#a8d5a8] font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#ffd600]" />
                  <span>DENR Verified</span>
                </span>
                <a
                  href="#estimate"
                  className="text-xs font-bold text-[#ffd600] hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Requisition Batch</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
