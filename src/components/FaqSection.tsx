"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, FileText, ArrowUpRight } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
  category: "Permitting" | "Mobilization" | "Nursery & Warranty" | "Billing & Procurement";
}

export const faqsData: FaqItem[] = [
  {
    category: "Permitting",
    question: "What is the typical lead time for DENR Special Tree Cutting Permit (STCP) processing?",
    answer:
      "STCP processing generally spans 30 to 60 working days depending on jurisdiction (CENRO, PENRO, or DENR Regional Executive Director). Forest Hills Garden handles turnkey compliance: arborist GPS tree inventory, caliper measurements, risk tagging, Barangay/LGU resolutions, and environmental impact assessments to avoid statutory delays.",
  },
  {
    category: "Mobilization",
    question: "How fast can your 89-chainsaw fleet and heavy crane machinery mobilize?",
    answer:
      "For projects across Metro Manila, Batangas, Laguna, Cavite, and Rizal, emergency and standard crews mobilize within 48 to 72 hours following Notice to Proceed (NTP) and permit verification. For regional expressway alignments and provincial infrastructure, staged mobilization takes 5 to 7 working days.",
  },
  {
    category: "Nursery & Warranty",
    question: "What are your tree survival warranty terms for commercial earthballing?",
    answer:
      "We provide a 12-Month Post-Transplantation Warranty with a 98.7% historical survival benchmark. Should a transplanted tree fail due to shock or root-system rejection, Forest Hills Garden provides a 100% free specimen replacement from our twin Batangas nursery reserves, supported by scheduled root-hormone treatments and arborist health monitoring.",
  },
  {
    category: "Nursery & Warranty",
    question: "What is the standard DENR compensatory seedling replacement ratio?",
    answer:
      "Under DENR guidelines, developers must typically turn over 50 to 100 indigenous seedlings for every tree removed. Forest Hills Garden supplies certified native hard species (Narra, Molave, Tindalo, Kupang, Balitbitan) directly from our 150,000+ seedling capacity nurseries with official DENR delivery inspection certificates.",
  },
  {
    category: "Billing & Procurement",
    question: "Is Forest Hills Garden pre-qualified for corporate and government tenders?",
    answer:
      "Yes. FHG holds active PhilGEPS Blue Membership (Reg. No. 2005-23340), DTI Registration (No. 1729753), BIR Certificate of Registration (COR / Form 2303), and DENR Chainsaw Cutter Registry for 89 units. Our full bidding dossier is available in the Document Vault.",
  },
  {
    category: "Billing & Procurement",
    question: "What contracting and payment milestones do you support?",
    answer:
      "We support standard corporate procurement schedules: mobilization advance (typically 15%), bi-weekly or monthly progress billings tied to joint site inspection logs, and standard retention releases upon issuance of DENR inspection turn-over certificates.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-[#030a04] relative z-20 border-t border-[#4caf50]/15">
      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#76c442] bg-[#4caf50]/10 border border-[#4caf50]/20 mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#76c442]" />
            <span>Procurement & Technical FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
            Frequently Addressed Bidding & Technical Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-forest-muted">
            Key operational details, permitting lead times, and statutory procedures for project managers, general contractors, and procurement evaluators.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqsData.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl overflow-hidden border border-[#4caf50]/20 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-[#ffd600]/15 text-[#ffd600] uppercase tracking-wider self-start sm:self-center">
                      {faq.category}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-white font-heading">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#ffd600] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#ffd600]/20" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-white/10 text-xs sm:text-sm text-forest-muted leading-relaxed animate-fadeIn">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Contact Prompt Below FAQ */}
        <div className="text-center mt-12">
          <p className="text-xs sm:text-sm text-forest-muted mb-4">
            Have specialized project terms or urgent corridor emergency requirements?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#estimate"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#ffd600] text-[#050e07] hover:brightness-110 shadow-lg shadow-[#ffd600]/20 transition-all"
            >
              <span>Submit Custom RFP Parameters</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/639165667265"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-xs text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all"
            >
              <span>Instant Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
