"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FolderKanban,
  ArrowLeftRight,
  Truck,
  Building2,
  Search,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { projectsData, ProjectItem } from "@/data/projects";
import { clientsData } from "@/data/clients";
import ProjectModal from "./ProjectModal";
import MediaPlaceholder from "./MediaPlaceholder";

type HubTab = "projects" | "proof" | "fleet" | "clients";
type ProjectFilter = "all" | "ongoing" | "infrastructure" | "commercial" | "reforestation";
type EquipmentFilter = "all" | "chainsaws" | "heavy-lift" | "excavation" | "processing" | "irrigation";
type ClientSector = "All" | "Infrastructure & Heavy Construction" | "Real Estate & Commercial" | "Energy & Industrial" | "Government & Financial";

interface ComparisonScenario {
  id: string;
  title: string;
  category: string;
  location: string;
  metric: string;
  beforeLabel: string;
  afterLabel: string;
  beforeDesc: string;
  afterDesc: string;
  beforeImage?: string;
  afterImage?: string;
}

const comparisonScenarios: ComparisonScenario[] = [
  {
    id: "earthballing",
    title: "Centennial Heritage Tree Earthballing & Relocation",
    category: "Commercial Estate Preservation",
    location: "Ayala Land Nuvali & Vermosa Estates, Laguna/Cavite",
    metric: "98.7% Specimen Survival Rate",
    beforeLabel: "Pre-Excavation & Root Trenching",
    afterLabel: "Replanted in Masterplan Estate",
    beforeDesc: "Mature 60-year-old Mango & Acacia trees surveyed with root-ball caliper conditioning and wire wrapping.",
    afterDesc: "Transplanted via 50-ton hydraulic crane to permanent central park buffer with active root stimulants.",
    beforeImage: "/images/earthballing.jpg",
    afterImage: "/images/transplanted_trees.jpg",
  },
  {
    id: "corridor-clearing",
    title: "High-Tension Infrastructure Right-of-Way Clearing",
    category: "Expressway & Rail Corridors",
    location: "SLEX TR4 Extension & Metro Manila Subway CP101",
    metric: "Zero Downtime • 100% Safety Compliance",
    beforeLabel: "Overgrown Corridor Alignment",
    afterLabel: "DENR Certified Cleared Grade",
    beforeDesc: "Dense virgin right-of-way jungle with steep topography and active utility line hazards.",
    afterDesc: "Sectional controlled felling completed by 89-chainsaw certified crew, timber chipped and salvaged.",
    beforeImage: "/images/hero_canopy.jpg",
    afterImage: "/images/corridor_cleared.jpg",
  },
  {
    id: "watershed-reforestation",
    title: "Mountain Watershed Reforestation & Compensatory Planting",
    category: "Watershed & Ecological Restoration",
    location: "Zambales Mountain Range & Batangas Watersheds",
    metric: "150,000+ Native Saplings Established",
    beforeLabel: "Barren Infrastructure Buffer",
    afterLabel: "Vibrant Hardwood Reforestation",
    beforeDesc: "Surveyed degraded slope requiring mandatory compensatory forest planting under DENR guidelines.",
    afterDesc: "Thousands of native Narra, Apitong and Banaba saplings thriving under scheduled arboricultural maintenance.",
    beforeImage: "/images/corridor_cleared.jpg",
    afterImage: "/images/watershed_reforestation.jpg",
  },
];

interface EquipmentItem {
  id: string;
  name: string;
  category: "chainsaws" | "heavy-lift" | "excavation" | "processing" | "irrigation";
  model: string;
  quantity: string;
  capacity: string;
  compliance: string;
  primaryRole: string;
  status: "Active Fleet" | "Pre-Mobilized";
}

