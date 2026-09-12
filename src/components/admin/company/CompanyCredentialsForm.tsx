"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, MoveUp, MoveDown, ShieldCheck, Check, X } from "lucide-react";
import type { CompanyData } from "@/types/admin";

interface CompanyCredentialsFormProps {
  data: CompanyData;
  onChange: (data: CompanyData) => void;
}

type CredentialItem = CompanyData["credentials"][number];

export default function CompanyCredentialsForm({ data, onChange }: CompanyCredentialsFormProps) {
  const credentials = data.credentials || [];
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<CredentialItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  function handleStartAdd() {
    setIsCreating(true);
    setEditingIndex(null);
    setEditingItem({
      title: "",
      detail: "",
    });
  }

  function handleStartEdit(index: number) {
    setEditingIndex(index);
    setIsCreating(false);
    setEditingItem({ ...credentials[index] });
  }

  function handleCancel() {
    setEditingIndex(null);
    setEditingItem(null);
    setIsCreating(false);
  }

  function handleSaveCurrent() {
    if (!editingItem || !editingItem.title.trim()) return;

    let updated: CredentialItem[];
    if (isCreating) {
      updated = [...credentials, editingItem];
    } else if (editingIndex !== null) {
      updated = [...credentials];
      updated[editingIndex] = editingItem;
    } else {
      return;
    }

    onChange({
      ...data,
      credentials: updated,
    });

    handleCancel();
  }

  function handleDelete(index: number) {
    if (!confirm("Are you sure you want to remove this credential record?")) return;
    const updated = credentials.filter((_, idx) => idx !== index);
    onChange({
      ...data,
      credentials: updated,
    });
    if (editingIndex === index) {
      handleCancel();
    }
  }

  function handleMove(index: number, direction: "up" | "down") {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= credentials.length) return;

    const next = [...credentials];
    const temp = next[index];
    next[index] = next[target];
    next[target] = temp;

    onChange({
      ...data,
      credentials: next,
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div>
          <h3 className="text-sm font-bold font-heading text-[#f6f7f4] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#22c55e]" />
            <span>Enterprise &amp; Statutory Credentials ({credentials.length})</span>
          </h3>
          <p className="text-xs text-[#9aa89b] mt-0.5">
            Manage official qualification statements, statutory licenses, and corporate registrations displayed in the Company Profile Hub.
          </p>
        </div>
        {!isCreating && (
          <button
            type="button"
            onClick={handleStartAdd}
            className="px-3.5 py-1.5 rounded-lg bg-linear-to-r from-[#15803d] to-[#16a34a] hover:from-[#16a34a] hover:to-[#22c55e] text-[#f6f7f4] text-xs font-semibold shadow-md transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Credential</span>
          </button>
        )}
      </div>

      {/* Inline Create / Edit Drawer */}
      {editingItem && (
        <div className="p-4 rounded-xl bg-[#08130a] border border-[#22c55e]/30 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs font-mono uppercase text-[#22c55e] font-semibold">
              {isCreating ? "Add New Statutory Credential" : `Edit Credential #${(editingIndex ?? 0) + 1}`}
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

          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-[#9aa89b] mb-1">
                Credential Title *
              </label>
              <input
                type="text"
                required
                value={editingItem.title}
                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                placeholder="e.g. DENR Registered Chainsaw Fleet (90 Units)"
                className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-semibold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[#9aa89b] mb-1">
                Statutory Detail &amp; Scope Summary *
              </label>
              <textarea
                rows={3}
                required
                value={editingItem.detail}
                onChange={(e) => setEditingItem({ ...editingItem, detail: e.target.value })}
                placeholder="Describe the registration specifics, authorities, RA reference, or certificate numbers..."
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
              disabled={!editingItem.title.trim() || !editingItem.detail.trim()}
              className="px-4 py-1.5 rounded-lg bg-linear-to-r from-[#15803d] to-[#16a34a] hover:from-[#16a34a] hover:to-[#22c55e] text-[#f6f7f4] text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isCreating ? "Add to List" : "Apply Edit"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Credentials List */}
      {credentials.length === 0 ? (
        <div className="py-10 text-center text-xs text-[#9aa89b] border border-dashed border-white/10 rounded-xl">
          No statutory credentials currently listed. Click &quot;Add Credential&quot; to add one.
        </div>
      ) : (
        <div className="space-y-3">
          {credentials.map((cred, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                editingIndex === idx
                  ? "bg-[#08130a] border-[#22c55e]/40"
                  : "bg-[#050e07] border-white/10 hover:border-white/20"
              }`}
            >
              <div className="space-y-1 min-w-0 flex-1">
                <h4 className="font-semibold text-sm text-[#f6f7f4]">{cred.title}</h4>
                <p className="text-xs text-[#9aa89b] leading-relaxed line-clamp-3">{cred.detail}</p>
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
                  disabled={idx === credentials.length - 1}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#9aa89b] hover:text-white disabled:opacity-30 transition cursor-pointer"
                  title="Move Down"
                >
                  <MoveDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleStartEdit(idx)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-[#22c55e]/20 text-[#9aa89b] hover:text-[#4ade80] transition cursor-pointer"
                  title="Edit Credential"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(idx)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-[#9aa89b] hover:text-red-400 transition cursor-pointer"
                  title="Delete Credential"
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
