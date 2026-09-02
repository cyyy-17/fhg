"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { companyData } from "@/data/company";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#020602] border-t border-[#4caf50]/15 pt-20 pb-12 relative z-20 text-[#a8d5a8]">
      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12">
        {/* Main 4-Column Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Column 1: Brand & Slogan (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="h-14 bg-white px-3.5 py-1.5 rounded-full flex items-center justify-center shadow-xl border border-[#4caf50]/40">
                <Image
                  src="/images/logo.png"
                  alt="Forest Hills Garden Logo"
                  width={110}
                  height={44}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-white text-lg tracking-wider font-heading leading-tight">
                  FOREST HILLS
                </span>
                <span className="text-[11px] font-bold text-[#ffd600] tracking-widest uppercase">
                  GARDEN • EST. 1998
                </span>
              </div>
            </div>

            <p className="text-base text-[#ffd600] font-display italic font-semibold mt-2">
              "{companyData.tagline}"
            </p>

            <p className="text-xs text-[#a8d5a8] leading-relaxed max-w-sm">
              Sole proprietorship owned and managed by <strong className="text-white">{companyData.manager}</strong>. Leading contractor for commercial tree earthballing, chainsaw tree cutting, plant nurseries, and Philippine environmental greening since 1998.
            </p>

            <div className="text-xs text-white/60 space-y-1 pt-2">
              <p>DTI Registration No.: 1729753</p>
              <p>PhilGEPS Registration No.: 2005-23340</p>
              <p>DENR & PCA Permitted Operator</p>
            </div>
          </div>

          {/* Column 2: Core Services (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-2">
              Core Capabilities
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="#services" className="hover:text-white transition-colors">Large-Scale Tree Earthballing</Link></li>
              <li><Link href="#services" className="hover:text-white transition-colors">Certified Tree Cutting (89 Chainsaws)</Link></li>
              <li><Link href="#services" className="hover:text-white transition-colors">PCA Coconut Tree Felling & Salvage</Link></li>
              <li><Link href="#services" className="hover:text-white transition-colors">Native Seedling Propagation & Supply</Link></li>
              <li><Link href="#services" className="hover:text-white transition-colors">Commercial Greening & Landscaping</Link></li>
              <li><Link href="#services" className="hover:text-white transition-colors">DENR Tree Inventory & Caliper Tagging</Link></li>
              <li><Link href="#services" className="hover:text-white transition-colors">Watershed Reforestation & NGP</Link></li>
            </ul>
          </div>

          {/* Column 3: Signature Infrastructure (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-2">
              Signature Projects
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="#projects" className="hover:text-white transition-colors">SLEX TR4 Expressway Expansion</Link></li>
              <li><Link href="#projects" className="hover:text-white transition-colors">Metro Manila Subway Project CP101</Link></li>
              <li><Link href="#projects" className="hover:text-white transition-colors">Isla Wind Farm High-Voltage Corridors</Link></li>
              <li><Link href="#projects" className="hover:text-white transition-colors">NLEX-SLEX Connector Road</Link></li>
              <li><Link href="#projects" className="hover:text-white transition-colors">Nuvali & Vermosa Estates (Ayala Land)</Link></li>
              <li><Link href="#projects" className="hover:text-white transition-colors">SM Prime Commercial Developments</Link></li>
              <li><Link href="#projects" className="hover:text-white transition-colors">Zambales 2,627-Ha NGP Plantation</Link></li>
            </ul>
          </div>

          {/* Column 4: Quick Locations & Contact (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-2">
              Locations
            </h4>
            <div className="text-xs space-y-3">
              <div>
                <strong className="text-white block">Head Office</strong>
                <span className="text-[#a8d5a8]">4F Luna Bldg., Malvar St., Poblacion 8, Talisay, Batangas</span>
              </div>
              <div>
                <strong className="text-white block">Tumaway Nursery</strong>
                <span className="text-[#a8d5a8]">Brgy. Tumaway, Talisay, Batangas</span>
              </div>
              <div>
                <strong className="text-white block">Aya Nursery</strong>
                <span className="text-[#a8d5a8]">Brgy. Aya, Talisay, Batangas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Forest Hills Garden. All Rights Reserved. Talisay, Batangas, Philippines.</p>
          <p className="text-[#a8d5a8]/60 text-center sm:text-right">
            All client names and project records reference completed or ongoing contract scopes. No proprietary financial data disclosed.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-[#112414] hover:bg-[#2e7d32] text-white border border-[#4caf50]/30 flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-110"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
