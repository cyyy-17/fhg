"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Calculator,
  HelpCircle,
} from "lucide-react";
import ProcurementEstimatorTab from "./procurement/ProcurementEstimatorTab";
import ProcurementVaultTab from "./procurement/ProcurementVaultTab";
import ProcurementFaqTab from "./procurement/ProcurementFaqTab";

import type { DocumentItem } from "@/data/documents";
import type { FaqItem } from "@/data/faqs";

type ProcurementTab = "estimate" | "vault" | "faq";

interface ProcurementHubProps {
  initialDocuments?: DocumentItem[];
  initialFaqs?: FaqItem[];
}

export default function ProcurementHub({
  initialDocuments,
  initialFaqs,
}: ProcurementHubProps = {}) {
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
      className="py-20 md:py-28 bg-[#050d07] relative z-20 overflow-hidden border-t border-white/5 scroll-mt-20 text-[#f6f7f4]"
      aria-label="Procurement, Estimator, Document Vault and Direct Dispatch Hub"
    >
      {/* Anchor targets */}
      <span id="estimate" className="absolute -top-24 pointer-events-none" />
      <span id="vault" className="absolute -top-24 pointer-events-none" />
      <span id="dispatch" className="absolute -top-24 pointer-events-none" />
      <span id="faq" className="absolute -top-24 pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#22c55e] tracking-widest uppercase mb-3">
            <span>[ 05 / PROCUREMENT &amp; STATUTORY VAULT ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading text-[#f6f7f4] tracking-tight leading-tight">
            Tender Estimator, Legal Vault &amp; <br />
            <span className="font-editorial italic font-normal text-[#4ade80]">
              Office Dispatch
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#9aa89b]">
            Configure commercial arboricultural tenders, download verified statutory clearances, or reach our Talisay main office (8:00 AM – 5:00 PM).
          </p>
        </motion.div>

        {/* Segmented Control Bar */}
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
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-medium ${
                        isActive ? "bg-[#f59e0b] text-[#050d07] font-bold" : "bg-white/5 text-[#9aa89b]"
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
          {activeTab === "vault" && <ProcurementVaultTab initialDocuments={initialDocuments} />}
          {activeTab === "faq" && <ProcurementFaqTab initialFaqs={initialFaqs} />}
        </div>
      </div>

      {/* Cross-Section Navigation Bridge to Operations & Contact */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mt-12">
        <div className="p-4 rounded-xl bg-[#0a170d] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9aa89b]">
          <span>
            Looking for our physical dispatch office, Waze coordinates, or wishing to meet in person?
          </span>
          <a
            href="#contact"
            className="text-[#4ade80] font-semibold hover:underline shrink-0 flex items-center gap-1.5"
          >
            <span>Proceed to Operations &amp; Dispatch Desk ↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
