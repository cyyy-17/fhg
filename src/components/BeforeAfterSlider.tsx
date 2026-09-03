"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { ArrowLeftRight, CheckCircle2, ShieldCheck, TreePine, Zap } from "lucide-react";

interface ComparisonScenario {
  id: string;
  title: string;
  category: string;
  location: string;
  metric: string;
  beforeLabel: string;
  afterLabel: string;
  beforeDesc: string;
  afterDesc: string;
  beforeImage?: string;
  afterImage?: string;
}

const scenarios: ComparisonScenario[] = [
  {
    id: "earthballing",
    title: "Centennial Heritage Tree Earthballing & Relocation",
    category: "Commercial Estate Preservation",
    location: "Ayala Land Nuvali & Vermosa Estates, Laguna/Cavite",
    metric: "98.7% Specimen Survival Rate",
    beforeLabel: "Pre-Excavation & Root Trenching",
    afterLabel: "Replanted in Masterplan Estate",
    beforeDesc: "Mature 60-year-old Mango & Acacia trees surveyed with root-ball caliper conditioning and wire wrapping.",
    afterDesc: "Transplanted via 50-ton hydraulic crane to permanent central park buffer with active root stimulants.",
    beforeImage: "/images/earthballing.jpg",
    afterImage: "/images/hero_canopy.jpg",
  },
  {
    id: "corridor-clearing",
    title: "High-Tension Infrastructure Right-of-Way Clearing",
    category: "Expressway & Rail Corridors",
    location: "SLEX TR4 Extension & Metro Manila Subway CP101",
    metric: "Zero Downtime • 100% Safety Compliance",
    beforeLabel: "Overgrown Corridor Alignment",
    afterLabel: "DENR Certified Cleared Grade",
    beforeDesc: "Dense virgin right-of-way jungle with steep topography and active utility line hazards.",
    afterDesc: "Sectional controlled felling completed by 89-chainsaw certified crew, timber chipped and salvaged.",
    beforeImage: "/images/hero_canopy.jpg",
    afterImage: "/images/nursery.jpg",
  },
];

