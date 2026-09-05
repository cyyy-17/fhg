import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ServicesGrid from "@/components/ServicesGrid";
import ComplianceProtocol from "@/components/ComplianceProtocol";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { ChevronRight, ArrowRight, Sparkles, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Industrial Tree Services, Earthballing & Chainsaw Felling | Forest Hills Garden",
  description:
    "Expert tree earthballing, 89-chainsaw precision tree cutting, PCA permitted coconut removal, tree inventory & GPS tagging, and DENR compliance across Luzon.",
  keywords: [
    "tree earthballing Philippines",
    "chainsaw tree cutting contractor",
    "DENR chainsaw permit STCP",
    "PCA coconut tree cutting permit",
    "tree inventory GPS tagging",
    "commercial greening landscaping",
    "watershed reforestation Batangas",
  ],
  alternates: {
    canonical: "https://fhg-two.vercel.app/services",
  },
  openGraph: {
    title: "Industrial Tree Services & Greening Solutions | Forest Hills Garden",
    description:
      "Enterprise tree earthballing, certified chainsaw felling, and environmental compliance contractor since 1998. 98.7% specimen survival guarantee.",
    url: "https://fhg-two.vercel.app/services",
    type: "website",
    locale: "en_PH",
    images: [
      {
        url: "/images/og_image.jpg",
        width: 1200,
        height: 630,
        alt: "Forest Hills Garden - Industrial Tree Services Authority",
      },
    ],
  },
};

export default function ServicesPage() {
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
            name: "Industrial Tree Services",
            item: "https://fhg-two.vercel.app/services",
          },
        ],
      },
      {
        "@type": "Service",
        name: "Large-Scale Tree Earthballing & Relocation",
        provider: {
          "@type": "HomeAndConstructionBusiness",
          name: "Forest Hills Garden",
          url: "https://fhg-two.vercel.app",
        },
        areaServed: ["Metro Manila", "Calabarzon", "Batangas", "Cavite", "Laguna"],
        description:
          "Arboricultural excavation, root-ball wrapping, 25T-50T hydraulic crane lifting, and survival-guaranteed relocation with 12-month post-transplant warranty.",
      },
      {
        "@type": "Service",
        name: "Certified Chainsaw Tree Cutting (89 Fleet)",
        provider: {
          "@type": "HomeAndConstructionBusiness",
          name: "Forest Hills Garden",
          url: "https://fhg-two.vercel.app",
        },
        areaServed: ["Metro Manila", "Calabarzon", "Central Luzon"],
        description:
          "Sectional dismantle of hazardous or infrastructure-obstructing trees using 89 registered heavy chainsaws with zero-damage track record.",
      },
      {
        "@type": "Service",
        name: "DENR Tree Inventory & STCP Permitting",
        provider: {
          "@type": "HomeAndConstructionBusiness",
          name: "Forest Hills Garden",
          url: "https://fhg-two.vercel.app",
        },
        description:
          "Turnkey arborist GPS tree census, caliper tagging, and statutory Special Tree Cutting Permit processing with DENR and LGUs.",
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
              <li className="text-white font-semibold">Services</li>
            </ol>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#102414] border border-[#ffd600]/30 text-xs font-bold text-[#ffd600] uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Enterprise Arboricultural Scopes</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight leading-tight">
                Industrial Tree Care &{" "}
                <span className="text-gradient-gold">Environmental Services</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#a8d5a8] leading-relaxed">
                From heavy hydraulic crane earthballing to precision right-of-way corridor felling and statutory DENR STCP permitting. Backed by 28+ years of zero-infraction execution.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/contact"
                className="flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-linear-to-r from-[#ffd600] to-[#f9c923] text-[#061008] hover:brightness-110 shadow-lg shadow-[#ffd600]/20 hover:scale-105 transition-all"
              >
                <span>Request Quotation / RFP</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-5 py-3.5 rounded-full font-semibold text-xs text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-[#76c442]" />
                <span>Dispatch Helpline</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Interactive Grid */}
      <main>
        <ServicesGrid />
        <ComplianceProtocol />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}
