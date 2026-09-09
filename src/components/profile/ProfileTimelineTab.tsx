"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

export interface Milestone {
  year: string;
  date: string;
  title: string;
  tag: string;
  description: string;
  impact: string;
}

export const milestones: Milestone[] = [
  {
    year: "1998",
    date: "June 10, 1998",
    title: "Foundation of Forest Hills Garden",
    tag: "Company Genesis",
    description:
      "Founded and managed by Mr. Edwin G. Luna in Talisay, Batangas with a clear charter: provide rapid, high-discipline tree earthballing, precision chainsaw felling, and nursery propagation for emerging national infrastructure.",
    impact: "Established enduring corporate motto: 'We Do It Right and Fast.'",
  },
  {
    year: "2005",
    date: "PhilGEPS 2005-23340 • DBP 11-2005",
    title: "PhilGEPS Blue Membership & DBP Forest Accreditation",
    tag: "Government Clearance",
    description:
      "Registered under the Philippine Government Electronic Procurement System (PhilGEPS) under Blue Membership (May 24, 2005) and accredited under the Development Bank of the Philippines Forest Program (Sept 12, 2005).",
    impact: "Qualified as an accredited environmental contractor and watershed reforestation supplier.",
  },
  {
    year: "2012",
    date: "DENR-IVA-BAT-2012-001",
    title: "DENR Regional Forest Nursery Accreditation",
    tag: "Nursery Accreditation",
    description:
      "Accredited as official Forest Nursery Operator by DENR Region IVA-CALABARZON, operationalizing massive native seedling propagation across Batangas facilities to supply National Greening Projects.",
    impact: "Guaranteed immediate nursery supply for nationwide DENR National Greening Projects.",
  },
  {
    year: "2015",
    date: "May 7, 2015",
    title: "Executive Stewardship & Best NGP Site Award",
    tag: "Executive Succession",
    description:
      "Following the passing of founder Edwin G. Luna on April 24, 2015, Mrs. Marife B. Luna assumed full ownership and executive management on May 7, 2015. In the same year, FHG was awarded Best NGP Site for 2,627 hectares Comprehensive Site Development (CSD) in Zambales.",
    impact: "Conferred Best NGP Site 2015 for 100% accomplishment across 2,627 hectares in Iba and Sta. Cruz.",
  },
  {
    year: "2023",
    date: "SEC Reg. 2023060103408-45",
    title: "Corporate Transition & DTI Extension to 2030",
    tag: "Corporate Transition",
    description:
      "Initiated transition of ownership to Forest Hills Ventures Incorporated, a three-person family corporation, alongside BIR OCN 059RC20230000016326 and DTI Certificate No. 1729753 extension valid through May 28, 2030.",
    impact: "Expanded corporate capacity for multi-corridor expressway and rail right-of-way concessions.",
  },
  {
    year: "2026",
    date: "January 21, 2026",
    title: "3,000,000 Safe Manhours Without Lost Time Incident",
    tag: "Safety Recognition",
    description:
      "Conferred Plaque of Special Recognition by Giga ACE 6, Inc. for outstanding achievement of 3 Million Safe Manhours Without Lost Time Incident (LTI) on the Quezon North Wind Project, while operating a 90-chainsaw heavy fleet.",
    impact: "3,000,000 safe manhours milestone with zero lost-time incidents across steep-slope corridors.",
  },
];

export default function ProfileTimelineTab() {
  const [selectedMilestone, setSelectedMilestone] = useState(0);

  const nextMilestone = () => {
    setSelectedMilestone((prev) => (prev + 1) % milestones.length);
  };

  const prevMilestone = () => {
    setSelectedMilestone((prev) => (prev - 1 + milestones.length) % milestones.length);
  };

  const current = milestones[selectedMilestone];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Horizontal Timeline Track Bar */}
      <div className="rounded-2xl bg-[#0a150c] p-5 border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono uppercase tracking-wider text-[#c5a059] font-medium">
            Select Era to Inspect Milestone (1998 — 2026)
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={prevMilestone}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#9aa89b] hover:text-[#f6f7f4] transition-colors cursor-pointer"
              aria-label="Previous Milestone"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextMilestone}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#9aa89b] hover:text-[#f6f7f4] transition-colors cursor-pointer"
              aria-label="Next Milestone"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step Buttons Row */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {milestones.map((m, idx) => {
            const isSelected = selectedMilestone === idx;
            return (
              <button
                key={m.year}
                onClick={() => setSelectedMilestone(idx)}
                className={`p-2.5 rounded-xl flex flex-col items-center justify-center transition-colors cursor-pointer border ${
                  isSelected
                    ? "bg-[#060d07] border-[#c5a059] shadow-sm"
                    : "bg-[#060d07] border-white/5 hover:border-white/15 text-[#9aa89b]"
                }`}
              >
                <span
                  className={`text-base sm:text-lg font-bold font-heading ${
                    isSelected ? "text-[#dfbe76]" : "text-[#f6f7f4]"
                  }`}
                >
                  {m.year}
                </span>
                <span className="text-[10px] font-mono text-[#9aa89b] truncate max-w-full">
                  {m.tag}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Milestone Card */}
      <div className="rounded-2xl bg-[#0a150c] p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl sm:text-6xl font-editorial italic font-normal text-[#dfbe76]">
              {current.year}
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-mono text-[#c5a059]">{current.date}</span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#9aa89b]">
                {current.tag}
              </span>
            </div>
          </div>

          <span className="text-xs font-mono px-3 py-1 rounded bg-[#060d07] text-[#9aa89b] border border-white/10 self-start md:self-auto">
            Milestone {selectedMilestone + 1} of {milestones.length}
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#f6f7f4] mb-4 leading-snug">
          {current.title}
        </h3>

        <p className="text-sm sm:text-base text-[#9aa89b] leading-relaxed mb-6 max-w-4xl">
          {current.description}
        </p>

        <div className="p-4 rounded-xl bg-[#060d07] border border-white/10 flex items-start sm:items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5 sm:mt-0" />
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#dfbe76] font-semibold block mb-0.5">
              Verified Institutional Impact:
            </span>
            <span className="text-xs sm:text-sm text-[#f6f7f4]">{current.impact}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
