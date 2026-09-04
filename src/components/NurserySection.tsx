import Image from "next/image";
import { Sprout, MapPin, CheckCircle, ExternalLink, Navigation } from "lucide-react";
import { companyData } from "@/data/company";


export default function NurserySection() {
  return (
    <section id="nurseries" className="py-24 bg-[#050e07] relative z-20">
      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#76c442] bg-[#4caf50]/10 border border-[#4caf50]/20 mb-4">
            Production & Propagation Base
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
            Twin Batangas Propagation Nurseries
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#a8d5a8]">
            Over 150,000 combined native forest saplings and acclimatized balled trees ready for immediate deployment.
          </p>
        </div>

        {/* Top Feature Banner */}
        <div className="relative rounded-3xl overflow-hidden glass-panel p-8 sm:p-12 mb-12 border border-[#4caf50]/30 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col gap-5">
              <span className="text-xs font-bold text-[#ffd600] uppercase tracking-wider">
                Industrial Plant Acclimatization Center
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
                Guaranteed Sapling Survival for Infrastructure Offsets
              </h3>
              <p className="text-sm sm:text-base text-[#a8d5a8] leading-relaxed">
                Our twin propagation farms in Talisay, Batangas operate under strict micro-climate controls and scientific root conditioning. Every tree earmarked for DENR compensatory compliance or landscape integration is nursery-hardened prior to site transport.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div>
                  <span className="block text-2xl font-black font-display text-white">100K+</span>
                  <span className="text-xs text-[#a8d5a8]">Tumaway Facility</span>
                </div>
                <div>
                  <span className="block text-2xl font-black font-display text-[#ffd600]">50K+</span>
                  <span className="text-xs text-[#a8d5a8]">Aya Facility</span>
                </div>
                <div>
                  <span className="block text-2xl font-black font-display text-[#76c442]">1:50</span>
                  <span className="text-xs text-[#a8d5a8]">DENR Offset Ratio</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-xl border border-white/15">
              <Image
                src="/images/nursery.jpg"
                alt="Forest Hills Garden Plant Nursery in Talisay Batangas"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Twin Facility Cards + Interactive Google Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Facility Cards */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {companyData.nurseries.map((nursery, idx) => (
              <div
                key={idx}
                className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-[#2e7d32]/20 text-[#76c442]">
                      <Sprout className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-[#ffd600] uppercase tracking-wider">
                      {nursery.capacity}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold font-heading text-white mb-2">
                    {nursery.name}
                  </h4>

                  <div className="flex items-center gap-2 text-xs text-[#a8d5a8] mb-4">
                    <MapPin className="w-4 h-4 text-[#76c442]" />
                    <span>{nursery.location}</span>
                  </div>

                  <p className="text-sm text-[#f0fbf0]/80 leading-relaxed">
                    {nursery.specialty}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-[#76c442] font-semibold flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Active Site Inspection Available
                  </span>
                  <a
                    href="https://maps.google.com/?q=Talisay+Batangas+Plant+Nursery"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-white hover:text-[#ffd600] flex items-center gap-1"
                  >
                    <span>View Map</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Map Embed */}
          <div className="lg:col-span-6 glass-panel rounded-2xl overflow-hidden flex flex-col border border-[#4caf50]/20 shadow-xl">
            <div className="p-5 bg-[#0e2413] border-b border-white/10 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white text-base">Talisay, Batangas Operations Hub</h4>
                <p className="text-xs text-[#a8d5a8]">Sitio Sto. Niño, Banga Operations Hub • Open 24 Hours</p>
              </div>

              <span className="px-3 py-1 rounded-full bg-[#4caf50]/20 text-[#76c442] text-xs font-bold">
                Plus Code: 32V9+5P
              </span>
            </div>

            {/* Map fills all remaining vertical space */}
            <div className="w-full flex-1 min-h-[380px] relative">
              <iframe
                title="Forest Hills Garden Office & Nursery Location Map"
                src="https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1sForest+Hills+Garden,+Banga,+Talisay,+Batangas"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            {/* Bottom Navigation Toolbar */}
            <div className="p-4 bg-[#0a190d] border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs">
                <span className="text-white font-bold block">Forest Hills Garden</span>
                <span className="text-forest-muted">Sitio Sto. Niño, Banga, Talisay, Batangas</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://waze.com/ul?q=Sitio+Sto.+Ni%C3%B1o+Banga+Talisay+Batangas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#33ccff] hover:text-[#050e07] text-xs font-bold text-white transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Waze</span>
                </a>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=32V9%2B5P+Talisay,+Batangas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2e7d32] hover:bg-[#4caf50] text-xs font-bold text-white transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
