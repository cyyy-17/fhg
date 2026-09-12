"use client";

import { useState, useEffect, useMemo } from "react";
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MoveUp,
  MoveDown,
  Copy,
  Check,
  AlertTriangle,
  ExternalLink,
  Clock,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminModal from "@/components/admin/AdminModal";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import FileUploadWidget from "@/components/admin/FileUploadWidget";
import { getAdminMutationHeaders } from "@/lib/csrf-client";
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

  // Delete modal state
  const [itemToDelete, setItemToDelete] = useState<DocumentItem | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [currentTimestamp] = useState(() => Date.now());

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
      const headers = await getAdminMutationHeaders();
      const res = await fetch("/api/admin/data", {
        method: "PUT",
        headers,
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
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const newItem: DocumentItem = {
      id: `doc-${Date.now()}`,
      title: "",
      category: "Legal Registration",
      docNumber: `DOC-${today}-${randomSuffix}`,
      fileUrl: "",
      fileSize: "",
      description: "",
      status: "Official Certified",
      issuedDate: new Date().toISOString().slice(0, 10),
      expiryDate: "",
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

  async function handleConfirmDelete() {
    if (!itemToDelete) return;
    const next = docs.filter((d) => d.id !== itemToDelete.id);
    await saveDocsToApi(next);
    setItemToDelete(null);
  }

  function handleMove(index: number, direction: "up" | "down") {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= docs.length) return;

    const next = [...docs];
    const temp = next[index];
    next[index] = next[target];
    next[target] = temp;
    saveDocsToApi(next);
  }

  function handleCopyUrl(url: string) {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  }

  // Decision 4: Expiration status calculation (30/60/90 days multi-threshold)
  function getExpiryStatus(expiryDate?: string) {
    if (!expiryDate || !expiryDate.trim()) return null;

    const expTime = new Date(expiryDate).getTime();
    if (isNaN(expTime)) return null;

    const diffDays = Math.ceil((expTime - currentTimestamp) / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      return {
        label: "Expired",
        level: "expired",
        badgeClass: "bg-red-500/20 text-red-300 border-red-500/30 font-bold",
        icon: AlertCircle,
        days: diffDays,
      };
    }
    if (diffDays <= 30) {
      return {
        label: `Expires in ${diffDays}d`,
        level: "critical",
        badgeClass: "bg-rose-500/20 text-rose-300 border-rose-500/30 font-bold animate-pulse",
        icon: AlertTriangle,
        days: diffDays,
      };
    }
    if (diffDays <= 60) {
      return {
        label: `Expires in ${diffDays}d`,
        level: "warning",
        badgeClass: "bg-amber-500/20 text-amber-300 border-amber-500/30 font-semibold",
        icon: AlertTriangle,
        days: diffDays,
      };
    }
    if (diffDays <= 90) {
      return {
        label: `Expires in ${diffDays}d`,
        level: "notice",
        badgeClass: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
        icon: Clock,
        days: diffDays,
      };
    }

    return {
      label: `Valid (${new Date(expiryDate).toLocaleDateString()})`,
      level: "valid",
      badgeClass: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
      icon: CheckCircle2,
      days: diffDays,
    };
  }

  const filtered = useMemo(() => {
    return docs.filter((d) => {
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        d.title.toLowerCase().includes(q) ||
        d.docNumber.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q);

      const matchesCategory = categoryFilter === "all" ? true : d.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [docs, searchTerm, categoryFilter]);

  const [lastUploadedFile, setLastUploadedFile] = useState<{
    url: string;
    fileName: string;
    fileSize: string;
  } | null>(null);

  function handleCreateFromUploaded(uploaded: { url: string; fileName: string; fileSize: string }) {
    const cleanName = uploaded.fileName
      .replace(/_[0-9]+(\.[^.]+)?$/, "")
      .replace(/[-_]+/g, " ")
      .trim();

    const title = cleanName
      ? cleanName.charAt(0).toUpperCase() + cleanName.slice(1)
      : "Uploaded Document";

    const isPdf = uploaded.url.toLowerCase().endsWith(".pdf");
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = Math.floor(100 + Math.random() * 900);

    const newItem: DocumentItem = {
      id: `doc-${Date.now()}`,
      title,
      category: "Legal Registration",
      docNumber: `DOC-${today}-${randomSuffix}`,
      fileUrl: uploaded.url,
      fileSize: `${uploaded.fileSize} ${isPdf ? "PDF" : "Asset"}`,
      description: `Official document asset: ${uploaded.fileName}`,
      status: "Official Certified",
      issuedDate: new Date().toISOString().slice(0, 10),
      expiryDate: "",
    };

    setEditingItem(newItem);
    setIsCreating(true);
  }

  function handleTopUploadComplete(url: string, fileName: string, fileSize: string) {
    const fileInfo = { url, fileName, fileSize };
    setLastUploadedFile(fileInfo);
    handleCreateFromUploaded(fileInfo);
  }

  // Count expiring soon docs
  const expiringCount = docs.filter((d) => {
    const status = getExpiryStatus(d.expiryDate);
    return status && (status.level === "expired" || status.level === "critical" || status.level === "warning");
  }).length;

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Document Vault & Statutory Compliance"
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

      {/* Expiry Warning Banner (Decision 4) */}
      {expiringCount > 0 && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 text-xs text-amber-200">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>{expiringCount} statutory documents</strong> have expiration dates within the next 60 days or have expired. Review renewals to maintain tender eligibility.
            </span>
          </div>
        </div>
      )}

      {/* Upload Zone Card */}
      <div className="p-5 rounded-2xl bg-[#0a170d] border border-white/10 space-y-3">
        <h2 className="text-sm font-bold font-heading text-[#f6f7f4] flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#22c55e]" />
          <span>Direct Document & Asset Uploader</span>
        </h2>
        <p className="text-xs text-[#9aa89b]">
          Upload PDF capability statements, BIR filings, or site plan images directly. Once uploaded,
          they can be automatically added as an entry in the Document Vault below.
        </p>
        <div>
          <FileUploadWidget
            label="Upload New PDF or Media Asset"
            accept=".pdf,.png,.jpg,.jpeg,.webp"
            helperText="Permanent upload to Vercel Blob cloud storage. Automatically creates a document entry."
            onUploadComplete={handleTopUploadComplete}
          />
        </div>

        {lastUploadedFile && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs">
            <div className="flex items-center gap-2 text-emerald-300 min-w-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="truncate">
                Uploaded: <strong className="text-white">{lastUploadedFile.fileName}</strong> ({lastUploadedFile.fileSize})
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCreateFromUploaded(lastUploadedFile)}
              className="px-3 py-1.5 rounded-lg bg-linear-to-r from-[#15803d] to-[#16a34a] hover:from-[#16a34a] hover:to-[#22c55e] text-[#f6f7f4] font-semibold flex items-center gap-1.5 transition cursor-pointer text-xs shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Entry</span>
            </button>
          </div>
        )}
      </div>

      {/* Search & Filter */}
      <div className="p-3 bg-[#0a170d] border border-white/10 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#9aa89b] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search documents by title, number, details..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-1.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none w-full sm:w-auto"
        >
          <option value="all">All Document Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Documents Table */}
      {loading ? (
        <div className="py-12 text-center text-xs text-[#9aa89b]">Loading document vault...</div>
      ) : (
        <div className="bg-[#0a170d] border border-white/10 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#f6f7f4]">
              <thead className="border-b border-white/10 font-mono uppercase text-[10px] text-[#9aa89b] bg-[#08130a]">
                <tr>
                  <th className="py-3 px-4">Document Title & Number</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Validity / Expiry</th>
                  <th className="py-3 px-4">File Size</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((doc) => {
                  const expiryStatus = getExpiryStatus(doc.expiryDate);
                  return (
                    <tr key={doc.id} className="hover:bg-white/5 transition">
                      <td className="py-3 px-4 max-w-sm">
                        <div className="font-semibold text-sm text-[#f6f7f4]">{doc.title}</div>
                        <div className="text-[11px] font-mono text-[#22c55e] mt-0.5">{doc.docNumber}</div>
                        <div className="text-[11px] text-[#9aa89b] line-clamp-1 mt-0.5">
                          {doc.description}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/80">
                          {doc.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px]">
                        {expiryStatus ? (
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border ${expiryStatus.badgeClass}`}
                          >
                            <expiryStatus.icon className="w-3 h-3" />
                            <span>{expiryStatus.label}</span>
                          </span>
                        ) : (
                          <span className="text-white/40 text-[10px]">No expiration set</span>
                        )}
                        {doc.issuedDate && (
                          <div className="text-[10px] text-white/50 mt-0.5">
                            Issued: {doc.issuedDate}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-[#9aa89b]">
                        {doc.fileSize || "PDF Asset"}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              const idx = docs.findIndex((d) => d.id === doc.id);
                              handleMove(idx, "up");
                            }}
                            disabled={docs.findIndex((d) => d.id === doc.id) === 0}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#9aa89b] hover:text-white disabled:opacity-30 transition cursor-pointer"
                            title="Move Up"
                          >
                            <MoveUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const idx = docs.findIndex((d) => d.id === doc.id);
                              handleMove(idx, "down");
                            }}
                            disabled={docs.findIndex((d) => d.id === doc.id) === docs.length - 1}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#9aa89b] hover:text-white disabled:opacity-30 transition cursor-pointer"
                            title="Move Down"
                          >
                            <MoveDown className="w-3.5 h-3.5" />
                          </button>
                          {doc.fileUrl && (
                            <>
                              <a
                                href={doc.fileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#9aa89b] hover:text-emerald-400 transition cursor-pointer"
                                title="View/Download File"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                              <button
                                type="button"
                                onClick={() => handleCopyUrl(doc.fileUrl)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#9aa89b] hover:text-emerald-400 transition cursor-pointer"
                                title="Copy File URL"
                              >
                                {copiedUrl === doc.fileUrl ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              setEditingItem(JSON.parse(JSON.stringify(doc)));
                              setIsCreating(false);
                            }}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-[#22c55e]/20 text-[#9aa89b] hover:text-[#4ade80] transition cursor-pointer"
                            title="Edit Document"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setItemToDelete(doc)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-[#9aa89b] hover:text-red-400 transition cursor-pointer"
                            title="Delete Document"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit / Create Modal */}
      {editingItem && (
        <AdminModal
          isOpen={true}
          onClose={() => {
            setEditingItem(null);
            setIsCreating(false);
          }}
          title={isCreating ? "Add Compliance Document Entry" : `Edit ${editingItem.title}`}
          subtitle="Configure statutory compliance registration details, certificate numbers, and download URL."
          maxWidth="2xl"
        >
          <form onSubmit={handleSaveModalForm} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Document Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-semibold"
                  placeholder="e.g. BIR Certificate of Registration (COR)"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Classification Category
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
                  Document / Certificate Number
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.docNumber}
                  onChange={(e) => setEditingItem({ ...editingItem, docNumber: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
                  placeholder="e.g. OCN 059RC20230000016326"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Issued Date (Optional)
                </label>
                <input
                  type="date"
                  value={editingItem.issuedDate || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, issuedDate: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Expiration Date (Optional - for alerts)
                </label>
                <input
                  type="date"
                  value={editingItem.expiryDate || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, expiryDate: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  File Size / Type Badge
                </label>
                <input
                  type="text"
                  value={editingItem.fileSize}
                  onChange={(e) => setEditingItem({ ...editingItem, fileSize: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
                  placeholder="e.g. 1.15 MB PDF"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Compliance Standing Badge
                </label>
                <select
                  value={editingItem.status}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      status: e.target.value as DocumentItem["status"],
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
                >
                  <option value="Official Certified">Official Certified</option>
                  <option value="Audited & Active">Audited & Active</option>
                </select>
              </div>

              <div className="sm:col-span-2 space-y-2 p-3.5 rounded-xl bg-[#08130a] border border-white/10">
                <label className="block text-xs font-mono uppercase text-[#22c55e] font-semibold">
                  File Asset URL & Upload
                </label>
                <FileUploadWidget
                  label="Upload or Replace PDF File"
                  accept=".pdf,.png,.jpg,.jpeg,.webp"
                  helperText="Upload official PDF certificate or map to update this vault record."
                  onUploadComplete={(url, fileName, size) => {
                    setEditingItem({
                      ...editingItem,
                      fileUrl: url,
                      fileSize: `${size} PDF`,
                    });
                  }}
                />
                <input
                  type="text"
                  required
                  value={editingItem.fileUrl}
                  onChange={(e) => setEditingItem({ ...editingItem, fileUrl: e.target.value })}
                  placeholder="/docs/bir-cor.pdf or https://..."
                  className="w-full p-2 rounded-lg bg-[#050e07] border border-white/10 text-xs text-[#f6f7f4] font-mono focus:ring-1 focus:ring-[#22c55e] outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Public Description & Scope
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none leading-relaxed"
                  placeholder="Official description displayed to clients under the document download link..."
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

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(itemToDelete)}
        onClose={() => setItemToDelete(null)}
        onConfirm={handleConfirmDelete}
        itemTitle={itemToDelete?.title || "document"}
        itemType="compliance document"
      />
    </div>
  );
}
