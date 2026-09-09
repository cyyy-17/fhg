"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { generalFaqs } from "@/data/faqs";

export default function ProcurementFaqTab() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto space-y-4 animate-fadeIn">
      {generalFaqs.map((faq, idx) => {
        const isOpen = openFaqIndex === idx;
        return (
          <div
            key={idx}
            className="rounded-2xl border border-white/8 bg-[#0a150c]/80 overflow-hidden transition-all"
          >
            <button
              onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
              className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/4 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="text-sm sm:text-base font-bold text-[#f6f7f4]">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[#c5a059] shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#9aa89b] leading-relaxed border-t border-white/6">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
