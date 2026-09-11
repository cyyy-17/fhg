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
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminModal from "@/components/admin/AdminModal";
import type { ServiceItem } from "@/data/services";

const AVAILABLE_ICONS = [
  "TreePine",
  "Axe",
  "Palmtree",
  "ClipboardCheck",
  "Sprout",
  "Mountain",
  "Flower2",
  "Layers",
] as const;

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch("/api/admin/data?section=services")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch services.");
        return res.json();
      })
      .then((json) => {
        if (mounted && json.data) {
          setServices(json.data);
        }
      })
      .catch(() => {
        if (mounted) setError("Failed to fetch services.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  async function saveServicesToApi(updatedList: ServiceItem[]) {
    setIsSaving(true);
    setFeedback(null);
    setError(null);
    try {
      const res = await fetch("/api/admin/data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "services", data: updatedList }),
      });

      if (!res.ok) throw new Error("Failed to save changes.");

      setServices(updatedList);
      setFeedback("Services portfolio successfully saved.");
      setEditingItem(null);
      setIsCreating(false);
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setIsSaving(false);
    }
  }

  function handleCreateNew() {
    const newItem: ServiceItem = {
      id: `service-${Date.now()}`,
      title: "New Arboricultural Service",
      category: "Heavy Rigging",
      icon: "TreePine",
      shortDesc: "Comprehensive industrial landscape and tree service specification.",
      metrics: ["Certified Fleet", "Permitted", "Warranty"],
      specs: {
        deliverables: ["Initial technical survey", "Turnkey execution with safety rigging"],
        equipment: ["Registered Chainsaws", "Hydraulic Cranes"],
        permits: ["DENR Tree Removal Clearance"],
        turnaround: "24–48 Hours",
      },
    };
    setEditingItem(newItem);
    setIsCreating(true);
  }

  function handleSaveModalForm(e: React.FormEvent) {
    e.preventDefault();
    if (!editingItem) return;

    let next: ServiceItem[];
    if (isCreating) {
      next = [...services, editingItem];
    } else {
      next = services.map((s) => (s.id === editingItem.id ? editingItem : s));
    }
    saveServicesToApi(next);
  }

  function handleDelete(id: string) {
    if (!confirm("Are you sure you want to remove this service from public listing?")) return;
    const next = services.filter((s) => s.id !== id);
    saveServicesToApi(next);
  }

  const filtered = services.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.shortDesc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Industrial Services & Specifications"
        subtitle="Manage services, technical deliverables, heavy equipment allocations, and permits."
        actionButton={
          <button
            type="button"
            onClick={handleCreateNew}
            className="px-4 py-2 rounded-lg bg-linear-to-r from-[#15803d] to-[#16a34a] hover:from-[#16a34a] hover:to-[#22c55e] text-[#f6f7f4] text-xs font-semibold shadow-lg shadow-green-950/40 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
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

      {/* Search Bar */}
      <div className="p-3 bg-[#0a170d] border border-white/10 rounded-xl flex items-center gap-3">
        <Search className="w-4 h-4 text-[#9aa89b]" />
        <input
          type="text"
          placeholder="Filter by service name, category, or deliverables..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-xs text-[#f6f7f4] focus:outline-none"
        />
      </div>

      {/* Services Table */}
      {loading ? (
        <div className="py-12 text-center text-xs text-[#9aa89b]">Loading service catalog...</div>
      ) : (
        <div className="bg-[#0a170d] border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#f6f7f4]">
              <thead className="border-b border-white/10 font-mono uppercase text-[10px] text-[#9aa89b] bg-[#08130a]">
                <tr>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Key Metrics</th>
                  <th className="py-3 px-4">Turnaround</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-sm text-[#f6f7f4]">{item.title}</div>
                      <div className="text-[11px] text-[#9aa89b] max-w-sm truncate mt-0.5">
                        {item.shortDesc}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#22c55e] border border-white/10">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {item.metrics.map((m, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#9aa89b]"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-[#fbbf24]">
                      {item.specs.turnaround}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setEditingItem(JSON.parse(JSON.stringify(item)));
                            setIsCreating(false);
                          }}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-[#22c55e]/20 text-[#9aa89b] hover:text-[#4ade80] transition cursor-pointer"
                          title="Edit Service"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-[#9aa89b] hover:text-red-400 transition cursor-pointer"
                          title="Delete Service"
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

      {/* Add / Edit Service Modal */}
      {editingItem && (
        <AdminModal
          isOpen={true}
          onClose={() => {
            setEditingItem(null);
            setIsCreating(false);
          }}
          title={isCreating ? "Add New Service Specification" : `Edit ${editingItem.title}`}
          subtitle="Configure specifications, equipment allocations, and statutory permits."
          maxWidth="3xl"
        >
          <form onSubmit={handleSaveModalForm} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Service Title
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
                  Category Tag
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Icon Identifier
                </label>
                <select
                  value={editingItem.icon}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      icon: e.target.value as ServiceItem["icon"],
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
                >
                  {AVAILABLE_ICONS.map((ic) => (
                    <option key={ic} value={ic}>
                      {ic}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Turnaround SLA
                </label>
                <input
                  type="text"
                  value={editingItem.specs.turnaround}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      specs: { ...editingItem.specs, turnaround: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingItem.shortDesc}
                  onChange={(e) => setEditingItem({ ...editingItem, shortDesc: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Key Metrics (Comma Separated)
                </label>
                <input
                  type="text"
                  value={editingItem.metrics.join(", ")}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      metrics: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="e.g. 25T–50T Cranes, 98.7% Survival, 12-Mo Warranty"
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Scope Deliverables (One per line)
                </label>
                <textarea
                  rows={3}
                  value={editingItem.specs.deliverables.join("\n")}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      specs: {
                        ...editingItem.specs,
                        deliverables: e.target.value.split("\n").filter((l) => l.trim()),
                      },
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Allocated Equipment Fleet (One per line)
                </label>
                <textarea
                  rows={3}
                  value={editingItem.specs.equipment.join("\n")}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      specs: {
                        ...editingItem.specs,
                        equipment: e.target.value.split("\n").filter((l) => l.trim()),
                      },
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Mandatory Statutory Permits (One per line)
                </label>
                <textarea
                  rows={3}
                  value={editingItem.specs.permits.join("\n")}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      specs: {
                        ...editingItem.specs,
                        permits: e.target.value.split("\n").filter((l) => l.trim()),
                      },
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
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
                  <span>{isCreating ? "Add Service" : "Save Changes"}</span>
                )}
              </button>
            </div>
          </form>
        </AdminModal>
      )}
    </div>
  );
}
