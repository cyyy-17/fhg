"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, MoveUp, MoveDown, Award, Check, X } from "lucide-react";
import type { CompanyData } from "@/types/admin";

interface CompanyAwardsFormProps {
  data: CompanyData;
  onChange: (data: CompanyData) => void;
}

type AwardItem = CompanyData["awards"][number];

export default function CompanyAwardsForm({ data, onChange }: CompanyAwardsFormProps) {
  const awards = data.awards || [];
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<AwardItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  function handleStartAdd() {
    setIsCreating(true);
    setEditingIndex(null);
    setEditingItem({
      title: "",
      conferredBy: "",
      date: new Date().getFullYear().toString(),
      project: "",
      detail: "",
    });
  }

  function handleStartEdit(index: number) {
    setEditingIndex(index);
    setIsCreating(false);
    setEditingItem({ ...awards[index] });
  }

  function handleCancel() {
    setEditingIndex(null);
    setEditingItem(null);
    setIsCreating(false);
  }

  function handleSaveCurrent() {
    if (!editingItem || !editingItem.title.trim()) return;

    let updated: AwardItem[];
    if (isCreating) {
      updated = [...awards, editingItem];
    } else if (editingIndex !== null) {
      updated = [...awards];
      updated[editingIndex] = editingItem;
    } else {
      return;
    }

    onChange({
      ...data,
      awards: updated,
    });

    handleCancel();
  }

  function handleDelete(index: number) {
    if (!confirm("Are you sure you want to remove this award record?")) return;
    const updated = awards.filter((_, idx) => idx !== index);
    onChange({
      ...data,
      awards: updated,
    });
    if (editingIndex === index) {
      handleCancel();
    }
  }

  function handleMove(index: number, direction: "up" | "down") {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= awards.length) return;

    const next = [...awards];
    const temp = next[index];
    next[index] = next[target];
    next[target] = temp;

    onChange({
      ...data,
      awards: next,
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div>
          <h3 className="text-sm font-bold font-heading text-[#f6f7f4] flex items-center gap-2">
            <Award className="w-4 h-4 text-[#f59e0b]" />
            <span>Official Awards &amp; Special Citations ({awards.length})</span>
          </h3>
          <p className="text-xs text-[#9aa89b] mt-0.5">
            Manage honors, safety plaques, and statutory site awards displayed on the public Company Profile.
          </p>
        </div>
        {!isCreating && (
          <button
            type="button"
            onClick={handleStartAdd}
            className="px-3.5 py-1.5 rounded-lg bg-linear-to-r from-[#15803d] to-[#16a34a] hover:from-[#16a34a] hover:to-[#22c55e] text-[#f6f7f4] text-xs font-semibold shadow-md transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Award</span>
          </button>
        )}
      </div>

      {/* Inline Create / Edit Drawer */}
      {editingItem && (
        <div className="p-4 rounded-xl bg-[#08130a] border border-[#22c55e]/30 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs font-mono uppercase text-[#22c55e] font-semibold">
              {isCreating ? "Add New Award or Citation" : `Edit Award #${(editingIndex ?? 0) + 1}`}
            </span>
            <button
              type="button"
              onClick={handleCancel}
              className="p-1 rounded text-[#9aa89b] hover:text-white transition cursor-pointer"
              title="Cancel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-mono uppercase text-[#9aa89b] mb-1">
                Award Title / Citation Name *
              </label>
              <input
                type="text"
                required
                value={editingItem.title}
                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                placeholder="e.g. 3,000,000 Safe Manhours Without Lost Time Incident (LTI)"
                className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-semibold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[#9aa89b] mb-1">
                Conferring Authority / Organization
              </label>
              <input
                type="text"
                value={editingItem.conferredBy}
                onChange={(e) => setEditingItem({ ...editingItem, conferredBy: e.target.value })}
                placeholder="e.g. Giga ACE 6, Inc. or DENR"
                className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[#9aa89b] mb-1">
                Conferment Date
              </label>
              <input
                type="text"
                value={editingItem.date}
                onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                placeholder="e.g. January 21, 2026 or 2015"
                className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-mono uppercase text-[#9aa89b] mb-1">
                Related Project or Scope
              </label>
              <input
                type="text"
                value={editingItem.project}
                onChange={(e) => setEditingItem({ ...editingItem, project: e.target.value })}
                placeholder="e.g. Quezon North Wind Project"
                className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-mono uppercase text-[#9aa89b] mb-1">
                Citation Details &amp; Summary
              </label>
              <textarea
                rows={3}
                value={editingItem.detail}
                onChange={(e) => setEditingItem({ ...editingItem, detail: e.target.value })}
                placeholder="Full citation description or plaque text..."
                className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none leading-relaxed"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={handleCancel}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-[#9aa89b] hover:text-white transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveCurrent}
              disabled={!editingItem.title.trim()}
              className="px-4 py-1.5 rounded-lg bg-linear-to-r from-[#15803d] to-[#16a34a] hover:from-[#16a34a] hover:to-[#22c55e] text-[#f6f7f4] text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isCreating ? "Add to List" : "Apply Edit"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Awards List */}
      {awards.length === 0 ? (
        <div className="py-10 text-center text-xs text-[#9aa89b] border border-dashed border-white/10 rounded-xl">
          No awards or citations currently listed. Click &quot;Add Award&quot; to register honors.
        </div>
      ) : (
        <div className="space-y-3">
          {awards.map((award, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                editingIndex === idx
                  ? "bg-[#08130a] border-[#22c55e]/40"
                  : "bg-[#050e07] border-white/10 hover:border-white/20"
              }`}
            >
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    {award.date || "Award"}
                  </span>
                  <h4 className="font-semibold text-sm text-[#f6f7f4]">{award.title}</h4>
                </div>
                <div className="text-xs text-[#4ade80] font-medium">
                  {award.conferredBy}
                  {award.project && (
                    <span className="text-[#9aa89b] font-normal"> • Project: {award.project}</span>
                  )}
                </div>
                {award.detail && (
                  <p className="text-xs text-[#9aa89b] line-clamp-2 leading-relaxed">
                    {award.detail}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => handleMove(idx, "up")}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#9aa89b] hover:text-white disabled:opacity-30 transition cursor-pointer"
                  title="Move Up"
                >
                  <MoveUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(idx, "down")}
                  disabled={idx === awards.length - 1}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#9aa89b] hover:text-white disabled:opacity-30 transition cursor-pointer"
                  title="Move Down"
                >
                  <MoveDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleStartEdit(idx)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-[#22c55e]/20 text-[#9aa89b] hover:text-[#4ade80] transition cursor-pointer"
                  title="Edit Award"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(idx)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-[#9aa89b] hover:text-red-400 transition cursor-pointer"
                  title="Delete Award"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-[11px] font-mono text-[#9aa89b] italic">
        *Changes made above take effect immediately in the preview. Click &quot;Save Company Profile&quot; at top right to persist permanently.
      </p>
    </div>
  );
}
