"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
  MoveUp,
  MoveDown,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminModal from "@/components/admin/AdminModal";
import FileUploadWidget from "@/components/admin/FileUploadWidget";
import type { ProjectItem } from "@/data/projects";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [editingItem, setEditingItem] = useState<ProjectItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch("/api/admin/data?section=projects")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch project portfolio.");
        return res.json();
      })
      .then((json) => {
        if (mounted && json.data) {
          setProjects(json.data);
        }
      })
      .catch(() => {
        if (mounted) setError("Failed to fetch project portfolio.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  async function saveProjectsToApi(updatedList: ProjectItem[]) {
    setIsSaving(true);
    setFeedback(null);
    setError(null);
    try {
      const res = await fetch("/api/admin/data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "projects", data: updatedList }),
      });

      if (!res.ok) throw new Error("Failed to save projects.");

      setProjects(updatedList);
      setFeedback("Projects portfolio successfully updated.");
      setEditingItem(null);
      setIsCreating(false);
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save error.");
    } finally {
      setIsSaving(false);
    }
  }

  function handleCreateNew() {
    const newItem: ProjectItem = {
      id: `project-${Date.now()}`,
      client: "New Commercial Client",
      title: "Commercial Arboricultural Project",
      location: "Calabarzon / Metro Manila",
      scope: "Tree clearing, specimen earthballing, GPS tagging, and compensatory seedling supply.",
      category: "commercial",
      badge: "Ongoing",
    };
    setEditingItem(newItem);
    setIsCreating(true);
  }

  function handleSaveModalForm(e: React.FormEvent) {
    e.preventDefault();
    if (!editingItem) return;

    let next: ProjectItem[];
    if (isCreating) {
      next = [editingItem, ...projects];
    } else {
      next = projects.map((p) => (p.id === editingItem.id ? editingItem : p));
    }
    saveProjectsToApi(next);
  }

  function handleDelete(id: string) {
    if (!confirm("Are you sure you want to permanently remove this project record?")) return;
    const next = projects.filter((p) => p.id !== id);
    saveProjectsToApi(next);
  }

  function handleMove(index: number, direction: "up" | "down") {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= projects.length) return;

    const next = [...projects];
    const temp = next[index];
    next[index] = next[target];
    next[target] = temp;
    saveProjectsToApi(next);
  }

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.scope.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === "all" ? true : p.category === categoryFilter;
    const matchesStatus = statusFilter === "all" ? true : p.badge === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Signature Project Portfolio"
        subtitle={`Manage verified infrastructure contracts, commercial developments, and reforestation sites (${projects.length} Total).`}
        actionButton={
          <button
            type="button"
            onClick={handleCreateNew}
            className="px-4 py-2 rounded-lg bg-linear-to-r from-[#15803d] to-[#16a34a] hover:from-[#16a34a] hover:to-[#22c55e] text-[#f6f7f4] text-xs font-semibold shadow-lg shadow-green-950/40 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </button>
        }
      />

      {feedback && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-3 bg-[#0a170d] border border-white/10 rounded-xl flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#9aa89b] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by project name, developer, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
          >
            <option value="all">All Sectors</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="commercial">Commercial</option>
            <option value="reforestation">Reforestation</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Projects Table */}
      {loading ? (
        <div className="py-12 text-center text-xs text-[#9aa89b]">Loading project track record...</div>
      ) : (
        <div className="bg-[#0a170d] border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#f6f7f4]">
              <thead className="border-b border-white/10 font-mono uppercase text-[10px] text-[#9aa89b] bg-[#08130a]">
                <tr>
                  <th className="py-3 px-4">Project & Client</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Sector</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition">
                    <td className="py-3 px-4 max-w-sm">
                      <div className="flex items-center gap-3">
                        {item.imageUrl ? (
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-[#050e07]">
                            <Image
                              src={item.imageUrl}
                              alt={item.title}
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#9aa89b] shrink-0">
                            <ImageIcon className="w-4 h-4 opacity-50" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="font-semibold text-sm text-[#f6f7f4] truncate">{item.title}</div>
                          <div className="text-[11px] text-[#22c55e] font-medium truncate">{item.client}</div>
                          <div className="text-[11px] text-[#9aa89b] line-clamp-1 mt-0.5">{item.scope}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#9aa89b] text-[11px] max-w-xs">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#22c55e] shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 capitalize font-mono text-[10px] text-[#4ade80]">
                      {item.category}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                          item.badge === "Ongoing"
                            ? "bg-amber-500/20 text-amber-300 border-amber-500/30 font-semibold"
                            : "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                        }`}
                      >
                        {item.badge}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            const idx = projects.findIndex((p) => p.id === item.id);
                            handleMove(idx, "up");
                          }}
                          disabled={projects.findIndex((p) => p.id === item.id) === 0}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#9aa89b] hover:text-white disabled:opacity-30 transition cursor-pointer"
                          title="Move Up"
                        >
                          <MoveUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const idx = projects.findIndex((p) => p.id === item.id);
                            handleMove(idx, "down");
                          }}
                          disabled={projects.findIndex((p) => p.id === item.id) === projects.length - 1}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#9aa89b] hover:text-white disabled:opacity-30 transition cursor-pointer"
                          title="Move Down"
                        >
                          <MoveDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingItem(JSON.parse(JSON.stringify(item)));
                            setIsCreating(false);
                          }}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-[#22c55e]/20 text-[#9aa89b] hover:text-[#4ade80] transition cursor-pointer"
                          title="Edit Project"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-[#9aa89b] hover:text-red-400 transition cursor-pointer"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Project Modal */}
      {editingItem && (
        <AdminModal
          isOpen={true}
          onClose={() => {
            setEditingItem(null);
            setIsCreating(false);
          }}
          title={isCreating ? "Add Signature Project Record" : `Edit ${editingItem.title}`}
          subtitle="Configure developer partner details, technical scope, and project completion standing."
          maxWidth="2xl"
        >
          <form onSubmit={handleSaveModalForm} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Client / Developer Company
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.client}
                  onChange={(e) => setEditingItem({ ...editingItem, client: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Location / Municipality
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.location}
                  onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Sector Category
                </label>
                <select
                  value={editingItem.category}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      category: e.target.value as ProjectItem["category"],
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none capitalize"
                >
                  <option value="infrastructure">Infrastructure</option>
                  <option value="commercial">Commercial</option>
                  <option value="reforestation">Reforestation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Execution Status Badge
                </label>
                <select
                  value={editingItem.badge}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      badge: e.target.value as ProjectItem["badge"],
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
                >
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Project Site Photography */}
              <div className="sm:col-span-2 space-y-2 p-3.5 rounded-xl bg-[#08130a] border border-white/10">
                <label className="block text-xs font-mono uppercase text-[#22c55e] font-semibold">
                  Project Site Photograph
                </label>
                {editingItem.imageUrl ? (
                  <div className="relative aspect-video w-full max-w-sm rounded-xl overflow-hidden border border-white/15 bg-[#050e07] shadow-md">
                    <Image
                      src={editingItem.imageUrl}
                      alt={editingItem.title}
                      fill
                      sizes="380px"
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setEditingItem({ ...editingItem, imageUrl: "" })}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 hover:bg-red-600 text-white transition cursor-pointer"
                      title="Remove image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : null}
                <FileUploadWidget
                  label={editingItem.imageUrl ? "Replace Project Image" : "Upload Project Image"}
                  accept=".jpg,.jpeg,.png,.webp"
                  helperText="Upload a high-resolution field photograph. This replaces the default architectural placeholder on the website and project modal."
                  onUploadComplete={(url) => {
                    setEditingItem({ ...editingItem, imageUrl: url });
                  }}
                />
                <input
                  type="text"
                  value={editingItem.imageUrl || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                  placeholder="Or paste an image URL directly: /images/projects/my-project.jpg or https://..."
                  className="w-full p-2 rounded-lg bg-[#050e07] border border-white/10 text-xs text-[#f6f7f4] font-mono focus:ring-1 focus:ring-[#22c55e] outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Scope of Works & Deliverables
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingItem.scope}
                  onChange={(e) => setEditingItem({ ...editingItem, scope: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none leading-relaxed"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setEditingItem(null);
                  setIsCreating(false);
                }}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-[#f6f7f4] transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-2 rounded-lg bg-linear-to-r from-[#15803d] to-[#16a34a] hover:from-[#16a34a] hover:to-[#22c55e] text-[#f6f7f4] text-xs font-semibold shadow-md transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>{isCreating ? "Add Project" : "Save Changes"}</span>
                )}
              </button>
            </div>
          </form>
        </AdminModal>
      )}
    </div>
  );
}
