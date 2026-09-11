"use client";

import { useState, useEffect } from "react";
import {
  Save,
  Building2,
  Scale,
  MapPin,
  ShieldCheck,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import type { CompanyData } from "@/types/admin";
import CompanyIdentityForm from "@/components/admin/company/CompanyIdentityForm";
import CompanyTransitionForm from "@/components/admin/company/CompanyTransitionForm";
import CompanyLegalForm from "@/components/admin/company/CompanyLegalForm";
import CompanyContactForm from "@/components/admin/company/CompanyContactForm";
import CompanySafetyForm from "@/components/admin/company/CompanySafetyForm";
import CompanyStatsForm from "@/components/admin/company/CompanyStatsForm";

type TabSection = "identity" | "transition" | "legal" | "contact" | "safety" | "stats";

export default function AdminCompanyPage() {
  const [data, setData] = useState<CompanyData | null>(null);
  const [activeTab, setActiveTab] = useState<TabSection>("identity");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch("/api/admin/data?section=company")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load company profile data.");
        return res.json();
      })
      .then((json) => {
        if (mounted && json.data) {
          setData(json.data);
        }
      })
      .catch((err) => {
        if (mounted) {
          setErrorMessage(err instanceof Error ? err.message : "Failed to load company profile data.");
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  async function handleSave() {
    if (!data) return;
    setIsSaving(true);
    setSaveMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/admin/data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "company", data }),
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || "Failed to update company data.");
      }

      setSaveMessage("Company details and legal records successfully updated.");
      setTimeout(() => setSaveMessage(null), 3500);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Error saving updates.");
    } finally {
      setIsSaving(false);
    }
  }

  if (loading || !data) {
    return (
      <div className="space-y-6">
        <AdminHeader title="Company Profile & Legal Dossier" subtitle="Loading enterprise configuration..." />
        <div className="h-96 rounded-2xl bg-white/5 animate-pulse" />
      </div>
    );
  }

  const tabs: { key: TabSection; label: string; icon: typeof Building2 }[] = [
    { key: "identity", label: "Identity & Leadership", icon: Building2 },
    { key: "transition", label: "Corporate Transition", icon: Scale },
    { key: "legal", label: "Legal & Permits", icon: ShieldCheck },
    { key: "contact", label: "Head Office & Contacts", icon: MapPin },
    { key: "safety", label: "Warranty & EHS", icon: ShieldCheck },
    { key: "stats", label: "Hero Statistics", icon: BarChart3 },
  ];

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Company Profile & Legal Dossier"
        subtitle="Manage official enterprise credentials, contacts, registrations, and warranty metrics."
        actionButton={
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 rounded-lg bg-linear-to-r from-[#15803d] to-[#16a34a] hover:from-[#16a34a] hover:to-[#22c55e] text-[#f6f7f4] text-xs font-semibold shadow-lg shadow-green-950/40 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Company Profile</span>
              </>
            )}
          </button>
        }
      />

      {/* Notifications */}
      {saveMessage && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{saveMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Tab Controls */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-[#0a170d] border border-white/10 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium flex items-center gap-2 shrink-0 transition cursor-pointer ${
                isActive
                  ? "bg-[#16a34a] text-[#f6f7f4] font-semibold shadow-xs"
                  : "text-[#9aa89b] hover:text-[#f6f7f4] hover:bg-white/5"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#f6f7f4]" : "text-[#22c55e]"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Form Panels */}
      <div className="bg-[#0a170d] border border-white/10 rounded-2xl p-6 space-y-6">
        {activeTab === "identity" && <CompanyIdentityForm data={data} onChange={setData} />}
        {activeTab === "transition" && <CompanyTransitionForm data={data} onChange={setData} />}
        {activeTab === "legal" && <CompanyLegalForm data={data} onChange={setData} />}
        {activeTab === "contact" && <CompanyContactForm data={data} onChange={setData} />}
        {activeTab === "safety" && <CompanySafetyForm data={data} onChange={setData} />}
        {activeTab === "stats" && <CompanyStatsForm data={data} onChange={setData} />}
      </div>
    </div>
  );
}
