"use client";

import { useState, useMemo } from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { equipmentFleet, type EquipmentCategory } from "@/data/equipment";
import MediaPlaceholder from "@/components/MediaPlaceholder";

type EquipmentFilter = "all" | EquipmentCategory;

import type { EquipmentItem } from "@/data/equipment";

interface OperationsFleetTabProps {
  initialEquipment?: EquipmentItem[];
}

export default function OperationsFleetTab({ initialEquipment }: OperationsFleetTabProps = {}) {
  const equipment = initialEquipment && initialEquipment.length > 0 ? initialEquipment : equipmentFleet;
  const [equipmentFilter, setEquipmentFilter] = useState<EquipmentFilter>("all");

  const filteredEquipment = useMemo(() => {
    if (equipmentFilter === "all") return equipment;
    return equipment.filter((e) => e.category === equipmentFilter);
  }, [equipment, equipmentFilter]);

  const categories: { key: EquipmentFilter; label: string }[] = [
    { key: "all", label: "Entire Fleet Docket" },
    { key: "chainsaws", label: "Chainsaws (90 Units)" },
    { key: "heavy-lift", label: "Cranes & Boom Trucks" },
    { key: "excavation", label: "Hydraulic Excavators" },
    { key: "processing", label: "Wood Chippers" },
    { key: "irrigation", label: "Water Tankers" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Category Docket Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setEquipmentFilter(cat.key)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              equipmentFilter === cat.key
                ? "bg-linear-to-r from-[#15803d] to-[#16a34a] text-[#f6f7f4] shadow-md shadow-[#16a34a]/25 border border-[#22c55e]/40 font-bold"
                : "bg-[#0a170d] text-[#9aa89b] hover:bg-[#0f2413] hover:text-[#f6f7f4] border border-white/10"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Heavy Civil Fleet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEquipment.map((eq) => (
          <div
            key={eq.id}
            className="rounded-xl bg-[#0a170d] border border-white/10 p-6 flex flex-col justify-between group hover:border-[#22c55e]/40 transition-colors"
          >
            <div>
              <div className="mb-4 rounded-lg overflow-hidden border border-white/10">
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
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#16a34a]/15 text-[#4ade80] border border-[#16a34a]/30">
                  {eq.quantity}
                </span>
                <span className="text-[10px] font-mono text-[#f6f7f4] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#22c55e]" />
                  {eq.status}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold font-heading text-[#f6f7f4] group-hover:text-[#4ade80] transition-colors mb-1">
                {eq.name}
              </h3>
              <span className="text-xs font-mono text-[#9aa89b] block mb-3">
                {eq.model}
              </span>

              <p className="text-xs text-[#9aa89b] leading-relaxed mb-4">
                {eq.primaryRole}
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#9aa89b]">
                <span className="text-[10px] font-mono uppercase text-[#9aa89b]/80">Capacity:</span>
                <span className="font-mono text-[#f6f7f4] text-right">{eq.capacity}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#4ade80] text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-[#f59e0b]" />
                <span className="truncate">{eq.compliance}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
