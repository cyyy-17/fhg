"use client";

import { useState, useMemo } from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { equipmentFleet, type EquipmentCategory } from "@/data/equipment";
import MediaPlaceholder from "@/components/MediaPlaceholder";

type EquipmentFilter = "all" | EquipmentCategory;

export default function OperationsFleetTab() {
  const [equipmentFilter, setEquipmentFilter] = useState<EquipmentFilter>("all");

  const filteredEquipment = useMemo(() => {
    if (equipmentFilter === "all") return equipmentFleet;
    return equipmentFleet.filter((e) => e.category === equipmentFilter);
  }, [equipmentFilter]);

  const categories: { key: EquipmentFilter; label: string }[] = [
    { key: "all", label: "Entire Fleet" },
    { key: "chainsaws", label: "Chainsaws (89 Units)" },
    { key: "heavy-lift", label: "Cranes & Boom Trucks" },
    { key: "excavation", label: "Hydraulic Excavators" },
    { key: "processing", label: "Wood Chippers" },
    { key: "irrigation", label: "Water Tankers" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setEquipmentFilter(cat.key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              equipmentFilter === cat.key
                ? "bg-[#2e7d32] text-white shadow-lg shadow-[#2e7d32]/25 scale-105"
                : "bg-white/5 text-[#a8d5a8] hover:bg-white/10 hover:text-white border border-white/10"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Fleet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEquipment.map((eq) => (
          <div
            key={eq.id}
            className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between group border border-[#4caf50]/20"
          >
            <div>
              <div className="mb-4 rounded-xl overflow-hidden border border-white/10">
                <MediaPlaceholder
                  variant="heavy-equipment"
                  aspect="16/9"
                  title={eq.name}
                  subtitle={eq.model}
                  badge={eq.quantity}
                  tag={eq.category.toUpperCase()}
                />
              </div>

              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#ffd600]/15 text-[#ffd600] border border-[#ffd600]/25">
                  {eq.quantity}
                </span>
                <span className="text-[10px] font-bold text-[#76c442] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {eq.status}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold font-heading text-white group-hover:text-[#ffd600] transition-colors mb-1">
                {eq.name}
              </h3>
              <span className="text-xs font-mono text-[#a8d5a8] block mb-3">
                {eq.model}
              </span>

              <p className="text-xs text-[#a8d5a8] leading-relaxed mb-4">
                {eq.primaryRole}
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#a8d5a8]/90">
                <span className="text-[11px] font-bold uppercase text-white/60">Capacity:</span>
                <span className="font-mono text-white text-right">{eq.capacity}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#ffd600] text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{eq.compliance}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
