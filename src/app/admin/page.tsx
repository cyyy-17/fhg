"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  Trees,
  Briefcase,
  Users,
  Sprout,
  Truck,
  FileText,
  Mail,
  ArrowUpRight,
  Clock,
  Download,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  KeyRound,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import type { AdminStore, InquiryRecord } from "@/types/admin";

export default function AdminDashboardPage() {
  const [store, setStore] = useState<AdminStore | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch("/api/admin/data")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load admin data.");
        return res.json();
      })
      .then((json) => {
        if (mounted && json.store) {
          setStore(json.store);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Error loading data.");
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  function handleRetry() {
    setLoading(true);
    setError(null);
    fetch("/api/admin/data")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load admin data.");
        return res.json();
      })
      .then((json) => {
        if (json.store) setStore(json.store);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Error loading data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleExportBackup() {
    if (!store) return;
    const blob = new Blob([JSON.stringify(store, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fhg_backup_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <AdminHeader title="Operations Overview" subtitle="Loading live profile analytics..." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 rounded-xl bg-white/5 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !store) {
    return (
      <div className="space-y-6">
        <AdminHeader title="Operations Overview" subtitle="System Connection Notice" />
        <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <div>
              <h3 className="font-semibold text-sm">Failed to retrieve store</h3>
              <p className="text-xs opacity-80">{error}</p>
            </div>
          </div>
          <button
            onClick={handleRetry}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white transition flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry</span>
          </button>
        </div>
      </div>
    );
  }

  const unreadInquiries = (store.inquiries || []).filter((i) => i.status === "unread");
  const ongoingProjects = (store.projects || []).filter((p) => p.badge === "Ongoing");

  const statCards = [
    {
      label: "Inquiry Inbox",
      value: store.inquiries?.length || 0,
      subtext: `${unreadInquiries.length} pending review`,
      icon: Mail,
      href: "/admin/inquiries",
      highlight: unreadInquiries.length > 0,
    },
    {
      label: "Services Portfolio",
      value: store.services?.length || 0,
      subtext: "Industrial Arboriculture",
      icon: Trees,
      href: "/admin/services",
    },
    {
      label: "Signature Projects",
      value: store.projects?.length || 0,
      subtext: `${ongoingProjects.length} Active • ${(store.projects?.length || 0) - ongoingProjects.length} Completed`,
      icon: Briefcase,
      href: "/admin/projects",
    },
    {
      label: "Client Partners",
      value: store.clients?.length || 0,
      subtext: "SMC, Ayala, EEI, DMCI & DENR",
      icon: Users,
      href: "/admin/clients",
    },
    {
      label: "Batangas Nurseries",
      value: store.company?.nurseries?.length || 3,
      subtext: `${store.species?.length || 8} Cultivated Species`,
      icon: Sprout,
      href: "/admin/nurseries",
    },
    {
      label: "Equipment Fleet",
      value: store.equipment?.length || 8,
      subtext: "90 DENR Chainsaws + Cranes",
      icon: Truck,
      href: "/admin/equipment",
    },
    {
      label: "Document Vault",
      value: store.documents?.length || 6,
      subtext: "Audited BIR, DTI, Dossiers",
      icon: FileText,
      href: "/admin/documents",
    },
    {
      label: "Company Status",
      value: "28+ Yrs",
      subtext: store.company?.corporateTransition?.type || "Three-person Family Corp",
      icon: Building2,
      href: "/admin/company",
    },
  ];

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Operations Dashboard"
        subtitle={`Live synchronization active • Last updated: ${new Date(
          store.lastUpdated
        ).toLocaleString()}`}
        actionButton={
          <button
            type="button"
            onClick={handleExportBackup}
            className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-[#f6f7f4] transition flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#22c55e]" />
            <span>Export Full Backup</span>
          </button>
        }
      />

      {/* Persistence Health Banner */}
      <div className="p-4 rounded-xl bg-[#0a170d] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse" />
          <span className="font-semibold text-[#f6f7f4]">Data Store Status: Active</span>
          <span className="text-white/20">•</span>
          <span className="text-[#9aa89b]">
            All updates made through this console take immediate effect on public client inquiries and pages.
          </span>
        </div>
        <div className="flex items-center gap-2 text-[#9aa89b] font-mono text-[11px]">
          <Clock className="w-3.5 h-3.5 text-[#4ade80]" />
          <span>Synced: {new Date(store.lastUpdated).toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Quick Start & Handover Reference */}
      <div className="bg-[#0a170d] border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#22c55e]" />
            <h3 className="text-sm font-bold font-heading text-[#f6f7f4]">
              Client Administrator Quick Start &amp; Operating Guide
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[#9aa89b]">Zero-Hassle Reference</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/settings"
            className="p-4 rounded-xl bg-[#050e07] border border-white/10 hover:border-[#22c55e]/40 transition group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#f6f7f4]">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#22c55e]" />
                  <span>1. Lead Routing Email</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#9aa89b] group-hover:text-[#22c55e] transition" />
              </div>
              <p className="text-[11px] text-[#9aa89b] mt-2 leading-relaxed">
                Configure where instant RFP estimates and client contact forms are delivered, with a live test dispatch button.
              </p>
            </div>
            <div className="text-[10px] font-mono text-[#4ade80] mt-3 flex items-center gap-1">
              <span>Settings → Routing</span>
            </div>
          </Link>

          <Link
            href="/admin/settings"
            className="p-4 rounded-xl bg-[#050e07] border border-white/10 hover:border-[#22c55e]/40 transition group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#f6f7f4]">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-[#22c55e]" />
                  <span>2. Access Password</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#9aa89b] group-hover:text-[#22c55e] transition" />
              </div>
              <p className="text-[11px] text-[#9aa89b] mt-2 leading-relaxed">
                Update the console security key anytime. Changing your password immediately secures all sessions.
              </p>
            </div>
            <div className="text-[10px] font-mono text-[#4ade80] mt-3 flex items-center gap-1">
              <span>Settings → Access Key</span>
            </div>
          </Link>

          <Link
            href="/admin/documents"
            className="p-4 rounded-xl bg-[#050e07] border border-white/10 hover:border-[#22c55e]/40 transition group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#f6f7f4]">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#22c55e]" />
                  <span>3. Document Vault</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#9aa89b] group-hover:text-[#22c55e] transition" />
              </div>
              <p className="text-[11px] text-[#9aa89b] mt-2 leading-relaxed">
                Upload PDFs or certifications. Uploaded documents automatically show up on public compliance downloads.
              </p>
            </div>
            <div className="text-[10px] font-mono text-[#4ade80] mt-3 flex items-center gap-1">
              <span>Vault → Upload Dossier</span>
            </div>
          </Link>

          <Link
            href="/admin/inquiries"
            className="p-4 rounded-xl bg-[#050e07] border border-white/10 hover:border-[#22c55e]/40 transition group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#f6f7f4]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
                  <span>4. Review Inbound Leads</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#9aa89b] group-hover:text-[#22c55e] transition" />
              </div>
              <p className="text-[11px] text-[#9aa89b] mt-2 leading-relaxed">
                View submitted tender details, copy technical dossiers, and click &ldquo;Reply by Email&rdquo; for instant response.
              </p>
            </div>
            <div className="text-[10px] font-mono text-[#4ade80] mt-3 flex items-center gap-1">
              <span>Inquiries → Direct Reply</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Grid of Modules & Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className={`p-5 rounded-xl border transition-all group flex flex-col justify-between ${
                stat.highlight
                  ? "bg-emerald-950/20 border-emerald-500/40 hover:border-emerald-400 hover:bg-emerald-950/30"
                  : "bg-[#0a170d] border-white/10 hover:border-[#22c55e]/40 hover:bg-[#0e2013]"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 group-hover:scale-105 transition">
                  <Icon className="w-5 h-5 text-[#22c55e]" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#9aa89b] group-hover:text-[#22c55e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </div>

              <div className="mt-4">
                <div className="text-2xl font-bold font-heading text-[#f6f7f4] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-[#9aa89b] group-hover:text-[#f6f7f4] transition mt-0.5">
                  {stat.label}
                </div>
                <div className="text-[11px] text-[#9aa89b]/70 font-mono mt-1 truncate">
                  {stat.subtext}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Inquiries Preview */}
      <div className="bg-[#0a170d] border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold font-heading text-[#f6f7f4]">
              Recent Contact & RFP Submissions
            </h2>
            <p className="text-xs text-[#9aa89b]">
              Inquiries dispatched through the online commercial estimator and contact form
            </p>
          </div>
          <Link
            href="/admin/inquiries"
            className="text-xs font-mono text-[#22c55e] hover:text-[#4ade80] flex items-center gap-1 transition"
          >
            <span>View All ({store.inquiries?.length || 0})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {!store.inquiries || store.inquiries.length === 0 ? (
          <div className="py-8 text-center text-xs text-[#9aa89b] border border-dashed border-white/10 rounded-xl">
            No inquiries recorded yet. When clients submit inquiries via the website or RFP tool,
            they will instantly show here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#f6f7f4]">
              <thead className="border-b border-white/10 font-mono uppercase text-[10px] text-[#9aa89b] bg-[#08130a]">
                <tr>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Client</th>
                  <th className="py-2.5 px-3">Subject</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {store.inquiries.slice(0, 5).map((inq: InquiryRecord) => (
                  <tr key={inq.id} className="hover:bg-white/5 transition">
                    <td className="py-3 px-3 font-mono text-[#9aa89b] text-[11px] whitespace-nowrap">
                      {new Date(inq.timestamp).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-[#f6f7f4]">{inq.clientName}</div>
                      <div className="text-[11px] text-[#9aa89b]">{inq.email}</div>
                    </td>
                    <td className="py-3 px-3 max-w-xs truncate text-[#9aa89b]">
                      {inq.subject}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                          inq.status === "unread"
                            ? "bg-amber-500/20 text-amber-300 border-amber-500/30 font-semibold"
                            : "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                        }`}
                      >
                        {inq.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        href="/admin/inquiries"
                        className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-[11px] font-mono text-[#22c55e] transition"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Launchpad to Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-[#0a170d] border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#22c55e] font-semibold">
            <Building2 className="w-4 h-4" />
            <span>Corporate Transition</span>
          </div>
          <h3 className="font-bold text-sm text-[#f6f7f4]">
            {store.company?.corporateTransition?.corporateEntity || "Forest Hills Ventures Inc."}
          </h3>
          <p className="text-xs text-[#9aa89b] leading-relaxed">
            Update SEC registration numbers, DTI certificates, BIR OCN standing, and leadership
            tenure details.
          </p>
          <Link
            href="/admin/company"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#22c55e] hover:text-[#4ade80] pt-2 transition"
          >
            <span>Edit Corporate Info</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="p-5 rounded-xl bg-[#0a170d] border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#22c55e] font-semibold">
            <Truck className="w-4 h-4" />
            <span>Equipment & Saws</span>
          </div>
          <h3 className="font-bold text-sm text-[#f6f7f4]">90-Chainsaw Fleet & Heavy Cranes</h3>
          <p className="text-xs text-[#9aa89b] leading-relaxed">
            Manage registrations, cross-jurisdiction authority details, boom trucks, and crawler
            excavators.
          </p>
          <Link
            href="/admin/equipment"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#22c55e] hover:text-[#4ade80] pt-2 transition"
          >
            <span>Manage Fleet</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="p-5 rounded-xl bg-[#0a170d] border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#22c55e] font-semibold">
            <FileText className="w-4 h-4" />
            <span>Audited Documents</span>
          </div>
          <h3 className="font-bold text-sm text-[#f6f7f4]">Official Document Downloads</h3>
          <p className="text-xs text-[#9aa89b] leading-relaxed">
            Upload new PDF dossiers, BIR Form 2303, client list audits, or update existing download
            URLs.
          </p>
          <Link
            href="/admin/documents"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#22c55e] hover:text-[#4ade80] pt-2 transition"
          >
            <span>Upload & Manage</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
