"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  Search,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
  MoveUp,
  MoveDown,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminModal from "@/components/admin/AdminModal";
import type { SpeciesItem } from "@/data/species";
import type { CompanyData } from "@/types/admin";

export default function AdminNurseriesPage() {
  const [activeTab, setActiveTab] = useState<"facilities" | "species">("species");
  const [species, setSpecies] = useState<SpeciesItem[]>([]);
  const [company, setCompany] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingSpecies, setEditingSpecies] = useState<SpeciesItem | null>(null);
  const [isCreatingSpecies, setIsCreatingSpecies] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    Promise.all([
      fetch("/api/admin/data?section=species").then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      }),
      fetch("/api/admin/data?section=company").then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      }),
    ])
      .then(([jsonSpecies, jsonCompany]) => {
        if (mounted) {
          if (jsonSpecies.data) setSpecies(jsonSpecies.data);
          if (jsonCompany.data) setCompany(jsonCompany.data);
        }
      })
      .catch(() => {
        if (mounted) setError("Failed to fetch nursery data.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  async function saveFacilities() {
    if (!company) return;
    setIsSaving(true);
    setFeedback(null);
    setError(null);
    try {
      const res = await fetch("/api/admin/data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "company", data: company }),
      });

      if (!res.ok) throw new Error("Failed to update nursery facilities.");

      setFeedback("Nursery facilities updated successfully.");
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save error.");
    } finally {
      setIsSaving(false);
    }
  }

  async function saveSpeciesList(updated: SpeciesItem[]) {
    setIsSaving(true);
    setFeedback(null);
    setError(null);
    try {
      const res = await fetch("/api/admin/data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "species", data: updated }),
      });

      if (!res.ok) throw new Error("Failed to save species.");

      setSpecies(updated);
      setFeedback("Species catalog saved successfully.");
      setEditingSpecies(null);
      setIsCreatingSpecies(false);
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save error.");
    } finally {
      setIsSaving(false);
    }
  }

  function handleCreateSpecies() {
    const newItem: SpeciesItem = {
      id: `species-${Date.now()}`,
      commonName: "New Forest Species",
      scientificName: "Species scientifica",
      category: "native",
      facility: "Sitio Latag (100K+)",
      availableSizes: "1.5m to 3.0m Polybagged Saplings",
      growthRate: "Medium Hardwood",
      offsetCompliance: "DENR Compensatory Hardwood Mandate",
      stockStatus: "Immediate Bulk Delivery",
    };
    setEditingSpecies(newItem);
    setIsCreatingSpecies(true);
  }

  function handleSaveSpeciesModal(e: React.FormEvent) {
    e.preventDefault();
    if (!editingSpecies) return;

    let next: SpeciesItem[];
    if (isCreatingSpecies) {
      next = [...species, editingSpecies];
    } else {
      next = species.map((s) => (s.id === editingSpecies.id ? editingSpecies : s));
    }
    saveSpeciesList(next);
  }

  function handleDeleteSpecies(id: string) {
    if (!confirm("Are you sure you want to remove this species entry?")) return;
    const next = species.filter((s) => s.id !== id);
    saveSpeciesList(next);
  }

  function handleMoveSpecies(index: number, direction: "up" | "down") {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= species.length) return;

    const next = [...species];
    const temp = next[index];
    next[index] = next[target];
    next[target] = temp;
    saveSpeciesList(next);
  }

  function handleAddFacility() {
    if (!company) return;
    const newFacility = {
      name: "New Nursery Propagation Farm",
      location: "Talisay, Batangas",
      coordinates: "14.089851, 121.037593",
      capacity: "50,000+ Forest Stocks",
      specialty: "Acclimatized balled trees and DENR compensatory planting stocks.",
      googleMapsUrl: "https://maps.google.com/?q=Talisay,+Batangas",
      wazeUrl: "https://waze.com/ul?q=Talisay+Batangas",
    };
    const next = [...(company.nurseries || []), newFacility];
    setCompany({ ...company, nurseries: next });
  }

  function handleDeleteFacility(index: number) {
    if (!company) return;
    if (!confirm("Are you sure you want to remove this nursery facility?")) return;
    const next = company.nurseries.filter((_, idx) => idx !== index);
    setCompany({ ...company, nurseries: next });
  }

  function handleMoveFacility(index: number, direction: "up" | "down") {
    if (!company) return;
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= company.nurseries.length) return;

    const next = [...company.nurseries];
    const temp = next[index];
    next[index] = next[target];
    next[target] = temp;
    setCompany({ ...company, nurseries: next });
  }

  const filteredSpecies = species.filter(
    (s) =>
      s.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.facility.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Batangas Nurseries & Species Propagation"
        subtitle="Manage the 3 propagation facilities (230,000+ capacity) and cultivated endemic species."
        actionButton={
          activeTab === "species" ? (
            <button
              type="button"
              onClick={handleCreateSpecies}
              className="px-4 py-2 rounded-lg bg-linear-to-r from-[#15803d] to-[#16a34a] hover:from-[#16a34a] hover:to-[#22c55e] text-[#f6f7f4] text-xs font-semibold shadow-lg shadow-green-950/40 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Cultivated Species</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={saveFacilities}
              disabled={isSaving}
              className="px-4 py-2 rounded-lg bg-linear-to-r from-[#15803d] to-[#16a34a] hover:from-[#16a34a] hover:to-[#22c55e] text-[#f6f7f4] text-xs font-semibold shadow-lg shadow-green-950/40 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Facilities</span>
            </button>
          )
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

      {/* Segmented Controls */}
      <div className="flex items-center gap-2 p-1 rounded-xl bg-[#0a170d] border border-white/10 w-fit">
        <button
          onClick={() => setActiveTab("species")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
            activeTab === "species"
              ? "bg-[#16a34a] text-[#f6f7f4]"
              : "text-[#9aa89b] hover:text-[#f6f7f4]"
          }`}
        >
          Cultivated Species ({species.length})
        </button>
        <button
          onClick={() => setActiveTab("facilities")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
            activeTab === "facilities"
              ? "bg-[#16a34a] text-[#f6f7f4]"
              : "text-[#9aa89b] hover:text-[#f6f7f4]"
          }`}
        >
          Nursery Facilities ({company?.nurseries?.length || 3})
        </button>
      </div>

      {/* TAB 1: SPECIES CATALOG */}
      {activeTab === "species" && (
        <div className="space-y-4">
          <div className="p-3 bg-[#0a170d] border border-white/10 rounded-xl flex items-center gap-3">
            <Search className="w-4 h-4 text-[#9aa89b]" />
            <input
              type="text"
              placeholder="Search by common name, scientific name, or nursery facility..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-xs text-[#f6f7f4] focus:outline-none"
            />
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs text-[#9aa89b]">Loading species catalog...</div>
          ) : (
            <div className="bg-[#0a170d] border border-white/10 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#f6f7f4]">
                  <thead className="border-b border-white/10 font-mono uppercase text-[10px] text-[#9aa89b] bg-[#08130a]">
                    <tr>
                      <th className="py-3 px-4">Species Name</th>
                      <th className="py-3 px-4">Nursery Farm</th>
                      <th className="py-3 px-4">Available Caliper & Sizes</th>
                      <th className="py-3 px-4">Stock Standing</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredSpecies.map((item) => (
                      <tr key={item.id} className="hover:bg-white/5 transition">
                        <td className="py-3 px-4">
                          <div className="font-semibold text-sm text-[#f6f7f4]">
                            {item.commonName}
                          </div>
                          <div className="text-[11px] text-[#22c55e] italic font-editorial">
                            {item.scientificName}
                          </div>
                          <div className="text-[10px] font-mono text-[#9aa89b] uppercase mt-0.5">
                            {item.category} • {item.growthRate}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-[#4ade80]">
                          {item.facility}
                        </td>
                        <td className="py-3 px-4 text-xs text-[#9aa89b] max-w-xs">
                          {item.availableSizes}
                          <div className="text-[10px] text-[#9aa89b]/70 font-mono mt-0.5">
                            {item.offsetCompliance}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                              item.stockStatus === "Immediate Bulk Delivery"
                                ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                                : item.stockStatus === "Acclimatized Balled"
                                ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                                : "bg-white/5 text-[#9aa89b] border-white/10"
                            }`}
                          >
                            {item.stockStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                const idx = species.findIndex((s) => s.id === item.id);
                                handleMoveSpecies(idx, "up");
                              }}
                              disabled={species.findIndex((s) => s.id === item.id) === 0}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#9aa89b] hover:text-white disabled:opacity-30 transition cursor-pointer"
                              title="Move Up"
                            >
                              <MoveUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const idx = species.findIndex((s) => s.id === item.id);
                                handleMoveSpecies(idx, "down");
                              }}
                              disabled={species.findIndex((s) => s.id === item.id) === species.length - 1}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#9aa89b] hover:text-white disabled:opacity-30 transition cursor-pointer"
                              title="Move Down"
                            >
                              <MoveDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingSpecies(JSON.parse(JSON.stringify(item)));
                                setIsCreatingSpecies(false);
                              }}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-[#22c55e]/20 text-[#9aa89b] hover:text-[#4ade80] transition cursor-pointer"
                              title="Edit Species"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteSpecies(item.id)}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-[#9aa89b] hover:text-red-400 transition cursor-pointer"
                              title="Delete Species"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: NURSERY FACILITIES */}
      {activeTab === "facilities" && company && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#0a170d] border border-white/10">
            <div>
              <h3 className="text-sm font-bold font-heading text-[#f6f7f4] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#22c55e]" />
                <span>Nursery Propagation Facilities ({company.nurseries?.length || 0})</span>
              </h3>
              <p className="text-xs text-[#9aa89b] mt-0.5">
                Configure production farms, specimen holding capacity, GPS coordinates, and client navigation links.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAddFacility}
                className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/30 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Facility</span>
              </button>
              <button
                type="button"
                onClick={saveFacilities}
                disabled={isSaving}
                className="px-4 py-1.5 rounded-lg bg-linear-to-r from-[#15803d] to-[#16a34a] hover:from-[#16a34a] hover:to-[#22c55e] text-[#f6f7f4] text-xs font-semibold shadow-md transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                <span>Save All Facilities</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {company.nurseries.map((nursery, idx) => (
              <div
                key={idx}
                className="bg-[#0a170d] border border-white/10 rounded-2xl p-5 space-y-3.5 flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#22c55e]" />
                      <span className="text-xs font-mono uppercase text-[#22c55e] font-semibold">
                        Facility #{idx + 1}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMoveFacility(idx, "up")}
                        disabled={idx === 0}
                        className="p-1 rounded-md bg-white/5 hover:bg-white/10 text-[#9aa89b] hover:text-white disabled:opacity-30 transition cursor-pointer"
                        title="Move Up"
                      >
                        <MoveUp className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveFacility(idx, "down")}
                        disabled={idx === company.nurseries.length - 1}
                        className="p-1 rounded-md bg-white/5 hover:bg-white/10 text-[#9aa89b] hover:text-white disabled:opacity-30 transition cursor-pointer"
                        title="Move Down"
                      >
                        <MoveDown className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteFacility(idx)}
                        className="p-1 rounded-md bg-white/5 hover:bg-red-500/20 text-[#9aa89b] hover:text-red-400 transition cursor-pointer ml-1"
                        title="Delete Facility"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#9aa89b] mb-1">
                      Facility Name *
                    </label>
                    <input
                      type="text"
                      value={nursery.name}
                      onChange={(e) => {
                        const next = [...company.nurseries];
                        next[idx] = { ...next[idx], name: e.target.value };
                        setCompany({ ...company, nurseries: next });
                      }}
                      className="w-full p-2 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] font-semibold focus:ring-1 focus:ring-[#22c55e] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#9aa89b] mb-1">
                      Location Address
                    </label>
                    <input
                      type="text"
                      value={nursery.location}
                      onChange={(e) => {
                        const next = [...company.nurseries];
                        next[idx] = { ...next[idx], location: e.target.value };
                        setCompany({ ...company, nurseries: next });
                      }}
                      className="w-full p-2 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#9aa89b] mb-1">
                      Holding Capacity
                    </label>
                    <input
                      type="text"
                      value={nursery.capacity}
                      onChange={(e) => {
                        const next = [...company.nurseries];
                        next[idx] = { ...next[idx], capacity: e.target.value };
                        setCompany({ ...company, nurseries: next });
                      }}
                      className="w-full p-2 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#22c55e] font-mono focus:ring-1 focus:ring-[#22c55e] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#9aa89b] mb-1">
                      Facility Specialty &amp; Acclimatization Stock
                    </label>
                    <textarea
                      rows={3}
                      value={nursery.specialty}
                      onChange={(e) => {
                        const next = [...company.nurseries];
                        next[idx] = { ...next[idx], specialty: e.target.value };
                        setCompany({ ...company, nurseries: next });
                      }}
                      className="w-full p-2 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#9aa89b] mb-1">
                      GPS Coordinates
                    </label>
                    <input
                      type="text"
                      value={nursery.coordinates || ""}
                      onChange={(e) => {
                        const next = [...company.nurseries];
                        next[idx] = { ...next[idx], coordinates: e.target.value };
                        setCompany({ ...company, nurseries: next });
                      }}
                      placeholder="e.g. 14.089851, 121.037593"
                      className="w-full p-2 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] font-mono focus:ring-1 focus:ring-[#22c55e] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#9aa89b] mb-1">
                      Google Maps URL
                    </label>
                    <input
                      type="text"
                      value={nursery.googleMapsUrl || ""}
                      onChange={(e) => {
                        const next = [...company.nurseries];
                        next[idx] = { ...next[idx], googleMapsUrl: e.target.value };
                        setCompany({ ...company, nurseries: next });
                      }}
                      placeholder="https://maps.google.com/?q=..."
                      className="w-full p-2 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] font-mono focus:ring-1 focus:ring-[#22c55e] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#9aa89b] mb-1">
                      Waze URL
                    </label>
                    <input
                      type="text"
                      value={nursery.wazeUrl || ""}
                      onChange={(e) => {
                        const next = [...company.nurseries];
                        next[idx] = { ...next[idx], wazeUrl: e.target.value };
                        setCompany({ ...company, nurseries: next });
                      }}
                      placeholder="https://waze.com/ul?q=..."
                      className="w-full p-2 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] font-mono focus:ring-1 focus:ring-[#22c55e] outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add / Edit Species Modal */}
      {editingSpecies && (
        <AdminModal
          isOpen={true}
          onClose={() => {
            setEditingSpecies(null);
            setIsCreatingSpecies(false);
          }}
          title={isCreatingSpecies ? "Add Cultivated Species" : `Edit ${editingSpecies.commonName}`}
          subtitle="Configure species caliper, biological category, and nursery holding facility."
          maxWidth="2xl"
        >
          <form onSubmit={handleSaveSpeciesModal} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Common Species Name
                </label>
                <input
                  type="text"
                  required
                  value={editingSpecies.commonName}
                  onChange={(e) =>
                    setEditingSpecies({ ...editingSpecies, commonName: e.target.value })
                  }
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] font-semibold focus:ring-1 focus:ring-[#22c55e] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Scientific Name
                </label>
                <input
                  type="text"
                  required
                  value={editingSpecies.scientificName}
                  onChange={(e) =>
                    setEditingSpecies({ ...editingSpecies, scientificName: e.target.value })
                  }
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] italic focus:ring-1 focus:ring-[#22c55e] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Biological Category
                </label>
                <select
                  value={editingSpecies.category}
                  onChange={(e) =>
                    setEditingSpecies({
                      ...editingSpecies,
                      category: e.target.value as SpeciesItem["category"],
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none capitalize"
                >
                  <option value="native">Native Hardwood</option>
                  <option value="ornamental">Ornamental</option>
                  <option value="bamboo">Bamboo</option>
                  <option value="mature-balled">Mature Balled</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Nursery Holding Farm
                </label>
                <select
                  value={editingSpecies.facility}
                  onChange={(e) =>
                    setEditingSpecies({
                      ...editingSpecies,
                      facility: e.target.value as SpeciesItem["facility"],
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
                >
                  <option value="Sitio Latag (100K+)">Sitio Latag (100K+)</option>
                  <option value="Tumaway (80K+)">Tumaway (80K+)</option>
                  <option value="Aya (50K+)">Aya (50K+)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Available Sizes & Caliper
                </label>
                <input
                  type="text"
                  required
                  value={editingSpecies.availableSizes}
                  onChange={(e) =>
                    setEditingSpecies({ ...editingSpecies, availableSizes: e.target.value })
                  }
                  placeholder="e.g. 1.5m to 3.5m Saplings • 15–30cm Caliper"
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Growth Rate Class
                </label>
                <input
                  type="text"
                  value={editingSpecies.growthRate}
                  onChange={(e) =>
                    setEditingSpecies({ ...editingSpecies, growthRate: e.target.value })
                  }
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  Stock Standing Status
                </label>
                <select
                  value={editingSpecies.stockStatus}
                  onChange={(e) =>
                    setEditingSpecies({
                      ...editingSpecies,
                      stockStatus: e.target.value as SpeciesItem["stockStatus"],
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
                >
                  <option value="Immediate Bulk Delivery">Immediate Bulk Delivery</option>
                  <option value="Acclimatized Balled">Acclimatized Balled</option>
                  <option value="Batch In Production">Batch In Production</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
                  DENR Offset Compliance
                </label>
                <input
                  type="text"
                  value={editingSpecies.offsetCompliance}
                  onChange={(e) =>
                    setEditingSpecies({ ...editingSpecies, offsetCompliance: e.target.value })
                  }
                  className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setEditingSpecies(null);
                  setIsCreatingSpecies(false);
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
                  <span>{isCreatingSpecies ? "Add Species" : "Save Changes"}</span>
                )}
              </button>
            </div>
          </form>
        </AdminModal>
      )}
    </div>
  );
}
