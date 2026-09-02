import { ClipboardList, FileCheck2, Truck, Sprout, CheckCircle } from "lucide-react";
import { protocolSteps } from "@/data/protocol";

const stepIcons = [ClipboardList, FileCheck2, Truck, Sprout];

export default function ComplianceProtocol() {
  return (
    <section id="protocol" className="py-24 bg-[#030b04] relative z-20">
      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#76c442] bg-[#4caf50]/10 border border-[#4caf50]/20 mb-4">
            Zero-Infraction Methodology
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
            Turnkey Compliance & Arboricultural Protocol
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#a8d5a8]">
            From DENR permit acquisition to compensatory planting certification, our four-stage framework protects clients from statutory stop-work penalties.
          </p>
        </div>

        {/* Broad 4-Column Protocol Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-8">
          {protocolSteps.map((step, idx) => {
            const Icon = stepIcons[idx] || ClipboardList;
            return (
              <div
                key={step.step}
                className="glass-panel glass-panel-hover rounded-2xl p-8 flex flex-col justify-between relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display font-black text-3xl text-[#ffd600]">
                      {step.step}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-[#2e7d32]/20 border border-[#4caf50]/30 flex items-center justify-center text-[#76c442] group-hover:scale-110 group-hover:bg-[#2e7d32] group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-[#ffd600] uppercase tracking-wider block mb-2">
                    {step.badge}
                  </span>

                  <h3 className="text-xl font-bold font-heading text-white mb-3">
                    {step.title}
                  </h3>

                  <p className="text-sm text-[#a8d5a8] leading-relaxed mb-6">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-white mb-2">
                    Phase Deliverables:
                  </h4>
                  <ul className="space-y-1.5">
                    {step.deliverables.map((deliv, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#f0fbf0]">
                        <CheckCircle className="w-3.5 h-3.5 text-[#76c442] shrink-0 mt-0.5" />
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
