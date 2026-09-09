"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollTopButton from "./ScrollTopButton";
import { companyData } from "@/data/company";

export default function Footer() {
  return (
    <footer className="bg-[#040905] border-t border-white/10 pt-20 pb-12 relative z-20 text-[#9aa89b]">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        {/* Main 4-Column Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Column 1: Institutional Authority & Registry (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 bg-white px-3 py-1 rounded-lg flex items-center justify-center border border-white/20">
                <Image
                  src="/images/logo.png"
                  alt="Forest Hills Garden Official Logo"
                  width={110}
                  height={44}
                  sizes="110px"
                  className="h-8 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[#f6f7f4] text-base tracking-wider font-heading leading-tight">
                  FOREST HILLS GARDEN
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#c5a059] uppercase">
                  EST. 1998 • TALISAY, BATANGAS
                </span>
              </div>
            </div>

            <p className="text-sm text-[#dfbe76] font-editorial italic font-normal mt-1">
              &ldquo;{companyData.tagline}&rdquo;
            </p>

            <p className="text-xs text-[#9aa89b] leading-relaxed max-w-sm">
              Sole proprietorship operated by <strong className="text-[#f6f7f4] font-medium">{companyData.manager}</strong>. Leading enterprise contractor for commercial tree earthballing, precision chainsaw felling, plant nurseries, and Philippine environmental compliance since 1998.
            </p>

            <div className="text-[11px] font-mono text-[#9aa89b]/80 space-y-1 pt-2 border-t border-white/5">
              <p>DTI Certificate No.: 1729753 (Valid to May 28, 2030)</p>
              <p>PhilGEPS Registration: 2005-23340 (Blue Member)</p>
              <p>BIR Registration: OCN 059RC20230000016326 (RDO 059)</p>
              <p>DENR Lipa 90-Chainsaw Fleet &amp; PCA Permitted</p>
              <p>Transition: Forest Hills Ventures Inc. (SEC 2023060103408-45)</p>
            </div>
          </div>

          {/* Column 2: Core Capabilities (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-[#f6f7f4] mb-2 flex items-center gap-1.5">
              <span>Core Capabilities</span>
              <span className="text-[#c5a059]">→</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/services#earthballing" className="hover:text-[#f6f7f4] transition-colors">Large-Scale Tree Earthballing</Link></li>
              <li><Link href="/services#tree-cutting" className="hover:text-[#f6f7f4] transition-colors">Certified Tree Cutting (90 Chainsaws)</Link></li>
              <li><Link href="/services#pca-cutting" className="hover:text-[#f6f7f4] transition-colors">PCA Coconut Tree Felling &amp; Salvage</Link></li>
              <li><Link href="/nurseries" className="hover:text-[#f6f7f4] transition-colors">Native Seedling Propagation &amp; Supply</Link></li>
              <li><Link href="/services#commercial-landscaping" className="hover:text-[#f6f7f4] transition-colors">Commercial Greening &amp; Landscaping</Link></li>
              <li><Link href="/services#tree-inventory" className="hover:text-[#f6f7f4] transition-colors">DENR Tree Inventory &amp; Caliper Tagging</Link></li>
              <li><Link href="/services#reforestation" className="hover:text-[#f6f7f4] transition-colors">Watershed Reforestation &amp; NGP</Link></li>
            </ul>
          </div>

          {/* Column 3: Signature Corridors (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-[#f6f7f4] mb-2 flex items-center gap-1.5">
              <span>Signature Corridors</span>
              <span className="text-[#c5a059]">→</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/projects#projects" className="hover:text-[#f6f7f4] transition-colors">SLEX TR4 Expressway Expansion</Link></li>
              <li><Link href="/projects#projects" className="hover:text-[#f6f7f4] transition-colors">Metro Manila Subway Project CP101</Link></li>
              <li><Link href="/projects#projects" className="hover:text-[#f6f7f4] transition-colors">Isla Wind Farm High-Voltage Corridors</Link></li>
              <li><Link href="/projects#projects" className="hover:text-[#f6f7f4] transition-colors">NLEX-SLEX Connector Road</Link></li>
              <li><Link href="/projects#projects" className="hover:text-[#f6f7f4] transition-colors">Nuvali &amp; Vermosa Estates (Ayala Land)</Link></li>
              <li><Link href="/projects#projects" className="hover:text-[#f6f7f4] transition-colors">SM Prime Commercial Developments</Link></li>
              <li><Link href="/projects#projects" className="hover:text-[#f6f7f4] transition-colors">Zambales 2,627-Ha NGP Plantation</Link></li>
            </ul>
          </div>

          {/* Column 4: Locations & Dispatch (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-[#f6f7f4] mb-2 flex items-center gap-1.5">
              <span>Locations &amp; Dispatch</span>
              <span className="text-[#c5a059]">→</span>
            </h4>
            <address className="not-italic text-xs space-y-3">
              <div>
                <Link href="/contact" className="text-[#f6f7f4] font-medium block hover:text-[#dfbe76] transition-colors">
                  Head Office &amp; Operations Hub
                </Link>
                <span className="text-[#9aa89b] text-[11px]">Sitio Sto. Niño, Banga &amp; Malvar St., Talisay, Batangas</span>
              </div>

              <div>
                <Link href="/nurseries#nurseries" className="text-[#f6f7f4] font-medium block hover:text-[#dfbe76] transition-colors">
                  Sitio Latag Nursery Facility
                </Link>
                <span className="text-[#9aa89b] text-[11px]">Sitio Latag, Tumaway, Talisay, Batangas (100K+)</span>
              </div>
              <div>
                <Link href="/nurseries#nurseries" className="text-[#f6f7f4] font-medium block hover:text-[#dfbe76] transition-colors">
                  Tumaway Plant Propagation Farm
                </Link>
                <span className="text-[#9aa89b] text-[11px]">Brgy. Tumaway, Talisay, Batangas (80K+)</span>
              </div>
              <div>
                <Link href="/nurseries#nurseries" className="text-[#f6f7f4] font-medium block hover:text-[#dfbe76] transition-colors">
                  Aya Ecological Reserve
                </Link>
                <span className="text-[#9aa89b] text-[11px]">Brgy. Aya, Talisay, Batangas (50K+)</span>
              </div>

              <div className="pt-1">
                <a
                  href="https://www.facebook.com/forest.hills.garden.2024/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#dfbe76] hover:text-[#f6f7f4] transition-colors"
                >
                  <span>Official Facebook Page ↗</span>
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom Bar with Policy Links */}
        <div className="pt-8 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>© {new Date().getFullYear()} Forest Hills Garden. All Rights Reserved. Talisay, Batangas, Philippines.</p>
            <span className="hidden sm:inline text-white/20">•</span>
            <div className="flex items-center gap-3">
              <Link href="/privacy-policy" className="text-[#dfbe76] hover:underline">
                Privacy Policy (RA 10173)
              </Link>
              <span className="text-white/20">•</span>
              <Link href="/terms" className="text-[#dfbe76] hover:underline">
                Terms of Use &amp; Disclaimers
              </Link>
              <span className="text-white/20">•</span>
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("fhg_open_cookie_settings"));
                  }
                }}
                className="text-[#dfbe76] hover:underline cursor-pointer bg-transparent border-0 p-0 text-xs inline-block"
              >
                Cookie Preferences
              </button>
            </div>
          </div>
          <p className="text-[#9aa89b]/60 text-center lg:text-right text-[11px]">
            All client names and project records reference completed or ongoing contract scopes.
          </p>
          <ScrollTopButton />
        </div>
      </div>
    </footer>
  );
}
