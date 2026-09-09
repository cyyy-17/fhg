"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FolderKanban,
  ArrowLeftRight,
  Truck,
  Building2,
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
      className="py-20 md:py-28 bg-[#060d07] relative z-20 overflow-hidden border-t border-white/5 scroll-mt-20"
      aria-label="Operations Track Record and Field Execution Hub"
    >
      {/* Anchor targets for direct hash routing */}
      <span id="projects" className="absolute -top-24 pointer-events-none" />
      <span id="proof" className="absolute -top-24 pointer-events-none" />
      <span id="fleet" className="absolute -top-24 pointer-events-none" />
      <span id="clients" className="absolute -top-24 pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c5a059] tracking-widest uppercase mb-3">
            <span>[ 04 / FIELD EXECUTION &amp; DOCKETS ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading text-[#f6f7f4] tracking-tight leading-tight">
            Execution Proof, Mobilization &amp; <br />
            <span className="font-editorial italic font-normal text-[#dfbe76]">
              Industrial Fleet
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#9aa89b]">
            Explore verified project portfolios, interactive before/after site transformations, 89-chainsaw registered fleet specifications, and conglomerate client trust.
          </p>
        </motion.div>

        {/* Central Segmented Tab Controls */}
        <div className="flex justify-center mb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div
            data-lenis-prevent="true"
            className="inline-flex items-center gap-1 p-1.5 rounded-xl bg-[#0a150c] border border-white/10 shadow-xl max-w-full overflow-x-auto scrollbar-none touch-pan-x overscroll-x-contain"
            style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y" }}
          >
            {hubTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-[#c5a059] text-[#060d07] shadow-md scale-100"
                      : "text-[#9aa89b] hover:text-[#f6f7f4] hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#060d07]" : "text-[#c5a059]"}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-medium ${
                        isActive
                          ? "bg-[#060d07] text-[#dfbe76]"
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
