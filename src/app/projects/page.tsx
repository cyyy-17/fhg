import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import OperationsProofHub from "@/components/OperationsProofHub";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { ChevronRight, ArrowRight, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Signature Infrastructure Projects & Heavy Fleet Proof | Forest Hills Garden",
  description:
    "Verified contractor track record across SLEX TR4, Metro Manila Subway Project CP101, Isla Wind Farm, Nuvali & Vermosa Estates, and 2,627-Ha Zambales NGP reforestation. 89-chainsaw registered fleet.",
  keywords: [
    "SLEX TR4 tree cutting",
    "Metro Manila Subway Project arborist contractor",
    "Nuvali tree earthballing Ayala",
    "San Miguel EEI DMCI tree subcontractor",
    "Zambales reforestation NGP",
    "89 chainsaw heavy fleet Philippines",
  ],
  alternates: {
    canonical: "https://fhg-two.vercel.app/projects",
  },
  openGraph: {
    title: "Signature Infrastructure Projects & Fleet Proof | Forest Hills Garden",
    description:
      "Operational proof, before & after transformations, and equipment specifications trusted by the Philippines' leading infrastructure conglomerates.",
    url: "https://fhg-two.vercel.app/projects",
    type: "website",
    locale: "en_PH",
    images: [
      {
        url: "/images/og_image.jpg",
        width: 1200,
        height: 630,
        alt: "Forest Hills Garden - Signature Projects",
      },
    ],
  },
};

export default function ProjectsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://fhg-two.vercel.app",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects & Fleet",
            item: "https://fhg-two.vercel.app/projects",
          },
        ],
      },
      {
        "@type": "ItemList",
        name: "Forest Hills Garden Signature Projects",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "SLEX TR4 Toll Road Package 1 & 2 Right-of-Way Clearing",
            description: "Sectional felling of 1,420+ mature trees and emergency clearing across 18.5km corridor.",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Metro Manila Subway Project CP101 Depot Station Clearing",
            description: "Turnkey DENR permit compliance, caliper tagging, and precision removal of 380 trees.",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Isla Wind Farm High-Voltage Transmission Corridor Clearing",
            description: "Steep-slope hazardous tree dismantling near 230kV energized lines under zero-incident safety protocol.",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Ayala Land Nuvali & Vermosa Centennial Heritage Tree Earthballing",
            description: "Hydraulic crane excavation and survival relocation with 98.7% verified survival rate.",
          },
          {
            "@type": "ListItem",
            position: 5,
            name: "Zambales 2,627-Hectare National Greening Reforestation Plantation",
            description: "Multi-year propagation, planting, and survival maintenance of 500,000+ native timber saplings.",
          },
        ],
      },
    ],
  };

  return (
    <div className="relative min-h-screen bg-[#060d07] text-[#f6f7f4] selection:bg-[#c5a059] selection:text-[#060d07] overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* Header Banner & Breadcrumbs */}
      <section className="pt-32 pb-12 bg-linear-to-b from-[#0a180d] via-[#060d07] to-[#060d07] border-b border-white/5">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs font-mono text-[#9aa89b]">
              <li>
                <Link href="/" className="hover:text-[#f6f7f4] transition-colors">
                  Home
                </Link>
              </li>
              <ChevronRight className="w-3.5 h-3.5 text-[#c5a059]" />
              <li className="text-[#f6f7f4] font-semibold">Projects &amp; Operations</li>
            </ol>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c5a059] tracking-widest uppercase mb-3">
                <span>[ VERIFIED INFRASTRUCTURE PORTFOLIOS ]</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-bold font-heading text-[#f6f7f4] tracking-tight leading-tight">
                Signature Projects &amp;{" "}
                <span className="font-editorial italic font-normal text-[#dfbe76]">
                  Fleet Authority
                </span>
              </h1>
              <p className="mt-4 text-sm sm:text-base text-[#9aa89b] leading-relaxed">
                Explore our project dossier across high-consequence tollways, subway alignments, and estate developments. Complete with interactive before/after proof, heavy fleet specifications, and client trust verification.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/contact"
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-xs uppercase tracking-wider bg-[#c5a059] hover:bg-[#dfbe76] text-[#060d07] shadow-md transition-colors"
              >
                <span>Tender Subcontractor RFP</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/#vault"
                className="flex items-center gap-2 px-5 py-3 rounded-lg font-medium text-xs text-[#f6f7f4] bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <FileCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Compliance Vault</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Operations Hub Component */}
      <main>
        <OperationsProofHub />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}
