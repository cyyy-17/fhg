"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Calculator,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import ProcurementEstimatorTab from "./procurement/ProcurementEstimatorTab";
import ProcurementVaultTab from "./procurement/ProcurementVaultTab";
import ProcurementFaqTab from "./procurement/ProcurementFaqTab";

type ProcurementTab = "estimate" | "vault" | "faq";

export default function ProcurementHub() {
  const [activeTab, setActiveTab] = useState<ProcurementTab>("estimate");

  // Deep-link hash listener
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      let matchedTab: ProcurementTab | null = null;
      if (hash === "#estimate" || hash === "#rfp") matchedTab = "estimate";
      else if (hash === "#vault" || hash === "#documents") matchedTab = "vault";
      else if (hash === "#faq") matchedTab = "faq";
      else if (hash === "#contact" || hash === "#dispatch") {
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        return;
      }

      if (matchedTab) {
        setActiveTab(matchedTab);
        const el = document.getElementById("procurement-hub");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const tabs: { key: ProcurementTab; label: string; icon: typeof Calculator; badge?: string }[] = [
    { key: "estimate", label: "Tender / RFP Estimator", icon: Calculator, badge: "Instant" },
    { key: "vault", label: "Document Vault", icon: FileText, badge: "6 PDF Files" },
    { key: "faq", label: "Statutory & FAQs", icon: HelpCircle },
  ];

  return (
    <section
      id="procurement-hub"
      className="py-20 md:py-28 bg-[#020702] relative z-20 overflow-hidden border-t border-[#4caf50]/15 scroll-mt-20 text-white"
      aria-label="Procurement, Estimator, Document Vault and Direct Dispatch Hub"
    >
      {/* Anchor targets */}
      <span id="estimate" className="absolute -top-24 pointer-events-none" />
      <span id="vault" className="absolute -top-24 pointer-events-none" />
      <span id="dispatch" className="absolute -top-24 pointer-events-none" />
      <span id="faq" className="absolute -top-24 pointer-events-none" />

      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#ffd600]/5 rounded-full blur-[140px] pointer-events-none" />

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
            <span>Commercial Onboarding &amp; Rapid Procurement</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
            Tender Estimator, Legal Vault &amp; Office Dispatch
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#a8d5a8]">
            Configure commercial arboricultural tenders, download verified statutory clearances, or reach our Talisay main office (8:00 AM – 5:00 PM).
          </p>
        </motion.div>

        {/* Segmented Control Bar */}
        <div className="flex justify-center mb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div
            data-lenis-prevent="true"
            className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#0a1b0d]/90 border border-white/10 backdrop-blur-xl shadow-2xl max-w-full overflow-x-auto scrollbar-none touch-pan-x overscroll-x-contain"
            style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y" }}
          >
            {tabs.map((tab) => {
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
                        isActive ? "bg-[#050e07]/20 text-[#050e07] font-extrabold" : "bg-white/10 text-[#ffd600]"
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
          {activeTab === "estimate" && <ProcurementEstimatorTab />}
          {activeTab === "vault" && <ProcurementVaultTab />}
          {activeTab === "faq" && <ProcurementFaqTab />}
        </div>
      </div>

      {/* Cross-Section Navigation Bridge to Operations & Contact */}
      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12 mt-12">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a8d5a8]">
          <span>
            Looking for our physical dispatch office, Waze coordinates, or wishing to meet in person?
          </span>
          <a
            href="#contact"
            className="text-[#ffd600] font-bold hover:underline shrink-0 flex items-center gap-1.5"
          >
            <span>Proceed to Operations &amp; Dispatch Desk ↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
