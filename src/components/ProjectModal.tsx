"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Building2, MapPin, ShieldCheck, CheckCircle2, ArrowRight, Axe, FileText } from "lucide-react";
import { ProjectItem } from "@/data/projects";
import MediaPlaceholder from "./MediaPlaceholder";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useLenisScrollLock } from "@/hooks/useLenisScrollLock";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const mounted = useIsMounted();

  useLenisScrollLock(Boolean(project));

  // Handle ESC key
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project || !mounted) return null;

  const isInfra = project.category === "infrastructure";
  const isRefor = project.category === "reforestation";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-9999 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-black/85 backdrop-blur-xs overflow-y-auto animate-fadeInSimple"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#0a170d] border border-white/15 shadow-2xl p-6 sm:p-8 lg:p-10 text-[#f6f7f4] my-auto animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-[#9aa89b] hover:text-[#f6f7f4] flex items-center justify-center transition-colors cursor-pointer z-20"
          aria-label="Close Project Dossier"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Badges with safety padding for close button */}
        <div className="flex flex-wrap items-center gap-2.5 mb-4 pr-12">
          <span
            className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded uppercase tracking-wider ${
              project.badge === "Ongoing"
                ? "bg-[#050d07] text-[#4ade80] border border-[#16a34a]/40"
                : "bg-[#050d07] text-[#f6f7f4] border border-white/10"
            }`}
          >
            {project.badge} Project
          </span>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#050d07] text-[#9aa89b] uppercase border border-white/10">
            Sector: {project.category}
          </span>
          <span className="text-[10px] font-mono text-[#f59e0b] ml-auto">
            Dossier Ref: #{project.id.toUpperCase()}
          </span>
        </div>

        {/* Client & Title */}
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#4ade80] uppercase tracking-wider mb-2">
          <Building2 className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
          <span>{project.client}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold font-heading text-[#f6f7f4] mb-3 leading-tight">
          {project.title}
        </h2>

        <div className="flex items-center gap-2 text-xs text-[#9aa89b] mb-6 pb-5 border-b border-white/10">
          <MapPin className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
          <span>{project.location}</span>
        </div>

        {/* Visual Inspection Asset */}
        <div className="mb-6 rounded-xl overflow-hidden border border-white/10 shadow-lg">
          <MediaPlaceholder
            variant={isRefor ? "nursery-propagation" : isInfra ? "site-clearing" : "tree-specimen"}
            aspect="21/9"
            title={`${project.title} • Technical Log`}
            subtitle={`Executed under contract with ${project.client}`}
            badge={`Verified Field Asset • ${project.location}`}
            tag={`FHG_PROJECT_${project.id.toUpperCase()}`}
          />
        </div>

        {/* Two-Column Specification Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-5 rounded-xl bg-[#050d07] border border-white/10">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#4ade80] font-semibold mb-2.5 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#22c55e]" />
              <span>Contract Scope of Work</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#9aa89b] leading-relaxed">
              {project.scope}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#050d07] border border-white/10 space-y-2.5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#4ade80] font-semibold mb-2.5 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#22c55e]" />
              <span>Compliance &amp; Safety Metrics</span>
            </h4>
            <div className="flex items-center gap-2 text-xs text-[#9aa89b]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
              <span>Zero Environmental Infractions / Notice of Violation</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#9aa89b]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
              <span>Pre-cutting digital caliper tagging &amp; DENR Tree Cutting Permit</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#9aa89b]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
              <span>Compensatory planting stocks sourced from Talisay nurseries</span>
            </div>
          </div>
        </div>

        {/* Mobilized Equipment Specifications */}
        <div className="p-5 rounded-xl bg-[#050d07] border border-white/10 mb-6">
          <h4 className="text-xs font-mono font-semibold text-[#f6f7f4] uppercase tracking-wider mb-2.5 flex items-center gap-2">
            <Axe className="w-4 h-4 text-[#22c55e]" />
            <span>Industrial Equipment Mobilized on Contract</span>
          </h4>
          <div className="flex flex-wrap gap-2 text-xs font-medium">
            <span className="px-3 py-1 rounded bg-[#0a170d] border border-white/10 text-[#9aa89b]">
              90-Chainsaw Permitted Fleet
            </span>
            <span className="px-3 py-1 rounded bg-[#0a170d] border border-white/10 text-[#9aa89b]">
              Sectional Rigging Climbing Crew
            </span>
            <span className="px-3 py-1 rounded bg-[#0a170d] border border-white/10 text-[#9aa89b]">
              Telescopic Boom Cranes (25T/50T)
            </span>
            <span className="px-3 py-1 rounded bg-[#0a170d] border border-white/10 text-[#9aa89b]">
              DENR Tree Caliper GPS Surveyors
            </span>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#9aa89b]">
            Need a similar scope executed for your infrastructure tender?
          </span>
          <a
            href="/contact"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider bg-linear-to-r from-[#15803d] to-[#16a34a] hover:brightness-110 text-white shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Request Scope Proposal</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}