const equipmentFleet: EquipmentItem[] = [
  {
    id: "stihl-heavy-chainsaws",
    name: "Industrial Heavy-Duty Forestry Chainsaws",
    category: "chainsaws",
    model: "Stihl MS660 / MS880 Magnum Series",
    quantity: "89 Units Registered",
    capacity: "91.6cc to 121.6cc • 28\" to 48\" Guide Bars",
    compliance: "DENR CENRO / PENRO Registered & Permitted",
    primaryRole: "Large diameter tree felling, sectional urban dismantle & emergency road clearance.",
    status: "Active Fleet",
  },
  {
    id: "rigging-aerial-gear",
    name: "Arborist Aerial Climbing & Controlled Rigging Kits",
    category: "chainsaws",
    model: "Petzl Sequoia / Buckingham Rigging Blocks",
    quantity: "14 Full Rigger Sets",
    capacity: "5,000 kg Tensile Breaking Strength",
    compliance: "OSHA & DOLE Construction Safety Standards",
    primaryRole: "High-angle tree dismantling near live high-voltage transmission lines and roofs.",
    status: "Active Fleet",
  },
  {
    id: "hydraulic-crane-50t",
    name: "Telescopic Boom Hydraulic Mobile Crane",
    category: "heavy-lift",
    model: "Tadano / Kato 50-Ton Heavy Crane",
    quantity: "Dedicated Deployment Fleet",
    capacity: "50-Ton Capacity • 42-Meter Max Boom Height",
    compliance: "Third-Party Load-Tested Certification",
    primaryRole: "Extraction and placement of multi-ton root-balled heritage trees onto transport beds.",
    status: "Pre-Mobilized",
  },
  {
    id: "boom-trucks",
    name: "Multi-Axle Boom Trucks with Hydraulic Knuckle Crane",
    category: "heavy-lift",
    model: "Isuzu Giga / Hino 10-Wheeler with Unic Crane",
    quantity: "6 Units Operational",
    capacity: "12-Ton Bed Capacity • 5-Ton Lift Winch",
    compliance: "LTO Commercial & Heavy Highway Registered",
    primaryRole: "Express hauling and self-loading of earthballed specimen saplings across provinces.",
    status: "Active Fleet",
  },
  {
    id: "excavator-root-baller",
    name: "Crawler Excavators with Root Balling Buckets",
    category: "excavation",
    model: "Komatsu PC200 / CAT 320 Hydraulic Excavators",
    quantity: "Fleet Mobilization Unit",
    capacity: "20-Ton Class • Custom Root-Trenching Bucket",
    compliance: "DOLE Safety Certified Heavy Machinery",
    primaryRole: "Deep radial root-ball trench excavation without damaging vascular root system.",
    status: "Active Fleet",
  },
  {
    id: "wood-chippers",
    name: "Heavy Industrial Brush & Wood Chippers",
    category: "processing",
    model: "Vermeer / Bandit Industrial Chipper Units",
    quantity: "4 High-Output Units",
    capacity: "Up to 15\" Log Diameter Continuous Feeding",
    compliance: "Clean Air & Environmental Noise Regulated",
    primaryRole: "Zero-waste reduction of tree canopies into organic mulch for soil stabilization.",
    status: "Active Fleet",
  },
  {
    id: "water-tankers",
    name: "Heavy Mobile Nursery Water Tankers",
    category: "irrigation",
    model: "10,000-Liter High-Pressure Water Tankers",
    quantity: "3 Highway Units",
    capacity: "10,000 Liters with Multi-Spray Mist Nozzles",
    compliance: "BFP & Municipal Inspection Approved",
    primaryRole: "Hydration of balled root masses during long-distance transit and highway greening.",
    status: "Active Fleet",
  },
  {
    id: "pca-certified-saws",
    name: "PCA-Registered Coconut Palm Chainsaws",
    category: "chainsaws",
    model: "Stihl MS382 Heavy Hardwood Cutting Units",
    quantity: "26 Permitted Units (NCR & Laguna)",
    capacity: "72.2cc • High-Torque Fibrous Palm Blade",
    compliance: "PCA Permits RNCR-00958 & R4-05595",
    primaryRole: "Licensed commercial coconut felling and lumber salvage for solar & agro estates.",
    status: "Active Fleet",
  },
];

