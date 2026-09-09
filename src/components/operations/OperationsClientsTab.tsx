"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Building2, ArrowRight } from "lucide-react";
import { clientsData } from "@/data/clients";

type ClientSector =
  | "All"
  | "Infrastructure & Heavy Construction"
  | "Real Estate & Commercial"
  | "Energy & Industrial"
  | "Government & Financial";

export default function OperationsClientsTab() {
  const [clientSector, setClientSector] = useState<ClientSector>("All");

  const filteredClients = useMemo(() => {
    if (clientSector === "All") return clientsData;
    return clientsData.filter((c) => c.sector === clientSector);
  }, [clientSector]);

  const sectors: ClientSector[] = [
    "All",
    "Infrastructure & Heavy Construction",
    "Real Estate & Commercial",
    "Energy & Industrial",
    "Government & Financial",
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Sector Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {sectors.map((sec) => (
          <button
            key={sec}
            onClick={() => setClientSector(sec)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              clientSector === sec
                ? "bg-[#ffd600] text-[#050e07] shadow-lg shadow-[#ffd600]/20 scale-105"
                : "bg-[#102414] text-[#a8d5a8] hover:text-white hover:bg-[#1a3820] border border-white/10"
            }`}
          >
            {sec}
          </button>
        ))}
      </div>

      {/* Clients Wall Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col justify-between group border border-white/10"
          >
            <div className="mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#76c442] mb-3 group-hover:scale-110 group-hover:bg-[#2e7d32] group-hover:text-white transition-all">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-[#ffd600] transition-colors leading-snug">
                {client.name}
              </h4>
            </div>

            <div className="pt-2 border-t border-white/10">
              <span className="text-[10px] text-[#ffd600] font-mono block mb-1">
                {client.projectSample}
              </span>
              <span className="text-[10px] text-[#a8d5a8]/70 block truncate">
                {client.sector}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Subcontractor RFP CTA */}
      <div className="p-8 rounded-3xl bg-linear-to-r from-[#102414] via-[#07160a] to-[#102414] border border-[#4caf50]/30 shadow-2xl text-center max-w-4xl mx-auto flex flex-col items-center">
        <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-2">
          Partner With the Subcontractor Trusted by San Miguel, Ayala & EEI
        </h3>
        <p className="text-xs sm:text-sm text-[#a8d5a8] max-w-2xl mb-6 leading-relaxed">
          From turnkey DENR compliance submissions to heavy crane relocations and corridor clearing, Forest Hills Garden mobilizes within 48 to 72 hours across Luzon.
        </p>
        <Link
          href="/#estimate"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-linear-to-r from-[#ffd600] to-[#f9c923] text-[#061008] hover:brightness-110 shadow-lg shadow-[#ffd600]/20 hover:scale-105 transition-all"
        >
          <span>Initiate Tender Assessment</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
