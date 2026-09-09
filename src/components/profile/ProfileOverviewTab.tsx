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
        <div className="lg:col-span-7 rounded-2xl bg-[#0a150c] p-8 sm:p-10 border border-white/10 flex flex-col justify-between relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center justify-between gap-4 mb-5">
              <span className="text-[10px] font-mono font-semibold tracking-wider uppercase px-2.5 py-1 rounded bg-[#060d07] text-[#dfbe76] border border-white/10">
                Sole Proprietorship • DTI Reg. 1729753
              </span>
              <span className="text-xs font-mono text-[#9aa89b] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                28 Years Active Operations
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#f6f7f4] mb-3 leading-snug">
              Forest Hills Garden
            </h3>

            <p className="text-sm text-[#9aa89b] leading-relaxed mb-4">
              Owned and actively directed by <strong className="text-[#f6f7f4] font-medium">Ms. Marife B. Luna</strong>, Forest Hills Garden operates from Talisay, Batangas, supported by twin propagation nurseries in Brgy. Tumaway and Brgy. Aya.
            </p>

            <p className="text-xs sm:text-sm text-[#9aa89b] leading-relaxed mb-6">
              Initially founded on <strong className="text-[#dfbe76]">June 10, 1998</strong> by her late husband, <strong className="text-[#f6f7f4] font-medium">Mr. Edwin G. Luna</strong>, FHG has evolved into the Philippines&apos; premier contractor for large-scale earthballing, expressway corridor clearing, and statutory DENR compliance.
            </p>

            {/* Official Motto Quote */}
            <div className="p-5 rounded-xl bg-[#060d07] border-l-2 border-[#c5a059] mb-6">
              <p className="text-sm font-editorial italic font-normal text-[#f6f7f4] leading-relaxed mb-2">
                &ldquo;We Do It Right and Fast. We provide developers with dependable environmental clearing and greening without sacrificing statutory compliance or tree survival.&rdquo;
              </p>
              <span className="text-[11px] font-mono text-[#dfbe76] tracking-wider uppercase">
                — Ms. Marife B. Luna, Proprietress &amp; General Manager
              </span>
            </div>
          </div>

          {/* Bottom Actions inside Card A */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={onOpenBioModal}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#dfbe76] hover:text-[#f6f7f4] transition-colors cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-[#c5a059]" />
              <span>Leadership Bio &amp; Memorial Tribute</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-3">
              <Link
                href="#vault"
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#f6f7f4] border border-white/10 text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Document Vault</span>
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 rounded-lg bg-[#c5a059] hover:bg-[#dfbe76] text-[#060d07] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
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
              className="rounded-2xl bg-[#0a150c] p-6 flex flex-col justify-between border border-white/10 group hover:border-[#c5a059]/40 transition-colors"
            >
              <div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl sm:text-4xl font-bold font-heading text-[#f6f7f4]">
                    {stat.value}
                  </span>
                  <span className="text-xl sm:text-2xl font-editorial italic text-[#dfbe76]">
                    {stat.suffix}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-[#f6f7f4] mb-1 leading-snug">
                  {stat.label}
                </h4>
              </div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-[#9aa89b] pt-3 border-t border-white/10">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bento Row: Operational Hubs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Hub 1: Head Office */}
        <div className="rounded-xl bg-[#0a150c] p-6 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 text-[#dfbe76] mb-3">
              <Building2 className="w-5 h-5 text-[#c5a059]" />
              <h4 className="font-semibold text-[#f6f7f4] text-sm">Operations Headquarters</h4>
            </div>
            <p className="text-xs text-[#f6f7f4] font-medium mb-1">
              {companyData.headOffice.address}
            </p>
            <p className="text-[11px] font-mono text-[#9aa89b] mb-3">
              Plus Code: {companyData.headOffice.plusCode}
            </p>
            <p className="text-xs text-[#9aa89b] leading-relaxed mb-4">
              Regional operations center for Laguna, Cavite, Batangas, and NCR corridors (8:00 AM – 5:00 PM).
            </p>
          </div>
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <a
              href={companyData.headOffice.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#dfbe76] hover:text-[#f6f7f4] font-medium flex items-center gap-1 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Google Maps</span>
            </a>
            <span className="font-mono text-[11px] text-[#9aa89b]">{companyData.headOffice.telefax}</span>
          </div>
        </div>

        {/* Hub 2: Tumaway Facility */}
        <div className="rounded-xl bg-[#0a150c] p-6 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 text-[#dfbe76] mb-3">
              <MapPin className="w-5 h-5 text-[#c5a059]" />
              <h4 className="font-semibold text-[#f6f7f4] text-sm">Tumaway Nursery Facility</h4>
            </div>
            <p className="text-xs text-[#dfbe76] font-mono font-semibold mb-1">
              {companyData.nurseries[0].capacity}
            </p>
            <p className="text-[11px] text-[#9aa89b] leading-relaxed mb-4">
              {companyData.nurseries[0].specialty}
            </p>
          </div>
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <a
              href={companyData.nurseries[0].googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#dfbe76] hover:text-[#f6f7f4] font-medium flex items-center gap-1 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>View Location</span>
            </a>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#060d07] border border-white/10 text-[#f6f7f4]">Active Farm</span>
          </div>
        </div>

        {/* Hub 3: Aya Facility */}
        <div className="rounded-xl bg-[#0a150c] p-6 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 text-[#dfbe76] mb-3">
              <MapPin className="w-5 h-5 text-[#c5a059]" />
              <h4 className="font-semibold text-[#f6f7f4] text-sm">Aya Ecological Nursery</h4>
            </div>
            <p className="text-xs text-[#dfbe76] font-mono font-semibold mb-1">
              {companyData.nurseries[1].capacity}
            </p>
            <p className="text-[11px] text-[#9aa89b] leading-relaxed mb-4">
              {companyData.nurseries[1].specialty}
            </p>
          </div>
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <a
              href={companyData.nurseries[1].googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#dfbe76] hover:text-[#f6f7f4] font-medium flex items-center gap-1 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>View Location</span>
            </a>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#060d07] border border-white/10 text-[#f6f7f4]">Ecological Reserve</span>
          </div>
        </div>
      </div>
    </div>
  );
}
