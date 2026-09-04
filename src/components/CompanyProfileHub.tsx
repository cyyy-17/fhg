"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  Building2,
  Calendar,
  Award,
  ClipboardList,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  FileCheck,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
  HardHat,
  HeartPulse,
  Siren,
  X,
  ExternalLink,
  Clock,
  Sparkles,
  FileText,
  UserCheck,
} from "lucide-react";
import { companyData } from "@/data/company";
import { protocolSteps } from "@/data/protocol";

type TabKey = "overview" | "timeline" | "credentials" | "protocol" | "safety";

interface Milestone {
  year: string;
  date: string;
  title: string;
  tag: string;
  description: string;
  impact: string;
}

const emptySubscribe = () => () => {};

const milestones: Milestone[] = [
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
      "Accredited under the Philippine Government Electronic Procurement System, cementing eligibility for major national infrastructure, DPWH contracts, and civil works tenders.",
    impact: "Audited contractor standing with BIR, DTI (Cert. 1729753), and national agencies.",
  },
  {
    year: "2012",
    date: "DBP Forest Program",
    title: "National Greening & Watershed Expansion",
    tag: "Environmental Stewardship",
    description:
      "Selected as implementation propagation partner for the Development Bank of the Philippines (DBP) Forest Program, cultivating hundreds of thousands of indigenous tree saplings.",
    impact: "Pioneered large-scale watershed reforestation across Zambales and Rizal corridors.",
  },
  {
    year: "2018",
    date: "SLEX TR4 & CALAX",
    title: "Mega-Expressway Corridor Concessions",
    tag: "Heavy Infrastructure",
    description:
      "Contracted by San Miguel Corporation and major civil concessionaires for high-speed right-of-way felling, tree inventory census, and SLEX TR4 corridor clearance.",
    impact: "Mobilized multi-crane rigging, flatbed carriers, and 50+ chainsaw operators concurrently.",
  },
  {
    year: "2022",
    date: "MMSP CP101",
    title: "Metro Manila Subway CP101 Partnership",
    tag: "Urban Transit Priority",
    description:
      "Engaged by EEI Corporation for critical station access shaft tree earthballing across Tandang Sora, Quirino Highway, Ugong, and Valenzuela Depot alignment.",
    impact: "Zero-damage urban clearance in high-density metropolitan right-of-way.",
  },
  {
    year: "Present",
    date: "2024–2026",
    title: "89-Chainsaw Fleet & Twin Nurseries",
    tag: "Industry Authority",
    description:
      "Directed by Ms. Marife B. Luna with 89 DENR-permitted heavy chainsaws, 150,000+ sapling propagation capacity, and a flawless 28-year statutory zero-infraction track record.",
    impact: "Philippines' pre-qualified authority in commercial arboricultural contracting.",
  },
];

