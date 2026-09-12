"use client";

import { useState, useEffect } from "react";
import { Activity, RefreshCw, Shield, AlertCircle, CheckCircle2, User, Clock } from "lucide-react";
import type { AuditLogEntry } from "@/types/admin";

export default function AdminActivityLog() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchLogs() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/data?section=auditLogs");
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json.data)) {
          setLogs(json.data);
        }
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let ignore = false;
    async function init() {
      try {
        const res = await fetch("/api/admin/data?section=auditLogs");
        if (res.ok && !ignore) {
          const json = await res.json();
          if (Array.isArray(json.data)) {
            setLogs(json.data);
          }
        }
      } catch {
        // ignore
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }
    init();
    return () => {
      ignore = true;
    };
  }, []);

  function getActionBadge(action: string) {
    if (action.startsWith("auth.login_failed") || action.includes("failed")) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">
          <AlertCircle className="w-3 h-3" />
          {action}
        </span>
      );
    }
    if (action.startsWith("auth.login_success")) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
          <CheckCircle2 className="w-3 h-3" />
          {action}
        </span>
      );
    }
    if (action.startsWith("system.")) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
          <Shield className="w-3 h-3" />
          {action}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded-full">
        <Activity className="w-3 h-3" />
        {action}
      </span>
    );
  }

  return (
    <div className="bg-[#0a170d] border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
        <div>
          <h3 className="text-base font-bold font-heading text-[#f6f7f4] flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            Platform Security & Mutation Audit Trail
          </h3>
          <p className="text-xs text-[#9aa89b] mt-0.5">
            Capped ledger of the last 100 authenticated administrative sessions and data mutations.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchLogs}
          disabled={loading}
          className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs text-[#9aa89b] hover:text-white transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {loading && logs.length === 0 ? (
        <div className="text-center py-8 text-xs text-[#9aa89b]">Loading audit logs...</div>
      ) : logs.length === 0 ? (
        <div className="text-center py-8 text-xs text-[#9aa89b]">No activity recorded yet.</div>
      ) : (
        <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
          {logs.map((log) => (
            <div
              key={log.id}
              className="p-3 bg-black/30 border border-white/5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-white/15 transition"
            >
              <div className="flex items-start sm:items-center gap-3 min-w-0">
                <div className="shrink-0">{getActionBadge(log.action)}</div>
                <div className="min-w-0">
                  <div className="text-xs text-[#f6f7f4] truncate font-medium">
                    {log.details || "Administrative event"}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[#9aa89b] mt-0.5">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {log.actor}
                    </span>
                    {log.ip && (
                      <>
                        <span>•</span>
                        <span className="font-mono text-[10px] text-white/50">{log.ip}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-[11px] font-mono text-[#9aa89b] shrink-0 flex items-center gap-1 sm:self-center">
                <Clock className="w-3 h-3 text-white/40" />
                <span>{new Date(log.timestamp).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