export default function OperationsProofHub() {
  const [activeTab, setActiveTab] = useState<HubTab>("projects");
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>("all");
  const [searchProject, setSearchProject] = useState("");
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Before/After Slider state
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (sliderContainerRef.current) {
        setContainerWidth(sliderContainerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Fleet state
  const [equipmentFilter, setEquipmentFilter] = useState<EquipmentFilter>("all");

  // Client sector state
  const [clientSector, setClientSector] = useState<ClientSector>("All");

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

  // Filtered Projects
  const filteredProjects = useMemo(() => {
    return projectsData.filter((p) => {
      const matchesCat =
        projectFilter === "all"
          ? true
          : projectFilter === "ongoing"
          ? p.badge === "Ongoing"
          : p.category === projectFilter;

      const q = searchProject.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q);

      return matchesCat && matchesSearch;
    });
  }, [projectFilter, searchProject]);

  const displayedProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 6);

  // Slider Drag Logic
  const handleSliderMove = useCallback((clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      handleSliderMove(e.touches[0].clientX);
    },
    [isDragging, handleSliderMove]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      handleSliderMove(e.clientX);
    },
    [isDragging, handleSliderMove]
  );

  const currentScenario = comparisonScenarios[scenarioIndex];

  // Filtered Equipment
  const filteredEquipment = useMemo(() => {
    if (equipmentFilter === "all") return equipmentFleet;
    return equipmentFleet.filter((e) => e.category === equipmentFilter);
  }, [equipmentFilter]);

  // Filtered Clients
  const filteredClients = useMemo(() => {
    if (clientSector === "All") return clientsData;
    return clientsData.filter((c) => c.sector === clientSector);
  }, [clientSector]);

  const hubTabs: { key: HubTab; label: string; icon: typeof FolderKanban; badge?: string }[] = [
    { key: "projects", label: "Signature Projects", icon: FolderKanban, badge: `${projectsData.length} Works` },
    { key: "proof", label: "Before / After Proof", icon: ArrowLeftRight, badge: "Nuvali & SLEX" },
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
            <span>Operational Proof & Mechanized Authority</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
            Field Execution & Industrial Capacity
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#a8d5a8]">
            Explore signature civil project milestones, visual before/after proof, heavy crane machinery, and enterprise client partnerships.
          </p>
        </motion.div>

        {/* Segmented Control Bar */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#0a1b0d]/90 border border-white/10 backdrop-blur-xl shadow-2xl max-w-full overflow-x-auto scrollbar-none">
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

        {/* TAB 1: SIGNATURE PROJECTS EXPLORER */}
        {activeTab === "projects" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Filter & Search Bar */}
            <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                {[
                  { key: "all", label: "All Projects" },
                  { key: "ongoing", label: "Ongoing Works" },
                  { key: "infrastructure", label: "Infrastructure" },
                  { key: "commercial", label: "Commercial" },
                  { key: "reforestation", label: "Reforestation" },
                ].map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setProjectFilter(f.key as ProjectFilter)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      projectFilter === f.key
                        ? "bg-[#ffd600] text-[#050e07]"
                        : "bg-white/5 text-[#a8d5a8] hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-[#a8d5a8] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search project or client..."
                  value={searchProject}
                  onChange={(e) => setSearchProject(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl form-input text-xs"
                />
              </div>
            </div>

            {/* High-Density 3-Column Grid (6 Cards default) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProjects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className="glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col justify-between border border-white/10 group cursor-pointer"
                >
                  <div>
                    {/* Visual Media Placeholder */}
                    <div className="mb-4 rounded-xl overflow-hidden border border-white/10">
                      <MediaPlaceholder
                        variant={proj.category === "infrastructure" ? "site-clearing" : "tree-specimen"}
                        aspect="16/9"
                        title={proj.title}
                        subtitle={proj.client}
                        badge={proj.badge}
                        tag={proj.category}
                      />
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#ffd600]/15 text-[#ffd600] border border-[#ffd600]/30 font-bold uppercase">
                        {proj.category}
                      </span>
                      <span className="text-[11px] font-mono text-[#76c442] font-semibold">{proj.badge}</span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-[#ffd600] transition-colors line-clamp-1">
                      {proj.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-[#a8d5a8] mb-2 font-medium">
                      <Building2 className="w-3.5 h-3.5 text-[#ffd600] shrink-0" />
                      <span className="line-clamp-1">{proj.client}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-[#a8d5a8]/80 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-[#76c442] shrink-0" />
                      <span className="line-clamp-1">{proj.location}</span>
                    </div>

                    <p className="text-xs text-[#a8d5a8] line-clamp-2 leading-relaxed mb-4">
                      {proj.scope}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-[10px] font-mono text-[#ffd600] font-semibold uppercase">{proj.category} Contract</span>
                    <button className="text-white group-hover:text-[#ffd600] font-bold flex items-center gap-1 text-[11px]">
                      <span>Inspect Dossier</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination / Show All Toggle */}
            {filteredProjects.length > 6 && (
              <div className="text-center pt-4">
                <button
                  onClick={() => setShowAllProjects(!showAllProjects)}
                  className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-[#ffd600] hover:text-[#050e07] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {showAllProjects ? `Show Less (${6} of ${filteredProjects.length})` : `View All ${filteredProjects.length} Verified Projects`}
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: BEFORE / AFTER TRANSFORMATION PROOF */}
        {activeTab === "proof" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Scenario Switcher Bar */}
            <div className="flex flex-wrap justify-center gap-3">
              {comparisonScenarios.map((sc, idx) => (
                <button
                  key={sc.id}
                  onClick={() => setScenarioIndex(idx)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    scenarioIndex === idx
                      ? "bg-[#ffd600] text-[#050e07] border-[#ffd600] shadow-md shadow-[#ffd600]/20"
                      : "bg-white/5 border-white/10 text-[#a8d5a8] hover:text-white"
                  }`}
                >
                  <span>{sc.title.split("&")[0]}</span>
                </button>
              ))}
            </div>

            {/* Interactive Slider Container */}
            <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-[#4caf50]/30 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#ffd600] font-bold block mb-1">
                    {currentScenario.category} • {currentScenario.location}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{currentScenario.title}</h3>
                </div>
                <span className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-[#102414] border border-[#76c442]/40 text-[#76c442] font-bold self-start md:self-auto">
                  {currentScenario.metric}
                </span>
              </div>

              {/* Slider Viewport */}
              <div
                ref={sliderContainerRef}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onMouseMove={handleMouseMove}
                onTouchStart={() => setIsDragging(true)}
                onTouchEnd={() => setIsDragging(false)}
                onTouchMove={handleTouchMove}
                className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden select-none cursor-ew-resize border border-white/15"
              >
                {/* AFTER IMAGE (Background) */}
                <div className="absolute inset-0 bg-[#0d2612] flex items-center justify-center">
                  {currentScenario.afterImage ? (
                    <Image
                      src={currentScenario.afterImage}
                      alt={currentScenario.afterLabel}
                      fill
                      sizes="(max-width: 1024px) 100vw, 800px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-sm font-mono text-[#a8d5a8]">After: Replanted & Cleared</span>
                  )}
                  <span className="absolute bottom-4 right-4 text-xs font-bold font-mono px-3 py-1 rounded-full bg-black/70 text-[#76c442] border border-[#76c442]/40">
                    {currentScenario.afterLabel} (100% Target)
                  </span>
                </div>

                {/* BEFORE IMAGE (Clipped Foreground) */}
                <div
                  className="absolute inset-0 bg-[#162013] overflow-hidden"
                  style={{ width: `${sliderPos}%` }}
                >
                  <div className="absolute inset-0 w-full h-full" style={{ width: containerWidth ? `${containerWidth}px` : "100%" }}>
                    {currentScenario.beforeImage ? (
                      <Image
                        src={currentScenario.beforeImage}
                        alt={currentScenario.beforeLabel}
                        fill
                        sizes="(max-width: 1024px) 100vw, 800px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-sm font-mono text-[#ffd600]">Before: Baseline State</span>
                    )}
                  </div>
                  <span className="absolute bottom-4 left-4 text-xs font-bold font-mono px-3 py-1 rounded-full bg-black/70 text-[#ffd600] border border-[#ffd600]/40">
                    {currentScenario.beforeLabel} (Initial State)
                  </span>
                </div>

                {/* Draggable Divider Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-[#ffd600] shadow-[0_0_12px_#ffd600]"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#ffd600] text-[#050e07] flex items-center justify-center shadow-xl">
                    <ArrowLeftRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Slider Meta Descriptions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/10 text-xs">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="font-bold text-[#ffd600] block mb-1">Pre-Work State:</span>
                  <p className="text-[#a8d5a8] leading-relaxed">{currentScenario.beforeDesc}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="font-bold text-[#76c442] block mb-1">Execution Result:</span>
                  <p className="text-[#a8d5a8] leading-relaxed">{currentScenario.afterDesc}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: HEAVY INDUSTRIAL FLEET */}
        {activeTab === "fleet" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Equipment Category Selector */}
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { key: "all", label: "Full Fleet (89 Saws + Cranes)" },
                { key: "chainsaws", label: "Heavy Chainsaws" },
                { key: "heavy-lift", label: "50T Cranes & Booms" },
                { key: "excavation", label: "Excavators & Rigging" },
                { key: "processing", label: "Chippers & Mulchers" },
                { key: "irrigation", label: "10kL Water Tankers" },
              ].map((c) => (
                <button
                  key={c.key}
                  onClick={() => setEquipmentFilter(c.key as EquipmentFilter)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    equipmentFilter === c.key
                      ? "bg-[#ffd600] text-[#050e07]"
                      : "bg-white/5 text-[#a8d5a8] hover:text-white"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Equipment Fleet Visual Showcase Banner */}
            <div className="relative w-full h-56 sm:h-72 rounded-3xl overflow-hidden border border-[#4caf50]/30 shadow-2xl">
              <Image
                src="/images/fleet_chainsaws.jpg"
                alt="Forest Hills Garden Industrial Chainsaw Fleet & Operations Depot"
                fill
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#050e07] via-black/40 to-transparent flex items-end p-6 sm:p-8">
                <div>
                  <span className="text-xs font-mono font-bold text-[#ffd600] uppercase tracking-wider block mb-1">
                    Mechanized Field Readiness • Talisay Operations Depot
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black font-display text-white">
                    89 DENR-Registered Heavy Forestry Chainsaws & Crane Rigs
                  </h3>
                </div>
              </div>
            </div>

            {/* Fleet Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredEquipment.map((eq) => (
                <div
                  key={eq.id}
                  className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between border border-white/10"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#ffd600]/15 text-[#ffd600] font-bold">
                        {eq.quantity}
                      </span>
                      <span className="text-[10px] font-bold text-[#76c442] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {eq.status}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-1.5 leading-snug">{eq.name}</h4>
                    <span className="text-xs font-mono text-[#a8d5a8] block mb-3">{eq.model}</span>

                    <p className="text-xs text-[#a8d5a8] leading-relaxed mb-4">{eq.primaryRole}</p>
                  </div>

                  <div className="pt-3 border-t border-white/10 text-[11px] space-y-1.5 text-white/80 font-mono">
                    <div className="flex justify-between">
                      <span className="text-[#a8d5a8]">Capacity:</span>
                      <span className="text-white text-right">{eq.capacity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#a8d5a8]">Compliance:</span>
                      <span className="text-[#76c442] text-right">{eq.compliance.split(" ")[0]}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CLIENT TRUST WALL */}
        {activeTab === "clients" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Sector Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "All",
                "Infrastructure & Heavy Construction",
                "Real Estate & Commercial",
                "Energy & Industrial",
                "Government & Financial",
              ].map((s) => (
                <button
                  key={s}
                  onClick={() => setClientSector(s as ClientSector)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    clientSector === s
                      ? "bg-[#ffd600] text-[#050e07]"
                      : "bg-white/5 text-[#a8d5a8] hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Client Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredClients.map((client) => (
                <div
                  key={client.id}
                  className="glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col justify-between text-center border border-white/10 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#2e7d32]/20 border border-[#4caf50]/30 text-[#76c442] flex items-center justify-center mx-auto mb-3 group-hover:bg-[#ffd600] group-hover:text-[#050e07] transition-all">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-[#ffd600] transition-colors line-clamp-1 mb-1">
                    {client.name}
                  </h4>
                  <span className="text-[10px] font-mono text-[#a8d5a8] line-clamp-1">{client.projectSample}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Project Modal Dialog */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
