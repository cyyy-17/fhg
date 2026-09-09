"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FolderKanban,
  ArrowLeftRight,
  Truck,
  Building2,
  Sparkles,
} from "lucide-react";
import { projectsData } from "@/data/projects";
import { clientsData } from "@/data/clients";
import OperationsProjectsTab from "./operations/OperationsProjectsTab";
import OperationsProofTab from "./operations/OperationsProofTab";
import OperationsFleetTab from "./operations/OperationsFleetTab";
import OperationsClientsTab from "./operations/OperationsClientsTab";

type HubTab = "projects" | "proof" | "fleet" | "clients";

export default function OperationsProofHub() {
  const [activeTab, setActiveTab] = useState<HubTab>("projects");

  // Deep-link hash listener
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      let matchedTab: HubTab | null = null;
      if (hash === "#projects") matchedTab = "projects";
      else if (hash === "#proof") matchedTab = "proof";
      else if (hash === "#fleet") matchedTab = "fleet";
      else if (hash === "#clients") matchedTab = "clients";

      if (matchedTab) {
        setActiveTab(matchedTab);
        const el = document.getElementById("operations-hub");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const hubTabs: { key: HubTab; label: string; icon: typeof FolderKanban; badge?: string }[] = [
    { key: "projects", label: "Signature Projects", icon: FolderKanban, badge: `${projectsData.length} Works` },
    { key: "proof", label: "Before / After Proof", icon: ArrowLeftRight, badge: "Verified" },
    { key: "fleet", label: "Industrial Fleet", icon: Truck, badge: "89 Saws • 50T" },
    { key: "clients", label: "Enterprise Clients", icon: Building2, badge: `${clientsData.length} Partners` },
  ];

  return (
    <section
      id="operations-hub"
      className="py-20 md:py-28 bg-[#040e06] relative z-20 overflow-hidden border-t border-[#4caf50]/15 scroll-mt-20"
      aria-label="Operations Track Record and Field Execution Hub"
    >
      {/* Anchor targets for direct hash routing */}
      <span id="projects" className="absolute -top-24 pointer-events-none" />
      <span id="proof" className="absolute -top-24 pointer-events-none" />
      <span id="fleet" className="absolute -top-24 pointer-events-none" />
      <span id="clients" className="absolute -top-24 pointer-events-none" />

      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#2e7d32]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#ffd600]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#ffd600] bg-[#ffd600]/10 border border-[#ffd600]/20 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#ffd600]" />
            <span>Operational Authority &amp; Field Execution Proof</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
            Projects, Proof &amp; Mechanized Fleet Hub
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#a8d5a8]">
            Explore verified project portfolios, interactive before/after site transformations, 89-chainsaw registered fleet specifications, and conglomerate client trust.
          </p>
        </motion.div>

        {/* Central Segmented Tab Controls */}
        <div className="flex justify-center mb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div
            data-lenis-prevent="true"
            className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#091b0c]/90 border border-white/10 backdrop-blur-xl shadow-2xl max-w-full overflow-x-auto scrollbar-none touch-pan-x overscroll-x-contain"
            style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y" }}
          >
            {hubTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-linear-to-r from-[#ffd600] to-[#f9c923] text-[#050e07] shadow-lg shadow-[#ffd600]/25 scale-[1.02]"
                      : "text-[#a8d5a8] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#050e07]" : "text-[#76c442]"}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                        isActive
                          ? "bg-[#050e07]/20 text-[#050e07]"
                          : "bg-[#ffd600]/15 text-[#ffd600] border border-[#ffd600]/30"
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

        {/* Sub-component Views */}
        <div>
          {activeTab === "projects" && <OperationsProjectsTab />}
          {activeTab === "proof" && <OperationsProofTab />}
          {activeTab === "fleet" && <OperationsFleetTab />}
          {activeTab === "clients" && <OperationsClientsTab />}
        </div>
      </div>
    </section>
  );
}
