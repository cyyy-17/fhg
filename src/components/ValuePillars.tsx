import { TreePine, Recycle, Sprout, Award } from "lucide-react";

export default function ValuePillars() {
  const pillars = [
    {
      num: "01",
      icon: TreePine,
      title: "Heavy Earthballing & Tree Relocation",
      desc: "Specialized root-ball excavation, hydraulic crane rigging, and long-distance transport preserving mature, heritage, and endangered trees with high survival rates.",
      tag: "Arboricultural Excellence"
    },
    {
      num: "02",
      icon: Recycle,
      title: "Zero-Waste Sustainable Clearing",
      desc: "Controlled sectional felling with 89 DENR-permitted chainsaws. High-value timber salvage, eco-chipping, and seamless regulatory compliance.",
      tag: "DENR & PCA Certified"
    },
    {
      num: "03",
      icon: Sprout,
      title: "100,000+ Plant Nursery Capacity",
      desc: "Twin facilities in Brgy. Tumaway and Brgy. Aya, Talisay, Batangas supplying indigenous forest saplings, ornamentals, and compensatory planting stocks.",
      tag: "Twin Batangas Nurseries"
    },
    {
      num: "04",
      icon: Award,
      title: "26-Year Conglomerate Track Record",
      desc: "Trusted by San Miguel, Ayala Land, SM Prime, EEI, DMCI, and NLEX across high-stakes infrastructure corridors and commercial masterplans.",
      tag: "Founded June 10, 1998"
    }
  ];

  return (
    <section id="why-choose" className="py-24 bg-[#040d04] relative z-20">
      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#76c442] bg-[#4caf50]/10 border border-[#4caf50]/20 mb-4">
            Industrial Tree Care Pillars
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-tight">
            Why Enterprise Builders Choose Forest Hills Garden
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#a8d5a8]">
            Built on arboricultural discipline, massive mechanized capacity, and unwavering statutory compliance.
          </p>
        </div>

        {/* Broad 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="glass-panel glass-panel-hover rounded-2xl p-8 relative flex flex-col justify-between overflow-hidden group"
              >
                <div className="absolute top-6 right-6 font-display font-black text-3xl text-[#ffd600]/20 group-hover:text-[#ffd600]/40 transition-colors">
                  {pillar.num}
                </div>

                <div>
                  <div className="w-14 h-14 rounded-xl bg-[#4caf50]/15 border border-[#4caf50]/25 flex items-center justify-center text-[#76c442] mb-6 group-hover:scale-110 group-hover:bg-[#2e7d32] group-hover:text-white transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold font-heading text-white mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#a8d5a8] leading-relaxed mb-6">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <span className="text-xs font-bold text-[#ffd600] uppercase tracking-wider">
                    {pillar.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
