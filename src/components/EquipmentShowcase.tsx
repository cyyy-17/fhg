"use client";

import { useState } from "react";
import { Axe, Truck, Shovel, Trees, Droplets, CheckCircle, Shield, ArrowUpRight } from "lucide-react";
import MediaPlaceholder from "./MediaPlaceholder";

interface EquipmentItem {
  id: string;
  name: string;
  category: "chainsaws" | "heavy-lift" | "excavation" | "processing" | "irrigation";
  model: string;
  quantity: string;
  capacity: string;
  compliance: string;
  primaryRole: string;
  status: "Active Fleet" | "Pre-Mobilized";
}

const equipmentData: EquipmentItem[] = [
  {
    id: "stihl-heavy-chainsaws",
    name: "Industrial Heavy-Duty Forestry Chainsaws",
    category: "chainsaws",
    model: "Stihl MS660 / MS880 Magnum Series",
    quantity: "89 Units Registered",
    capacity: "91.6cc to 121.6cc • 28\" to 48\" Guide Bars",
    compliance: "DENR CENRO / PENRO Registered & Permitted",
    primaryRole: "Large diameter tree felling, sectional urban dismantle & emergency road clearance.",
    status: "Active Fleet",
  },
  {
    id: "rigging-aerial-gear",
    name: "Arborist Aerial Climbing & Controlled Rigging Kits",
    category: "chainsaws",
    model: "Petzl Sequoia / Buckingham Rigging Blocks",
    quantity: "14 Full Rigger Sets",
    capacity: "5,000 kg Tensile Breaking Strength",
    compliance: "OSHA & DOLE Construction Safety Standards",
    primaryRole: "High-angle tree dismantling near live high-voltage transmission lines and roofs.",
    status: "Active Fleet",
  },
  {
    id: "hydraulic-crane-50t",
    name: "Telescopic Boom Hydraulic Mobile Crane",
    category: "heavy-lift",
    model: "Tadano / Kato 50-Ton Heavy Crane",
    quantity: "Dedicated Deployment Fleet",
    capacity: "50-Ton Capacity • 42-Meter Max Boom Height",
    compliance: "Third-Party Load-Tested Certification",
    primaryRole: "Extraction and placement of multi-ton root-balled heritage trees onto transport beds.",
    status: "Pre-Mobilized",
  },
  {
    id: "boom-trucks",
    name: "Multi-Axle Boom Trucks with Hydraulic Knuckle Crane",
    category: "heavy-lift",
    model: "Isuzu Giga / Hino 10-Wheeler with Unic Crane",
    quantity: "6 Units Operational",
    capacity: "12-Ton Bed Capacity • 5-Ton Lift Winch",
    compliance: "LTO Commercial & Heavy Highway Registered",
    primaryRole: "Express hauling and self-loading of earthballed specimen saplings across provinces.",
    status: "Active Fleet",
  },
  {
    id: "excavator-root-baller",
    name: "Crawler Excavators with Root Balling Buckets",
    category: "excavation",
    model: "Komatsu PC200 / CAT 320 Hydraulic Excavators",
    quantity: "Fleet Mobilization Unit",
    capacity: "20-Ton Class • Custom Root-Trenching Bucket",
    compliance: "DOLE Safety Certified Heavy Machinery",
    primaryRole: "Deep radial root-ball trench excavation without damaging vascular root system.",
    status: "Active Fleet",
  },
  {
    id: "wood-chippers",
    name: "Heavy Industrial Brush & Wood Chippers",
    category: "processing",
    model: "Vermeer / Bandit Industrial Chipper Units",
    quantity: "4 High-Output Units",
    capacity: "Up to 15\" Log Diameter Continuous Feeding",
    compliance: "Clean Air & Environmental Noise Regulated",
    primaryRole: "Zero-waste reduction of tree canopies into organic mulch for soil stabilization.",
    status: "Active Fleet",
  },
  {
    id: "water-tankers",
    name: "Heavy Mobile Nursery Water Tankers",
    category: "irrigation",
    model: "10,000-Liter High-Pressure Water Tankers",
    quantity: "3 Highway Units",
    capacity: "10,000 Liters with Multi-Spray Mist Nozzles",
    compliance: "BFP & Municipal Inspection Approved",
    primaryRole: "Hydration of balled root masses during long-distance transit and highway greening.",
    status: "Active Fleet",
  },
  {
    id: "pca-certified-saws",
    name: "PCA-Registered Coconut Palm Chainsaws",
    category: "chainsaws",
    model: "Stihl MS382 Heavy Hardwood Cutting Units",
    quantity: "26 Permitted Units (NCR & Laguna)",
    capacity: "72.2cc • High-Torque Fibrous Palm Blade",
    compliance: "PCA Permits RNCR-00958 & R4-05595",
    primaryRole: "Licensed commercial coconut felling and lumber salvage for solar & agro estates.",
    status: "Active Fleet",
  },
];

