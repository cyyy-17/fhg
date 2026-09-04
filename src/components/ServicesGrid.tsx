"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion } from "framer-motion";
import { useIsMounted } from "@/hooks/useIsMounted";
import {
  TreePine,
  Axe,
  Palmtree,
  ClipboardCheck,
  Sprout,
  Mountain,
  Flower2,
  Layers,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  X,
  ShieldCheck,
  Truck,
  FileCheck2,
  ArrowUpRight
} from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  category: string;
  icon: typeof TreePine;
  shortDesc: string;
  metrics: string[];
  specs: {
    deliverables: string[];
    equipment: string[];
    permits: string[];
    turnaround: string;
  };
}

const servicesList: ServiceItem[] = [
  {
    id: "earthballing",
    title: "Large-Scale Tree Earthballing",
    category: "Heavy Rigging",
    icon: TreePine,
    shortDesc: "Arboricultural excavation, root-ball wrapping, crane lifting, and survival-guaranteed relocation.",
    metrics: ["25T–50T Cranes", "98.7% Survival", "12-Mo Warranty"],
    specs: {
      deliverables: [
        "Scientific caliper calculation & root preparation",
        "Burlap wire root-ball wrapping & mycorrhizal root-hormone hydration",
        "Scheduled night convoy transit with highway escort clearance",
        "180-day micro-irrigation and arborist root-conditioning monitoring"
      ],
      equipment: ["25T to 50T Mobile Hydraulic Cranes", "Lowbed Heavy Equipment Carriers", "Hydraulic Backhoes"],
      permits: ["DENR Tree Relocation Clearance", "LGU Engineering Transport Permit"],
      turnaround: "24–48 Hours Mobilization"
    }
  },
  {
    id: "tree-cutting",
    title: "Chainsaw Felling & Rigging",
    category: "Corridor Clearing",
    icon: Axe,
    shortDesc: "Sectional dismantle of hazardous or infrastructure-obstructing trees using heavy certified chainsaws.",
    metrics: ["89 Units Fleet", "Zero-Damage", "CARI Insured"],
    specs: {
      deliverables: [
        "Rigged sectional dismantle near energized high-voltage lines",
        "Precision directional felling for expressway rights-of-way",
        "Timber inventory, log scaling, salvage, and clean bio-clearing"
      ],
      equipment: ["89 Stihl Industrial Heavy Chainsaws", "Cherry Picker Boom Trucks", "Heavy Log Winches"],
      permits: ["DENR Special Tree Cutting Permit (STCP)", "Barangay Tree Safety Clearance"],
      turnaround: "Emergency: 4 Hours | Standard: 48 Hours"
    }
  },
  {
    id: "pca-cutting",
    title: "PCA Coconut Tree Felling",
    category: "Statutory Salvage",
    icon: Palmtree,
    shortDesc: "Permitted coconut palm cutting, clearing, and lumber recovery under strict PCA compliance.",
    metrics: ["26 PCA Units", "NCR & Laguna", "Zero Infraction"],
    specs: {
      deliverables: [
        "Turnkey processing of official PCA Permit to Cut (NCR & Region 4A)",
        "Sectional felling, root-ball extraction, and site clean-up",
        "Commercial coco-lumber processing and legal transport manifests"
      ],
      equipment: ["PCA-Registered Chainsaws", "Heavy Flatbed Trucks", "Stump Grinders"],
      permits: ["PCA RNCR-00958 (Metro Manila)", "PCA R4-05595 (Laguna / Batangas)"],
      turnaround: "24–72 Hours"
    }
  },
  {
    id: "tree-inventory",
    title: "Tree Census & GPS Tagging",
    category: "Environmental Pre-Dev",
    icon: ClipboardCheck,
    shortDesc: "Digital tree inventory, species classification, caliper sizing, and statutory pre-clearing audit.",
    metrics: ["GPS Geotagged", "CENRO/EMB Ready", "Full Audit"],
    specs: {
      deliverables: [
        "Sub-meter GPS coordinate logging and digital spatial GIS mapping",
        "DBH caliper measurement, health rating, and hazard risk indices",
        "Compilation of certified tree inventory dossier for DENR compliance"
      ],
      equipment: ["Laser Diameter Calipers", "Trimble GIS Field Loggers", "Ultrasonic Sonic Tomograph"],
      permits: ["DENR Pre-Clearance Baseline Verification"],
      turnaround: "3–5 Days per 100 Hectares"
    }
  },
  {
    id: "plant-nursery",
    title: "Native Seedling Propagation",
    category: "Batangas Facilities",
    icon: Sprout,
    shortDesc: "Production of acclimatized native forest saplings and compensatory planting stocks across 2 farms.",
    metrics: ["150K+ Stock", "Twin Nurseries", "1:50/1:100 Ratio"],
    specs: {
      deliverables: [
        "Containerized native hardwood stocks (Narra, Molave, Ipil, Banaba)",
        "Compensatory seedling turnover certificates signed by CENRO",
        "Pre-conditioned nursery trees for immediate commercial landscape installation"
      ],
      equipment: ["Tumaway Nursery Facility (100k cap)", "Aya Ecological Nursery (50k cap)", "Misting Beds"],
      permits: ["BPI Nursery Accreditation", "DENR Certificate of Seed Origin"],
      turnaround: "Immediate Stock Dispatch"
    }
  },
  {
    id: "reforestation",
    title: "Watershed Reforestation",
    category: "National Greening",
    icon: Mountain,
    shortDesc: "Multi-year watershed rehabilitation, carbon-sink propagation, and NGP plantation maintenance.",
    metrics: ["2,600+ Hectares", "DBP Partner", "3-Year Care"],
    specs: {
      deliverables: [
        "Baseline soil test, contour staking, and endemic seedling installation",
        "Firebreak boundary construction and brush control maintenance",
        "Quarterly survival monitoring with free replacement turnover"
      ],
      equipment: ["4x4 Reforestation Support Trucks", "Micro-Irrigation Pumps", "Brushcutters"],
      permits: ["DBP Forest Program Partnership", "DENR-NGP MoA"],
      turnaround: "Multi-Year Phased Execution"
    }
  },
  {
    id: "commercial-landscaping",
    title: "Highway & Commercial Greening",
    category: "Civil Landscaping",
    icon: Flower2,
    shortDesc: "Turnkey landscape architecture execution for corporate campuses, tollway interchanges, and medians.",
    metrics: ["Highway Scale", "Slope Turfing", "Civil Ready"],
    specs: {
      deliverables: [
        "Hardscape & softscape installation with automated irrigation layout",
        "Slope stabilization, hydroseeding, and erosion prevention blankets",
        "Architectural specimen tree placement and mature sod grass establishment"
      ],
      equipment: ["Hydroseeding Equipment", "Skid Steer Loaders", "Trenchers"],
      permits: ["DPWH Right-of-Way Landscaping Permit"],
      turnaround: "Contract-Scheduled"
    }
  },
  {
    id: "soil-nursery-boxes",
    title: "Soil Media & Custom Tree Boxes",
    category: "Specialized Materials",
    icon: Layers,
    shortDesc: "Bulk loam topsoil, organic compost blends, and industrial-grade timber/steel nursery holding boxes.",
    metrics: ["Lab Tested", "Custom Built", "Bulk Supply"],
    specs: {
      deliverables: [
        "Screened loam soil, volcanic pumice, and organic compost blends",
        "Heavy-duty treated wooden tree boxes for urban holding & streetscapes",
        "Bulk 10-wheeler dump truck delivery with batch laboratory testing"
      ],
      equipment: ["10-Wheeler Dump Trucks", "Rotary Soil Screens", "Industrial Box Fabrication Shop"],
      permits: ["Quarantine Transport Pass (if cross-regional)"],
      turnaround: "24–48 Hours Bulk Delivery"
    }
  }
];

