"use client";

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
  badge = "Field Survey Record",
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
      code: "SPECIMEN_CALIPER_SURVEY",
      meta: "45–80 CM CALIPER • ROOT-BALL 2.4M Ø",
      defaultTitle: "Specimen Tree Preservation Log",
      defaultSub: "Precision hydraulic earthballing & root conditioning profile",
      accent: "#76c442",
      gridColor: "rgba(118, 196, 66, 0.08)",
    },
    "heavy-equipment": {
      icon: Axe,
      code: "FLEET_DEPLOYMENT_SPEC",
      meta: "DENR PERMIT ACTIVE • 89-CHAINSAW REGISTRY",
      defaultTitle: "Heavy Mechanized Fleet Unit",
      defaultSub: "Industrial right-of-way felling & rigging machinery",
      accent: "#ffd600",
      gridColor: "rgba(255, 214, 0, 0.08)",
    },
    "site-clearing": {
      icon: Mountain,
      code: "CORRIDOR_SURVEY_GRID",
      meta: "RIGHT-OF-WAY CLEARANCE • ZERO DAMAGE",
      defaultTitle: "Civil Infrastructure Corridor",
      defaultSub: "Controlled sectional dismantling & zero-infraction felling",
      accent: "#4caf50",
      gridColor: "rgba(76, 175, 80, 0.08)",
    },
    "nursery-propagation": {
      icon: Sprout,
      code: "NURSERY_STOCK_BATCH",
      meta: "150,000+ COMBINED CAPABILITY • ACCLIMATIZED",
      defaultTitle: "Acclimatized Nursery Batch",
      defaultSub: "Tumaway & Aya Talisay propagation facilities",
      accent: "#a8d5a8",
      gridColor: "rgba(168, 213, 168, 0.08)",
    },
    "document-scan": {
      icon: FileCheck2,
      code: "COMPLIANCE_ARCHIVE_SEC",
      meta: "STATUTORY REGULATORY VERIFIED • CENRO / PENRO",
      defaultTitle: "Official Compliance Certificate",
      defaultSub: "DENR, PhilGEPS Blue, BIR, and PCA statutory filing",
      accent: "#ffd600",
      gridColor: "rgba(255, 214, 0, 0.08)",
    },
  }[variant];

  const Icon = configs.icon;
  const displayTitle = title || configs.defaultTitle;
  const displaySub = subtitle || configs.defaultSub;
  const displayTag = tag || configs.code;

  return (
    <div
      className={`relative w-full ${aspectClass} overflow-hidden rounded-2xl bg-linear-to-br from-[#07160a] via-[#0c2211] to-[#040e06] border border-[#4caf50]/25 select-none group shadow-inner ${className}`}
    >
      {/* Blueprint Grid Vector Layer */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`grid-${variant}-${aspect}`}
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 28 0 L 0 0 0 28"
              fill="none"
              stroke={configs.accent}
              strokeWidth="0.6"
              strokeOpacity="0.35"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${variant}-${aspect})`} />
      </svg>

      {/* Radial ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 transition-opacity duration-500 group-hover:opacity-35"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${configs.accent} 0%, transparent 70%)`,
        }}
      />

      {/* Technical Corner Alignment Brackets */}
      <div className="absolute top-3 left-3 text-[10px] font-mono text-white/30 tracking-tighter">
        ┌ <span className="text-[9px] text-[#a8d5a8]/50">FHG_SYS</span>
      </div>
      <div className="absolute top-3 right-3 text-[10px] font-mono text-white/30 tracking-tighter">
        ┐
      </div>
      <div className="absolute bottom-3 left-3 text-[10px] font-mono text-white/30 tracking-tighter">
        └ <span className="text-[9px] text-[#ffd600]/50">14.095°N 120.978°E</span>
      </div>
      <div className="absolute bottom-3 right-3 text-[10px] font-mono text-white/30 tracking-tighter">
        ┘
      </div>

      {/* Top Header Row with Badge */}
      <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#050e07]/80 border border-white/10 text-[10px] font-mono font-bold text-[#ffd600] tracking-wider uppercase backdrop-blur-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ffd600] animate-pulse" />
          {badge}
        </span>
        <span className="text-[9px] font-mono text-[#a8d5a8]/70 uppercase tracking-widest hidden sm:inline-block">
          {displayTag}
        </span>
      </div>

      {/* Center Specimen Wireframe / Icon Centerpiece */}
      <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100%-96px)] px-6 text-center">
        <div className="relative mb-3 flex items-center justify-center">
          {/* Circular Radar Sweep Effect */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-[#ffd600]/40 group-hover:scale-105 transition-all duration-300 backdrop-blur-xs">
            <Icon
              className="w-8 h-8 sm:w-10 sm:h-10 transition-colors duration-300"
              style={{ color: configs.accent }}
            />
          </div>
          {/* Subtle spinning radar ping */}
          <div
            className="absolute inset-0 rounded-full border border-dashed animate-spin pointer-events-none opacity-30"
            style={{ borderColor: configs.accent, animationDuration: "12s" }}
          />
        </div>

        <h4 className="text-sm sm:text-base font-bold font-heading text-white tracking-wide mb-1 leading-snug group-hover:text-[#ffd600] transition-colors">
          {displayTitle}
        </h4>
        <p className="text-xs text-[#a8d5a8]/90 max-w-xs leading-relaxed line-clamp-2">
          {displaySub}
        </p>
      </div>

      {/* Bottom Technical Spec Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-[#040e06]/90 border-t border-white/10 px-4 py-2 flex items-center justify-between text-[10px] font-mono">
        <span className="text-[#a8d5a8]/80 truncate max-w-[70%]">{configs.meta}</span>
        {showOverlayPrompt && (
          <span className="text-[#ffd600]/80 flex items-center gap-1 font-semibold shrink-0">
            <Camera className="w-3 h-3" />
            <span className="hidden sm:inline">Production Asset</span>
          </span>
        )}
      </div>
    </div>
  );
}
