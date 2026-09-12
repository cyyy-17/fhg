"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  Save,
  Shield,
  KeyRound,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Database,
  Cloud,
  Mail,
  Lock,
  HardDrive,
  Globe,
  Clock,
  AlertTriangle,
  UserCheck,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminModal from "@/components/admin/AdminModal";
import AdminActivityLog from "@/components/admin/AdminActivityLog";
import { getAdminMutationHeaders } from "@/lib/csrf-client";
import type { AdminSettings, AdminStore } from "@/types/admin";

interface SystemStatus {
  storageType: string;
  kvConnected: boolean;
  blobConnected: boolean;
  nodeEnv?: string;
  siteUrl?: string;
  lastUpdated?: string;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<AdminSettings>({
    contactEmail: "",
    notificationEnabled: true,
  });
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Reset confirmation modal
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Restore file input ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isRestoring, setIsRestoring] = useState(false);

  // Live test email dispatch state
  const [isSendingTestEmail, setIsSendingTestEmail] = useState(false);
  const [testEmailResult, setTestEmailResult] = useState<{ success: boolean; message: string } | null>(null);

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    if (!newPassword) return 0;
    let score = 0;
    if (newPassword.length >= 8) score += 1;
    if (newPassword.length >= 12) score += 1;
    if (/[A-Z]/.test(newPassword)) score += 1;
    if (/[0-9]/.test(newPassword)) score += 1;
    if (/[^A-Za-z0-9]/.test(newPassword)) score += 1;
    return score;
  }, [newPassword]);

  useEffect(() => {
    let mounted = true;
    Promise.all([
      fetch("/api/admin/data?section=settings").then((r) => {
        if (!r.ok) throw new Error("Failed to load settings.");
        return r.json();
      }),
      fetch("/api/admin/data?section=system-status").then((r) => {
        if (!r.ok) throw new Error("Failed to load system diagnostics.");
        return r.json();
      }),
    ])
      .then(([settingsJson, statusJson]) => {
        if (mounted) {
          if (settingsJson.data) {
            setSettings(settingsJson.data);
          }
          setSystemStatus({
            storageType: statusJson.storageType,
            kvConnected: statusJson.kvConnected,
            blobConnected: statusJson.blobConnected,
            nodeEnv: statusJson.nodeEnv,
            siteUrl: statusJson.siteUrl,
            lastUpdated: statusJson.lastUpdated,
          });
        }
      })
      .catch((err) => {
        if (mounted) {
          setErrorMessage(err instanceof Error ? err.message : "Error loading system data.");
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  async function handleSaveSettings(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setIsSavingSettings(true);
    setSaveMessage(null);
    setErrorMessage(null);

    try {
      const headers = await getAdminMutationHeaders();
      const res = await fetch("/api/admin/data", {
        method: "PUT",
        headers,
        body: JSON.stringify({ section: "settings", data: settings }),
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || "Failed to update settings.");
      }

      setSaveMessage("Operational settings saved successfully.");
      setTimeout(() => setSaveMessage(null), 3500);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Error saving settings.");
    } finally {
      setIsSavingSettings(false);
    }
  }

  async function handleSendTestEmail() {
    setIsSendingTestEmail(true);
    setTestEmailResult(null);
    try {
      const headers = await getAdminMutationHeaders();
      const res = await fetch("/api/admin/test-email", {
        method: "POST",
        headers,
        body: JSON.stringify({ recipientEmail: settings.contactEmail }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to dispatch test email.");
      }
      setTestEmailResult({ success: true, message: data.message });
    } catch (err) {
      setTestEmailResult({
        success: false,
        message: err instanceof Error ? err.message : "Error testing email dispatch.",
      });
    } finally {
      setIsSendingTestEmail(false);
    }
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setPasswordFeedback(null);
    setPasswordError(null);

    if (!currentPassword) {
      setPasswordError("Current password is required to verify identity.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }

    setIsChangingPassword(true);

    try {
      const headers = await getAdminMutationHeaders();
      const updateRes = await fetch("/api/admin/data", {
        method: "PUT",
        headers,
        body: JSON.stringify({
          section: "settings",
          data: {
            ...settings,
            currentPassword,
            newPassword,
          },
        }),
      });

      if (!updateRes.ok) {
        const err = await updateRes.json();
        throw new Error(err.error || "Failed to update administrator password.");
      }

      setPasswordFeedback(
        "Administrator password successfully updated and hashed with bcrypt. Logging you out to verify new credentials..."
      );
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(async () => {
        try {
          const headers = await getAdminMutationHeaders();
          await fetch("/api/admin/auth/logout", { method: "POST", headers });
        } catch {
          // silent ignore
        } finally {
          // eslint-disable-next-line @next/next/no-location-assign-relative-destination
          window.location.href = "/admin/login?message=password_changed";
        }
      }, 1600);
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : "Failed to change password.");
    } finally {
      setIsChangingPassword(false);
    }
  }

  async function handleExportBackup() {
    try {
      const res = await fetch("/api/admin/data");
      if (!res.ok) throw new Error("Failed to generate backup.");
      const json = await res.json();
      const store: AdminStore = json.store;

      const blob = new Blob([JSON.stringify(store, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `fhg_full_backup_${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Error exporting backup.");
    }
  }

  function handleTriggerRestore() {
    fileInputRef.current?.click();
  }

  async function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsRestoring(true);
    setSaveMessage(null);
    setErrorMessage(null);

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);

      if (typeof parsed !== "object" || parsed === null) {
        throw new Error("Invalid backup format: JSON must be an object.");
      }

      const headers = await getAdminMutationHeaders();
      const res = await fetch("/api/admin/data", {
        method: "PUT",
        headers,
        body: JSON.stringify({ data: parsed }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to restore backup.");
      }

      setSaveMessage("Store successfully restored from uploaded JSON backup.");
      setTimeout(() => setSaveMessage(null), 5000);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Failed to restore backup.");
    } finally {
      setIsRestoring(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleExecuteReset() {
    setIsResetting(true);
    setErrorMessage(null);

    try {
      const headers = await getAdminMutationHeaders();
      const res = await fetch("/api/admin/data", {
        method: "PUT",
        headers,
        body: JSON.stringify({ action: "reset" }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to reset system configuration.");
      }

      setIsResetModalOpen(false);
      setSaveMessage("System configuration successfully reset to baseline factory defaults.");
      setTimeout(() => setSaveMessage(null), 5000);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Failed to reset system.");
    } finally {
      setIsResetting(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <AdminHeader
          title="System Administration & Diagnostics"
          subtitle="Loading enterprise settings and diagnostics..."
        />
        <div className="h-96 rounded-2xl bg-white/5 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminHeader
        title="System Administration & Diagnostics"
        subtitle="Manage platform connectivity, administrator credentials, notification dispatch, and data snapshots."
      />

      {/* Global Notifications */}
      {saveMessage && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{saveMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 1. System Diagnostics & Infrastructure Status */}
      <div className="bg-[#0a170d] border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <HardDrive className="w-4 h-4 text-[#22c55e]" />
            <h3 className="text-sm font-bold font-heading text-[#f6f7f4]">
              Storage Engine &amp; Cloud Infrastructure Diagnostics
            </h3>
          </div>
          {systemStatus?.kvConnected && systemStatus?.blobConnected ? (
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Cloud Synchronized
            </span>
          ) : systemStatus?.kvConnected || systemStatus?.blobConnected ? (
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Partial Cloud Storage
            </span>
          ) : (
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
              Local Storage Mode
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-xl bg-[#050e07] border border-white/10 space-y-1">
            <div className="flex items-center gap-2 text-xs text-[#9aa89b]">
              <Database className="w-3.5 h-3.5 text-[#22c55e]" />
              <span>Database Backend</span>
            </div>
            <div className="text-xs font-semibold text-[#f6f7f4]">
              {systemStatus?.storageType || "Local JSON / Static"}
            </div>
            <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {systemStatus?.kvConnected ? "Atomic Key KV Active" : "Local File Fallback"}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#050e07] border border-white/10 space-y-1">
            <div className="flex items-center gap-2 text-xs text-[#9aa89b]">
              <Cloud className="w-3.5 h-3.5 text-[#22c55e]" />
              <span>Asset Upload Engine</span>
            </div>
            <div className="text-xs font-semibold text-[#f6f7f4]">
              {systemStatus?.blobConnected ? "Vercel Blob Storage" : "Local Disk Storage"}
            </div>
            <div className="text-[10px] font-mono text-[#9aa89b]">
              {systemStatus?.blobConnected ? "Read/Write Token Bound" : "/public/uploads (Dev)"}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#050e07] border border-white/10 space-y-1">
            <div className="flex items-center gap-2 text-xs text-[#9aa89b]">
              <Globe className="w-3.5 h-3.5 text-[#22c55e]" />
              <span>Site Canonical Origin</span>
            </div>
            <div className="text-xs font-semibold text-[#f6f7f4] truncate font-mono">
              {systemStatus?.siteUrl || "https://fhg-two.vercel.app"}
            </div>
            <div className="text-[10px] font-mono text-[#9aa89b]">
              Environment: {systemStatus?.nodeEnv || "development"}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#050e07] border border-white/10 space-y-1">
            <div className="flex items-center gap-2 text-xs text-[#9aa89b]">
              <Clock className="w-3.5 h-3.5 text-[#22c55e]" />
              <span>Active Session Security</span>
            </div>
            <div className="text-xs font-semibold text-[#f6f7f4] flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Admin Role (7-Day Cookie)</span>
            </div>
            <div className="text-[10px] font-mono text-emerald-400">
              Double-Submit CSRF Guard Active
            </div>
          </div>
        </div>
      </div>

      {/* 2. Notification Dispatch Channels & General Settings */}
      <form
        onSubmit={handleSaveSettings}
        className="bg-[#0a170d] border border-white/10 rounded-2xl p-6 space-y-4"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-[#22c55e]" />
            <h3 className="text-sm font-bold font-heading text-[#f6f7f4]">
              Public Inquiry Routing &amp; Contact Dispatch
            </h3>
          </div>
          <button
            type="submit"
            disabled={isSavingSettings}
            className="px-3.5 py-1.5 rounded-lg bg-linear-to-r from-[#15803d] to-[#16a34a] hover:from-[#16a34a] hover:to-[#22c55e] text-[#f6f7f4] text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isSavingSettings ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>Save Routing</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
              Primary RFP &amp; Inquiry Recipient Email(s)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={settings.contactEmail || ""}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="flex-1 p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
                placeholder="edluna1971@yahoo.com, foresthillsgarden@gmail.com"
              />
              <button
                type="button"
                onClick={handleSendTestEmail}
                disabled={isSendingTestEmail || !settings.contactEmail}
                className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-[#f6f7f4] transition flex items-center gap-1.5 cursor-pointer shrink-0 disabled:opacity-40"
                title="Send a live test message via Resend"
              >
                {isSendingTestEmail ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#22c55e]" />
                ) : (
                  <Mail className="w-3.5 h-3.5 text-[#22c55e]" />
                )}
                <span>{isSendingTestEmail ? "Sending..." : "Test Dispatch"}</span>
              </button>
            </div>
            <p className="text-[11px] text-[#9aa89b] mt-1">
              Separate multiple email recipients with commas. Inbound website leads and instant RFP estimations route to all listed mailboxes.
            </p>
            {testEmailResult && (
              <div
                className={`mt-2 p-2.5 rounded-lg text-xs flex items-center gap-2 border ${
                  testEmailResult.success
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                    : "bg-amber-500/10 border-amber-500/30 text-amber-300"
                }`}
              >
                {testEmailResult.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                )}
                <span className="break-all">{testEmailResult.message}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 pt-4">
            <input
              type="checkbox"
              id="notificationsToggle"
              checked={settings.notificationEnabled ?? true}
              onChange={(e) =>
                setSettings({ ...settings, notificationEnabled: e.target.checked })
              }
              className="w-4 h-4 accent-[#22c55e] rounded cursor-pointer"
            />
            <label htmlFor="notificationsToggle" className="text-xs text-[#f6f7f4] cursor-pointer">
              <span className="font-semibold block">Enable Live Email Lead Dispatch</span>
              <span className="text-[11px] text-[#9aa89b] block">
                Sends automated email notifications to administrators upon receiving new client tenders.
              </span>
            </label>
          </div>
        </div>
      </form>

      {/* 3. Administrator Password Management with Strength Meter */}
      <form
        onSubmit={handlePasswordChange}
        className="bg-[#0a170d] border border-white/10 rounded-2xl p-6 space-y-4"
      >
        <div className="border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <KeyRound className="w-4 h-4 text-[#22c55e]" />
            <h3 className="text-sm font-bold font-heading text-[#f6f7f4]">
              Access Control &amp; Administrator Security Key
            </h3>
          </div>
          <p className="text-xs text-[#9aa89b] mt-1">
            Update the secure key used to access this CMS back-office panel. Requires current password verification and saves with bcrypt.
          </p>
        </div>

        {passwordFeedback && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{passwordFeedback}</span>
          </div>
        )}

        {passwordError && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{passwordError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
              Current Password <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
              placeholder="••••••••••••"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
              New Password (Min. 8 chars) <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
              placeholder="••••••••••••"
              required
            />
            {newPassword && (
              <div className="mt-2 space-y-1">
                <div className="flex gap-1 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      passwordStrength <= 2
                        ? "w-1/3 bg-red-500"
                        : passwordStrength <= 3
                        ? "w-2/3 bg-amber-500"
                        : "w-full bg-emerald-500"
                    }`}
                  />
                </div>
                <div className="text-[10px] font-mono text-[#9aa89b] flex justify-between">
                  <span>Strength</span>
                  <span
                    className={
                      passwordStrength <= 2
                        ? "text-red-400"
                        : passwordStrength <= 3
                        ? "text-amber-400"
                        : "text-emerald-400 font-semibold"
                    }
                  >
                    {passwordStrength <= 2 ? "Weak" : passwordStrength <= 3 ? "Good" : "Strong"}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
              Confirm New Password <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
              placeholder="••••••••••••"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-[11px] text-[#9aa89b] flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Hashed with bcrypt (10 rounds) & isolated from public store exports.</span>
          </div>
          <button
            type="submit"
            disabled={isChangingPassword || !currentPassword || !newPassword}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-[#f6f7f4] text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
          >
            {isChangingPassword ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Shield className="w-3.5 h-3.5" />
            )}
            <span>Update Admin Password</span>
          </button>
        </div>
      </form>

      {/* 4. Business Continuity & Disaster Recovery */}
      <div className="bg-[#0a170d] border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-[#22c55e]" />
            <h3 className="text-sm font-bold font-heading text-[#f6f7f4]">
              Data Vault &amp; Enterprise Business Continuity
            </h3>
          </div>
          <p className="text-xs text-[#9aa89b] mt-1">
            Export complete platform JSON dossiers for offsite backup, or restore system state when migrating servers.
          </p>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelected}
          accept=".json,application/json"
          className="hidden"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Export Full Backup */}
          <div className="p-4 rounded-xl bg-[#050e07] border border-white/10 space-y-3 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-[#f6f7f4] flex items-center gap-2">
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Export System Snapshot</span>
              </div>
              <p className="text-[11px] text-[#9aa89b] mt-1.5 leading-relaxed">
                Download a JSON archive containing all 11 business domains (company profile, fleet, species, projects, protocol, inquiries). Passwords are never included.
              </p>
            </div>
            <button
              type="button"
              onClick={handleExportBackup}
              className="w-full px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-[#f6f7f4] transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download JSON Backup</span>
            </button>
          </div>

          {/* Restore from Backup */}
          <div className="p-4 rounded-xl bg-[#050e07] border border-white/10 space-y-3 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-[#f6f7f4] flex items-center gap-2">
                <Upload className="w-4 h-4 text-cyan-400" />
                <span>Restore from JSON</span>
              </div>
              <p className="text-[11px] text-[#9aa89b] mt-1.5 leading-relaxed">
                Upload a verified Forest Hills Garden snapshot archive to restore all records to a prior state.
              </p>
            </div>
            <button
              type="button"
              onClick={handleTriggerRestore}
              disabled={isRestoring}
              className="w-full px-3 py-2 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 text-xs font-medium transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isRestoring ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Upload className="w-3.5 h-3.5" />
              )}
              <span>Upload Backup File</span>
            </button>
          </div>

          {/* Reset to Defaults */}
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 space-y-3 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-red-300 flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-red-400" />
                <span>Factory Baseline Reset</span>
              </div>
              <p className="text-[11px] text-red-300/80 mt-1.5 leading-relaxed">
                Restore company profile, services, equipment, and species to the official factory baseline data.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsResetModalOpen(true)}
              className="w-full px-3 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 text-xs font-medium transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. Live Security & Mutation Audit Trail (Decision 2) */}
      <AdminActivityLog />

      {/* Confirmation Modal for Reset */}
      <AdminModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="Confirm Factory Baseline Reset"
        subtitle="This operation will replace all customized records with official Forest Hills Garden defaults."
        maxWidth="md"
      >
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="text-xs text-red-200 leading-relaxed">
              <span className="font-bold block mb-1">Permanent Data Replacement Warning</span>
              Any custom projects, uploaded equipment, and edits made to company registrations will be reverted to the factory default dataset. Ensure you have downloaded a JSON backup first.
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsResetModalOpen(false)}
              disabled={isResetting}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-[#f6f7f4] transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleExecuteReset}
              disabled={isResetting}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-[#f6f7f4] text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isResetting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Resetting...</span>
                </>
              ) : (
                <>
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Yes, Reset to Defaults</span>
                </>
              )}
            </button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
