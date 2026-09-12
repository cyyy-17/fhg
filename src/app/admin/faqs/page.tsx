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
  Search,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminModal from "@/components/admin/AdminModal";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import { getAdminMutationHeaders } from "@/lib/csrf-client";
import type { FaqItem } from "@/data/faqs";

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingItem, setEditingItem] = useState<FaqItem | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [faqToDeleteIndex, setFaqToDeleteIndex] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch("/api/admin/data?section=faqs")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch FAQs.");
        return res.json();
      })
      .then((json) => {
        if (mounted && json.data) {
          setFaqs(json.data);
        }
      })
      .catch(() => {
        if (mounted) setError("Failed to fetch FAQs.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  async function saveFaqsToApi(updatedList: FaqItem[]) {
    setIsSaving(true);
    setFeedback(null);
    setError(null);
    try {
      const headers = await getAdminMutationHeaders();
      const res = await fetch("/api/admin/data", {
        method: "PUT",
        headers,
        body: JSON.stringify({ section: "faqs", data: updatedList }),
      });

      if (!res.ok) throw new Error("Failed to save FAQs.");

      setFaqs(updatedList);
      setFeedback("FAQ knowledge base updated successfully.");
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
    const newItem: FaqItem = {
      question: "What is the standard procedure for commercial tree contracting?",
      answer: "We conduct initial tree census, secure DENR permits, and mobilize heavy crane rigging.",
    };
    setEditingItem(newItem);
    setEditingIndex(null);
    setIsCreating(true);
  }

  function handleSaveModalForm(e: React.FormEvent) {
    e.preventDefault();
    if (!editingItem) return;

    let next: FaqItem[];
    if (isCreating) {
      next = [...faqs, editingItem];
    } else if (editingIndex !== null) {
      next = [...faqs];
      next[editingIndex] = editingItem;
    } else {
      next = faqs.map((f) => (f.question === editingItem.question ? editingItem : f));
    }
    saveFaqsToApi(next);
  }

  async function handleConfirmDeleteFaq() {
    if (faqToDeleteIndex === null) return;
    const next = faqs.filter((_, i) => i !== faqToDeleteIndex);
    await saveFaqsToApi(next);
    setFaqToDeleteIndex(null);
  }

  function handleMove(index: number, direction: "up" | "down") {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= faqs.length) return;

    const next = [...faqs];
    const temp = next[index];
    next[index] = next[targetIndex];
    next[targetIndex] = temp;
    saveFaqsToApi(next);
  }

  const filtered = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <AdminHeader
        title="FAQ Knowledge Base"
        subtitle={`Official answers to statutory permits, SLA mobilization, and compensatory turnover (${faqs.length} Total).`}
        actionButton={
          <button
            type="button"
            onClick={handleCreateNew}
            className="px-4 py-2 rounded-lg bg-linear-to-r from-[#15803d] to-[#16a34a] hover:from-[#16a34a] hover:to-[#22c55e] text-[#f6f7f4] text-xs font-semibold shadow-lg shadow-green-950/40 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add FAQ</span>
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
          placeholder="Search questions or answers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-xs text-[#f6f7f4] focus:outline-none"
        />
      </div>

      {/* FAQs List */}
      {loading ? (
        <div className="py-12 text-center text-xs text-[#9aa89b]">Loading FAQs...</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((faq, idx) => (
            <div
              key={idx}
              className="bg-[#0a170d] border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-[#16a34a]/20 text-[#22c55e] flex items-center justify-center font-mono text-[10px] font-bold shrink-0">
                    Q
                  </span>
                  <h3 className="text-sm font-bold text-[#f6f7f4]">{faq.question}</h3>
                </div>
                <div className="pl-7 text-xs text-[#9aa89b] leading-relaxed">{faq.answer}</div>
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                <button
                  onClick={() => handleMove(idx, "up")}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#9aa89b] hover:text-white disabled:opacity-30 cursor-pointer"
                  title="Move up"
                >
                  <MoveUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleMove(idx, "down")}
                  disabled={idx === faqs.length - 1}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#9aa89b] hover:text-white disabled:opacity-30 cursor-pointer"
                  title="Move down"
                >
                  <MoveDown className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    setEditingItem(JSON.parse(JSON.stringify(faq)));
                    setEditingIndex(idx);
                    setIsCreating(false);
                  }}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-[#22c55e]/20 text-[#9aa89b] hover:text-[#4ade80] cursor-pointer"
                  title="Edit FAQ"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setFaqToDeleteIndex(idx)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-[#9aa89b] hover:text-red-400 transition cursor-pointer"
                  title="Delete FAQ"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit FAQ Modal */}
      {editingItem && (
        <AdminModal
          isOpen={true}
          onClose={() => {
            setEditingItem(null);
            setIsCreating(false);
          }}
          title={isCreating ? "Add New FAQ" : "Edit Frequently Asked Question"}
          subtitle="Configure statutory permit and contracting answers displayed on public pages."
          maxWidth="2xl"
        >
          <form onSubmit={handleSaveModalForm} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                Question
              </label>
              <input
                type="text"
                required
                value={editingItem.question}
                onChange={(e) => setEditingItem({ ...editingItem, question: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] font-semibold focus:ring-1 focus:ring-[#22c55e] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                Comprehensive Answer
              </label>
              <textarea
                rows={5}
                required
                value={editingItem.answer}
                onChange={(e) => setEditingItem({ ...editingItem, answer: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none leading-relaxed"
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
                  <span>{isCreating ? "Add FAQ" : "Save Changes"}</span>
                )}
              </button>
            </div>
          </form>
        </AdminModal>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={faqToDeleteIndex !== null}
        onClose={() => setFaqToDeleteIndex(null)}
        onConfirm={handleConfirmDeleteFaq}
        itemTitle={faqToDeleteIndex !== null ? faqs[faqToDeleteIndex]?.question || "FAQ" : "FAQ"}
        itemType="FAQ entry"
      />
    </div>
  );
}
