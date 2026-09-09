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
      meta: "230,000+ COMBINED CAPACITY • ACCLIMATIZED",
      defaultTitle: "Acclimatized Nursery Reserves",
      defaultSub: "Sitio Latag, Tumaway & Aya propagation facilities",
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

      {/* Content Layout Container (Pure in-flow Flexbox to prevent any collision) */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Top Header Row with Archival Badge */}
        <div className="p-3 sm:p-4 flex items-center justify-between shrink-0">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-[#060d07]/90 border border-white/10 text-[10px] font-mono font-semibold text-[#f6f7f4] tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
            {badge}
          </span>
          <span className="text-[10px] font-mono text-[#9aa89b] tracking-wider uppercase hidden sm:inline-block">
            {displayTag}
          </span>
        </div>

        {/* Center Specimen Dossier Frame */}
        <div className="flex-1 min-h-0 flex flex-col items-center justify-center px-4 py-1 text-center">
          <div className="relative mb-2 flex items-center justify-center shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg border border-white/10 bg-[#060d07]/80 flex items-center justify-center group-hover:border-[#c5a059]/50 transition-colors duration-300">
              <Icon
                className="w-5 h-5 sm:w-6 sm:h-6 text-[#dfbe76] transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          <h4 className="text-xs sm:text-sm font-semibold font-heading text-[#f6f7f4] tracking-tight leading-snug group-hover:text-[#dfbe76] transition-colors truncate max-w-full px-2">
            {displayTitle}
          </h4>
          <p className="text-[10px] sm:text-xs text-[#9aa89b] max-w-xs leading-relaxed truncate hidden sm:block mt-0.5">
            {displaySub}
          </p>
        </div>

        {/* Bottom Technical Spec Ledger */}
        <div className="shrink-0 bg-[#060d07]/95 border-t border-white/10 px-3 py-1.5 sm:px-4 sm:py-2 flex items-center justify-between text-[10px] font-mono">
          <span className="text-[#9aa89b] truncate max-w-[70%]">{configs.meta}</span>
          {showOverlayPrompt && (
            <span className="text-[#c5a059] flex items-center gap-1 font-medium shrink-0">
              <Camera className="w-3 h-3" />
              <span className="hidden sm:inline">Archival Mount</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
