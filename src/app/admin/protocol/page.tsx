"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MoveUp,
  MoveDown,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminModal from "@/components/admin/AdminModal";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import { getAdminMutationHeaders } from "@/lib/csrf-client";
import type { ProtocolStep } from "@/data/protocol";

export default function AdminProtocolPage() {
  const [steps, setSteps] = useState<ProtocolStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<ProtocolStep | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stepIndexToDelete, setStepIndexToDelete] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch("/api/admin/data?section=protocol")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch turnkey protocol.");
        return res.json();
      })
      .then((json) => {
        if (mounted && json.data) {
          setSteps(json.data);
        }
      })
      .catch(() => {
        if (mounted) setError("Failed to fetch turnkey protocol.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  async function saveProtocolToApi(updatedList: ProtocolStep[]) {
    setIsSaving(true);
    setFeedback(null);
    setError(null);
    try {
      const headers = await getAdminMutationHeaders();
      const res = await fetch("/api/admin/data", {
        method: "PUT",
        headers,
        body: JSON.stringify({ section: "protocol", data: updatedList }),
      });

      if (!res.ok) throw new Error("Failed to save protocol steps.");

      setSteps(updatedList);
      setFeedback("Turnkey protocol updated successfully.");
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
    const nextStepNum = (steps.length + 1).toString().padStart(2, "0");
    const newItem: ProtocolStep = {
      step: nextStepNum,
      title: "New Arboricultural Protocol Phase",
      badge: `Phase ${steps.length + 1}: Technical Execution`,
      desc: "Detailed operational step description outlining methods and environmental compliance.",
      deliverables: ["Key deliverable milestone item", "Certified statutory compliance dossier"],
    };
    setEditingItem(newItem);
    setEditingIndex(null);
    setIsCreating(true);
  }

  function handleSaveModalForm(e: React.FormEvent) {
    e.preventDefault();
    if (!editingItem) return;

    let next: ProtocolStep[];
    if (isCreating) {
      next = [...steps, editingItem];
    } else if (editingIndex !== null) {
      next = [...steps];
      next[editingIndex] = editingItem;
    } else {
      next = steps.map((s) => (s.step === editingItem.step ? editingItem : s));
    }
    saveProtocolToApi(next);
  }

  async function handleConfirmDeleteStep() {
    if (stepIndexToDelete === null) return;
    const next = steps.filter((_, i) => i !== stepIndexToDelete);
    const renumbered = next.map((s, idx) => ({
      ...s,
      step: (idx + 1).toString().padStart(2, "0"),
    }));
    await saveProtocolToApi(renumbered);
    setStepIndexToDelete(null);
  }

  function handleMove(index: number, direction: "up" | "down") {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= steps.length) return;

    const next = [...steps];
    const temp = next[index];
    next[index] = next[targetIndex];
    next[targetIndex] = temp;

    // renumber step property
    const renumbered = next.map((s, idx) => ({
      ...s,
      step: (idx + 1).toString().padStart(2, "0"),
    }));

    saveProtocolToApi(renumbered);
  }

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Turnkey Operations Protocol"
        subtitle="Manage the 4-phase statutory assessment, permitting, earthballing, and turnover protocol."
        actionButton={
          <button
            type="button"
            onClick={handleCreateNew}
            className="px-4 py-2 rounded-lg bg-linear-to-r from-[#15803d] to-[#16a34a] hover:from-[#16a34a] hover:to-[#22c55e] text-[#f6f7f4] text-xs font-semibold shadow-lg shadow-green-950/40 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Protocol Step</span>
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

      {/* Protocol Steps List */}
      {loading ? (
        <div className="py-12 text-center text-xs text-[#9aa89b]">Loading protocol steps...</div>
      ) : (
        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-[#0a170d] border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
            >
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-xl bg-[#08130a] border border-white/10 flex items-center justify-center font-mono font-bold text-lg text-[#22c55e] shrink-0">
                  {step.step}
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    {step.badge}
                  </div>
                  <h3 className="text-base font-bold text-[#f6f7f4] tracking-tight">{step.title}</h3>
                  <p className="text-xs text-[#9aa89b] leading-relaxed">{step.desc}</p>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {step.deliverables.map((d, dIdx) => (
                      <span
                        key={dIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#f6f7f4] border border-white/10 flex items-center gap-1"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                        <span>{d}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                <button
                  onClick={() => handleMove(idx, "up")}
                  disabled={idx === 0}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#9aa89b] hover:text-white disabled:opacity-30 cursor-pointer"
                  title="Move up"
                >
                  <MoveUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleMove(idx, "down")}
                  disabled={idx === steps.length - 1}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#9aa89b] hover:text-white disabled:opacity-30 cursor-pointer"
                  title="Move down"
                >
                  <MoveDown className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    setEditingItem(JSON.parse(JSON.stringify(step)));
                    setEditingIndex(idx);
                    setIsCreating(false);
                  }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-[#22c55e]/20 text-[#9aa89b] hover:text-[#4ade80] cursor-pointer"
                  title="Edit Step"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                        <button
                          onClick={() => setStepIndexToDelete(idx)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-[#9aa89b] hover:text-red-400 transition cursor-pointer"
                          title="Delete Step"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Protocol Step Modal */}
      {editingItem && (
        <AdminModal
          isOpen={true}
          onClose={() => {
            setEditingItem(null);
            setIsCreating(false);
          }}
          title={isCreating ? "Add Protocol Phase" : `Edit Step ${editingItem.step}`}
          subtitle="Configure phase deliverables, methodology summary, and sequence badge."
          maxWidth="2xl"
        >
          <form onSubmit={handleSaveModalForm} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Phase Number
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.step}
                  onChange={(e) => setEditingItem({ ...editingItem, step: e.target.value })}
                  placeholder="e.g. 01"
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] font-mono focus:ring-1 focus:ring-[#22c55e] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Phase Category Badge
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.badge}
                  onChange={(e) => setEditingItem({ ...editingItem, badge: e.target.value })}
                  placeholder="e.g. Phase 1: Compliance Assessment"
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Phase Title
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] font-semibold focus:ring-1 focus:ring-[#22c55e] outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Methodology Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.desc}
                  onChange={(e) => setEditingItem({ ...editingItem, desc: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none leading-relaxed"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Deliverables (One per line)
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingItem.deliverables.join("\n")}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      deliverables: e.target.value.split("\n").filter((l) => l.trim()),
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
                  <span>{isCreating ? "Add Protocol Step" : "Save Changes"}</span>
                )}
              </button>
            </div>
          </form>
        </AdminModal>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={stepIndexToDelete !== null}
        onClose={() => setStepIndexToDelete(null)}
        onConfirm={handleConfirmDeleteStep}
        itemTitle={stepIndexToDelete !== null ? steps[stepIndexToDelete]?.title || "step" : "step"}
        itemType="protocol step"
      />
    </div>
  );
}
