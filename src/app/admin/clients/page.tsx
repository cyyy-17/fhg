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
  Building2,
  MoveUp,
  MoveDown,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminModal from "@/components/admin/AdminModal";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import { getAdminMutationHeaders } from "@/lib/csrf-client";
import type { ClientItem } from "@/data/clients";

const SECTORS = [
  "Infrastructure & Heavy Construction",
  "Real Estate & Commercial",
  "Energy & Industrial",
  "Government & Financial",
] as const;

export default function AdminClientsPage() {
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState<string>("all");
  const [editingItem, setEditingItem] = useState<ClientItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [itemToDelete, setItemToDelete] = useState<ClientItem | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch("/api/admin/data?section=clients")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch clients.");
        return res.json();
      })
      .then((json) => {
        if (mounted && json.data) {
          setClients(json.data);
        }
      })
      .catch(() => {
        if (mounted) setError("Failed to fetch clients.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  async function saveClientsToApi(updatedList: ClientItem[]) {
    setIsSaving(true);
    setFeedback(null);
    setError(null);
    try {
      const headers = await getAdminMutationHeaders();
      const res = await fetch("/api/admin/data", {
        method: "PUT",
        headers,
        body: JSON.stringify({ section: "clients", data: updatedList }),
      });

      if (!res.ok) throw new Error("Failed to save client partners.");

      setClients(updatedList);
      setFeedback("Client portfolio updated successfully.");
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
    const newItem: ClientItem = {
      id: `client-${Date.now()}`,
      name: "New Enterprise Partner",
      sector: "Real Estate & Commercial",
      projectSample: "Commercial Development Tree Relocation & Replacement",
    };
    setEditingItem(newItem);
    setIsCreating(true);
  }

  function handleSaveModalForm(e: React.FormEvent) {
    e.preventDefault();
    if (!editingItem) return;

    let next: ClientItem[];
    if (isCreating) {
      next = [editingItem, ...clients];
    } else {
      next = clients.map((c) => (c.id === editingItem.id ? editingItem : c));
    }
    saveClientsToApi(next);
  }

  async function handleConfirmDelete() {
    if (!itemToDelete) return;
    const next = clients.filter((c) => c.id !== itemToDelete.id);
    await saveClientsToApi(next);
    setItemToDelete(null);
  }

  function handleMove(index: number, direction: "up" | "down") {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= clients.length) return;

    const next = [...clients];
    const temp = next[index];
    next[index] = next[target];
    next[target] = temp;
    saveClientsToApi(next);
  }

  const filtered = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.projectSample.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.sector.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSector = sectorFilter === "all" ? true : c.sector === sectorFilter;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Client & Partner Portfolio"
        subtitle={`Enterprise developers, government agencies, and general contractors (${clients.length} Total).`}
        actionButton={
          <button
            type="button"
            onClick={handleCreateNew}
            className="px-4 py-2 rounded-lg bg-linear-to-r from-[#15803d] to-[#16a34a] hover:from-[#16a34a] hover:to-[#22c55e] text-[#f6f7f4] text-xs font-semibold shadow-lg shadow-green-950/40 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Client Partner</span>
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
            placeholder="Search by client or project sample..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
          />
        </div>

        <select
          value={sectorFilter}
          onChange={(e) => setSectorFilter(e.target.value)}
          className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
        >
          <option value="all">All Industry Sectors</option>
          {SECTORS.map((sec) => (
            <option key={sec} value={sec}>
              {sec}
            </option>
          ))}
        </select>
      </div>

      {/* Clients Table */}
      {loading ? (
        <div className="py-12 text-center text-xs text-[#9aa89b]">Loading client roster...</div>
      ) : (
        <div className="bg-[#0a170d] border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#f6f7f4]">
              <thead className="border-b border-white/10 font-mono uppercase text-[10px] text-[#9aa89b] bg-[#08130a]">
                <tr>
                  <th className="py-3 px-4">Client Organization</th>
                  <th className="py-3 px-4">Industry Sector</th>
                  <th className="py-3 px-4">Representative Contract</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#22c55e] shrink-0" />
                        <span className="font-semibold text-sm text-[#f6f7f4]">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-[#4ade80]">
                      {item.sector}
                    </td>
                    <td className="py-3 px-4 text-[#9aa89b] text-xs max-w-sm">
                      {item.projectSample}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            const idx = clients.findIndex((c) => c.id === item.id);
                            handleMove(idx, "up");
                          }}
                          disabled={clients.findIndex((c) => c.id === item.id) === 0}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#9aa89b] hover:text-white disabled:opacity-30 transition cursor-pointer"
                          title="Move Up"
                        >
                          <MoveUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const idx = clients.findIndex((c) => c.id === item.id);
                            handleMove(idx, "down");
                          }}
                          disabled={clients.findIndex((c) => c.id === item.id) === clients.length - 1}
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
                          title="Edit Client"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setItemToDelete(item)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-[#9aa89b] hover:text-red-400 transition cursor-pointer"
                          title="Delete Client"
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

      {/* Add / Edit Client Modal */}
      {editingItem && (
        <AdminModal
          isOpen={true}
          onClose={() => {
            setEditingItem(null);
            setIsCreating(false);
          }}
          title={isCreating ? "Add Client Partner" : `Edit ${editingItem.name}`}
          subtitle="Add or update corporate developers, EPC contractors, or public agencies."
          maxWidth="md"
        >
          <form onSubmit={handleSaveModalForm} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                Client / Organization Name
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
                Sector Classification
              </label>
              <select
                value={editingItem.sector}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    sector: e.target.value as ClientItem["sector"],
                  })
                }
                className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
              >
                {SECTORS.map((sec) => (
                  <option key={sec} value={sec}>
                    {sec}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                Representative Project Contract
              </label>
              <textarea
                rows={3}
                required
                value={editingItem.projectSample}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, projectSample: e.target.value })
                }
                className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
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
                  <span>{isCreating ? "Add Partner" : "Save Changes"}</span>
                )}
              </button>
            </div>
          </form>
        </AdminModal>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(itemToDelete)}
        onClose={() => setItemToDelete(null)}
        onConfirm={handleConfirmDelete}
        itemTitle={itemToDelete?.name || "client partner"}
        itemType="client partner"
      />
    </div>
  );
}