const faqs = [
  {
    question: "How fast can heavy chainsaws and crane crews mobilize?",
    answer: "Emergency hazards within Calabarzon and Metro Manila mobilize within 4 to 12 hours. Planned commercial infrastructure projects mobilize within 24 to 48 hours following statutory permit clearance."
  },
  {
    question: "Do you handle complete DENR and PCA statutory permits?",
    answer: "Yes. Full turnkey compliance covers tree inventory census, CENRO/PENRO application preparation, LGU public hearings, and issuance of official STCP (Special Tree Cutting Permit) or Earthballing Clearances."
  },
  {
    question: "What is your survival warranty on relocated mature trees?",
    answer: "We guarantee a 98.7% survival rate backed by formal 12-month post-transplantation warranty contracts, providing 100% free specimen replacement supported by our twin Batangas nursery reserves."
  }
];

export default function ServicesGrid() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const mounted = useIsMounted();

  // Sync scroll buttons & active index
  const updateScrollState = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const cardWidth = clientWidth >= 1024 ? clientWidth / 3.2 : clientWidth * 0.85;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveSlideIndex(Math.min(Math.max(index, 0), servicesList.length - 1));
  };

  const scrollSlider = (direction: "prev" | "next") => {
    if (!sliderRef.current) return;
    const { clientWidth } = sliderRef.current;
    const offset = direction === "next" ? clientWidth * 0.75 : -clientWidth * 0.75;
    sliderRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  // Lock scroll & bind ESC key for drawer
  useEffect(() => {
    if (!selectedService) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedService(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedService]);

  return (
    <section
      id="services"
      className="py-20 bg-[#030a04] text-white relative z-20 overflow-hidden border-t border-[#4caf50]/15 scroll-mt-20"
      aria-label="Core Services & Technical Capabilities"
    >
      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12">
        {/* Header with Navigation Controls */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#ffd600] bg-[#ffd600]/10 border border-[#ffd600]/20 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#ffd600]" />
              <span>Commercial Arboricultural Operations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white">
              Specialized Infrastructure Solutions
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#a8d5a8] max-w-2xl">
              Equipped with 89 registered chainsaws, 50T crane rigging, and twin Batangas propagation farms.
            </p>
          </div>

          {/* Desktop & Tablet Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollSlider("prev")}
              disabled={!canScrollLeft}
              className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                canScrollLeft
                  ? "bg-[#102414] hover:bg-[#2e7d32] border-[#4caf50]/30 text-white"
                  : "bg-white/5 border-white/10 text-white/30 cursor-not-allowed"
              }`}
              aria-label="Previous Services"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollSlider("next")}
              disabled={!canScrollRight}
              className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                canScrollRight
                  ? "bg-[#102414] hover:bg-[#2e7d32] border-[#4caf50]/30 text-white"
                  : "bg-white/5 border-white/10 text-white/30 cursor-not-allowed"
              }`}
              aria-label="Next Services"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Horizontal Snap Slider Track */}
        <div
          ref={sliderRef}
          onScroll={updateScrollState}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 pt-1 scroll-smooth"
          style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
        >
          {servicesList.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.id}
                className="w-[85vw] sm:w-[46vw] lg:w-[31.5%] xl:w-[23.5%] shrink-0 snap-start rounded-3xl bg-[#08150a] border border-white/10 hover:border-[#ffd600]/40 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl group"
              >
                <div>
                  {/* Top Row: Icon + Category Badge */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#2e7d32]/25 border border-[#4caf50]/30 text-[#76c442] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#ffd600] group-hover:text-[#050e07] transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#a8d5a8]">
                      {service.category}
                    </span>
                  </div>

                  {/* Title & Concise Summary */}
                  <h3 className="text-lg font-bold font-heading text-white mb-2 leading-snug group-hover:text-[#ffd600] transition-colors line-clamp-1">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#a8d5a8] leading-relaxed line-clamp-2 mb-4">
                    {service.shortDesc}
                  </p>

                  {/* Space-Saving Metric Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {service.metrics.map((metric, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#102414] border border-[#4caf50]/30 text-[#f0fbf0]"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Progressive Trigger */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#a8d5a8]">SLA Certified</span>
                  <button
                    onClick={() => setSelectedService(service)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ffd600] hover:text-white transition-colors cursor-pointer group/btn"
                    aria-haspopup="dialog"
                  >
                    <span>View Technical Specs</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mobile Pagination Dot Indicators */}
        <div className="flex justify-center items-center gap-1.5 mt-4 md:hidden">
          {servicesList.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeSlideIndex === idx ? "w-6 bg-[#ffd600]" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>

        {/* Accordion: Technical Specs & Statutory Protocol FAQ */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#76c442] font-bold">
              Common Technical & Procurement Inquiries
            </span>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-[#08150a] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#ffd600] shrink-0 transition-transform duration-300 ${
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
                      <p className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#a8d5a8] leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Slide-Over Drawer Portal (Secondary Deep View) */}
      {selectedService && mounted && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-title"
          className="fixed inset-0 z-9999 flex justify-end bg-black/80 backdrop-blur-sm animate-fadeInSimple"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="relative w-full max-w-xl h-full bg-[#061409] border-l border-[#4caf50]/40 shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto text-white animate-drawerSlide"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <span className="text-[11px] font-mono uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-[#ffd600]/15 text-[#ffd600] border border-[#ffd600]/30">
                  {selectedService.category} Dossier
                </span>
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ffd600] hover:text-[#050e07] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close Specification Drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h3 id="drawer-title" className="text-2xl sm:text-3xl font-black font-display text-white mb-2">
                {selectedService.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#a8d5a8] leading-relaxed mb-6">
                {selectedService.shortDesc}
              </p>

              {/* Scope Deliverables Checklist */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#ffd600] font-bold mb-3 flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4" />
                  <span>Turnkey Scope Deliverables</span>
                </h4>
                <ul className="space-y-2">
                  {selectedService.specs.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[#f0fbf0] bg-white/5 p-3 rounded-xl border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-[#76c442] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Machinery & Permitting Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-[#102414] border border-[#4caf50]/20">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#76c442] uppercase tracking-wider mb-2">
                    <Truck className="w-4 h-4" />
                    <span>Fleet Required</span>
                  </div>
                  <ul className="text-xs text-[#a8d5a8] space-y-1 list-disc list-inside">
                    {selectedService.specs.equipment.map((eq, i) => (
                      <li key={i}>{eq}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#102414] border border-[#4caf50]/20">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#ffd600] uppercase tracking-wider mb-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Statutory Permits</span>
                  </div>
                  <ul className="text-xs text-[#a8d5a8] space-y-1 list-disc list-inside">
                    {selectedService.specs.permits.map((pm, i) => (
                      <li key={i}>{pm}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left w-full sm:w-auto">
                <span className="text-[10px] font-mono text-[#a8d5a8] block uppercase">Mobilization SLA</span>
                <strong className="text-sm font-bold text-white">{selectedService.specs.turnaround}</strong>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <Link
                  href="#estimate"
                  onClick={() => setSelectedService(null)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#ffd600] text-[#050e07] text-xs font-bold uppercase tracking-wider hover:brightness-110 flex items-center justify-center gap-1.5 shadow-lg shadow-[#ffd600]/20"
                >
                  <span>Request Proposal</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
