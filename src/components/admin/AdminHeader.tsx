"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, RotateCcw, ShieldCheck, Loader2 } from "lucide-react";
import AdminModal from "./AdminModal";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  actionButton?: React.ReactNode;
}

export default function AdminHeader({ title, subtitle, actionButton }: AdminHeaderProps) {
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  async function handleFactoryReset() {
    setIsResetting(true);
    try {
      const res = await fetch("/api/admin/reset", { method: "POST" });
      if (res.ok) {
        setResetSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      }
    } catch {
      setIsResetting(false);
    }
  }

  return (
    <>
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[#22c55e] mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>FHG Admin Console</span>
            <span className="text-white/20">•</span>
            <span className="text-[#9aa89b]">Live Managed Store</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#f6f7f4] tracking-tight">
            {title}
          </h1>
          {subtitle && <p className="text-xs sm:text-sm text-[#9aa89b] mt-1">{subtitle}</p>}
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
          {actionButton}

          <button
            type="button"
            onClick={() => setResetModalOpen(true)}
            className="px-3 py-2 rounded-lg bg-white/5 hover:bg-red-500/10 hover:text-red-300 border border-white/10 hover:border-red-500/30 text-xs font-medium text-[#9aa89b] transition flex items-center gap-1.5 cursor-pointer"
            title="Reset system to default seed data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="px-3 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-semibold text-[#4ade80] transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>Public Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </header>

      {/* Reset Confirmation Modal */}
      <AdminModal
        isOpen={resetModalOpen}
        onClose={() => !isResetting && setResetModalOpen(false)}
        title="Restore Default Profile Data"
        subtitle="This action will restore all business data to the original certified baseline."
        maxWidth="md"
      >
        <div className="space-y-4">
          <p className="text-xs text-[#9aa89b] leading-relaxed">
            Are you sure you want to perform a factory reset? Any custom modifications you have made
            to company info, services, projects, equipment, or documents will be overwritten with the
            authoritative seed dataset.
          </p>

          {resetSuccess ? (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-medium text-center">
              Successfully restored defaults. Refreshing console...
            </div>
          ) : (
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setResetModalOpen(false)}
                disabled={isResetting}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-[#f6f7f4] transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleFactoryReset}
                disabled={isResetting}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-semibold text-white transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isResetting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Restoring...
                  </>
                ) : (
                  "Confirm Reset"
                )}
              </button>
            </div>
          )}
        </div>
      </AdminModal>
    </>
  );
}
