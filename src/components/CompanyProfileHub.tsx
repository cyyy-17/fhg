"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useLenisScrollLock } from "@/hooks/useLenisScrollLock";
import {
  Building2,
  Calendar,
  Award,
  ClipboardList,
  ShieldCheck,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ProfileOverviewTab from "./profile/ProfileOverviewTab";
import ProfileTimelineTab from "./profile/ProfileTimelineTab";
import ProfileCredentialsTab from "./profile/ProfileCredentialsTab";
import ProfileProtocolTab from "./profile/ProfileProtocolTab";
import ProfileSafetyTab from "./profile/ProfileSafetyTab";
import ProfileBioModal from "./profile/ProfileBioModal";

type TabKey = "overview" | "timeline" | "credentials" | "protocol" | "safety";

export default function CompanyProfileHub() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [bioModalOpen, setBioModalOpen] = useState(false);
  const mounted = useIsMounted();

  useLenisScrollLock(bioModalOpen);

  // Deep-link hash listener
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      let matchedTab: TabKey | null = null;
      if (hash === "#about" || hash === "#overview") {
        matchedTab = "overview";
      } else if (hash === "#timeline" || hash === "#milestones") {
        matchedTab = "timeline";
      } else if (hash === "#credentials" || hash === "#compliance" || hash === "#certifications") {
        matchedTab = "credentials";
      } else if (hash === "#protocol" || hash === "#methodology") {
        matchedTab = "protocol";
      } else if (hash === "#safety-ehs" || hash === "#safety") {
        matchedTab = "safety";
      }

      if (matchedTab) {
        setActiveTab(matchedTab);
        const el = document.getElementById("about");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Handle ESC key for modal
  useEffect(() => {
    if (!bioModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setBioModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [bioModalOpen]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const isInitialMount = useRef(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  // Smoothly center active tab horizontally within container ONLY on tab switch (never scroll window)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const container = scrollContainerRef.current;
    const activeEl = tabRefs.current[activeTab];
    if (container && activeEl) {
      const containerRect = container.getBoundingClientRect();
      const elRect = activeEl.getBoundingClientRect();
      const relativeLeft = elRect.left - containerRect.left;
      const targetScrollLeft =
        container.scrollLeft +
        relativeLeft -
        container.clientWidth / 2 +
        activeEl.clientWidth / 2;
      container.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: "smooth",
      });
    }
    const timer = setTimeout(checkScroll, 350);
    return () => clearTimeout(timer);
  }, [activeTab, checkScroll]);

  const scrollByAmount = (delta: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  const tabs: { key: TabKey; label: string; icon: typeof Building2; badge?: string }[] = [
    { key: "overview", label: "Executive Overview", icon: Building2 },
    { key: "timeline", label: "Historical Milestones", icon: Calendar, badge: "1998–2026" },
    { key: "credentials", label: "Statutory Credentials", icon: Award, badge: "89 Units" },
    { key: "protocol", label: "Turnkey Protocol", icon: ClipboardList, badge: "4 Phases" },
    { key: "safety", label: "Safety & Warranty", icon: ShieldCheck, badge: "1.24M Hrs" },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#040e06] relative z-20 overflow-hidden border-t border-[#4caf50]/15 scroll-mt-20">
      {/* Anchor targets for deep navigation */}
      <span id="timeline" className="absolute -top-24 pointer-events-none" />
      <span id="credentials" className="absolute -top-24 pointer-events-none" />
      <span id="protocol" className="absolute -top-24 pointer-events-none" />
      <span id="safety-ehs" className="absolute -top-24 pointer-events-none" />
      <span id="safety" className="absolute -top-24 pointer-events-none" />
      <span id="milestones" className="absolute -top-24 pointer-events-none" />

      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-96 bg-[#2e7d32]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ffd600]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#76c442] bg-[#4caf50]/10 border border-[#4caf50]/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#ffd600]" />
            <span>Executive Corporate Dossier • Est. 1998</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
            Rooted in Integrity, Proven Across Philippine Infrastructure
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#a8d5a8] leading-relaxed">
            Twenty-eight years of continuous single-proprietorship excellence in large-scale tree earthballing, precision chainsaw operations, and statutory environmental compliance.
          </p>
        </motion.div>

        {/* Dynamic Hub Navigation Bar (5 Hub Tabs) with Full Mobile Edge Touch Panning */}
        <div className="relative mb-10 -mx-6 px-6 sm:mx-0 sm:px-0">
          {/* Mobile Left Arrow Cue */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scrollByAmount(-180)}
              aria-label="Scroll left tabs"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#061409]/95 border border-[#4caf50]/40 text-[#ffd600] flex items-center justify-center shadow-lg sm:hidden backdrop-blur-md transition-all active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* Mobile Right Arrow Cue */}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => scrollByAmount(180)}
              aria-label="Scroll right tabs"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#061409]/95 border border-[#4caf50]/40 text-[#ffd600] flex items-center justify-center shadow-lg sm:hidden backdrop-blur-md transition-all active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {/* Native High-Performance Touch Scroll Container */}
          <div
            ref={scrollContainerRef}
            data-lenis-prevent="true"
            className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 scrollbar-none no-scrollbar touch-pan-x overscroll-x-contain scroll-smooth"
            style={{
              WebkitOverflowScrolling: "touch",
              touchAction: "pan-x pan-y",
            }}
          >
            <div className="inline-flex p-1.5 rounded-2xl bg-[#061409]/90 border border-[#4caf50]/20 backdrop-blur-xl shadow-xl gap-1 shrink-0">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    ref={(el) => {
                      tabRefs.current[tab.key] = el;
                    }}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer select-none ${
                      isActive
                        ? "bg-linear-to-r from-[#ffd600] to-[#f9c923] text-[#050e07] shadow-lg shadow-[#ffd600]/20 scale-100"
                        : "text-[#a8d5a8] hover:text-white hover:bg-white/5 active:bg-white/10"
                    }`}
                    style={{ touchAction: "manipulation" }}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-[#050e07]" : "text-[#76c442]"}`} />
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          isActive
                            ? "bg-[#050e07] text-[#ffd600]"
                            : "bg-white/10 text-[#a8d5a8]"
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab Panels */}
        {activeTab === "overview" && (
          <ProfileOverviewTab onOpenBioModal={() => setBioModalOpen(true)} />
        )}

        {activeTab === "timeline" && (
          <ProfileTimelineTab />
        )}

        {activeTab === "credentials" && (
          <ProfileCredentialsTab />
        )}

        {activeTab === "protocol" && (
          <ProfileProtocolTab />
        )}

        {activeTab === "safety" && (
          <ProfileSafetyTab />
        )}
      </div>

      {/* Leadership Bio & Memorial Tribute Modal */}
      <ProfileBioModal
        isOpen={bioModalOpen}
        onClose={() => setBioModalOpen(false)}
        mounted={mounted}
      />
    </section>
  );
}
