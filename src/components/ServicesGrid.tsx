"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { servicesData, type ServiceItem } from "@/data/services";
import MediaPlaceholder from "./MediaPlaceholder";
import ServiceDetailModal from "./ServiceDetailModal";

const serviceRealImages: Record<string, { src: string; alt: string }> = {
  earthballing: {
    src: "/images/earthballing.jpg",
    alt: "Commercial tree earthballing and hydraulic crane rigging operations in the Philippines",
  },
  "tree-cutting": {
    src: "/images/fleet_chainsaws.jpg",
    alt: "Registered 90-chainsaw fleet and precision tree felling operations",
  },
  reforestation: {
    src: "/images/watershed_reforestation.jpg",
    alt: "Watershed reforestation and native tree sapling plantation in Zambales",
  },
  "commercial-landscaping": {
    src: "/images/transplanted_trees.jpg",
    alt: "Specimen tree transplanting and corporate greening installation",
  },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TreePine,
  Axe,
  Palmtree,
  ClipboardCheck,
  Sprout,
  Mountain,
  Flower2,
  Layers,
};

const faqs = [
  {
    question: "How fast can heavy chainsaws and crane crews mobilize?",
    answer: "Emergency hazards within Calabarzon and Metro Manila mobilize within 4 to 12 hours. Planned commercial infrastructure projects mobilize within 24 to 48 hours following statutory permit clearance.",
  },
  {
    question: "Do you handle complete DENR and PCA statutory permits?",
    answer: "Yes. Full turnkey compliance covers tree inventory census, CENRO/PENRO application preparation, LGU public hearings, and issuance of official STCP (Special Tree Cutting Permit) or Earthballing Clearances.",
  },
  {
    question: "What is your survival warranty on mature earthballed trees?",
    answer: "We provide a 12-Month Post-Transplantation Warranty targeting a 98.7% survival rate. If a tree succumbs to root shock, we provide 100% free specimen replacement from our three Batangas nursery reserves (230,000+ saplings in stock).",
  },
  {
    question: "Can your heavy chainsaws operate in high-voltage utility lines?",
    answer: "Yes. Our senior rigging team is certified for energized transmission corridors, utilizing non-conductive rigging blocks, hydraulic cranes, and sectional dismantle techniques to guarantee zero outage risk.",
  },
];

interface ServicesGridProps {
  initialServices?: ServiceItem[];
}

