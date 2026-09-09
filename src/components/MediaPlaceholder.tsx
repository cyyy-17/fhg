"use client";

import { useId } from "react";
import { Trees, Axe, Mountain, Sprout, FileCheck2, Camera } from "lucide-react";

export type PlaceholderVariant =
  | "tree-specimen"
  | "heavy-equipment"
  | "site-clearing"
  | "nursery-propagation"
  | "document-scan";

interface MediaPlaceholderProps {
  variant?: PlaceholderVariant;
  aspect?: "16/9" | "4/3" | "1/1" | "21/9";
  title?: string;
  subtitle?: string;
  tag?: string;
  badge?: string;
  className?: string;
  showOverlayPrompt?: boolean;
}

export default function MediaPlaceholder({
  variant = "tree-specimen",
  aspect = "16/9",
  title,
  subtitle,
  tag,
  badge = "ARCHIVAL FIELD RECORD",
  className = "",
  showOverlayPrompt = true,
}: MediaPlaceholderProps) {
  const aspectClass = {
    "16/9": "aspect-16/9",
    "4/3": "aspect-4/3",
    "1/1": "aspect-square",
    "21/9": "aspect-21/9",
  }[aspect];

  // Variant config
  const configs = {
    "tree-specimen": {
      icon: Trees,
      code: "PLATE 01 — SPECIMEN CENSUS",
      meta: "45–80 CM CALIPER • ROOT-BALL 2.4M Ø",
      defaultTitle: "Specimen Tree Preservation Dossier",
      defaultSub: "Precision hydraulic earthballing & root conditioning profile",
      accent: "#dfbe76",
    },
    "heavy-equipment": {
      icon: Axe,
      code: "PLATE 02 — FLEET DOCKET",
      meta: "DENR REGISTERED • 90-CHAINSAW REGISTRY",
      defaultTitle: "Heavy Mechanized Fleet Unit",
      defaultSub: "Industrial right-of-way felling & hydraulic crane rigging machinery",
      accent: "#c5a059",
    },
    "site-clearing": {
      icon: Mountain,
      code: "PLATE 03 — INFRASTRUCTURE CORRIDOR",
      meta: "RIGHT-OF-WAY CLEARANCE • ZERO DAMAGE",
      defaultTitle: "Civil Infrastructure Corridor",
      defaultSub: "Controlled sectional dismantling & zero-infraction felling",
      accent: "#9aa89b",
    },
    "nursery-propagation": {
      icon: Sprout,
      code: "PLATE 04 — NURSERY RESERVE",
      meta: "150,000+ COMBINED CAPABILITY • ACCLIMATIZED",
      defaultTitle: "Acclimatized Nursery Reserves",
      defaultSub: "Tumaway & Aya Talisay propagation facilities",
      accent: "#dfbe76",
    },
    "document-scan": {
      icon: FileCheck2,
      code: "PLATE 05 — STATUTORY FILING",
      meta: "STATUTORY COMPLIANCE • CENRO / PENRO",
      defaultTitle: "Official Compliance Certificate",
      defaultSub: "DENR, PhilGEPS Blue, BIR, and PCA statutory filing",
      accent: "#c5a059",
    },
  }[variant];

  const uniqueId = useId();
  const patternId = `plate-grid-${variant}-${uniqueId.replace(/:/g, "")}`;
  const Icon = configs.icon;
  const displayTitle = title || configs.defaultTitle;
  const displaySub = subtitle || configs.defaultSub;
  const displayTag = tag || configs.code;

  return (
    <div
      className={`relative w-full ${aspectClass} overflow-hidden rounded-xl bg-[#0a150c] border border-white/10 select-none group transition-all duration-300 hover:border-[#c5a059]/40 ${className}`}
    >
      {/* Architectural Matte Grid Vector Layer */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={patternId}
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      {/* Atmospheric Vignette */}
      <div className="absolute inset-0 bg-linear-to-t from-[#060d07] via-transparent to-[#060d07]/60 pointer-events-none" />

      {/* Top Header Row with Archival Badge */}
      <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#060d07]/90 border border-white/10 text-[10px] font-mono font-semibold text-[#f6f7f4] tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
          {badge}
        </span>
        <span className="text-[10px] font-mono text-[#9aa89b] tracking-wider uppercase hidden sm:inline-block">
          {displayTag}
        </span>
      </div>

      {/* Center Specimen Dossier Frame */}
      <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100%-84px)] px-6 text-center">
        <div className="relative mb-3.5 flex items-center justify-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg border border-white/10 bg-[#060d07]/80 flex items-center justify-center group-hover:border-[#c5a059]/50 transition-colors duration-300">
            <Icon
              className="w-7 h-7 sm:w-8 sm:h-8 text-[#dfbe76] transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>

        <h4 className="text-sm sm:text-base font-semibold font-heading text-[#f6f7f4] tracking-tight mb-1 leading-snug group-hover:text-[#dfbe76] transition-colors">
          {displayTitle}
        </h4>
        <p className="text-xs text-[#9aa89b] max-w-sm leading-relaxed line-clamp-2">
          {displaySub}
        </p>
      </div>

      {/* Bottom Technical Spec Ledger */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-[#060d07]/95 border-t border-white/10 px-4 py-2 flex items-center justify-between text-[10px] font-mono">
        <span className="text-[#9aa89b] truncate max-w-[70%]">{configs.meta}</span>
        {showOverlayPrompt && (
          <span className="text-[#c5a059] flex items-center gap-1 font-medium shrink-0">
            <Camera className="w-3 h-3" />
            <span className="hidden sm:inline">Archival Mount</span>
          </span>
        )}
      </div>
    </div>
  );
}
