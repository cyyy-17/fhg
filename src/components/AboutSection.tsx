import { ShieldCheck, CheckCircle, FileCheck } from "lucide-react";
import { companyData } from "@/data/company";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#050e07] relative z-20 overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#4caf50]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative & History */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center self-start px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#76c442] bg-[#4caf50]/10 border border-[#4caf50]/20">
              Company Profile & Corporate Heritage
            </div>

            <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
              Rooted in Integrity, Proven Across Philippine Infrastructure
            </h2>

            <p className="text-base sm:text-lg text-[#a8d5a8] leading-relaxed">
              <strong className="text-white">Forest Hills Garden</strong> is a registered sole proprietorship owned and managed by <strong className="text-white">Ms. Marife B. Luna</strong>, with headquarters at the 4th Floor, Luna Building, Malvar St., Poblacion 8, Talisay, Batangas, and two expansive propagation nurseries located in Brgy. Tumaway and Brgy. Aya, Talisay, Batangas.
            </p>

            <p className="text-sm sm:text-base text-[#a8d5a8] leading-relaxed">
              Initially founded on <span className="text-[#ffd600] font-semibold">June 10, 1998</span> by Ms. Luna's late husband, <span className="text-white font-medium">Mr. Edwin G. Luna</span>, the enterprise has expanded over more than 26 years into the nation's premier contractor for commercial earthballing, precision felling, and statutory environmental compliance.
            </p>

            {/* Official Motto Quote Box */}
            <div className="p-6 rounded-2xl bg-linear-to-r from-[#2e7d32]/25 to-[#112414]/80 border-l-4 border-[#ffd600] shadow-xl">
              <span className="text-4xl text-[#ffd600]/40 font-display font-black leading-none block mb-2">“</span>
              <p className="text-lg font-medium text-white italic leading-relaxed mb-3">
                "We Do It Right and Fast. Our mission is to provide developers with dependable environmental clearing and greening without sacrificing statutory compliance or tree survival."
              </p>
              <span className="text-xs font-bold text-[#ffd600] tracking-wider uppercase">
                — Ms. Marife B. Luna, Proprietress & General Manager
              </span>
            </div>
          </div>

          {/* Right Column: Capacity & Accreditations Card */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col gap-6">
            <h3 className="text-2xl font-bold font-heading text-white">
              Institutional Capacity Matrix
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-[#ffd600]/15 text-[#ffd600] shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">DENR Registered Power Chainsaw Fleet</h4>
                  <p className="text-xs text-[#a8d5a8] mt-1">89 Units certified for immediate mobilization nationwide.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-[#76c442]/15 text-[#76c442] shrink-0 mt-0.5">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">PCA Coconut Cutting Permits</h4>
                  <p className="text-xs text-[#a8d5a8] mt-1">13 Chainsaws in NCR (RNCR-00958) & 13 in Laguna (R4-05595).</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-[#ffd600]/15 text-[#ffd600] shrink-0 mt-0.5">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Government Procurement Verified</h4>
                  <p className="text-xs text-[#a8d5a8] mt-1">PhilGEPS Blue Member (PhilGEPS-2005-23340) & DTI 1729753.</p>
                </div>
              </div>
            </div>

            {/* Quick Readiness Bars */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-white">Heavy Equipment Mobilization Rate</span>
                  <span className="text-[#ffd600]">100%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-linear-to-r from-[#4caf50] to-[#ffd600] rounded-full w-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-white">DENR Permitting Success Rate</span>
                  <span className="text-[#76c442]">100%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-linear-to-r from-[#2e7d32] to-[#76c442] rounded-full w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
