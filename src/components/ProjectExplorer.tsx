"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, MapPin, Building2, Eye, ShieldCheck } from "lucide-react";
import { projectsData, ProjectItem } from "@/data/projects";
import ProjectModal from "./ProjectModal";
import MediaPlaceholder from "./MediaPlaceholder";

type CategoryFilter = "all" | "ongoing" | "infrastructure" | "commercial" | "reforestation";

export default function ProjectExplorer() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = useMemo(() => {
    return projectsData.filter((p) => {
      // Category Match
      let matchesCategory = true;
      if (activeFilter === "ongoing") {
        matchesCategory = p.badge === "Ongoing";
      } else if (activeFilter !== "all") {
        matchesCategory = p.category === activeFilter;
      }

      // Search Match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.client.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.scope.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const counts = useMemo(() => {
    return {
      all: projectsData.length,
      ongoing: projectsData.filter((p) => p.badge === "Ongoing").length,
      infrastructure: projectsData.filter((p) => p.category === "infrastructure").length,
      commercial: projectsData.filter((p) => p.category === "commercial").length,
      reforestation: projectsData.filter((p) => p.category === "reforestation").length,
    };
  }, []);

  const INITIAL_COUNT = 12;
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, INITIAL_COUNT);

  return (
    <section id="projects" className="py-24 bg-[#050e07] relative z-20">
      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#76c442] bg-[#4caf50]/10 border border-[#4caf50]/20 mb-4">
            Verified Track Record
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
            Signature Projects & Infrastructure Footprint
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#a8d5a8]">
            Trusted by the Philippines’ largest conglomerates, tollway operators, and engineering contractors to clear corridors safely and build lasting landscapes.
          </p>
        </div>

        {/* Cockpit Controls: Search & Tabs */}
        <div className="flex flex-col items-center gap-6 mb-12">
          {/* Search Bar with 1-Tap Clear */}
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a8d5a8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowAll(false);
              }}
              placeholder="Search by client, project, or location (e.g. SLEX, Subway, Nuvali, SM)..."
              className="w-full pl-13 pr-12 py-3.5 rounded-full form-input text-sm shadow-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/10 hover:bg-[#ffd600] hover:text-[#050e07] text-white flex items-center justify-center transition-colors"
                aria-label="Clear Search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {[
              { key: "all", label: "All Projects", count: counts.all },
              { key: "ongoing", label: "Ongoing", count: counts.ongoing },
              { key: "infrastructure", label: "Tollways & Rail", count: counts.infrastructure },
              { key: "commercial", label: "Commercial & Estates", count: counts.commercial },
              { key: "reforestation", label: "Reforestation / NGP", count: counts.reforestation },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveFilter(tab.key as CategoryFilter);
                  setShowAll(false);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  activeFilter === tab.key
                    ? "bg-[#ffd600] text-[#050e07] shadow-lg shadow-[#ffd600]/20 scale-105"
                    : "bg-[#102414]/80 text-[#a8d5a8] hover:text-white border border-[#4caf50]/20 hover:border-[#76c442]"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    activeFilter === tab.key ? "bg-[#050e07]/20 text-[#050e07]" : "bg-white/10 text-[#a8d5a8]"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Broad 4-Column Projects Grid with Framer Motion */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-2xl glass-panel max-w-lg mx-auto">
            <p className="text-base text-[#a8d5a8]">
              No projects found matching <strong className="text-white">&ldquo;{searchQuery}&rdquo;</strong>.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
              }}
              className="mt-4 px-6 py-2 rounded-full bg-[#4caf50]/20 text-[#ffd600] hover:bg-[#4caf50]/30 text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {displayedProjects.map((p) => {
                const isInfra = p.category === "infrastructure";
                const isRefor = p.category === "reforestation";
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={p.id}
                    onClick={() => setSelectedProject(p)}
                    className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      {/* Technical Preview Thumbnail */}
                      <div className="mb-4 rounded-xl overflow-hidden border border-white/10">
                        <MediaPlaceholder
                          variant={isRefor ? "nursery-propagation" : isInfra ? "site-clearing" : "tree-specimen"}
                          aspect="16/9"
                          title={p.title}
                          subtitle={p.client}
                          badge={p.badge}
                          tag={p.id.toUpperCase()}
                        />
                      </div>

                      {/* Top Row: Client & Status Badge */}
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#76c442] tracking-wider uppercase truncate">
                          <Building2 className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{p.client}</span>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 ${
                            p.badge === "Ongoing"
                              ? "bg-[#ffd600]/20 text-[#ffd600] border border-[#ffd600]/40 animate-pulse"
                              : "bg-[#2e7d32]/20 text-[#a8d5a8] border border-[#2e7d32]/40"
                          }`}
                        >
                          {p.badge}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold font-heading text-white mb-2 group-hover:text-[#ffd600] transition-colors leading-snug">
                        {p.title}
                      </h3>

                      {/* Location */}
                      <div className="flex items-start gap-1.5 text-xs text-[#a8d5a8] mb-4">
                        <MapPin className="w-3.5 h-3.5 text-[#ffd600] shrink-0 mt-0.5" />
                        <span>{p.location}</span>
                      </div>
                    </div>

                    {/* Scope snippet and Inspect trigger */}
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-xs text-[#f0fbf0]/80 leading-relaxed line-clamp-2 mb-3">
                        {p.scope}
                      </p>
                      <div className="flex items-center justify-between text-xs text-[#ffd600] font-bold">
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#76c442]" />
                          <span className="text-[11px] text-[#a8d5a8]">DENR Permitted</span>
                        </span>
                        <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect Dossier</span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Load More Button */}
        {!showAll && filteredProjects.length > INITIAL_COUNT && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#2e7d32] hover:bg-[#4caf50] text-white shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              Show All {filteredProjects.length} Projects ↓
            </button>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
