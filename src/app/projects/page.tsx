import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import OperationsProofHub from "@/components/OperationsProofHub";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { ChevronRight, ArrowRight, FolderKanban, FileCheck } from "lucide-react";

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
    <div className="relative min-h-screen bg-[#050e07] text-[#f0fbf0] selection:bg-[#ffd600] selection:text-[#050e07] overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* Header Banner & Breadcrumbs */}
      <section className="pt-32 pb-12 bg-linear-to-b from-[#0b2010] via-[#050e07] to-[#050e07] border-b border-[#4caf50]/15">
        <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs sm:text-sm text-[#a8d5a8]">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <ChevronRight className="w-3.5 h-3.5 text-[#ffd600]" />
              <li className="text-white font-semibold">Projects & Operations</li>
            </ol>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#102414] border border-[#ffd600]/30 text-xs font-bold text-[#ffd600] uppercase tracking-wider mb-4">
                <FolderKanban className="w-3.5 h-3.5" />
                <span>Verified Major Infrastructure Portfolios</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight leading-tight">
                Signature Projects &{" "}
                <span className="text-gradient-gold">Fleet Authority</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#a8d5a8] leading-relaxed">
                Explore our project dossier across high-consequence tollways, subway alignments, and estate developments. Complete with interactive before/after proof, heavy fleet specifications, and client trust verification.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/contact"
                className="flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-linear-to-r from-[#ffd600] to-[#f9c923] text-[#061008] hover:brightness-110 shadow-lg shadow-[#ffd600]/20 hover:scale-105 transition-all"
              >
                <span>Tender Subcontractor RFP</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/#vault"
                className="flex items-center gap-2 px-5 py-3.5 rounded-full font-semibold text-xs text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all"
              >
                <FileCheck className="w-3.5 h-3.5 text-[#ffd600]" />
                <span>View Compliance Vault</span>
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
