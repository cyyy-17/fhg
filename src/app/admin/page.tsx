"use client";

import { useState, useEffect, useId, useMemo } from "react";
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
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  KeyRound,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  ClipboardList,
  TrendingUp,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import type { AdminStore, InquiryRecord } from "@/types/admin";

export default function AdminDashboardPage() {
  const [store, setStore] = useState<AdminStore | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const gradientId = useId();

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

  // 7-day inquiry volume data computation (Decision 3)
  const chartData = useMemo(() => {
    const days: { day: string; dateStr: string; count: number }[] = [];
    const now = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const dateKey = d.toISOString().split("T")[0];
      const dayName = d.toLocaleDateString("en-US", { weekday: "short" });

      const dayInquiries = (store?.inquiries || []).filter((inq) => {
        try {
          return inq.timestamp.startsWith(dateKey);
        } catch {
          return false;
        }
      });

      days.push({
        day: dayName,
        dateStr: `${d.getMonth() + 1}/${d.getDate()}`,
        count: dayInquiries.length,
      });
    }
    return days;
  }, [store?.inquiries]);

  const maxInquiries = useMemo(() => {
    const maxVal = Math.max(...chartData.map((d) => d.count), 0);
    return Math.max(maxVal, 5); // minimum scale height of 5
  }, [chartData]);

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
      value: store.inquiries?.length ?? 0,
      subtext: `${unreadInquiries.length} pending review`,
      icon: Mail,
      href: "/admin/inquiries",
      highlight: unreadInquiries.length > 0,
    },
    {
      label: "Services Portfolio",
      value: store.services?.length ?? 0,
      subtext: "Industrial Arboriculture",
      icon: Trees,
      href: "/admin/services",
    },
    {
      label: "Signature Projects",
      value: store.projects?.length ?? 0,
      subtext: `${ongoingProjects.length} Active • ${(store.projects?.length ?? 0) - ongoingProjects.length} Completed`,
      icon: Briefcase,
      href: "/admin/projects",
    },
    {
      label: "Client Partners",
      value: store.clients?.length ?? 0,
      subtext: "Enterprise Contracting Tenders",
      icon: Users,
      href: "/admin/clients",
    },
    {
      label: "Batangas Nurseries",
      value: store.company?.nurseries?.length ?? 3,
      subtext: `${store.species?.length ?? 0} Propagated Species`,
      icon: Sprout,
      href: "/admin/nurseries",
    },
    {
      label: "Equipment Fleet",
      value: store.equipment?.length ?? 0,
      subtext: "90 DENR Chainsaws + Cranes",
      icon: Truck,
      href: "/admin/equipment",
    },
    {
      label: "Document Vault",
      value: store.documents?.length ?? 0,
      subtext: "Audited BIR, DTI, Dossiers",
      icon: FileText,
      href: "/admin/documents",
    },
    {
      label: "Standard Protocol",
      value: store.protocol?.length ?? 0,
      subtext: "Step-by-step Procedures",
      icon: ClipboardList,
      href: "/admin/protocol",
    },
    {
      label: "Knowledge & FAQs",
      value: store.faqs?.length ?? 0,
      subtext: "Public Q&A and Guidance",
      icon: HelpCircle,
      href: "/admin/faqs",
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
        lastUpdated={store.lastUpdated}
      />

      {/* Unread Inquiries Banner (If Any) */}
      {unreadInquiries.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 text-xs text-amber-200">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            <span className="font-semibold text-amber-100">
              {unreadInquiries.length} New Unread {unreadInquiries.length === 1 ? "Inquiry" : "Inquiries"}
            </span>
            <span className="text-amber-500/40">•</span>
            <span className="text-amber-200/80 hidden sm:inline">
              Prospective clients have submitted RFPs awaiting technical qualification.
            </span>
          </div>
          <Link
            href="/admin/inquiries"
            className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 font-semibold transition shrink-0"
          >
            Review Inbox →
          </Link>
        </div>
      )}

      {/* 7-Day Inquiry Volume Activity Chart (Decision 3) */}
      <div className="bg-[#0a170d] border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#22c55e]">
              <TrendingUp className="w-4 h-4" />
              <span>Inquiry Velocity</span>
            </div>
            <h3 className="text-base font-bold font-heading text-[#f6f7f4] mt-0.5">
              7-Day Lead & RFP Volume
            </h3>
          </div>
          <div className="text-xs text-[#9aa89b] font-mono">
            Past 7 Days: <span className="text-white font-bold">{chartData.reduce((acc, c) => acc + c.count, 0)} total inquiries</span>
          </div>
        </div>

        {/* SVG Bar Chart with unique useId gradient */}
        <div className="w-full pt-2">
          <svg viewBox="0 0 700 160" className="w-full h-40 overflow-visible">
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#15803d" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid Lines */}
            {[0, 0.5, 1].map((ratio, idx) => {
              const y = 120 - ratio * 100;
              return (
                <g key={idx}>
                  <line
                    x1="40"
                    y1={y}
                    x2="680"
                    y2={y}
                    stroke="rgba(255,255,255,0.06)"
                    strokeDasharray="4 4"
                  />
                  <text
                    x="28"
                    y={y + 4}
                    fill="#9aa89b"
                    fontSize="10"
                    textAnchor="end"
                    fontFamily="monospace"
                  >
                    {Math.round(ratio * maxInquiries)}
                  </text>
                </g>
              );
            })}

            {/* Bars & Labels */}
            {chartData.map((d, index) => {
              const slotWidth = (640 / 7);
              const x = 50 + index * slotWidth;
              const barWidth = Math.min(slotWidth - 24, 48);
              const barHeight = Math.max((d.count / maxInquiries) * 100, d.count > 0 ? 8 : 2);
              const y = 120 - barHeight;

              return (
                <g key={d.dateStr} className="group cursor-pointer">
                  {/* Bar Background Hover Area */}
                  <rect
                    x={x}
                    y={20}
                    width={barWidth}
                    height={100}
                    fill="transparent"
                    className="hover:fill-white/5 transition"
                  />

                  {/* Count Label Above Bar */}
                  <text
                    x={x + barWidth / 2}
                    y={y - 6}
                    fill={d.count > 0 ? "#4ade80" : "#9aa89b"}
                    fontSize="11"
                    fontWeight={d.count > 0 ? "bold" : "normal"}
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {d.count}
                  </text>

                  {/* Bar */}
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    rx="4"
                    fill={d.count > 0 ? `url(#${gradientId})` : "rgba(255,255,255,0.05)"}
                    stroke={d.count > 0 ? "#4ade80" : "rgba(255,255,255,0.1)"}
                    strokeWidth="1"
                    className="transition-all duration-300 group-hover:brightness-125"
                  />

                  {/* Day Label */}
                  <text
                    x={x + barWidth / 2}
                    y="138"
                    fill="#f6f7f4"
                    fontSize="11"
                    textAnchor="middle"
                    fontFamily="system-ui, sans-serif"
                    fontWeight="500"
                  >
                    {d.day}
                  </text>

                  {/* Date Sub-label */}
                  <text
                    x={x + barWidth / 2}
                    y="152"
                    fill="#9aa89b"
                    fontSize="10"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {d.dateStr}
                  </text>
                </g>
              );
            })}
          </svg>
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
                Update the console security key anytime. Changing your password immediately secures all sessions with bcrypt.
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
                Upload PDFs or certifications. Check expiration alerts (30/60/90 days) and update regulatory files.
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
                Filter, bulk-manage, and copy technical dossiers. Click &ldquo;Reply by Email&rdquo; for instant dispatch.
              </p>
            </div>
            <div className="text-[10px] font-mono text-[#4ade80] mt-3 flex items-center gap-1">
              <span>Inquiries → Bulk Actions</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Grid of Modules & Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
                  <th className="py-2.5 px-3">Classification</th>
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
                      <div className="font-semibold text-[#f6f7f4]">
                        {inq.clientName}
                        {inq.company && <span className="text-white/40 font-normal ml-1">({inq.company})</span>}
                      </div>
                      <div className="text-[11px] text-[#9aa89b]">{inq.email}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/80">
                        {inq.type || "General"}
                      </span>
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
            Upload new PDF dossiers, BIR Form 2303, client list audits, or monitor document expiration alerts.
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
