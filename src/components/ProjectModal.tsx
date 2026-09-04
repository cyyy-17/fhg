"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Building2, MapPin, ShieldCheck, CheckCircle2, ArrowRight, Axe, Trees, FileText } from "lucide-react";
import { ProjectItem } from "@/data/projects";
import MediaPlaceholder from "./MediaPlaceholder";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and handle ESC key
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
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
      className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#061409] border border-[#4caf50]/40 shadow-2xl p-6 sm:p-10 text-white my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-[#ffd600] hover:text-[#050e07] text-white flex items-center justify-center transition-all cursor-pointer z-20"
          aria-label="Close Project Dossier"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badges with safety padding for close button */}
        <div className="flex flex-wrap items-center gap-3 mb-4 pr-14">
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
              project.badge === "Ongoing"
                ? "bg-[#ffd600]/20 text-[#ffd600] border border-[#ffd600]/40 animate-pulse"
                : "bg-[#2e7d32]/20 text-[#76c442] border border-[#2e7d32]/40"
            }`}
          >
            {project.badge} Project
          </span>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-[#a8d5a8] uppercase">
            Sector: {project.category}
          </span>
          <span className="text-xs font-mono text-[#ffd600] ml-auto">
            Dossier Ref: #{project.id.toUpperCase()}
          </span>
        </div>


        {/* Client & Title */}
        <div className="flex items-center gap-2 text-sm font-bold text-[#76c442] uppercase tracking-wider mb-2">
          <Building2 className="w-4 h-4 shrink-0" />
          <span>{project.client}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black font-display text-white mb-4 leading-tight">
          {project.title}
        </h2>

        <div className="flex items-center gap-2 text-sm text-[#a8d5a8] mb-8 pb-6 border-b border-white/10">
          <MapPin className="w-4 h-4 text-[#ffd600] shrink-0" />
          <span>{project.location}</span>
        </div>

        {/* Visual Inspection Asset (Placeholder / Field Wireframe) */}
        <div className="mb-8 rounded-2xl overflow-hidden border border-white/15 shadow-xl">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-5 rounded-2xl bg-[#0a1f0f] border border-[#4caf50]/20">
            <h4 className="text-xs font-bold text-[#ffd600] uppercase tracking-wider mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Contract Scope of Work</span>
            </h4>
            <p className="text-sm text-[#f0fbf0]/90 leading-relaxed">
              {project.scope}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0a1f0f] border border-[#4caf50]/20 space-y-3">
            <h4 className="text-xs font-bold text-[#ffd600] uppercase tracking-wider mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Compliance & Safety Metrics</span>
            </h4>
            <div className="flex items-center gap-2 text-xs text-[#a8d5a8]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#76c442] shrink-0" />
              <span>100% Zero Environmental Infractions / Notice of Violation</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#a8d5a8]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#76c442] shrink-0" />
              <span>Pre-cutting digital caliper tagging & DENR Tree Cutting Permit</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#a8d5a8]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#76c442] shrink-0" />
              <span>Compensatory planting stocks sourced from Talisay Batangas nurseries</span>
            </div>
          </div>
        </div>

        {/* Mobilized Equipment Specifications */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 mb-8">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <Axe className="w-4 h-4 text-[#ffd600]" />
            <span>Industrial Equipment Mobilized on this Contract</span>
          </h4>
          <div className="flex flex-wrap gap-2 text-xs font-medium">
            <span className="px-3 py-1.5 rounded-full bg-[#112414] border border-[#4caf50]/30 text-[#f0fbf0]">
              89-Chainsaw Permitted Fleet
            </span>
            <span className="px-3 py-1.5 rounded-full bg-[#112414] border border-[#4caf50]/30 text-[#f0fbf0]">
              Sectional Rigging Climbing Crew
            </span>
            <span className="px-3 py-1.5 rounded-full bg-[#112414] border border-[#4caf50]/30 text-[#f0fbf0]">
              Telescopic Boom Cranes (25T/50T)
            </span>
            <span className="px-3 py-1.5 rounded-full bg-[#112414] border border-[#4caf50]/30 text-[#f0fbf0]">
              DENR Tree Caliper GPS Surveyors
            </span>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#a8d5a8]">
            Need a similar scope executed for your infrastructure tender?
          </span>
          <a
            href="#estimate"
            onClick={onClose}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-linear-to-r from-[#ffd600] to-[#f9c923] text-[#061008] hover:brightness-110 shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer"
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
