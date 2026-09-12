"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import {
  X,
  FileCheck2,
  CheckCircle2,
  Truck,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useLenisScrollLock } from "@/hooks/useLenisScrollLock";
import type { ServiceItem } from "@/data/services";
import MediaPlaceholder, { type PlaceholderVariant } from "./MediaPlaceholder";

const defaultImages: Record<string, { src: string; alt: string }> = {
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

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  image?: { src: string; alt: string };
}

export default function ServiceDetailModal({ service, onClose, image }: ServiceDetailModalProps) {
  const mounted = useIsMounted();
  useLenisScrollLock(Boolean(service));

  useEffect(() => {
    if (!service) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [service, onClose]);

  if (!service || !mounted) return null;

  const activeImage = image || defaultImages[service.id];

  const placeholderVariant: PlaceholderVariant =
    service.id === "earthballing"
      ? "tree-specimen"
      : service.id === "tree-cutting" || service.id === "pca-cutting"
      ? "heavy-equipment"
      : service.id === "reforestation" || service.id === "tree-inventory"
      ? "site-clearing"
      : "nursery-propagation";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
      className="fixed inset-0 z-9999 flex justify-end bg-black/80 backdrop-blur-xs animate-fadeInSimple"
      onClick={onClose}
    >
      {/* Subtle backdrop dismissal helper for desktop users */}
      <div className="hidden lg:flex items-center gap-2 absolute top-6 left-8 text-xs font-mono text-white/50 pointer-events-none">
        <X className="w-3.5 h-3.5" />
        <span>Click outside to close dossier</span>
      </div>

      <div
        className="relative w-full max-w-xl h-full bg-[#0a170d] border-l border-white/15 shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto text-[#f6f7f4] animate-drawerSlide"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
            <span className="text-[10px] font-mono uppercase font-semibold tracking-wider px-2.5 py-1 rounded bg-[#050d07] text-[#4ade80] border border-[#16a34a]/30">
              {service.category} Dossier
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-[#9aa89b] hover:text-[#f6f7f4] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close Specification Drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Field Visual Asset Banner */}
          <div className="mb-5 rounded-xl overflow-hidden border border-white/10 shadow-lg">
            {activeImage ? (
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 550px"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#050d07] via-transparent to-[#050d07]/40 pointer-events-none" />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#050d07]/90 border border-white/10 text-[10px] font-mono font-semibold text-[#f6f7f4] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                  <span>{service.metrics?.[0] || "Verified Fleet"}</span>
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
                badge={service.metrics?.[0] || "SLA Certified"}
                tag={`FHG_${service.id.toUpperCase()}`}
              />
            )}
          </div>

          <h3 id="drawer-title" className="text-2xl sm:text-3xl font-bold font-heading text-[#f6f7f4] mb-2">
            {service.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#9aa89b] leading-relaxed mb-6">
            {service.shortDesc}
          </p>

          {/* Scope Deliverables Checklist */}
          <div className="mb-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#4ade80] font-semibold mb-3 flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-[#22c55e]" />
              <span>Turnkey Scope Deliverables</span>
            </h4>
            <ul className="space-y-2">
              {(Array.isArray(service.specs?.deliverables) ? service.specs.deliverables : []).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-[#f6f7f4] bg-[#050d07] p-3 rounded-lg border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Machinery & Permitting Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-[#050d07] border border-white/10">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#f6f7f4] uppercase tracking-wider mb-2">
                <Truck className="w-4 h-4 text-[#22c55e]" />
                <span>Fleet Required</span>
              </div>
              <ul className="text-xs text-[#9aa89b] space-y-1 list-disc list-inside">
                {(Array.isArray(service.specs?.equipment) ? service.specs.equipment : []).map((eq, i) => (
                  <li key={i}>{eq}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-[#050d07] border border-white/10">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#4ade80] uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4 text-[#22c55e]" />
                <span>Statutory Permits</span>
              </div>
              <ul className="text-xs text-[#9aa89b] space-y-1 list-disc list-inside">
                {(Array.isArray(service.specs?.permits) ? service.specs.permits : []).map((pm, i) => (
                  <li key={i}>{pm}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Drawer Bottom Actions */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left w-full sm:w-auto">
            <span className="text-[10px] font-mono text-[#9aa89b] block uppercase">Mobilization SLA</span>
            <strong className="text-sm font-semibold text-[#f6f7f4]">{service.specs.turnaround}</strong>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Link
              href="/contact"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-linear-to-r from-[#f59e0b] to-[#fbbf24] hover:brightness-110 text-[#050d07] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-[#f59e0b]/20 transition-all"
            >
              <span>Request Tender RFP</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
