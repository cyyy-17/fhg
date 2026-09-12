"use client";

import { useState, useEffect, useCallback } from "react";
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
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminModal from "@/components/admin/AdminModal";
import type { InquiryRecord } from "@/types/admin";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "unread" | "read" | "archived">("all");
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryRecord | null>(null);
  const [copied, setCopied] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

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
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await fetch("/api/admin/inquiries");
        if (res.ok) {
          const json = await res.json();
          if (!ignore) setInquiries(json.inquiries || []);
        }
      } catch {
        // network fail
      } finally {
        if (!ignore) setLoading(false);
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
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
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

  function requestDelete(id: string) {
    setDeleteConfirmId(id);
  }

  async function confirmDelete() {
    if (!deleteConfirmId) return;
    const id = deleteConfirmId;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/inquiries?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry(null);
        }
        setDeleteConfirmId(null);
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

  const filtered = inquiries.filter((inq) => {
    const matchesSearch =
      inq.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inq.company && inq.company.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "all" ? true : inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const unreadCount = inquiries.filter((i) => i.status === "unread").length;

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Commercial Inquiries Inbox"
        subtitle={`Live RFP & inquiry submissions • ${unreadCount} awaiting processing`}
        actionButton={
          <button
            type="button"
            onClick={() => fetchInquiries(true)}
            className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-[#f6f7f4] transition flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#22c55e]" />
            <span>Refresh</span>
          </button>
        }
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-[#0a170d] border border-white/10 rounded-xl">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#9aa89b] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client, email, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
          />
        </div>

        <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto">
          {(["all", "unread", "read", "archived"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
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

      {/* Advisory Banner for High Record Count */}
      {inquiries.length >= 100 && (
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <span>
              You have {inquiries.length} inquiries in storage. Consider exporting a backup and archiving older records to keep the console fast.
            </span>
          </div>
          <a
            href="/admin/settings"
            className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-[11px] font-semibold transition shrink-0"
          >
            Go to Settings &amp; Backup
          </a>
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
        <div className="bg-[#0a170d] border border-white/10 rounded-xl overflow-hidden">
          <div className="divide-y divide-white/5">
            {filtered.map((inq) => (
              <div
                key={inq.id}
                onClick={() => setSelectedInquiry(inq)}
                className={`p-4 hover:bg-white/5 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer ${
                  inq.status === "unread" ? "bg-emerald-950/15" : ""
                }`}
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
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
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ml-auto sm:ml-2 shrink-0 ${
                        inq.status === "unread"
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
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

                <div className="flex items-center gap-3 text-xs text-[#9aa89b] shrink-0 font-mono">
                  <div className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date(inq.timestamp).toLocaleDateString()}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      requestDelete(inq.id);
                    }}
                    className="p-1.5 rounded text-[#9aa89b] hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
                    title="Delete record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedInquiry && (
        <AdminModal
          isOpen={true}
          onClose={() => setSelectedInquiry(null)}
          title={`Inquiry from ${selectedInquiry.clientName}`}
          subtitle={`Submitted on ${new Date(selectedInquiry.timestamp).toLocaleString()}`}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs">
            {/* Contact Details Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#08130a] border border-white/10">
              <div className="flex items-center gap-2 text-[#f6f7f4]">
                <Mail className="w-4 h-4 text-[#22c55e] shrink-0" />
                <span className="font-mono truncate">{selectedInquiry.email}</span>
              </div>
              <div className="flex items-center gap-2 text-[#f6f7f4]">
                <Phone className="w-4 h-4 text-[#22c55e] shrink-0" />
                <span className="font-mono">{selectedInquiry.phone}</span>
              </div>
              {selectedInquiry.company && (
                <div className="flex items-center gap-2 text-[#f6f7f4] sm:col-span-2">
                  <Building2 className="w-4 h-4 text-[#22c55e] shrink-0" />
                  <span>{selectedInquiry.company}</span>
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

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(
                    `Re: ${selectedInquiry.subject} - Forest Hills Garden`
                  )}&body=${encodeURIComponent(
                    `Dear ${selectedInquiry.clientName},\n\nThank you for reaching out to Forest Hills Garden regarding your project inquiry.\n\n`
                  )}`}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-medium flex items-center gap-1.5 cursor-pointer transition"
                  title="Open mail client to reply directly"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Reply by Email</span>
                </a>
                <button
                  type="button"
                  onClick={() => requestDelete(selectedInquiry.id)}
                  disabled={actionLoading}
                  className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-medium flex items-center gap-1 cursor-pointer transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Record</span>
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

      {/* Confirmation Modal for Permanent Delete */}
      {deleteConfirmId && (
        <AdminModal
          isOpen={Boolean(deleteConfirmId)}
          onClose={() => setDeleteConfirmId(null)}
          title="Confirm Permanent Deletion"
          subtitle="This action cannot be undone."
          maxWidth="md"
        >
          <div className="space-y-4">
            <p className="text-sm text-[#9aa89b]">
              Are you sure you want to permanently delete this inquiry record from the administrative database?
            </p>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                disabled={actionLoading}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#9aa89b] hover:text-white text-xs font-semibold cursor-pointer transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={actionLoading}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition disabled:opacity-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{actionLoading ? "Deleting..." : "Permanently Delete"}</span>
              </button>
            </div>
          </div>
        </AdminModal>
      )}
    </div>
  );
}
