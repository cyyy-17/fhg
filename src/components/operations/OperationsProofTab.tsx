"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowLeftRight, MapPin, Sparkles } from "lucide-react";
import { comparisonScenarios } from "@/data/comparisons";
import MediaPlaceholder from "@/components/MediaPlaceholder";

export default function OperationsProofTab() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  const currentScenario = comparisonScenarios[scenarioIndex];

  useEffect(() => {
    const updateWidth = () => {
      if (sliderContainerRef.current) {
        setContainerWidth(sliderContainerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleSliderMove = useCallback((clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      handleSliderMove(e.touches[0].clientX);
    },
    [isDragging, handleSliderMove]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      handleSliderMove(e.clientX);
    },
    [isDragging, handleSliderMove]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSliderPos((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setSliderPos((prev) => Math.min(100, prev + 5));
    } else if (e.key === "Home") {
      e.preventDefault();
      setSliderPos(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setSliderPos(100);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Scenario Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {comparisonScenarios.map((sc, idx) => (
          <button
            key={sc.id}
            onClick={() => {
              setScenarioIndex(idx);
              setSliderPos(50);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              scenarioIndex === idx
                ? "bg-[#ffd600] text-[#050e07] shadow-lg shadow-[#ffd600]/20 scale-105"
                : "bg-[#102414] text-[#a8d5a8] hover:text-white hover:bg-[#1a3820] border border-white/10"
            }`}
          >
            <span>{sc.title}</span>
          </button>
        ))}
      </div>

      {/* Main Interactive Before / After Split Slider Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-[#4caf50]/30 shadow-2xl max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono font-bold text-[#ffd600] uppercase tracking-wider">
                {currentScenario.category}
              </span>
              <span className="text-white/30">•</span>
              <div className="flex items-center gap-1 text-xs text-[#a8d5a8]">
                <MapPin className="w-3.5 h-3.5 text-[#ffd600]" />
                <span>{currentScenario.location}</span>
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
              {currentScenario.title}
            </h3>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#76c442]/15 border border-[#76c442]/30 text-xs font-bold text-[#76c442] shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{currentScenario.metric}</span>
          </div>
        </div>

        {/* Interactive Split Viewport */}
        <div
          ref={sliderContainerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          onTouchMove={handleTouchMove}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="slider"
          aria-label={`Before and after split slider for ${currentScenario.title}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(sliderPos)}
          className="relative h-72 sm:h-96 md:h-125 w-full rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/15 focus:outline-none focus:ring-2 focus:ring-[#ffd600]"
        >
          {/* After Layer (Background) */}
          <div className="absolute inset-0 w-full h-full">
            {currentScenario.afterImage ? (
              <Image
                src={currentScenario.afterImage}
                alt={currentScenario.afterLabel}
                fill
                sizes="(max-width: 1200px) 100vw, 1000px"
                className="object-cover object-center"
              />
            ) : (
              <MediaPlaceholder
                variant="site-clearing"
                aspect="16/9"
                title={currentScenario.afterLabel}
                subtitle={currentScenario.afterDesc}
                badge="Transplanted & Completed"
              />
            )}
            <div className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-lg bg-black/70 backdrop-blur-xs border border-white/15 text-[11px] font-bold text-[#76c442] uppercase tracking-wider">
              {currentScenario.afterLabel} (Completed)
            </div>
          </div>

          {/* Before Layer (Foreground clipped by sliderPos) */}
          <div
            className="absolute inset-0 h-full overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <div
              className="relative h-full"
              style={{ width: containerWidth ? `${containerWidth}px` : "100%" }}
            >
              {currentScenario.beforeImage ? (
                <Image
                  src={currentScenario.beforeImage}
                  alt={currentScenario.beforeLabel}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1000px"
                  className="object-cover object-center"
                />
              ) : (
                <MediaPlaceholder
                  variant="heavy-equipment"
                  aspect="16/9"
                  title={currentScenario.beforeLabel}
                  subtitle={currentScenario.beforeDesc}
                  badge="Pre-Excavation Baseline"
                />
              )}
              <div className="absolute bottom-4 left-4 z-10 px-3 py-1 rounded-lg bg-black/70 backdrop-blur-xs border border-white/15 text-[11px] font-bold text-[#ffd600] uppercase tracking-wider">
                {currentScenario.beforeLabel} (Baseline)
              </div>
            </div>
          </div>

          {/* Split Divider Bar */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-linear-to-b from-[#ffd600] via-white to-[#76c442] shadow-[0_0_12px_rgba(255,214,0,0.8)] z-20 pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#ffd600] text-[#050e07] flex items-center justify-center shadow-2xl border-2 border-[#050e07]">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Keyboard accessibility hint */}
        <p className="text-[11px] text-[#a8d5a8]/60 text-center mt-3 sm:hidden">
          *Drag the handle or swipe left/right to compare baseline vs. completed outcome.
        </p>
        <p className="text-[11px] text-[#a8d5a8]/60 text-center mt-3 hidden sm:block">
          *Drag the handle or use Left/Right arrow keys to inspect the before-and-after transformation.
        </p>

        {/* Descriptive Annotation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10 text-xs leading-relaxed">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="font-bold text-[#ffd600] uppercase tracking-wider block mb-1">
              Phase 1: {currentScenario.beforeLabel}
            </span>
            <p className="text-[#a8d5a8]">{currentScenario.beforeDesc}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="font-bold text-[#76c442] uppercase tracking-wider block mb-1">
              Phase 2: {currentScenario.afterLabel}
            </span>
            <p className="text-[#a8d5a8]">{currentScenario.afterDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
