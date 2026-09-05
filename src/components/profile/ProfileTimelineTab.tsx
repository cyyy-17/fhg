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
      "Founded by Mr. Edwin G. Luna in Talisay, Batangas with a clear charter: provide rapid, high-discipline earthballing and specialized heavy chainsaw felling for emerging developments.",
    impact: "Established enduring corporate motto: 'We Do It Right and Fast.'",
  },
  {
    year: "2005",
    date: "PhilGEPS-2005-23340",
    title: "PhilGEPS Blue Membership Certification",
    tag: "Government Clearance",
    description:
      "Accredited under the Philippine Government Electronic Procurement System, enabling direct subcontracting for DPWH national roads and municipal greening corridors.",
    impact: "Pre-qualified for public infrastructure bids across Calabarzon and NCR.",
  },
  {
    year: "2012",
    date: "Batangas Nursery Expansion",
    title: "Commissioning of Twin Nursery Facilities",
    tag: "Capacity Milestone",
    description:
      "Acquired and operationalized dedicated propagation farms in Brgy. Tumaway (80,000+ specimens) and Brgy. Aya (50,000+ forest trees) to support mega-developments.",
    impact: "Guaranteed immediate availability for DENR replacement tree compliance.",
  },
  {
    year: "2018",
    date: "DTI Cert. No. 1729753",
    title: "DTI Corporate Renewal & Fleet Modernization",
    tag: "Corporate Standing",
    description:
      "Renewed sole proprietorship charter under Ms. Marife B. Luna; acquired Stihl heavy-duty forestry chainsaws and certified boom crane rigging equipment.",
    impact: "Scaled tree felling throughput to 40+ mature trees per operational shift.",
  },
  {
    year: "2021",
    date: "Executive Transition",
    title: "Executive Leadership & Expansion",
    tag: "Generational Continuity",
    description:
      "Full managerial stewardship assumed by Ms. Marife B. Luna, consolidating enterprise operations across Laguna, Batangas, Cavite, and Metro Manila expressway corridors.",
    impact: "Maintained 100% contract retention and expanded corporate partner list.",
  },
  {
    year: "2026",
    date: "Present Operations",
    title: "Philippine Mega-Infrastructure Subcontractor",
    tag: "Current Standing",
    description:
      "Lead environmental clearing and earthballing partner for San Miguel (SLEX TR4), EEI Corporation (Metro Manila Subway CP101), and prominent residential developers.",
    impact: "1,240,000+ safe work hours with zero lost-time environmental accidents.",
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
    <div className="space-y-8 animate-fadeIn">
      {/* Horizontal Timeline Track Bar */}
      <div className="glass-panel rounded-3xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[#ffd600] font-bold">
            Select Era to Inspect Milestone (1998 — 2026)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={prevMilestone}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Previous Milestone"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextMilestone}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
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
                className={`p-3 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-linear-to-b from-[#ffd600]/25 to-[#ffd600]/10 border-[#ffd600] shadow-lg shadow-[#ffd600]/20 scale-105"
                    : "bg-white/5 border-white/10 hover:bg-white/10 text-[#a8d5a8]"
                }`}
              >
                <span
                  className={`text-base sm:text-lg font-black font-display ${
                    isSelected ? "text-[#ffd600]" : "text-white"
                  }`}
                >
                  {m.year}
                </span>
                <span className="text-[10px] font-mono text-[#a8d5a8] truncate max-w-full">
                  {m.tag}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Milestone Card */}
      <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-[#4caf50]/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl sm:text-6xl font-black font-display text-[#ffd600]">
              {current.year}
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-mono text-[#ffd600]">{current.date}</span>
              <span className="text-xs uppercase tracking-widest font-bold text-[#76c442]">
                {current.tag}
              </span>
            </div>
          </div>

          <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/10 text-[#a8d5a8] self-start md:self-auto">
            Milestone {selectedMilestone + 1} of {milestones.length}
          </span>
        </div>

        <h3 className="text-2xl sm:text-4xl font-black font-display text-white mb-4 leading-snug">
          {current.title}
        </h3>

        <p className="text-sm sm:text-lg text-[#a8d5a8] leading-relaxed mb-8 max-w-4xl">
          {current.description}
        </p>

        <div className="p-5 rounded-2xl bg-[#102414]/90 border border-[#76c442]/30 flex items-start sm:items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#76c442] shrink-0 mt-0.5 sm:mt-0" />
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#ffd600] font-bold block">
              Verified Institutional Impact:
            </span>
            <span className="text-sm text-white font-medium">{current.impact}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
