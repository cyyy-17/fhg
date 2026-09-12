"use client";

import Link from "next/link";
import { ExternalLink, ShieldCheck, ChevronRight } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  actionButton?: React.ReactNode;
  lastUpdated?: string;
}

export default function AdminHeader({ title, subtitle, actionButton, lastUpdated }: AdminHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
      <div>
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#9aa89b] mb-1.5">
          <Link href="/admin" className="flex items-center gap-1.5 hover:text-[#22c55e] transition">
            <ShieldCheck className="w-3.5 h-3.5 text-[#22c55e]" />
            <span>FHG Admin</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-white/30" />
          <span className="text-[#4ade80] font-medium">{title}</span>
          {lastUpdated && (
            <>
              <span className="text-white/20">•</span>
              <span className="text-white/50 text-[10px] normal-case">
                Saved {new Date(lastUpdated).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </>
          )}
        </nav>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#f6f7f4] tracking-tight">
          {title}
        </h1>
        {subtitle && <p className="text-xs sm:text-sm text-[#9aa89b] mt-1">{subtitle}</p>}
      </div>

      <div className="flex items-center flex-wrap gap-2.5">
        {actionButton}

        <Link
          href="/"
          target="_blank"
          className="px-3 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-semibold text-[#4ade80] transition flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <span>Public Site</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </header>
  );
}