type CategoryKey = "all" | "chainsaws" | "heavy-lift" | "excavation" | "processing" | "irrigation";

export default function EquipmentShowcase() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");

  const categories: { key: CategoryKey; label: string; icon: any }[] = [
    { key: "all", label: "Full Mechanized Fleet", icon: Shield },
    { key: "chainsaws", label: "89 Chainsaw Fleet", icon: Axe },
    { key: "heavy-lift", label: "Cranes & Boom Trucks", icon: Truck },
    { key: "excavation", label: "Excavators & Rigging", icon: Shovel },
    { key: "processing", label: "Chippers & Mulchers", icon: Trees },
    { key: "irrigation", label: "Water Tankers & Logistics", icon: Droplets },
  ];

  const filteredItems =
    activeCategory === "all"
      ? equipmentData
      : equipmentData.filter((item) => item.category === activeCategory);

  return (
    <section id="fleet" className="py-24 bg-[#050e07] relative z-20">
      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#ffd600] bg-[#ffd600]/10 border border-[#ffd600]/20 mb-4">
            Industrial Fleet & Rigging Inventory
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
            Mechanized Power to Handle Massive Scopes
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#a8d5a8]">
            Equipped with the Philippines' largest certified private chainsaw fleet, heavy hydraulic cranes, and rapid-deployment logistics.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  activeCategory === cat.key
                    ? "bg-[#ffd600] text-[#050e07] shadow-lg shadow-[#ffd600]/20 scale-105"
                    : "bg-[#102414]/80 text-[#a8d5a8] hover:text-white border border-[#4caf50]/20 hover:border-[#76c442]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Visual Technical Placeholder */}
                <div className="mb-5 rounded-xl overflow-hidden border border-white/10">
                  <MediaPlaceholder
                    variant="heavy-equipment"
                    aspect="16/9"
                    title={item.name}
                    subtitle={item.model}
                    badge={item.quantity}
                    tag={item.compliance.slice(0, 26)}
                  />
                </div>

                {/* Status & Quantity Header */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#ffd600]/20 text-[#ffd600] border border-[#ffd600]/30">
                    {item.quantity}
                  </span>
                  <span className="text-[10px] font-bold text-[#76c442] flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {item.status}
                  </span>
                </div>

                {/* Title & Model */}
                <h3 className="text-lg font-bold font-heading text-white mb-1 group-hover:text-[#ffd600] transition-colors leading-snug">
                  {item.name}
                </h3>
                <p className="text-xs font-mono text-[#a8d5a8] mb-4">
                  {item.model}
                </p>

                {/* Technical Specs List */}
                <div className="space-y-2 py-3 border-y border-white/10 text-xs">
                  <div>
                    <span className="text-[#a8d5a8]/70 block text-[10px] uppercase font-mono">Performance & Capacity:</span>
                    <span className="text-white font-medium">{item.capacity}</span>
                  </div>
                  <div>
                    <span className="text-[#a8d5a8]/70 block text-[10px] uppercase font-mono">Permit & Safety Compliance:</span>
                    <span className="text-[#76c442] font-medium">{item.compliance}</span>
                  </div>
                </div>

                {/* Primary Infrastructure Mission */}
                <p className="text-xs text-[#f0fbf0]/80 mt-3 leading-relaxed">
                  {item.primaryRole}
                </p>
              </div>

              {/* Bottom Quick RFP Trigger */}
              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] text-[#a8d5a8] font-mono">
                  Ready for Mobilization
                </span>
                <a
                  href="#estimate"
                  className="text-xs font-bold text-[#ffd600] hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Request Fleet</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
