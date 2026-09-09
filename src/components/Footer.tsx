"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollTopButton from "./ScrollTopButton";
import { companyData } from "@/data/company";

export default function Footer() {
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
                  sizes="110px"
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
              &ldquo;{companyData.tagline}&rdquo;
            </p>

            <p className="text-xs text-[#a8d5a8] leading-relaxed max-w-sm">
              Sole proprietorship owned and managed by <strong className="text-white">{companyData.manager}</strong>. Leading contractor for commercial tree earthballing, chainsaw tree cutting, plant nurseries, and Philippine environmental greening since 1998.
            </p>

            <div className="text-xs text-white/60 space-y-1 pt-2">
              <p>DTI Certificate No.: 1729753</p>
              <p>PhilGEPS Registration No.: 2005-23340 (Blue Member)</p>
              <p>Mayor&apos;s/LGU Business Permit: Active on File (Talisay, Batangas)</p>
              <p>BIR Registration: Sole Proprietorship — Official COR 2303 on File</p>
              <p>DENR &amp; PCA Permitted Operator</p>
            </div>
          </div>

          {/* Column 2: Core Services (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-2">
              <Link href="/services" className="hover:text-[#ffd600] transition-colors">
                Core Capabilities →
              </Link>
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/services#earthballing" className="hover:text-white transition-colors">Large-Scale Tree Earthballing</Link></li>
              <li><Link href="/services#tree-cutting" className="hover:text-white transition-colors">Certified Tree Cutting (89 Chainsaws)</Link></li>
              <li><Link href="/services#pca-cutting" className="hover:text-white transition-colors">PCA Coconut Tree Felling & Salvage</Link></li>
              <li><Link href="/nurseries" className="hover:text-white transition-colors">Native Seedling Propagation & Supply</Link></li>
              <li><Link href="/services#commercial-landscaping" className="hover:text-white transition-colors">Commercial Greening & Landscaping</Link></li>
              <li><Link href="/services#tree-inventory" className="hover:text-white transition-colors">DENR Tree Inventory & Caliper Tagging</Link></li>
              <li><Link href="/services#reforestation" className="hover:text-white transition-colors">Watershed Reforestation & NGP</Link></li>
            </ul>
          </div>

          {/* Column 3: Signature Infrastructure (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-2">
              <Link href="/projects" className="hover:text-[#ffd600] transition-colors">
                Signature Projects →
              </Link>
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/projects#projects" className="hover:text-white transition-colors">SLEX TR4 Expressway Expansion</Link></li>
              <li><Link href="/projects#projects" className="hover:text-white transition-colors">Metro Manila Subway Project CP101</Link></li>
              <li><Link href="/projects#projects" className="hover:text-white transition-colors">Isla Wind Farm High-Voltage Corridors</Link></li>
              <li><Link href="/projects#projects" className="hover:text-white transition-colors">NLEX-SLEX Connector Road</Link></li>
              <li><Link href="/projects#projects" className="hover:text-white transition-colors">Nuvali & Vermosa Estates (Ayala Land)</Link></li>
              <li><Link href="/projects#projects" className="hover:text-white transition-colors">SM Prime Commercial Developments</Link></li>
              <li><Link href="/projects#projects" className="hover:text-white transition-colors">Zambales 2,627-Ha NGP Plantation</Link></li>
            </ul>
          </div>

          {/* Column 4: Quick Locations & Contact (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-2">
              <Link href="/contact" className="hover:text-[#ffd600] transition-colors">
                Locations & Dispatch →
              </Link>
            </h4>
            <address className="not-italic text-xs space-y-3">
              <div>
                <Link href="/contact" className="text-white font-bold block hover:text-[#ffd600] transition-colors">
                  Head Office & Dispatch
                </Link>
                <span className="text-[#a8d5a8]">Sitio Sto. Niño, Banga, Talisay, Batangas (32V9+5P) • 8:00 AM – 5:00 PM</span>
              </div>

              <div>
                <Link href="/nurseries#nurseries" className="text-white font-bold block hover:text-[#ffd600] transition-colors">
                  Tumaway Nursery
                </Link>
                <span className="text-[#a8d5a8]">Brgy. Tumaway, Talisay, Batangas</span>
              </div>
              <div>
                <Link href="/nurseries#nurseries" className="text-white font-bold block hover:text-[#ffd600] transition-colors">
                  Aya Nursery
                </Link>
                <span className="text-[#a8d5a8]">Brgy. Aya, Talisay, Batangas</span>
              </div>

              <div className="pt-1">
                <a
                  href="https://www.facebook.com/forest.hills.garden.2024/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#76c442] hover:text-[#ffd600] transition-colors"
                >
                  <span>Official Facebook Page ↗</span>
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom Bar with Policy Links and Back to Top */}
        <div className="pt-8 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>© {new Date().getFullYear()} Forest Hills Garden. All Rights Reserved. Talisay, Batangas, Philippines.</p>
            <span className="hidden sm:inline text-white/20">•</span>
            <div className="flex items-center gap-3">
              <Link href="/privacy-policy" className="text-[#ffd600] hover:underline">
                Privacy Policy (RA 10173)
              </Link>
              <span className="text-white/20">•</span>
              <Link href="/terms" className="text-[#ffd600] hover:underline">
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
                className="text-[#ffd600] hover:underline cursor-pointer bg-transparent border-0 p-0 text-xs inline-block"
              >
                Cookie Preferences
              </button>
            </div>
          </div>
          <p className="text-[#a8d5a8]/60 text-center lg:text-right">
            All client names and project records reference completed or ongoing contract scopes. No proprietary financial data disclosed.
          </p>
          <ScrollTopButton />
        </div>
      </div>
    </footer>
  );
}
