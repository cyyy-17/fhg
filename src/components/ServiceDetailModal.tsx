"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
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

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export default function ServiceDetailModal({ service, onClose }: ServiceDetailModalProps) {
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

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
      className="fixed inset-0 z-9999 flex justify-end bg-black/80 backdrop-blur-sm animate-fadeInSimple"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl h-full bg-[#061409] border-l border-[#4caf50]/40 shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto text-white animate-drawerSlide"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <span className="text-[11px] font-mono uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-[#ffd600]/15 text-[#ffd600] border border-[#ffd600]/30">
              {service.category} Dossier
            </span>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ffd600] hover:text-[#050e07] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close Specification Drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h3 id="drawer-title" className="text-2xl sm:text-3xl font-black font-display text-white mb-2">
            {service.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#a8d5a8] leading-relaxed mb-6">
            {service.shortDesc}
          </p>

          {/* Scope Deliverables Checklist */}
          <div className="mb-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#ffd600] font-bold mb-3 flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4" />
              <span>Turnkey Scope Deliverables</span>
            </h4>
            <ul className="space-y-2">
              {service.specs.deliverables.map((item, idx) => (
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
                {service.specs.equipment.map((eq, i) => (
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
                {service.specs.permits.map((pm, i) => (
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
            <strong className="text-sm font-bold text-white">{service.specs.turnaround}</strong>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Link
              href="#estimate"
              onClick={onClose}
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
  );
}
