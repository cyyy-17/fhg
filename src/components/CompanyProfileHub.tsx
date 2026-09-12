"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useLenisScrollLock } from "@/hooks/useLenisScrollLock";
import {
  Building2,
  Calendar,
  Award,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";
import ProfileOverviewTab from "./profile/ProfileOverviewTab";
import ProfileTimelineTab from "./profile/ProfileTimelineTab";
import ProfileCredentialsTab from "./profile/ProfileCredentialsTab";
import ProfileProtocolTab from "./profile/ProfileProtocolTab";
import ProfileSafetyTab from "./profile/ProfileSafetyTab";
import ProfileBioModal from "./profile/ProfileBioModal";

import type { CompanyData } from "@/types/admin";
import type { ProtocolStep } from "@/data/protocol";

type TabKey = "overview" | "timeline" | "credentials" | "protocol" | "safety";

interface CompanyProfileHubProps {
  initialCompany?: CompanyData;
  initialProtocol?: ProtocolStep[];
}

export default function CompanyProfileHub({ initialCompany, initialProtocol }: CompanyProfileHubProps = {}) {
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


  const tabs: { key: TabKey; label: string; icon: typeof Building2; badge?: string }[] = [
    { key: "overview", label: "Executive Overview", icon: Building2 },
    { key: "timeline", label: "Historical Milestones", icon: Calendar, badge: "1998–2026" },
    { key: "credentials", label: "Statutory Credentials", icon: Award, badge: "90 Units" },
    { key: "protocol", label: "Turnkey Protocol", icon: ClipboardList, badge: "4 Phases" },
    { key: "safety", label: "Safety & Warranty", icon: ShieldCheck, badge: "3M Hrs" },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#050d07] relative z-20 overflow-hidden border-t border-white/5 scroll-mt-20">
      {/* Anchor targets for deep navigation */}
      <span id="timeline" className="absolute -top-24 pointer-events-none" />
      <span id="credentials" className="absolute -top-24 pointer-events-none" />
      <span id="protocol" className="absolute -top-24 pointer-events-none" />
      <span id="safety-ehs" className="absolute -top-24 pointer-events-none" />
      <span id="safety" className="absolute -top-24 pointer-events-none" />
      <span id="milestones" className="absolute -top-24 pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#22c55e] tracking-widest uppercase mb-3">
            <span>[ 03 / CORPORATE DOSSIER ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading text-[#f6f7f4] tracking-tight leading-tight">
            Rooted in Integrity, Proven Across <br />
            <span className="font-editorial italic font-normal text-[#4ade80]">
              Philippine Infrastructure
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#9aa89b] leading-relaxed">
            Twenty-eight years of continuous single-proprietorship excellence in large-scale tree earthballing, precision chainsaw operations, and statutory environmental compliance.
          </p>
        </motion.div>

        {/* Central Segmented Tab Controls */}
        <div className="flex justify-center mb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div
            data-lenis-prevent="true"
            onWheel={(e) => {
              if (e.deltaY !== 0 && e.currentTarget.scrollWidth > e.currentTarget.clientWidth) {
                e.currentTarget.scrollLeft += e.deltaY;
              }
            }}
            className="inline-flex items-center sm:flex-wrap sm:justify-center gap-1 p-1.5 rounded-xl bg-[#0a170d] border border-white/10 shadow-xl max-w-full overflow-x-auto sm:overflow-visible scrollbar-none touch-pan-x overscroll-x-contain"
            style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y" }}
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 shrink-0 cursor-pointer select-none ${
                    isActive
                      ? "bg-linear-to-r from-[#15803d] to-[#16a34a] text-[#f6f7f4] shadow-[0_2px_14px_rgba(22,163,74,0.35)] scale-100"
                      : "text-[#9aa89b] hover:text-[#f6f7f4] hover:bg-white/5 active:bg-white/10"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#f6f7f4]" : "text-[#22c55e]"}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-medium ${
                        isActive
                          ? "bg-[#f59e0b] text-[#050d07] font-bold"
                          : "bg-white/5 text-[#9aa89b]"
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

        {/* Tab Panels */}
        {activeTab === "overview" && (
          <ProfileOverviewTab
            onOpenBioModal={() => setBioModalOpen(true)}
            company={initialCompany}
          />
        )}

        {activeTab === "timeline" && (
          <ProfileTimelineTab />
        )}

        {activeTab === "credentials" && (
          <ProfileCredentialsTab company={initialCompany} />
        )}

        {activeTab === "protocol" && (
          <ProfileProtocolTab initialProtocol={initialProtocol} />
        )}

        {activeTab === "safety" && (
          <ProfileSafetyTab company={initialCompany} />
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
