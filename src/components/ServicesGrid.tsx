import {
  TreePine,
  Axe,
  Palmtree,
  ClipboardCheck,
  Sprout,
  Mountain,
  Flower2,
  Layers,
  Check
} from "lucide-react";
import { servicesData } from "@/data/services";

const iconMap: Record<string, any> = {
  TreePine,
  Axe,
  Palmtree,
  ClipboardCheck,
  Sprout,
  Mountain,
  Flower2,
  Layers
};

export default function ServicesGrid() {
  return (
    <section id="services" className="py-24 bg-[#030b04] relative z-20">
      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#ffd600] bg-[#ffd600]/10 border border-[#ffd600]/20 mb-4">
            Full Spectrum Green Services
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
            Specialized Solutions for Infrastructure & Nature
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#a8d5a8]">
            Equipped to handle high-volume, time-sensitive corporate scopes with strict DENR adherence.
          </p>
        </div>

        {/* Broad 4-Column Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-8">
          {servicesData.map((svc) => {
            const IconComponent = iconMap[svc.icon] || TreePine;
            return (
              <div
                key={svc.id}
                className="glass-panel glass-panel-hover rounded-2xl p-8 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-[#2e7d32]/20 border border-[#4caf50]/30 flex items-center justify-center text-[#76c442] mb-6 group-hover:bg-[#2e7d32] group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-lg">
                    <IconComponent className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold font-heading text-white mb-3 leading-snug group-hover:text-[#ffd600] transition-colors">
                    {svc.title}
                  </h3>

                  <p className="text-sm text-[#a8d5a8] leading-relaxed mb-6">
                    {svc.shortDesc}
                  </p>
                </div>

                <div className="pt-5 border-t border-white/10">
                  <ul className="space-y-2">
                    {svc.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#f0fbf0]">
                        <Check className="w-3.5 h-3.5 text-[#76c442] shrink-0 mt-0.5" />
                        <span>{detail}</span>
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
