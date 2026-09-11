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
      className="fixed inset-0 z-9999 flex justify-end bg-black/80 backdrop-blur-xs animate-fadeInSimple"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl h-full bg-[#0a170d] border-l border-white/15 shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto text-[#f6f7f4] animate-drawerSlide"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
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
