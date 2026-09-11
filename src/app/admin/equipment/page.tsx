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
  ShieldCheck,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminModal from "@/components/admin/AdminModal";
import type { EquipmentItem, EquipmentCategory } from "@/data/equipment";

const CATEGORIES: { label: string; value: EquipmentCategory | "all" }[] = [
  { label: "All Machinery", value: "all" },
  { label: "Chainsaws & Rigging", value: "chainsaws" },
  { label: "Heavy Lifting & Cranes", value: "heavy-lift" },
  { label: "Excavation & Root Balling", value: "excavation" },
  { label: "Chippers & Processing", value: "processing" },
  { label: "Irrigation & Water Tankers", value: "irrigation" },
];

export default function AdminEquipmentPage() {
  const [fleet, setFleet] = useState<EquipmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<EquipmentCategory | "all">("all");
  const [editingItem, setEditingItem] = useState<EquipmentItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch("/api/admin/data?section=equipment")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch equipment fleet.");
        return res.json();
      })
      .then((json) => {
        if (mounted && json.data) {
          setFleet(json.data);
        }
      })
      .catch(() => {
        if (mounted) setError("Failed to fetch equipment fleet.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  async function saveFleetToApi(updatedList: EquipmentItem[]) {
    setIsSaving(true);
    setFeedback(null);
    setError(null);
    try {
      const res = await fetch("/api/admin/data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "equipment", data: updatedList }),
      });

      if (!res.ok) throw new Error("Failed to save fleet changes.");

      setFleet(updatedList);
      setFeedback("Equipment fleet records successfully updated.");
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
    const newItem: EquipmentItem = {
      id: `equip-${Date.now()}`,
      name: "New Heavy Forestry Equipment",
      category: "chainsaws",
      model: "Industrial Heavy Model",
      quantity: "1 Unit Operational",
      capacity: "Heavy Commercial Specification",
      compliance: "DENR / DOLE Safety Compliant",
      primaryRole: "Arboricultural felling and civil transport operations.",
      status: "Active Fleet",
    };
    setEditingItem(newItem);
    setIsCreating(true);
  }

  function handleSaveModalForm(e: React.FormEvent) {
    e.preventDefault();
    if (!editingItem) return;

    let next: EquipmentItem[];
    if (isCreating) {
      next = [...fleet, editingItem];
    } else {
      next = fleet.map((f) => (f.id === editingItem.id ? editingItem : f));
    }
    saveFleetToApi(next);
  }

  function handleDelete(id: string) {
    if (!confirm("Are you sure you want to remove this equipment item from the active fleet roster?"))
      return;
    const next = fleet.filter((f) => f.id !== id);
    saveFleetToApi(next);
  }

  const filtered = fleet.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.compliance.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.primaryRole.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === "all" ? true : item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Heavy Machinery & Chainsaw Fleet"
        subtitle={`Registered forestry chainsaws, cranes, excavators, and logistical support (${fleet.length} Units).`}
        actionButton={
          <button
            type="button"
            onClick={handleCreateNew}
            className="px-4 py-2 rounded-lg bg-linear-to-r from-[#15803d] to-[#16a34a] hover:from-[#16a34a] hover:to-[#22c55e] text-[#f6f7f4] text-xs font-semibold shadow-lg shadow-green-950/40 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Equipment</span>
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
      <div className="p-3 bg-[#0a170d] border border-white/10 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#9aa89b] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by equipment, model, or compliance..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as EquipmentCategory | "all")}
          className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Equipment Table */}
      {loading ? (
        <div className="py-12 text-center text-xs text-[#9aa89b]">Loading equipment fleet...</div>
      ) : (
        <div className="bg-[#0a170d] border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#f6f7f4]">
              <thead className="border-b border-white/10 font-mono uppercase text-[10px] text-[#9aa89b] bg-[#08130a]">
                <tr>
                  <th className="py-3 px-4">Equipment & Model</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Quantity / Capacity</th>
                  <th className="py-3 px-4">Regulatory Compliance</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition">
                    <td className="py-3 px-4 max-w-xs">
                      <div className="font-semibold text-sm text-[#f6f7f4]">{item.name}</div>
                      <div className="text-[11px] text-[#22c55e] font-mono">{item.model}</div>
                      <div className="text-[11px] text-[#9aa89b] line-clamp-1 mt-0.5">
                        {item.primaryRole}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#9aa89b] border border-white/10 uppercase">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-xs">
                      <div className="font-semibold text-[#fbbf24]">{item.quantity}</div>
                      <div className="text-[10px] text-[#9aa89b]">{item.capacity}</div>
                    </td>
                    <td className="py-3 px-4 text-[#9aa89b] text-[11px] max-w-xs">
                      <div className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
                        <span className="line-clamp-2">{item.compliance}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setEditingItem(JSON.parse(JSON.stringify(item)));
                            setIsCreating(false);
                          }}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-[#22c55e]/20 text-[#9aa89b] hover:text-[#4ade80] transition cursor-pointer"
                          title="Edit Equipment"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-[#9aa89b] hover:text-red-400 transition cursor-pointer"
                          title="Delete Equipment"
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

      {/* Add / Edit Equipment Modal */}
      {editingItem && (
        <AdminModal
          isOpen={true}
          onClose={() => {
            setEditingItem(null);
            setIsCreating(false);
          }}
          title={isCreating ? "Add Heavy Equipment Item" : `Edit ${editingItem.name}`}
          subtitle="Configure machinery specifications, capacity ratings, and government permits."
          maxWidth="2xl"
        >
          <form onSubmit={handleSaveModalForm} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Equipment Official Name
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Equipment Category
                </label>
                <select
                  value={editingItem.category}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      category: e.target.value as EquipmentCategory,
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
                >
                  <option value="chainsaws">Chainsaws & Rigging</option>
                  <option value="heavy-lift">Heavy Lift & Cranes</option>
                  <option value="excavation">Excavation & Root Balling</option>
                  <option value="processing">Wood Chippers & Processing</option>
                  <option value="irrigation">Water Tankers & Irrigation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Model / Series Designation
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.model}
                  onChange={(e) => setEditingItem({ ...editingItem, model: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Fleet Quantity
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.quantity}
                  onChange={(e) => setEditingItem({ ...editingItem, quantity: e.target.value })}
                  placeholder="e.g. 90 Units Registered"
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs focus:ring-1 focus:ring-[#22c55e] outline-none font-mono text-[#fbbf24]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Capacity / Power Rating
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.capacity}
                  onChange={(e) => setEditingItem({ ...editingItem, capacity: e.target.value })}
                  placeholder='e.g. 50-Ton Capacity • 42m Boom'
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Regulatory Compliance & Authority
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.compliance}
                  onChange={(e) => setEditingItem({ ...editingItem, compliance: e.target.value })}
                  placeholder="e.g. DENR-CENRO Lipa Registered (Cross-Jurisdiction Authority)"
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Primary Tactical Role
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.primaryRole}
                  onChange={(e) => setEditingItem({ ...editingItem, primaryRole: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
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
                  <span>{isCreating ? "Add Equipment" : "Save Changes"}</span>
                )}
              </button>
            </div>
          </form>
        </AdminModal>
      )}
    </div>
  );
}
