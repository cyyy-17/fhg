"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  Download,
  Search,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminModal from "@/components/admin/AdminModal";
import FileUploadWidget from "@/components/admin/FileUploadWidget";
import type { DocumentItem } from "@/data/documents";

const CATEGORIES = [
  "Legal Registration",
  "Tax Compliance",
  "Project Audit",
  "Logistics & Site",
] as const;

export default function AdminDocumentsPage() {
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [editingItem, setEditingItem] = useState<DocumentItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch("/api/admin/data?section=documents")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch documents.");
        return res.json();
      })
      .then((json) => {
        if (mounted && json.data) {
          setDocs(json.data);
        }
      })
      .catch(() => {
        if (mounted) setError("Failed to fetch documents.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  async function saveDocsToApi(updatedList: DocumentItem[]) {
    setIsSaving(true);
    setFeedback(null);
    setError(null);
    try {
      const res = await fetch("/api/admin/data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "documents", data: updatedList }),
      });

      if (!res.ok) throw new Error("Failed to save documents.");

      setDocs(updatedList);
      setFeedback("Document vault updated successfully.");
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
    const newItem: DocumentItem = {
      id: `doc-${Date.now()}`,
      title: "New Official Certification Dossier",
      category: "Legal Registration",
      docNumber: "Official Standing Document",
      fileUrl: "/docs/company-profile.pdf",
      fileSize: "PDF Document",
      description: "Audited statutory document for institutional developer tenders.",
      status: "Official Certified",
    };
    setEditingItem(newItem);
    setIsCreating(true);
  }

  function handleSaveModalForm(e: React.FormEvent) {
    e.preventDefault();
    if (!editingItem) return;

    let next: DocumentItem[];
    if (isCreating) {
      next = [...docs, editingItem];
    } else {
      next = docs.map((d) => (d.id === editingItem.id ? editingItem : d));
    }
    saveDocsToApi(next);
  }

  function handleDelete(id: string) {
    if (!confirm("Are you sure you want to remove this document from the vault?")) return;
    const next = docs.filter((d) => d.id !== id);
    saveDocsToApi(next);
  }

  const filtered = docs.filter((d) => {
    const matchesSearch =
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.docNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === "all" ? true : d.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Document Vault & File Uploads"
        subtitle={`Official downloadable compliance documents, BIR tax standing, and maps (${docs.length} Documents).`}
        actionButton={
          <button
            type="button"
            onClick={handleCreateNew}
            className="px-4 py-2 rounded-lg bg-linear-to-r from-[#15803d] to-[#16a34a] hover:from-[#16a34a] hover:to-[#22c55e] text-[#f6f7f4] text-xs font-semibold shadow-lg shadow-green-950/40 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Document</span>
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

      {/* Upload Zone Card */}
      <div className="p-5 rounded-2xl bg-[#0a170d] border border-white/10 space-y-2">
        <h2 className="text-sm font-bold font-heading text-[#f6f7f4] flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#22c55e]" />
          <span>Direct Document & Asset Uploader</span>
        </h2>
        <p className="text-xs text-[#9aa89b]">
          Upload PDF capability statements, BIR filings, or site plan images directly. Uploaded files
          receive permanent public URLs and can be immediately assigned to documents below.
        </p>
        <div className="pt-2">
          <FileUploadWidget
            label="Upload New PDF or Media Asset"
            accept=".pdf,.png,.jpg,.jpeg,.webp"
            helperText="Permanent upload to /public/uploads/. Use generated URL in document entries."
          />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-3 bg-[#0a170d] border border-white/10 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#9aa89b] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title or document number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
        >
          <option value="all">All Document Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Documents Table */}
      {loading ? (
        <div className="py-12 text-center text-xs text-[#9aa89b]">Loading document vault...</div>
      ) : (
        <div className="bg-[#0a170d] border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#f6f7f4]">
              <thead className="border-b border-white/10 font-mono uppercase text-[10px] text-[#9aa89b] bg-[#08130a]">
                <tr>
                  <th className="py-3 px-4">Document Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Document ID / Cert</th>
                  <th className="py-3 px-4">File Specs</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition">
                    <td className="py-3 px-4 max-w-sm">
                      <div className="font-semibold text-sm text-[#f6f7f4]">{item.title}</div>
                      <div className="text-[11px] text-[#9aa89b] line-clamp-1 mt-0.5">
                        {item.description}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-[#4ade80]">
                      {item.category}
                    </td>
                    <td className="py-3 px-4 text-xs text-[#9aa89b] font-mono">
                      {item.docNumber}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <a
                          href={item.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-[#22c55e] hover:text-[#4ade80] underline flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" />
                          <span>{item.fileSize}</span>
                        </a>
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
                          title="Edit Document"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-[#9aa89b] hover:text-red-400 transition cursor-pointer"
                          title="Delete Document"
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

      {/* Add / Edit Document Modal */}
      {editingItem && (
        <AdminModal
          isOpen={true}
          onClose={() => {
            setEditingItem(null);
            setIsCreating(false);
          }}
          title={isCreating ? "Add Document to Vault" : `Edit ${editingItem.title}`}
          subtitle="Configure downloadable dossier link, file size description, and certified status."
          maxWidth="2xl"
        >
          <form onSubmit={handleSaveModalForm} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Document Title
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] font-semibold focus:ring-1 focus:ring-[#22c55e] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Category Classification
                </label>
                <select
                  value={editingItem.category}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      category: e.target.value as DocumentItem["category"],
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Certificate / Document Number
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.docNumber}
                  onChange={(e) => setEditingItem({ ...editingItem, docNumber: e.target.value })}
                  placeholder="e.g. DTI Cert. 1729753 (Valid to May 28, 2030)"
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] font-mono focus:ring-1 focus:ring-[#22c55e] outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <FileUploadWidget
                  label="Upload or Replace PDF File"
                  accept=".pdf,.png,.jpg,.jpeg,.webp"
                  helperText="Upload will instantly fill the file URL and file size below."
                  onUploadComplete={(url, fileName, fileSize) => {
                    setEditingItem({
                      ...editingItem,
                      fileUrl: url,
                      fileSize: `${fileSize} PDF`,
                    });
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  File Download URL
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.fileUrl}
                  onChange={(e) => setEditingItem({ ...editingItem, fileUrl: e.target.value })}
                  placeholder="/docs/file-name.pdf"
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] font-mono focus:ring-1 focus:ring-[#22c55e] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  File Size Label
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.fileSize}
                  onChange={(e) => setEditingItem({ ...editingItem, fileSize: e.target.value })}
                  placeholder="e.g. 1.15 MB PDF"
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Document Description & Context
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.description}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, description: e.target.value })
                  }
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
                  <span>{isCreating ? "Add Document" : "Save Changes"}</span>
                )}
              </button>
            </div>
          </form>
        </AdminModal>
      )}
    </div>
  );
}
