"use client";

import { useState } from "react";
import { Building2, Landmark, Zap, ShieldCheck } from "lucide-react";
import { clientsData } from "@/data/clients";

type Sector = "All" | "Infrastructure & Heavy Construction" | "Real Estate & Commercial" | "Energy & Industrial" | "Government & Financial";

export default function ClientsWall() {
  const [activeSector, setActiveSector] = useState<Sector>("All");

  const sectors: Sector[] = [
    "All",
    "Infrastructure & Heavy Construction",
    "Real Estate & Commercial",
    "Energy & Industrial",
    "Government & Financial"
  ];

  const filteredClients = activeSector === "All"
    ? clientsData
    : clientsData.filter((c) => c.sector === activeSector);

  return (
    <section id="clients" className="py-24 bg-[#050e07] relative z-20">
      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#ffd600] bg-[#ffd600]/10 border border-[#ffd600]/20 mb-4">
            Enterprise Partnerships
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
            Trusted by the Builders of the Nation
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#a8d5a8]">
            Serving top-tier general contractors, concessionaires, and public agencies with zero non-compliance downtime.
          </p>
        </div>

        {/* Sector Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {sectors.map((sector) => (
            <button
              key={sector}
              onClick={() => setActiveSector(sector)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeSector === sector
                  ? "bg-[#ffd600] text-[#050e07] shadow-lg shadow-[#ffd600]/20 scale-105"
                  : "bg-[#102414]/80 text-[#a8d5a8] hover:text-white border border-[#4caf50]/20 hover:border-[#76c442]"
              }`}
            >
              {sector}
            </button>
          ))}
        </div>

        {/* Broad 5-Column Clients Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-[#2e7d32]/20 text-[#76c442]">
                    {client.sector.includes("Infrastructure") ? (
                      <Building2 className="w-4 h-4" />
                    ) : client.sector.includes("Government") ? (
                      <Landmark className="w-4 h-4" />
                    ) : client.sector.includes("Energy") ? (
                      <Zap className="w-4 h-4" />
                    ) : (
                      <ShieldCheck className="w-4 h-4" />
                    )}
                  </div>
                  <span className="text-[10px] text-[#ffd600] uppercase font-bold tracking-wider">
                    {client.sector.split(" ")[0]}
                  </span>
                </div>

                <h3 className="text-base font-bold font-heading text-white group-hover:text-[#ffd600] transition-colors mb-2">
                  {client.name}
                </h3>
              </div>

              <div className="pt-3 border-t border-white/10">
                <p className="text-[11px] text-[#a8d5a8] font-medium">
                  {client.projectSample}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
