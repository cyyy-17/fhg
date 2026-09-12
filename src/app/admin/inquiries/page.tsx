"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Mail,
  Search,
  Clock,
  Trash2,
  Copy,
  Check,
  RefreshCw,
  Building2,
  Phone,
  FileText,
  Save,
  Download,
  CheckSquare,
  Square,
  ChevronLeft,
  ChevronRight,
  Send,
  DollarSign,
  Tag,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminModal from "@/components/admin/AdminModal";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import { getAdminMutationHeaders } from "@/lib/csrf-client";
import type { InquiryRecord } from "@/types/admin";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "unread" | "read" | "archived">("all");
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryRecord | null>(null);
  const [copied, setCopied] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [internalNoteInput, setInternalNoteInput] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Bulk selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState(false);
  const [singleDeleteId, setSingleDeleteId] = useState<string | null>(null);

  function handleSelectInquiry(inq: InquiryRecord) {
    setSelectedInquiry(inq);
    setInternalNoteInput(inq.internalNote || "");
    setNoteSaved(false);
  }

  async function handleSaveNote() {
    if (!selectedInquiry) return;
    setActionLoading(true);
    try {
      const headers = await getAdminMutationHeaders();
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers,
        body: JSON.stringify({ id: selectedInquiry.id, internalNote: internalNoteInput }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((i) =>
            i.id === selectedInquiry.id ? { ...i, internalNote: internalNoteInput } : i
          )
        );
        setSelectedInquiry((prev) =>
          prev ? { ...prev, internalNote: internalNoteInput } : null
        );
        setNoteSaved(true);
        setTimeout(() => setNoteSaved(false), 2500);
      }
    } finally {
      setActionLoading(false);
    }
  }

  const fetchInquiries = useCallback(async (showSpinner = false) => {
    if (showSpinner) setLoading(true);
    try {
      const res = await fetch("/api/admin/inquiries");
      if (res.ok) {
        const json = await res.json();
        setInquiries(json.inquiries || []);
      }
    } catch {
      // network fail
    } finally {
      if (showSpinner) setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await fetch("/api/admin/inquiries");
        if (res.ok && !ignore) {
          const json = await res.json();
          setInquiries(json.inquiries || []);
        }
      } catch {
        // network fail
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  async function handleStatusChange(id: string, newStatus: InquiryRecord["status"]) {
    setActionLoading(true);
    try {
      const headers = await getAdminMutationHeaders();
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers,
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
        );
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus });
        }
      }
    } finally {
      setActionLoading(false);
    }
  }

  async function handleRecordReply(id: string) {
    setActionLoading(true);
    try {
      const headers = await getAdminMutationHeaders();
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers,
        body: JSON.stringify({ id, markReplied: true }),
      });
      if (res.ok) {
        const now = new Date().toISOString();
        setInquiries((prev) =>
          prev.map((i) => (i.id === id ? { ...i, repliedAt: now, status: "read" } : i))
        );
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry({ ...selectedInquiry, repliedAt: now, status: "read" });
        }
      }
    } finally {
      setActionLoading(false);
    }
  }

  // Bulk status update
  async function handleBulkStatus(status: InquiryRecord["status"]) {
    if (selectedIds.size === 0) return;
    setActionLoading(true);
    try {
      const headers = await getAdminMutationHeaders();
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers,
        body: JSON.stringify({ ids: Array.from(selectedIds), status }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((i) => (selectedIds.has(i.id) ? { ...i, status } : i))
        );
        setSelectedIds(new Set());
      }
    } finally {
      setActionLoading(false);
    }
  }

  // Bulk delete confirmation
  async function handleConfirmBulkDelete() {
    if (selectedIds.size === 0) return;
    setActionLoading(true);
    try {
      const headers = await getAdminMutationHeaders();
      const res = await fetch("/api/admin/inquiries", {
        method: "DELETE",
        headers,
        body: JSON.stringify({ ids: Array.from(selectedIds) }),
      });
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => !selectedIds.has(i.id)));
        if (selectedInquiry && selectedIds.has(selectedInquiry.id)) {
          setSelectedInquiry(null);
        }
        setSelectedIds(new Set());
        setBulkDeleteModalOpen(false);
      }
    } finally {
      setActionLoading(false);
    }
  }

  // Single delete
  async function handleConfirmSingleDelete() {
    if (!singleDeleteId) return;
    const id = singleDeleteId;
    setActionLoading(true);
    try {
      const headers = await getAdminMutationHeaders();
      const res = await fetch(`/api/admin/inquiries?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers,
      });
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry(null);
        }
        setSingleDeleteId(null);
      }
    } finally {
      setActionLoading(false);
    }
  }

  function handleCopyDossier(text?: string) {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Export CSV
  function handleExportCsv() {
    if (inquiries.length === 0) return;
    const headers = [
      "ID",
      "Timestamp",
      "Client Name",
      "Company",
      "Email",
      "Phone",
      "Type",
      "Estimated Budget",
      "Preferred Contact",
      "Subject",
      "Status",
      "Replied At",
      "Message",
      "Internal Note",
    ];

    const rows = inquiries.map((i) => [
      `"${i.id}"`,
      `"${i.timestamp}"`,
      `"${(i.clientName || "").replace(/"/g, '""')}"`,
      `"${(i.company || "").replace(/"/g, '""')}"`,
      `"${i.email}"`,
      `"${i.phone}"`,
      `"${i.type || "General"}"`,
      `"${(i.estimatedValue || "").replace(/"/g, '""')}"`,
      `"${i.preferredContactMethod || "either"}"`,
      `"${(i.subject || "").replace(/"/g, '""')}"`,
      `"${i.status}"`,
      `"${i.repliedAt || ""}"`,
      `"${(i.message || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
      `"${(i.internalNote || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `fhg_inquiries_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Filtered dataset
  const filtered = useMemo(() => {
    return inquiries.filter((inq) => {
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        inq.clientName.toLowerCase().includes(q) ||
        inq.email.toLowerCase().includes(q) ||
        inq.phone.includes(q) ||
        inq.subject.toLowerCase().includes(q) ||
        (inq.company && inq.company.toLowerCase().includes(q)) ||
        (inq.type && inq.type.toLowerCase().includes(q));

      const matchesStatus = statusFilter === "all" ? true : inq.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [inquiries, searchTerm, statusFilter]);

  // Paginated dataset
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedItems = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safeCurrentPage, pageSize]);

  // Checkbox toggle helpers
  const allVisibleSelected =
    paginatedItems.length > 0 && paginatedItems.every((item) => selectedIds.has(item.id));

  function toggleSelectAllVisible() {
    const next = new Set(selectedIds);
    if (allVisibleSelected) {
      paginatedItems.forEach((item) => next.delete(item.id));
    } else {
      paginatedItems.forEach((item) => next.add(item.id));
    }
    setSelectedIds(next);
  }

  function toggleSelectItem(id: string) {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  }

  const unreadCount = inquiries.filter((i) => i.status === "unread").length;

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Commercial Inquiries Inbox"
        subtitle={`Live tender & RFP submissions • ${unreadCount} awaiting qualification`}
        actionButton={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportCsv}
              disabled={inquiries.length === 0}
              className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-[#f6f7f4] transition flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
              title="Download inquiries as CSV spreadsheet"
            >
              <Download className="w-3.5 h-3.5 text-[#22c55e]" />
              <span>Export CSV</span>
            </button>
            <button
              type="button"
              onClick={() => fetchInquiries(true)}
              className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-[#f6f7f4] transition flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#22c55e]" />
              <span>Refresh</span>
            </button>
          </div>
        }
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-[#0a170d] border border-white/10 rounded-xl">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#9aa89b] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client, company, phone, type..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-sans"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1 w-full sm:w-auto">
          {(["all", "unread", "read", "archived"] as const).map((s) => (
            <button
              key={s}
              onClick={() => {
                setStatusFilter(s);
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition cursor-pointer shrink-0 ${
                statusFilter === s
                  ? "bg-[#16a34a] text-[#f6f7f4] font-semibold"
                  : "text-[#9aa89b] hover:text-[#f6f7f4] hover:bg-white/5"
              }`}
            >
              {s} {s === "unread" && unreadCount > 0 ? `(${unreadCount})` : ""}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk Action Toolbar (Appears when 1+ rows selected) */}
      {selectedIds.size > 0 && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs animate-in fade-in">
          <div className="flex items-center gap-2 text-emerald-200 font-semibold">
            <span>{selectedIds.size} Selected</span>
            <button
              type="button"
              onClick={() => setSelectedIds(new Set())}
              className="text-[11px] underline text-emerald-400 hover:text-white cursor-pointer ml-1"
            >
              Deselect all
            </button>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            <button
              type="button"
              disabled={actionLoading}
              onClick={() => handleBulkStatus("read")}
              className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition cursor-pointer"
            >
              Mark Read
            </button>
            <button
              type="button"
              disabled={actionLoading}
              onClick={() => handleBulkStatus("unread")}
              className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition cursor-pointer"
            >
              Mark Unread
            </button>
            <button
              type="button"
              disabled={actionLoading}
              onClick={() => handleBulkStatus("archived")}
              className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition cursor-pointer"
            >
              Archive
            </button>
            <button
              type="button"
              disabled={actionLoading}
              onClick={() => setBulkDeleteModalOpen(true)}
              className="px-2.5 py-1 rounded bg-red-600/30 hover:bg-red-600/50 text-red-300 font-semibold text-xs border border-red-500/40 transition cursor-pointer flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              <span>Delete Selected</span>
            </button>
          </div>
        </div>
      )}

      {/* Inquiries List */}
      {loading ? (
        <div className="py-12 text-center text-xs text-[#9aa89b]">Loading inquiries...</div>
      ) : filtered.length === 0 ? (
        <div className="py-12 text-center text-xs text-[#9aa89b] border border-dashed border-white/10 rounded-xl bg-[#0a170d]">
          No inquiries matching current filter criteria.
        </div>
      ) : (
        <div className="bg-[#0a170d] border border-white/10 rounded-xl overflow-hidden shadow-xl">
          {/* Header Row with Select All */}
          <div className="px-4 py-2.5 bg-[#08130a] border-b border-white/10 flex items-center justify-between text-[11px] font-mono uppercase text-[#9aa89b]">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleSelectAllVisible}
                className="text-[#9aa89b] hover:text-white cursor-pointer"
                aria-label="Select all visible inquiries"
              >
                {allVisibleSelected ? (
                  <CheckSquare className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Square className="w-4 h-4" />
                )}
              </button>
              <span>Select All Page</span>
            </div>
            <span>
              Showing {(currentPage - 1) * pageSize + 1}–
              {Math.min(currentPage * pageSize, filtered.length)} of {filtered.length}
            </span>
          </div>

          <div className="divide-y divide-white/5">
            {paginatedItems.map((inq) => {
              const isSelected = selectedIds.has(inq.id);
              return (
                <div
                  key={inq.id}
                  onClick={() => handleSelectInquiry(inq)}
                  className={`p-4 hover:bg-white/5 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer ${
                    inq.status === "unread" ? "bg-emerald-950/15" : ""
                  } ${isSelected ? "bg-emerald-900/20" : ""}`}
                >
                  <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelectItem(inq.id);
                      }}
                      className="text-[#9aa89b] hover:text-white cursor-pointer mt-0.5 sm:mt-0 shrink-0"
                    >
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            inq.status === "unread" ? "bg-emerald-400 animate-pulse" : "bg-white/20"
                          }`}
                        />
                        <span className="font-semibold text-sm text-[#f6f7f4] truncate">
                          {inq.clientName}
                        </span>
                        {inq.company && (
                          <span className="text-xs text-[#9aa89b] truncate">
                            • {inq.company}
                          </span>
                        )}
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/80 shrink-0">
                          {inq.type || "General"}
                        </span>
                        {inq.estimatedValue && (
                          <span className="text-[10px] font-mono text-emerald-400 font-medium shrink-0">
                            {inq.estimatedValue}
                          </span>
                        )}
                        {inq.repliedAt && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1 shrink-0">
                            <Send className="w-2.5 h-2.5" />
                            <span>Replied</span>
                          </span>
                        )}
                        {inq.internalNote && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center gap-1 shrink-0">
                            <FileText className="w-2.5 h-2.5" />
                            <span>Note</span>
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ml-auto sm:ml-2 shrink-0 ${
                            inq.status === "unread"
                              ? "bg-amber-500/20 text-amber-300 border-amber-500/30 font-semibold"
                              : inq.status === "read"
                              ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                              : "bg-white/5 text-[#9aa89b] border-white/10"
                          }`}
                        >
                          {inq.status.toUpperCase()}
                        </span>
                      </div>

                      <div className="text-xs text-[#22c55e] font-medium truncate">
                        {inq.subject}
                      </div>
                      <div className="text-xs text-[#9aa89b] line-clamp-1">{inq.message}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#9aa89b] shrink-0 font-mono ml-7 sm:ml-0">
                    <div className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{new Date(inq.timestamp).toLocaleDateString()}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSingleDeleteId(inq.id);
                      }}
                      className="p-1.5 rounded text-[#9aa89b] hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
                      title="Delete record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          <div className="p-3 bg-[#08130a] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#9aa89b]">
            <div className="flex items-center gap-2">
              <span>Rows per page:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-[#050e07] border border-white/15 rounded px-2 py-1 text-xs text-white focus:outline-hidden"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span>
                Page {safeCurrentPage} of {totalPages}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={safeCurrentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  disabled={safeCurrentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedInquiry && (
        <AdminModal
          isOpen={true}
          onClose={() => setSelectedInquiry(null)}
          title={`Inquiry: ${selectedInquiry.clientName}`}
          subtitle={`Submitted on ${new Date(selectedInquiry.timestamp).toLocaleString()}`}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs">
            {/* Metadata Badges Header */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold font-mono text-[11px] flex items-center gap-1">
                <Tag className="w-3 h-3" />
                <span>{selectedInquiry.type || "General Inquiry"}</span>
              </span>
              {selectedInquiry.estimatedValue && (
                <span className="px-2.5 py-1 rounded-md bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold font-mono text-[11px] flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  <span>Est. Budget: {selectedInquiry.estimatedValue}</span>
                </span>
              )}
              {selectedInquiry.preferredContactMethod && (
                <span className="px-2.5 py-1 rounded-md bg-white/5 text-white/80 border border-white/10 font-mono text-[11px] capitalize">
                  Prefers: {selectedInquiry.preferredContactMethod}
                </span>
              )}
              {selectedInquiry.repliedAt && (
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono text-[11px] flex items-center gap-1">
                  <Send className="w-3 h-3" />
                  <span>Replied on {new Date(selectedInquiry.repliedAt).toLocaleDateString()}</span>
                </span>
              )}
            </div>

            {/* Contact Details Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#08130a] border border-white/10">
              <div className="flex items-center gap-2 text-[#f6f7f4]">
                <Mail className="w-4 h-4 text-[#22c55e] shrink-0" />
                <a href={`mailto:${selectedInquiry.email}`} className="font-mono hover:underline truncate">
                  {selectedInquiry.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-[#f6f7f4]">
                <Phone className="w-4 h-4 text-[#22c55e] shrink-0" />
                <a href={`tel:${selectedInquiry.phone}`} className="font-mono hover:underline">
                  {selectedInquiry.phone}
                </a>
              </div>
              {selectedInquiry.company && (
                <div className="flex items-center gap-2 text-[#f6f7f4] sm:col-span-2">
                  <Building2 className="w-4 h-4 text-[#22c55e] shrink-0" />
                  <span className="font-semibold">{selectedInquiry.company}</span>
                </div>
              )}
            </div>

            {/* Subject & Message */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-mono uppercase text-[#22c55e] font-semibold">
                Subject
              </div>
              <div className="p-3 rounded-lg bg-[#050e07] border border-white/10 text-sm font-semibold text-[#f6f7f4]">
                {selectedInquiry.subject}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-[11px] font-mono uppercase text-[#22c55e] font-semibold">
                Requirements Message
              </div>
              <div className="p-3.5 rounded-lg bg-[#050e07] border border-white/10 text-xs text-[#f6f7f4] leading-relaxed whitespace-pre-wrap">
                {selectedInquiry.message || "No additional written details provided."}
              </div>
            </div>

            {/* Compiled Technical Dossier */}
            {selectedInquiry.dossierText && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase text-[#22c55e] font-semibold">
                    Technical Operations Dossier
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyDossier(selectedInquiry.dossierText)}
                    className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white transition flex items-center gap-1 text-[11px] cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Copied Dossier</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Dossier Text</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3 rounded-lg bg-[#040805] border border-white/10 font-mono text-[11px] text-[#4ade80] overflow-x-auto whitespace-pre-wrap">
                  {selectedInquiry.dossierText}
                </pre>
              </div>
            )}

            {/* Internal Operational Note */}
            <div className="space-y-2 p-3.5 rounded-xl bg-[#08130a] border border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-mono uppercase text-[#22c55e] font-semibold flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Internal Operational Note</span>
                </label>
                {noteSaved && (
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>Saved note</span>
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#9aa89b]">
                Private administrative notes regarding this lead (e.g. site visit schedule, quotation status, client budget). Only visible in admin panel.
              </p>
              <textarea
                rows={3}
                value={internalNoteInput}
                onChange={(e) => setInternalNoteInput(e.target.value)}
                placeholder="Add private operational follow-up notes here..."
                className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none leading-relaxed"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={handleSaveNote}
                  className="px-3 py-1.5 rounded-lg bg-linear-to-r from-[#15803d] to-[#16a34a] hover:from-[#16a34a] hover:to-[#22c55e] text-[#f6f7f4] text-xs font-semibold shadow transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{actionLoading ? "Saving..." : "Save Note"}</span>
                </button>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-[#9aa89b]">Status:</span>
                {(["unread", "read", "archived"] as const).map((st) => (
                  <button
                    key={st}
                    disabled={actionLoading}
                    onClick={() => handleStatusChange(selectedInquiry.id, st)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono uppercase transition cursor-pointer ${
                      selectedInquiry.status === st
                        ? "bg-[#22c55e] text-[#050d07] font-bold"
                        : "bg-white/5 text-[#9aa89b] hover:text-white"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="flex items-center flex-wrap gap-2">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(
                    `Re: ${selectedInquiry.subject} - Forest Hills Garden`
                  )}&body=${encodeURIComponent(
                    `Dear ${selectedInquiry.clientName},\n\nThank you for reaching out to Forest Hills Garden regarding your project inquiry.\n\n`
                  )}`}
                  onClick={() => handleRecordReply(selectedInquiry.id)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-medium flex items-center gap-1.5 cursor-pointer transition"
                  title="Open email app & mark as replied"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Reply by Email</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSingleDeleteId(selectedInquiry.id)}
                  disabled={actionLoading}
                  className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-medium flex items-center gap-1 cursor-pointer transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </AdminModal>
      )}

      {/* Delete Single Inquiry Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(singleDeleteId)}
        onClose={() => setSingleDeleteId(null)}
        onConfirm={handleConfirmSingleDelete}
        itemTitle="Inquiry record"
        itemType="inquiry"
      />

      {/* Delete Multiple Inquiries Modal */}
      <DeleteConfirmModal
        isOpen={bulkDeleteModalOpen}
        onClose={() => setBulkDeleteModalOpen(false)}
        onConfirm={handleConfirmBulkDelete}
        itemTitle={`${selectedIds.size} selected inquiries`}
        itemType="inquiries in bulk"
        requireTypedConfirm={true}
      />
    </div>
  );
}
