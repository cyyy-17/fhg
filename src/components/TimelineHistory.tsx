"use client";

import { Award, Calendar, CheckCircle2, ShieldCheck, Flag } from "lucide-react";

interface Milestone {
  year: string;
  date?: string;
  title: string;
  tag: string;
  description: string;
  impact: string;
}

const milestones: Milestone[] = [
  {
    year: "1998",
    date: "June 10, 1998",
    title: "Foundation of Forest Hills Garden",
    tag: "Company Genesis",
    description:
      "Founded by Mr. Edwin G. Luna in Talisay, Batangas with a mission to deliver rapid, disciplined tree earthballing and specialized chainsaw felling.",
    impact: "Established core motto: 'We Do It Right and Fast.'",
  },
  {
    year: "2005",
    date: "PhilGEPS-2005-23340",
    title: "PhilGEPS Blue Membership Certification",
    tag: "Government Qualification",
    description:
      "Accredited under Philippine Government Electronic Procurement System, establishing eligibility for major public infrastructure and DPWH civil tenders.",
    impact: "Audited contractor standing with BIR, DTI (Cert 1729753), and national agencies.",
  },
  {
    year: "2012",
    date: "DBP Forest Program",
    title: "National Greening & Watershed Expansion",
    tag: "Environmental Stewardship",
    description:
      "Selected as implementation partner for the Development Bank of the Philippines (DBP) Forest Program, propagating tens of thousands of indigenous seedlings.",
    impact: "Pioneered large-scale watershed reforestation in Zambales and Rizal.",
  },
  {
    year: "2018",
    date: "SLEX TR4 & CALAX",
    title: "Mega-Expressway Corridor Concessions",
    tag: "Heavy Infrastructure",
    description:
      "Contracted by San Miguel Corporation and major concessionaires for high-speed right-of-way felling, tree inventory census, and SLEX TR4 corridor clearance.",
    impact: "Mobilized multi-crane rigging and 50+ chainsaw operators concurrently.",
  },
  {
    year: "2022",
    date: "MMSP CP101",
    title: "Metro Manila Subway CP101 Partnership",
    tag: "Urban Transit Priority",
    description:
      "Engaged by EEI Corporation for critical station access shaft tree earthballing and clearing across Tandang Sora, Quirino Hwy, Ugong, and Valenzuela Depot.",
    impact: "Zero-damage urban clearance in high-density metropolitan right-of-way.",
  },
  {
    year: "Present",
    date: "2024–2026",
    title: "89-Chainsaw Fleet & Twin Nurseries",
    tag: "Industry Authority",
    description:
      "Led by Ms. Marife B. Luna with 89 DENR-permitted heavy chainsaws, 150,000+ sapling propagation capacity, and a flawless 26+ year zero-infraction track record.",
    impact: "Philippines' pre-qualified leader in commercial arboricultural contracting.",
  },
];

export default function TimelineHistory() {
  return (
    <section id="timeline" className="py-24 bg-[#040e06] relative z-20 overflow-hidden">
      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#ffd600] bg-[#ffd600]/10 border border-[#ffd600]/20 mb-4">
            28-Year Legacy of Discipline
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
            Milestones That Built Our Authority
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#a8d5a8]">
            From our founding in Talisay, Batangas in 1998 to clearing the corridors of the nation’s largest subways and tollways.
          </p>
        </div>

        {/* Timeline Grid (Horizontal Card Progression) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover rounded-2xl p-7 flex flex-col justify-between relative group border border-[#4caf50]/20"
            >
              {/* Year Stamp Pill */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-2xl font-black font-display text-[#ffd600] flex items-center gap-1.5">
                    <Calendar className="w-5 h-5 text-[#76c442]" />
                    <span>{m.year}</span>
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-white/10 text-[#a8d5a8]">
                    {m.tag}
                  </span>
                </div>

                <span className="text-[11px] font-mono text-[#ffd600] block mb-1">
                  {m.date}
                </span>
                <h3 className="text-lg font-bold font-heading text-white mb-3 group-hover:text-[#ffd600] transition-colors leading-snug">
                  {m.title}
                </h3>
                <p className="text-xs text-[#a8d5a8] leading-relaxed mb-6">
                  {m.description}
                </p>
              </div>

              {/* Bottom Impact Box */}
              <div className="pt-4 border-t border-white/10 flex items-start gap-2 text-xs text-[#f0fbf0]">
                <CheckCircle2 className="w-4 h-4 text-[#76c442] shrink-0 mt-0.5" />
                <span className="font-medium text-[11px]">{m.impact}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Heritage Affirmation */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#102414] border border-[#ffd600]/30 shadow-xl text-xs sm:text-sm text-white">
            <Flag className="w-4 h-4 text-[#ffd600]" />
            <span>
              Continually honoring the vision of <strong className="text-[#ffd600]">Mr. Edwin G. Luna</strong> under the leadership of <strong className="text-white">Ms. Marife B. Luna</strong>.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
