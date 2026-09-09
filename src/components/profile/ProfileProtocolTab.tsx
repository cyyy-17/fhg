"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { protocolSteps } from "@/data/protocol";

export default function ProfileProtocolTab() {
  const [selectedProtocol, setSelectedProtocol] = useState(0);
  const p = protocolSteps[selectedProtocol];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Stage Selector Pills */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {protocolSteps.map((step, idx) => {
          const isSelected = selectedProtocol === idx;
          return (
            <button
              key={step.step}
              onClick={() => setSelectedProtocol(idx)}
              className={`p-4 rounded-2xl flex flex-col text-left transition-all cursor-pointer border ${
                isSelected
                  ? "bg-[#0a170d] border-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                  : "bg-[#0a170d]/60 border-white/8 hover:bg-[#102414]"
              }`}
            >
              <span className="font-editorial italic text-3xl text-[#f59e0b] mb-1">
                {step.step}
              </span>
              <span className="text-xs font-bold text-[#f6f7f4] line-clamp-1">
                {step.title}
              </span>
              <span className="text-[10px] font-mono text-[#9aa89b] mt-1">
                {step.badge.split(":")[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Phase Detail Panel */}
      <div className="bg-[#0a170d] rounded-3xl p-8 sm:p-12 border border-white/8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-[#4ade80] bg-[#16a34a]/15 border border-[#16a34a]/30">
            <span>Phase {p.step} Protocol</span>
            <span>•</span>
            <span>{p.badge}</span>
          </div>
          <span className="text-xs font-mono text-[#9aa89b]">
            Stage {selectedProtocol + 1} of 4 Turnkey Sequence
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#f6f7f4] mb-4 leading-snug">
          {p.title}
        </h3>

        <p className="text-sm sm:text-base text-[#9aa89b] leading-relaxed mb-8 max-w-4xl">
          {p.desc}
        </p>

        <div className="pt-6 border-t border-white/8">
          <h4 className="text-xs font-mono uppercase tracking-widest text-[#4ade80] font-bold mb-4">
            Mandatory Phase Deliverables:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {p.deliverables.map((deliv, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white/3 border border-white/8 flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-[#f6f7f4]">{deliv}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
