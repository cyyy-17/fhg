"use client";

import { useState, useMemo } from "react";
import { Search, MapPin, CheckCircle2, ArrowUpRight } from "lucide-react";
import { projectsData, type ProjectItem } from "@/data/projects";
import MediaPlaceholder from "@/components/MediaPlaceholder";
import ProjectModal from "@/components/ProjectModal";

type ProjectFilter = "all" | "ongoing" | "infrastructure" | "commercial" | "reforestation";

export default function OperationsProjectsTab() {
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>("all");
  const [searchProject, setSearchProject] = useState("");
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

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

  const filterTabs: { key: ProjectFilter; label: string; count?: number }[] = [
    { key: "all", label: "All Works", count: projectsData.length },
    { key: "ongoing", label: "Active Deployments", count: projectsData.filter((p) => p.badge === "Ongoing").length },
    { key: "infrastructure", label: "Expressway & Rail" },
    { key: "commercial", label: "Estates & High-Rise" },
    { key: "reforestation", label: "Watershed & NGP" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Search and Category Filter Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9aa89b]" />
          <input
            type="text"
            value={searchProject}
            onChange={(e) => setSearchProject(e.target.value)}
            placeholder="Search project, client, or site..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#050d07]/80 border border-white/8 text-xs text-[#f6f7f4] placeholder-[#9aa89b]/50 focus:outline-none focus:border-[#22c55e] transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto overflow-x-auto pb-1">
          {filterTabs.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setProjectFilter(cat.key)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all shrink-0 cursor-pointer ${
                projectFilter === cat.key
                  ? "bg-linear-to-r from-[#15803d] to-[#16a34a] text-[#f6f7f4] font-bold shadow-md shadow-[#16a34a]/20 border border-[#22c55e]/40"
                  : "bg-white/4 text-[#9aa89b] hover:bg-white/8 hover:text-[#f6f7f4]"
              }`}
            >
              {cat.label}
              {cat.count !== undefined && <span className="ml-1.5 opacity-80">({cat.count})</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProjects.map((project) => {
          const placeholderVariant =
            project.category === "infrastructure"
              ? "site-clearing"
              : project.category === "commercial"
              ? "tree-specimen"
              : "nursery-propagation";

          return (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="bg-[#0a170d]/80 rounded-2xl p-5 sm:p-6 flex flex-col justify-between group cursor-pointer border border-white/8 hover:border-[#22c55e]/40 transition-all duration-300"
            >
              <div>
                <div className="mb-4 rounded-xl overflow-hidden border border-white/8">
                  <MediaPlaceholder
                    variant={placeholderVariant}
                    aspect="16/9"
                    title={project.title}
                    subtitle={project.client}
                    badge={project.badge}
                    tag={project.category.toUpperCase()}
                  />
                </div>

                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#4ade80] bg-[#16a34a]/15 px-2 py-0.5 rounded-full border border-[#16a34a]/30">
                    {project.client}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      project.badge === "Ongoing"
                        ? "bg-[#16a34a]/20 text-[#4ade80] border border-[#16a34a]/30"
                        : "bg-white/6 text-[#9aa89b]"
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    {project.badge}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold font-heading text-[#f6f7f4] group-hover:text-[#4ade80] transition-colors leading-snug mb-2">
                  {project.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-[#9aa89b] mb-3">
                  <MapPin className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
                  <span className="line-clamp-1">{project.location}</span>
                </div>

                <p className="text-xs text-[#9aa89b] leading-relaxed line-clamp-3 mb-4">
                  {project.scope}
                </p>
              </div>

              <div className="pt-3 border-t border-white/8 flex items-center justify-between text-xs font-semibold text-[#f59e0b] group-hover:text-[#4ade80] transition-colors">
                <span>View Scope Dossier</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-white/3 border border-white/8 text-[#9aa89b]">
          <p className="text-sm">No projects matching your search filter.</p>
        </div>
      )}

      {/* Show More / Show Less Toggle */}
      {filteredProjects.length > 6 && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setShowAllProjects(!showAllProjects)}
            className="px-6 py-2.5 rounded-full bg-[#0a170d] hover:bg-[#0f2413] border border-[#22c55e]/30 hover:border-[#22c55e] text-xs font-semibold tracking-wider text-[#f6f7f4] transition-all cursor-pointer shadow-sm"
          >
            {showAllProjects
              ? `Show Less (Top 6)`
              : `View All ${filteredProjects.length} Verified Portfolios`}
          </button>
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