export default function BeforeAfterSlider() {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const scenario = scenarios[activeScenarioIndex];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 5), 95);
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  }, [handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    handleMove(e.clientX);
  }, [handleMove]);

  const handleStopDragging = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleStopDragging);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleStopDragging);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleStopDragging);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleStopDragging);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleStopDragging]);

  return (
    <section id="proof" className="py-24 bg-[#030a04] relative z-20 overflow-hidden">
      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#ffd600] bg-[#ffd600]/10 border border-[#ffd600]/20 mb-4">
            Interactive Visual Evidence
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
            Before & After Precision Operations
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#a8d5a8]">
            Drag the interactive divider to inspect site transformation, arboricultural root preservation, and clean corridor turn-over.
          </p>
        </div>

        {/* Scenario Toggle Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {scenarios.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                setActiveScenarioIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeScenarioIndex === idx
                  ? "bg-[#ffd600] text-[#050e07] shadow-lg shadow-[#ffd600]/20 scale-105 font-black"
                  : "bg-[#102414]/80 text-[#a8d5a8] hover:text-white border border-[#4caf50]/20 hover:border-[#76c442]"
              }`}
            >
              {idx === 0 ? <TreePine className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
              <span>{s.title}</span>
            </button>
          ))}
        </div>

        {/* Comparison Showcase Container */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-[#4caf50]/30 shadow-2xl">
          {/* Top Project Sub-Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-bold text-[#76c442] uppercase tracking-wider block mb-1">
                {scenario.category} • {scenario.location}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                {scenario.title}
              </h3>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffd600]/15 border border-[#ffd600]/30 text-xs font-bold text-[#ffd600] self-start sm:self-auto">
              <ShieldCheck className="w-4 h-4" />
              <span>{scenario.metric}</span>
            </div>
          </div>

          {/* Interactive Split Slider Container */}
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            className="relative w-full h-100 sm:h-137.5 lg:h-155 rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/15 shadow-2xl bg-[#07160a]"
          >
            {/* "AFTER" (Right / Full Background Layer) */}
            <div className="absolute inset-0 w-full h-full">
              {scenario.afterImage ? (
                <Image
                  src={scenario.afterImage}
                  alt={scenario.afterLabel}
                  fill
                  className="object-cover object-center filter saturate-[1.25] brightness-95"
                  priority
                />
              ) : null}
              {/* Fallback & Dark Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-[#050e07] via-transparent to-black/30" />

              {/* AFTER Badge Label */}
              <div className="absolute top-6 right-6 z-10 flex flex-col items-end">
                <span className="px-4 py-1.5 rounded-full bg-[#76c442] text-[#050e07] text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{scenario.afterLabel}</span>
                </span>
                <span className="text-[11px] text-white/90 font-mono mt-2 bg-black/60 px-3 py-1 rounded-md backdrop-blur-xs max-w-xs text-right">
                  {scenario.afterDesc}
                </span>
              </div>
            </div>

            {/* "BEFORE" (Left / Clipped Overlay Layer) */}
            <div
              className="absolute inset-0 h-full overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="relative w-screen max-w-[1720px] h-full">
                {scenario.beforeImage ? (
                  <Image
                    src={scenario.beforeImage}
                    alt={scenario.beforeLabel}
                    fill
                    className="object-cover object-center filter sepia-[0.35] brightness-75 contrast-125"
                    priority
                  />
                ) : null}
                <div className="absolute inset-0 bg-linear-to-t from-[#050e07] via-black/20 to-black/40" />

                {/* BEFORE Badge Label */}
                <div className="absolute top-6 left-6 z-10 flex flex-col items-start">
                  <span className="px-4 py-1.5 rounded-full bg-[#ffd600] text-[#050e07] text-xs font-black uppercase tracking-wider shadow-lg">
                    {scenario.beforeLabel}
                  </span>
                  <span className="text-[11px] text-white/90 font-mono mt-2 bg-black/60 px-3 py-1 rounded-md backdrop-blur-xs max-w-xs">
                    {scenario.beforeDesc}
                  </span>
                </div>
              </div>
            </div>

            {/* Draggable Divider Handle Line */}
            <div
              className="absolute top-0 bottom-0 z-30 w-1 bg-[#ffd600] shadow-[0_0_15px_#ffd600] pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#ffd600] text-[#050e07] flex items-center justify-center shadow-2xl border-2 border-white pointer-events-auto cursor-grab hover:scale-110 transition-transform">
                <ArrowLeftRight className="w-5 h-5 font-bold" />
              </div>
            </div>

            {/* Helper Instructions at bottom of slider */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <span className="px-4 py-1.5 rounded-full bg-[#050e07]/80 text-[#a8d5a8] text-[11px] font-mono tracking-wider border border-white/10 backdrop-blur-md">
                ◄ Drag or Swipe Divider to Compare ►
              </span>
            </div>
          </div>

          {/* Quick Technical Guarantee Pills Below Slider */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="p-2 rounded-lg bg-[#ffd600]/20 text-[#ffd600]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <strong className="text-white block">Full DENR Permitting Support</strong>
                <span className="text-[#a8d5a8]">Zero stop-work citations across 26+ years</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="p-2 rounded-lg bg-[#76c442]/20 text-[#76c442]">
                <TreePine className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <strong className="text-white block">Post-Transplant Conditioning</strong>
                <span className="text-[#a8d5a8]">Root-ball bio-stimulants & 90-day monitoring</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="p-2 rounded-lg bg-[#ffd600]/20 text-[#ffd600]">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <strong className="text-white block">Rapid Corridor Mobilization</strong>
                <span className="text-[#a8d5a8]">89 chainsaw crews equipped for express felling</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