export default function ServicesGrid({ initialServices }: ServicesGridProps = {}) {
  const services = Array.isArray(initialServices) && initialServices.length > 0 ? initialServices : servicesData;
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const index = Math.round(scrollLeft / (clientWidth * 0.85));
    setActiveSlideIndex(Math.min(index, services.length - 1));
  }, [services.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scrollByAmount = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section id="services" className="py-24 bg-[#050d07] relative z-20 overflow-hidden border-t border-white/5">
      {/* Anchor targets for subservice deep linking */}
      <span id="earthballing" className="absolute -top-24 pointer-events-none" />
      <span id="tree-cutting" className="absolute -top-24 pointer-events-none" />
      <span id="pca-cutting" className="absolute -top-24 pointer-events-none" />
      <span id="tree-inventory" className="absolute -top-24 pointer-events-none" />
      <span id="commercial-landscaping" className="absolute -top-24 pointer-events-none" />
      <span id="reforestation" className="absolute -top-24 pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header with Carousel Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#22c55e] tracking-widest uppercase mb-3">
              <span>[ 02 / CONTRACTING CAPABILITIES ]</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-heading text-[#f6f7f4] tracking-tight leading-tight">
              Industrial Tree Care &amp; <br />
              <span className="font-editorial italic font-normal text-[#4ade80]">
                Civil Corridor Operations
              </span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#9aa89b]">
              Precision arboricultural engineering, heavy mobile rigging, and complete statutory DENR compliance dockets since 1998.
            </p>
          </motion.div>

          {/* Desktop Carousel Arrow Triggers */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button
              onClick={() => scrollByAmount("left")}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all ${
                canScrollLeft
                  ? "border-white/15 bg-[#0a170d] text-[#f6f7f4] hover:border-[#22c55e] hover:text-[#4ade80] cursor-pointer"
                  : "border-white/5 bg-[#050d07] text-[#9aa89b]/40 cursor-not-allowed"
              }`}
              aria-label="Scroll services left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollByAmount("right")}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all ${
                canScrollRight
                  ? "border-white/15 bg-[#0a170d] text-[#f6f7f4] hover:border-[#22c55e] hover:text-[#4ade80] cursor-pointer"
                  : "border-white/5 bg-[#050d07] text-[#9aa89b]/40 cursor-not-allowed"
              }`}
              aria-label="Scroll services right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Viewport */}
        <div
          ref={scrollRef}
          data-lenis-prevent="true"
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory -mx-6 px-6 md:-mx-12 md:px-12 touch-pan-x overscroll-x-contain"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon] || TreePine;
            const placeholderVariant =
              service.id === "earthballing"
                ? "tree-specimen"
                : service.id === "tree-cutting" || service.id === "pca-cutting"
                ? "heavy-equipment"
                : service.id === "reforestation" || service.id === "tree-inventory"
                ? "site-clearing"
                : "nursery-propagation";

            return (
              <article
                key={service.id}
                id={`card-${service.id}`}
                className="w-[85vw] sm:w-95 lg:w-100 shrink-0 snap-start rounded-xl bg-[#0a170d] border border-white/10 p-6 flex flex-col justify-between group cursor-pointer hover:border-[#22c55e]/40 transition-colors"
                onClick={() => setSelectedService(service)}
              >
                <div>
                  <div className="mb-4 rounded-lg overflow-hidden border border-white/10">
                    {serviceRealImages[service.id] ? (
                      <div className="relative aspect-16/9 w-full overflow-hidden">
                        <Image
                          src={serviceRealImages[service.id].src}
                          alt={serviceRealImages[service.id].alt}
                          fill
                          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 380px, 400px"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050d07] via-transparent to-[#050d07]/40 pointer-events-none" />
                        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#050d07]/90 border border-white/10 text-[10px] font-mono font-semibold text-[#f6f7f4] uppercase tracking-wider flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                          <span>{service.metrics[0]}</span>
                        </div>
                        <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-[#050d07]/90 border border-white/10 text-[10px] font-mono text-[#4ade80] uppercase tracking-wider">
                          {service.id.toUpperCase()}
                        </div>
                      </div>
                    ) : (
                      <MediaPlaceholder
                        variant={placeholderVariant}
                        aspect="16/9"
                        title={service.title}
                        subtitle={service.category}
                        badge={service.metrics[0]}
                        tag={service.id.toUpperCase()}
                      />
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#050d07] border border-white/10 flex items-center justify-center text-[#22c55e] group-hover:border-[#22c55e]/50 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono tracking-wider px-2.5 py-0.5 rounded bg-[#16a34a]/15 border border-[#16a34a]/30 text-[#4ade80] uppercase">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-heading text-[#f6f7f4] group-hover:text-[#4ade80] transition-colors leading-snug mb-2">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#9aa89b] leading-relaxed line-clamp-3 mb-4">
                    {service.shortDesc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {service.metrics.map((m, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#050d07] border border-white/10 text-[#9aa89b]"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#9aa89b]">SLA Certified</span>
                  <button
                    onClick={() => setSelectedService(service)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#f59e0b] hover:text-[#4ade80] transition-colors cursor-pointer group/btn"
                    aria-haspopup="dialog"
                  >
                    <span>Technical Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mobile Pagination Dot Indicators */}
        <div className="flex justify-center items-center gap-1.5 mt-4 md:hidden">
          {servicesData.map((_, idx) => (
            <span
              key={idx}
              className={`h-1 rounded-full transition-all duration-300 ${
                activeSlideIndex === idx ? "w-6 bg-[#22c55e]" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>

        {/* Technical Inquiries Accordion */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#22c55e]">
              [ COMMON STATUTORY &amp; PROCUREMENT INQUIRIES ]
            </span>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-white/10 bg-[#0a170d] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-semibold text-[#f6f7f4]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#22c55e] shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#4ade80]" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#9aa89b] leading-relaxed border-t border-white/5">
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

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
}
