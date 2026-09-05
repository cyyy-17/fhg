import Link from "next/link";
import { Clock, UserCheck, ChevronRight, FileText, ArrowUpRight, Building2, MapPin, ExternalLink } from "lucide-react";
import { companyData } from "@/data/company";

interface ProfileOverviewTabProps {
  onOpenBioModal: () => void;
}

export default function ProfileOverviewTab({ onOpenBioModal }: ProfileOverviewTabProps) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Bento Row: Heritage Narrative + KPI Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Card A: Executive Heritage (7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-8 sm:p-10 border border-[#4caf50]/25 flex flex-col justify-between relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center justify-between gap-4 mb-5">
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-[#ffd600]/15 text-[#ffd600] border border-[#ffd600]/30">
                Sole Proprietorship • DTI Reg. 1729753
              </span>
              <span className="text-xs font-mono text-[#a8d5a8] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#76c442]" />
                28 Years In Continuous Operation
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black font-display text-white mb-3 leading-snug">
              Forest Hills Garden
            </h3>

            <p className="text-sm sm:text-base text-[#a8d5a8] leading-relaxed mb-4">
              Owned and actively directed by <strong className="text-white">Ms. Marife B. Luna</strong>, Forest Hills Garden operates from Talisay, Batangas, supported by twin propagation nurseries in Brgy. Tumaway and Brgy. Aya.
            </p>

            <p className="text-xs sm:text-sm text-[#a8d5a8] leading-relaxed mb-6">
              Initially founded on <strong className="text-[#ffd600]">June 10, 1998</strong> by her late husband, <strong className="text-white font-medium">Mr. Edwin G. Luna</strong>, FHG has evolved into the Philippines&apos; premier contractor for large-scale earthballing, expressway corridor clearing, and statutory DENR compliance.
            </p>

            {/* Official Motto Quote */}
            <div className="p-5 rounded-2xl bg-linear-to-r from-[#2e7d32]/25 to-[#102414]/90 border-l-4 border-[#ffd600] shadow-inner mb-6">
              <p className="text-sm sm:text-base font-medium text-white italic leading-relaxed mb-2">
                &ldquo;We Do It Right and Fast. We provide developers with dependable environmental clearing and greening without sacrificing statutory compliance or tree survival.&rdquo;
              </p>
              <span className="text-[11px] font-bold text-[#ffd600] tracking-wider uppercase">
                — Ms. Marife B. Luna, Proprietress &amp; General Manager
              </span>
            </div>
          </div>

          {/* Bottom Actions inside Card A */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={onOpenBioModal}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#ffd600] hover:text-white transition-colors cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              <span>Read Leadership Bio &amp; Memorial Tribute</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-3">
              <Link
                href="#vault"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-[#ffd600]" />
                <span>Document Vault</span>
              </Link>
              <Link
                href="#estimate"
                className="px-4 py-2 rounded-xl bg-[#2e7d32] hover:bg-[#4caf50] text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <span>Submit RFP</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Card B: KPI Micro-Stats Grid (5 cols) */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          {companyData.stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover rounded-3xl p-6 flex flex-col justify-between border border-white/10"
            >
              <div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl sm:text-4xl font-black font-display text-[#ffd600]">
                    {stat.value}
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-[#76c442]">
                    {stat.suffix}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1 leading-snug">
                  {stat.label}
                </h4>
              </div>
              <p className="text-[11px] font-mono text-[#a8d5a8] pt-3 border-t border-white/10">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bento Row: Operational Hubs & Statutory Quick Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Hub 1: Head Office */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 text-[#ffd600] mb-3">
              <Building2 className="w-5 h-5 text-[#ffd600]" />
              <h4 className="font-bold text-white text-sm">Operations Headquarters</h4>
            </div>
            <p className="text-xs text-[#f0fbf0] font-medium mb-1">
              {companyData.headOffice.address}
            </p>
            <p className="text-[11px] font-mono text-[#a8d5a8] mb-3">
              Plus Code: {companyData.headOffice.plusCode}
            </p>
            <p className="text-xs text-[#a8d5a8] leading-relaxed mb-4">
              Regional operations center for Laguna, Cavite, Batangas, and NCR corridors (8:00 AM – 5:00 PM).
            </p>
          </div>
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <a
              href={companyData.headOffice.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#76c442] hover:text-[#ffd600] font-semibold flex items-center gap-1 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Google Maps</span>
            </a>
            <span className="font-mono text-[11px] text-[#a8d5a8]">{companyData.headOffice.telefax}</span>
          </div>
        </div>

        {/* Hub 2: Tumaway Facility */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 text-[#76c442] mb-3">
              <MapPin className="w-5 h-5 text-[#76c442]" />
              <h4 className="font-bold text-white text-sm">Tumaway Nursery Facility</h4>
            </div>
            <p className="text-xs text-[#ffd600] font-semibold mb-1">
              {companyData.nurseries[0].capacity}
            </p>
            <p className="text-[11px] text-[#a8d5a8] leading-relaxed mb-4">
              {companyData.nurseries[0].specialty}
            </p>
          </div>
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <a
              href={companyData.nurseries[0].googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#76c442] hover:text-[#ffd600] font-semibold flex items-center gap-1 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Location</span>
            </a>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white">Active Farm</span>
          </div>
        </div>

        {/* Hub 3: Aya Facility */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 text-[#76c442] mb-3">
              <MapPin className="w-5 h-5 text-[#76c442]" />
              <h4 className="font-bold text-white text-sm">Aya Ecological Nursery</h4>
            </div>
            <p className="text-xs text-[#ffd600] font-semibold mb-1">
              {companyData.nurseries[1].capacity}
            </p>
            <p className="text-[11px] text-[#a8d5a8] leading-relaxed mb-4">
              {companyData.nurseries[1].specialty}
            </p>
          </div>
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <a
              href={companyData.nurseries[1].googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#76c442] hover:text-[#ffd600] font-semibold flex items-center gap-1 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Location</span>
            </a>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white">Ecological Reserve</span>
          </div>
        </div>
      </div>
    </div>
  );
}
