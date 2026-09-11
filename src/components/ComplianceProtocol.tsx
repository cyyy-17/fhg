import { ClipboardList, FileCheck2, Truck, Sprout, CheckCircle } from "lucide-react";
import { protocolSteps, type ProtocolStep } from "@/data/protocol";

const stepIcons = [ClipboardList, FileCheck2, Truck, Sprout];

interface ComplianceProtocolProps {
  initialProtocol?: ProtocolStep[];
}

export default function ComplianceProtocol({ initialProtocol }: ComplianceProtocolProps = {}) {
  const steps = initialProtocol && initialProtocol.length > 0 ? initialProtocol : protocolSteps;

  return (
    <section id="protocol" className="py-24 bg-[#050d07] relative z-20 border-t border-white/5">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#22c55e] tracking-widest uppercase mb-3">
            <span>[ 07 / STATUTORY METHODOLOGY ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading text-[#f6f7f4] tracking-tight leading-tight">
            Turnkey Compliance &amp; <br />
            <span className="font-editorial italic font-normal text-[#4ade80]">
              Arboricultural Protocol
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#9aa89b]">
            From DENR permit acquisition to compensatory planting certification, our four-stage framework protects clients from statutory stop-work penalties.
          </p>
        </div>

        {/* 4-Column Monograph Protocol Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = stepIcons[idx] || ClipboardList;
            return (
              <div
                key={step.step}
                className="rounded-xl bg-[#0a170d] border border-white/10 p-7 flex flex-col justify-between group hover:border-[#22c55e]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                    <span className="font-editorial italic font-normal text-3xl text-[#4ade80]">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-[#050d07] border border-white/10 flex items-center justify-center text-[#22c55e] group-hover:border-[#22c55e]/50 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#4ade80] font-semibold block mb-2">
                    {step.badge}
                  </span>

                  <h3 className="text-lg font-bold font-heading text-[#f6f7f4] group-hover:text-[#4ade80] transition-colors mb-2.5 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#9aa89b] leading-relaxed mb-6">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-[#f6f7f4] mb-2.5">
                    Phase Deliverables:
                  </h4>
                  <ul className="space-y-2">
                    {step.deliverables.map((deliv, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#9aa89b]">
                        <CheckCircle className="w-3.5 h-3.5 text-[#22c55e] shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
