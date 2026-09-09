import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ServicesGrid from "@/components/ServicesGrid";
import ComplianceProtocol from "@/components/ComplianceProtocol";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { ChevronRight, ArrowRight, Phone } from "lucide-react";

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
              <li className="text-[#f6f7f4] font-semibold">Services</li>
            </ol>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c5a059] tracking-widest uppercase mb-3">
                <span>[ ENTERPRISE SCOPE DIRECTORY ]</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-bold font-heading text-[#f6f7f4] tracking-tight leading-tight">
                Industrial Tree Care &amp;{" "}
                <span className="font-editorial italic font-normal text-[#dfbe76]">
                  Environmental Services
                </span>
              </h1>
              <p className="mt-4 text-sm sm:text-base text-[#9aa89b] leading-relaxed">
                From heavy hydraulic crane earthballing to precision right-of-way corridor felling and statutory DENR STCP permitting. Backed by 28+ years of zero-infraction execution.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/contact"
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-xs uppercase tracking-wider bg-[#c5a059] hover:bg-[#dfbe76] text-[#060d07] shadow-md transition-colors"
              >
                <span>Request Tender RFP</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-5 py-3 rounded-lg font-medium text-xs text-[#f6f7f4] bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Dispatch Desk</span>
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
