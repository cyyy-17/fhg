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

import type { ClientItem } from "@/data/clients";

interface OperationsClientsTabProps {
  initialClients?: ClientItem[];
}

export default function OperationsClientsTab({ initialClients }: OperationsClientsTabProps = {}) {
  const clients = Array.isArray(initialClients) && initialClients.length > 0 ? initialClients : clientsData;
  const [clientSector, setClientSector] = useState<ClientSector>("All");

  const filteredClients = useMemo(() => {
    if (clientSector === "All") return clients;
    return clients.filter((c) => c.sector === clientSector);
  }, [clients, clientSector]);

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
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              clientSector === sec
                ? "bg-linear-to-r from-[#15803d] to-[#16a34a] text-[#f6f7f4] font-bold shadow-md shadow-[#16a34a]/25 border border-[#22c55e]/40 scale-102"
                : "bg-[#0a170d] text-[#9aa89b] hover:text-[#f6f7f4] hover:bg-[#0f2413] border border-white/8"
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
            className="bg-[#0a170d]/80 rounded-2xl p-5 flex flex-col justify-between group border border-white/8 hover:border-[#22c55e]/40 transition-all duration-300"
          >
            <div className="mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/4 border border-white/8 flex items-center justify-center text-[#22c55e] mb-3 group-hover:scale-105 group-hover:bg-linear-to-r group-hover:from-[#15803d] group-hover:to-[#16a34a] group-hover:text-white transition-all">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-[#f6f7f4] group-hover:text-[#4ade80] transition-colors leading-snug">
                {client.name}
              </h4>
            </div>

            <div className="pt-2 border-t border-white/8">
              <span className="text-[10px] text-[#4ade80] font-mono block mb-1">
                {client.projectSample}
              </span>
              <span className="text-[10px] text-[#9aa89b]/80 block truncate">
                {client.sector}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Subcontractor RFP CTA */}
      <div className="p-8 rounded-3xl bg-[#0a170d] border border-[#22c55e]/30 shadow-2xl text-center max-w-4xl mx-auto flex flex-col items-center">
        <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#f6f7f4] mb-2">
          Partner With the Subcontractor Trusted by San Miguel, Ayala & EEI
        </h3>
        <p className="text-xs sm:text-sm text-[#9aa89b] max-w-2xl mb-6 leading-relaxed">
          From turnkey DENR compliance submissions to heavy crane relocations and corridor clearing, Forest Hills Garden mobilizes within 48 to 72 hours across Luzon.
        </p>
        <Link
          href="/#estimate"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-linear-to-r from-[#f59e0b] to-[#fbbf24] text-[#050d07] hover:brightness-110 shadow-lg shadow-[#f59e0b]/20 hover:scale-105 transition-all"
        >
          <span>Initiate Tender Assessment</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