export default function CompanyProfileHub() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [selectedMilestone, setSelectedMilestone] = useState(0);
  const [selectedProtocol, setSelectedProtocol] = useState(0);
  const [bioModalOpen, setBioModalOpen] = useState(false);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Listen to window hash for direct deep links (#about, #timeline, #credentials, #protocol, #safety-ehs)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      let matchedTab: TabKey | null = null;
      if (hash === "#about" || hash === "#overview") {
        matchedTab = "overview";
      } else if (hash === "#timeline" || hash === "#milestones") {
        matchedTab = "timeline";
      } else if (hash === "#credentials" || hash === "#accreditations") {
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

  // Lock scroll when bio modal is open
  useEffect(() => {
    if (!bioModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setBioModalOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
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

  const nextMilestone = () => {
    setSelectedMilestone((prev) => (prev + 1) % milestones.length);
  };

  const prevMilestone = () => {
    setSelectedMilestone((prev) => (prev - 1 + milestones.length) % milestones.length);
  };

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
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#76c442] bg-[#4caf50]/10 border border-[#4caf50]/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#ffd600]" />
            <span>Executive Corporate Dossier • Est. 1998</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
            Rooted in Integrity, Proven Across Philippine Infrastructure
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#a8d5a8] leading-relaxed">
            High-density dossier detailing corporate heritage, heavy fleet capacity, statutory clearances, and turnkey compliance.
          </p>
        </div>

        {/* Segmented Control Bar (Compact Tabs) */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#0a1b0d]/90 border border-white/10 backdrop-blur-xl shadow-2xl max-w-full overflow-x-auto scrollbar-none">
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
                        isActive
                          ? "bg-[#050e07]/20 text-[#050e07] font-extrabold"
                          : "bg-white/10 text-[#ffd600]"
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

        {/* TAB 1: EXECUTIVE OVERVIEW (Bento Grid) */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Top Bento Row: Heritage Narrative + KPI Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Card A: Executive Heritage (7 cols) */}
              <div className="lg:col-span-7 glass-panel rounded-3xl p-8 sm:p-10 border border-[#4caf50]/25 flex flex-col justify-between relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <span className="text-[11px] font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-[#ffd600]/15 text-[#ffd600] border border-[#ffd600]/30">
                      Sole Proprietorship • DTI Reg. 1729753
                    </span>
                    <span className="text-xs font-mono text-[#a8d5a8] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#76c442]" />
                      28 Years In Continuous Operation
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black font-display text-white mb-3 leading-snug">
                    Forest Hills Garden
                  </h3>

                  <p className="text-sm sm:text-base text-[#a8d5a8] leading-relaxed mb-4">
                    Owned and actively directed by <strong className="text-white">Ms. Marife B. Luna</strong>, Forest Hills Garden operates from Talisay, Batangas, supported by twin propagation nurseries in Brgy. Tumaway and Brgy. Aya.
                  </p>

                  <p className="text-xs sm:text-sm text-[#a8d5a8] leading-relaxed mb-6">
                    Initially founded on <strong className="text-[#ffd600]">June 10, 1998</strong> by her late husband, <strong className="text-white font-medium">Mr. Edwin G. Luna</strong>, FHG has evolved into the Philippines' premier contractor for large-scale earthballing, expressway corridor clearing, and statutory DENR compliance.
                  </p>

                  {/* Official Motto Quote */}
                  <div className="p-5 rounded-2xl bg-linear-to-r from-[#2e7d32]/25 to-[#102414]/90 border-l-4 border-[#ffd600] shadow-inner mb-6">
                    <p className="text-sm sm:text-base font-medium text-white italic leading-relaxed mb-2">
                      “We Do It Right and Fast. We provide developers with dependable environmental clearing and greening without sacrificing statutory compliance or tree survival.”
                    </p>
                    <span className="text-[11px] font-bold text-[#ffd600] tracking-wider uppercase">
                      — Ms. Marife B. Luna, Proprietress & General Manager
                    </span>
                  </div>
                </div>

                {/* Bottom Actions inside Card A */}
                <div className="relative z-10 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={() => setBioModalOpen(true)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#ffd600] hover:text-white transition-colors cursor-pointer"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Read Leadership Bio & Memorial Tribute</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-3">
                    <Link
                      href="#vault"
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#ffd600]" />
                      <span>Document Vault</span>
                    </Link>
                    <Link
                      href="#estimate"
                      className="px-4 py-2 rounded-xl bg-[#2e7d32] hover:bg-[#4caf50] text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <span>Submit RFP</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Card B: KPI Micro-Stats Grid (5 cols) */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                {companyData.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="glass-panel glass-panel-hover rounded-3xl p-6 flex flex-col justify-between border border-white/10"
                  >
                    <div>
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-3xl sm:text-4xl font-black font-display text-[#ffd600]">
                          {stat.value}
                        </span>
                        <span className="text-xl sm:text-2xl font-black text-[#76c442]">
                          {stat.suffix}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1 leading-snug">
                        {stat.label}
                      </h4>
                    </div>
                    <p className="text-[11px] font-mono text-[#a8d5a8] pt-3 border-t border-white/10">
                      {stat.sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Bento Row: Operational Hubs & Statutory Quick Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Hub 1: Head Office */}
              <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 text-[#ffd600] mb-3">
                    <Building2 className="w-5 h-5 text-[#ffd600]" />
                    <h4 className="font-bold text-white text-sm">Operations Headquarters</h4>
                  </div>
                  <p className="text-xs text-[#f0fbf0] font-medium mb-1">
                    {companyData.headOffice.address}
                  </p>
                  <p className="text-[11px] font-mono text-[#a8d5a8] mb-3">
                    Plus Code: {companyData.headOffice.plusCode}
                  </p>
                  <p className="text-xs text-[#a8d5a8] leading-relaxed mb-4">
                    Regional operations center for Laguna, Cavite, Batangas, and NCR corridors (8:00 AM – 5:00 PM).
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <a
                    href={companyData.headOffice.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#76c442] hover:text-[#ffd600] font-semibold flex items-center gap-1 transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Google Maps</span>
                  </a>
                  <span className="font-mono text-[11px] text-[#a8d5a8]">{companyData.headOffice.telefax}</span>
                </div>
              </div>

              {/* Hub 2: Tumaway Facility */}
              <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 text-[#76c442] mb-3">
                    <MapPin className="w-5 h-5 text-[#76c442]" />
                    <h4 className="font-bold text-white text-sm">Tumaway Nursery Facility</h4>
                  </div>
                  <p className="text-xs text-[#ffd600] font-semibold mb-1">
                    {companyData.nurseries[0].capacity}
                  </p>
                  <p className="text-[11px] text-[#a8d5a8] leading-relaxed mb-4">
                    {companyData.nurseries[0].specialty}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <a
                    href={companyData.nurseries[0].googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#76c442] hover:text-[#ffd600] font-semibold flex items-center gap-1 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Location</span>
                  </a>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white">Active Farm</span>
                </div>
              </div>

              {/* Hub 3: Aya Facility */}
              <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 text-[#76c442] mb-3">
                    <MapPin className="w-5 h-5 text-[#76c442]" />
                    <h4 className="font-bold text-white text-sm">Aya Ecological Nursery</h4>
                  </div>
                  <p className="text-xs text-[#ffd600] font-semibold mb-1">
                    {companyData.nurseries[1].capacity}
                  </p>
                  <p className="text-[11px] text-[#a8d5a8] leading-relaxed mb-4">
                    {companyData.nurseries[1].specialty}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <a
                    href={companyData.nurseries[1].googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#76c442] hover:text-[#ffd600] font-semibold flex items-center gap-1 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Location</span>
                  </a>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white">Ecological Reserve</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HISTORICAL MILESTONES (Horizontal Interactive Stepper Track) */}
        {activeTab === "timeline" && (
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
            {(() => {
              const current = milestones[selectedMilestone];
              return (
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
              );
            })()}
          </div>
        )}

        {/* TAB 3: STATUTORY CREDENTIALS & CLEARANCES */}
        {activeTab === "credentials" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companyData.credentials.map((cred, idx) => (
                <div
                  key={idx}
                  className="glass-panel glass-panel-hover rounded-2xl p-7 flex flex-col justify-between border border-white/10 group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#ffd600]/15 border border-[#ffd600]/30 flex items-center justify-center text-[#ffd600] mb-5 group-hover:scale-105 group-hover:bg-[#ffd600] group-hover:text-[#050e07] transition-all duration-300">
                      <Award className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg font-bold font-heading text-white mb-2 group-hover:text-[#ffd600] transition-colors">
                      {cred.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#a8d5a8] leading-relaxed mb-4">
                      {cred.detail}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-[#76c442]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Audited Active Standing</span>
                    </div>
                    <Link
                      href="#vault"
                      className="text-[11px] font-bold text-[#ffd600] hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <span>View PDF</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Procurement Assurance Strip */}
            <div className="p-5 rounded-2xl bg-[#0a1f0e] border border-[#ffd600]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <FileCheck className="w-6 h-6 text-[#ffd600] shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">Direct Tender Envelopes Pre-Qualified</h4>
                  <p className="text-xs text-[#a8d5a8]">All BIR, PhilGEPS, and DTI registrations are ready for download in our Document Vault.</p>
                </div>
              </div>
              <Link
                href="#vault"
                className="px-5 py-2.5 rounded-full bg-[#ffd600] text-[#050e07] text-xs font-bold uppercase tracking-wider hover:brightness-110 shrink-0"
              >
                Inspect Official Vault
              </Link>
            </div>
          </div>
        )}

        {/* TAB 4: TURNKEY PROTOCOL (4-Stage Interactive Accordion) */}
        {activeTab === "protocol" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Stage Selector Pills */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {protocolSteps.map((step, idx) => {
                const isSelected = selectedProtocol === idx;
                return (
                  <button
                    key={step.step}
                    onClick={() => setSelectedProtocol(idx)}
                    className={`p-4 rounded-2xl flex flex-col text-left transition-all cursor-pointer border ${
                      isSelected
                        ? "bg-linear-to-b from-[#2e7d32]/40 to-[#102414] border-[#ffd600] shadow-lg shadow-[#ffd600]/15"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <span className="font-display font-black text-2xl text-[#ffd600] mb-1">
                      {step.step}
                    </span>
                    <span className="text-xs font-bold text-white line-clamp-1">
                      {step.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#a8d5a8] mt-1">
                      {step.badge.split(":")[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Phase Detail Panel */}
            {(() => {
              const p = protocolSteps[selectedProtocol];
              return (
                <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-[#4caf50]/30 shadow-2xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#ffd600] bg-[#ffd600]/10 border border-[#ffd600]/20">
                      <span>Phase {p.step} Protocol</span>
                      <span>•</span>
                      <span>{p.badge}</span>
                    </div>
                    <span className="text-xs font-mono text-[#a8d5a8]">
                      Stage {selectedProtocol + 1} of 4 Turnkey Sequence
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black font-display text-white mb-4 leading-snug">
                    {p.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#a8d5a8] leading-relaxed mb-8 max-w-4xl">
                    {p.desc}
                  </p>

                  <div className="pt-6 border-t border-white/10">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-[#ffd600] font-bold mb-4">
                      Mandatory Phase Deliverables:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {p.deliverables.map((deliv, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#76c442] shrink-0 mt-0.5" />
                          <span className="text-xs font-medium text-white">{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* TAB 5: SAFETY & WARRANTY SHIELD */}
        {activeTab === "safety" && (
          <div className="space-y-6 animate-fadeIn">
            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: HardHat,
                  metric: "100% Certified",
                  title: "DOLE COSH & BOSH Certified",
                  desc: "On-site safety officers oversight across all crane rigging, climbing, and power saw felling operations.",
                },
                {
                  icon: Award,
                  metric: "1,240,000+ Safe Hours",
                  title: "Zero Lost-Time Accident Record",
                  desc: "Flawless incident-free track record maintained across expressway corridors and subway station access shafts.",
                },
                {
                  icon: ShieldCheck,
                  metric: "CARI & CGL Active",
                  title: "Comprehensive Insurance Shield",
                  desc: "Active Contractor's All Risk and Comprehensive General Liability covering personnel and client property.",
                },
                {
                  icon: HeartPulse,
                  metric: "OSHA & DOLE Compliant",
                  title: "Ballistic PPE Standards",
                  desc: "Stihl ballistic chaps, ANSI climbing harnesses, steel-toed boots, and radio-equipped arborist helmets.",
                },
              ].map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between border border-white/10"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-[#2e7d32]/25 border border-[#4caf50]/30 flex items-center justify-center text-[#76c442] mb-5">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold text-[#ffd600] tracking-wider uppercase block mb-1">
                        {pillar.metric}
                      </span>
                      <h3 className="text-lg font-bold font-heading text-white mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-[#a8d5a8] leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>

                    <div className="pt-4 mt-6 border-t border-white/10 flex items-center gap-2 text-[11px] font-semibold text-[#76c442]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified Standard Protocol</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tree Survival Warranty Guarantee Banner */}
            <div className="rounded-3xl bg-linear-to-r from-[#0d2812] via-[#103017] to-[#081b0c] border border-[#4caf50]/40 p-8 sm:p-10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                <div className="w-16 h-16 rounded-2xl bg-[#ffd600]/20 border border-[#ffd600]/40 flex items-center justify-center text-[#ffd600] shrink-0">
                  <Siren className="w-8 h-8" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#ffd600] uppercase tracking-wider mb-1">
                    <span>Formal Tree Survival Warranty</span>
                    <span>•</span>
                    <span>{companyData.warranty.period}</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    100% Free Specimen Replacement Guarantee
                  </h4>
                  <p className="text-xs sm:text-sm text-[#a8d5a8] max-w-2xl leading-relaxed">
                    {companyData.warranty.coverage}. Backed by our twin Batangas nursery reserves and bi-weekly arborist monitoring during early acclimatization.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
                <Link
                  href="#estimate"
                  className="px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-[#ffd600] text-[#050e07] hover:brightness-110 shadow-lg shadow-[#ffd600]/20 transition-all"
                >
                  Request EHS Project Plan
                </Link>
                <Link
                  href="#vault"
                  className="px-6 py-3 rounded-full font-semibold text-xs text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all"
                >
                  Inspect Safety Dossiers
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* LEADERSHIP BIO & MEMORIAL TRIBUTE MODAL (Progressive Disclosure) */}
      {bioModalOpen && mounted && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeInSimple"
          onClick={() => setBioModalOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] rounded-3xl bg-[#061409] border border-[#4caf50]/40 shadow-2xl p-6 sm:p-10 flex flex-col text-white overflow-y-auto animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ffd600]/20 text-[#ffd600] flex items-center justify-center">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-heading text-white">
                    Corporate Leadership & Heritage
                  </h3>
                  <p className="text-xs text-[#a8d5a8]">Forest Hills Garden Official Dossier</p>
                </div>
              </div>
              <button
                onClick={() => setBioModalOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ffd600] hover:text-[#050e07] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-6 text-sm text-[#a8d5a8] leading-relaxed">
              {/* Founder Memorial Section */}
              <div className="p-6 rounded-2xl bg-linear-to-r from-[#ffd600]/10 via-[#ffd600]/5 to-transparent border border-[#ffd600]/30">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ffd600] mb-2">
                  <span>Founder Memorial Tribute</span>
                  <span>•</span>
                  <span>June 10, 1998</span>
                </div>
                <h4 className="text-xl font-bold font-heading text-white mb-2">
                  Mr. Edwin G. Luna (1971–2021)
                </h4>
                <p className="mb-3">
                  Founded Forest Hills Garden on June 10, 1998 in Talisay, Batangas. A passionate arborist and heavy equipment pioneer, Mr. Edwin G. Luna built the firm upon the bedrock principle of doing every clearing contract right, safely, and fast.
                </p>
                <p className="text-xs text-[#a8d5a8]/90 italic">
                  His technical discipline in precision felling and root-conditioning lives on in every crew mobilized across Luzon.
                </p>
              </div>

              {/* Current Executive Leadership */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#76c442] mb-2">
                  <span>Proprietress & General Manager</span>
                </div>
                <h4 className="text-xl font-bold font-heading text-white mb-2">
                  Ms. Marife B. Luna
                </h4>
                <p className="mb-3">
                  Under Ms. Marife B. Luna's decisive executive stewardship, Forest Hills Garden transitioned into mega-scale infrastructure right-of-way concessions. She steered major contracts for San Miguel Corporation (SLEX TR4, CALAX) and EEI Corporation (Metro Manila Subway CP101).
                </p>
                <p>
                  She maintains direct executive oversight over the 89-unit chainsaw fleet, DTI/PhilGEPS procurement standing, and twin propagation nurseries.
                </p>
              </div>

              {/* Corporate Core Values */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#102414] border border-white/10">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-[#ffd600] mb-1">
                    Direct Owner Accountability
                  </h5>
                  <p className="text-xs text-[#a8d5a8]">
                    Clients interface directly with executive leadership for rapid decision-making on emergency felling and critical path project milestones.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#102414] border border-white/10">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-[#76c442] mb-1">
                    Statutory Zero-Infraction
                  </h5>
                  <p className="text-xs text-[#a8d5a8]">
                    Zero stop-work orders, zero environmental penalties, and 100% full compliance with DENR, PCA, and DOLE standards across 28+ years.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-[#a8d5a8]">
                DTI Certificate: 1729753
              </span>
              <button
                onClick={() => setBioModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#ffd600] text-[#050e07] text-xs font-bold uppercase tracking-wider hover:brightness-110 cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
