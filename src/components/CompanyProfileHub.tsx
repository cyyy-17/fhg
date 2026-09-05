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
  Sparkles,
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

        {/* Dynamic Hub Navigation Bar (5 Hub Tabs) */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 no-scrollbar">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#061409]/90 border border-[#4caf50]/20 backdrop-blur-xl shadow-xl gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-linear-to-r from-[#ffd600] to-[#f9c923] text-[#050e07] shadow-lg shadow-[#ffd600]/20 scale-100"
                      : "text-[#a8d5a8] hover:text-white hover:bg-white/5"
                  }`}
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
