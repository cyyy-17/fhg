import { Award, ShieldCheck, CheckCircle2 } from "lucide-react";
import { companyData } from "@/data/company";

export default function Accreditations() {
  return (
    <section id="credentials" className="py-24 bg-[#030a04] relative z-20">
      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#76c442] bg-[#4caf50]/10 border border-[#4caf50]/20 mb-4">
            Institutional Standing
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
            Government Accreditations & Statutory Clearances
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#a8d5a8]">
            Pre-qualified and audited across regional and national regulatory frameworks for seamless project onboarding.
          </p>
        </div>

        {/* Broad Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-6">
          {companyData.credentials.map((cred, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#ffd600]/15 border border-[#ffd600]/30 flex items-center justify-center text-[#ffd600] mb-5 group-hover:scale-105 group-hover:bg-[#ffd600] group-hover:text-[#050e07] transition-all duration-300">
                  <Award className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold font-heading text-white mb-2 group-hover:text-[#ffd600] transition-colors">
                  {cred.title}
                </h3>

                <p className="text-xs text-[#a8d5a8] leading-relaxed">
                  {cred.detail}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-white/10 flex items-center gap-2 text-[11px] font-semibold text-[#76c442]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Active Standing</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
