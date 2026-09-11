import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import NurseryHub from "@/components/NurseryHub";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { ChevronRight, ArrowRight, Phone } from "lucide-react";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Plant Nursery Talisay Batangas | 230,000+ Native Seedlings | Forest Hills Garden",
  description:
    "Three production facilities in Sitio Latag, Brgy. Tumaway & Brgy. Aya, Talisay, Batangas. Supplying 230,000+ indigenous forest saplings, Narra, Molave, mature balled trees, and DENR compensatory planting stocks across 12+ hectares.",
  keywords: [
    "plant nursery Talisay Batangas",
    "native tree seedlings Philippines",
    "DENR compensatory seedling supplier",
    "Narra seedlings Batangas",
    "Molave Ipil Banaba saplings",
    "mature balled specimen trees",
    "commercial plant nursery Calabarzon",
  ],
  alternates: {
    canonical: `${SITE_URL}/nurseries`,
  },
  openGraph: {
    title: "Plant Nurseries Talisay Batangas | Forest Hills Garden",
    description:
      "230,000+ native forest saplings and landscape-grade trees across three specialized propagation facilities in Talisay, Batangas.",
    url: `${SITE_URL}/nurseries`,
    type: "website",
    locale: "en_PH",
    images: [
      {
        url: "/images/og_nurseries.jpg",
        width: 1200,
        height: 630,
        alt: "Forest Hills Garden Plant Nurseries - Talisay Batangas",
      },
    ],
  },
};

import { getSpeciesData, getCompanyData } from "@/lib/storage";

export const dynamic = "force-dynamic";

export default async function NurseriesPage() {
  const [liveSpecies, liveCompany] = await Promise.all([
    getSpeciesData(),
    getCompanyData(),
  ]);
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
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Plant Nurseries",
            item: `${SITE_URL}/nurseries`,
          },
        ],
      },
      {
        "@type": "GardenStore",
        "@id": `${SITE_URL}/nurseries#facility-latag`,
        name: "Forest Hills Garden - Sitio Latag Nursery Facility",
        url: `${SITE_URL}/nurseries`,
        telephone: "+63-916-566-7265",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Sitio Latag, Tumaway",
          addressLocality: "Talisay",
          addressRegion: "Batangas",
          postalCode: "4220",
          addressCountry: "PH",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 14.089851,
          longitude: 121.037593,
        },
        description:
          "Primary 100,000+ capacity production facility along Talisay-Tanauan Road for containerized indigenous forest saplings, hardened Narra, Balitbitan, and DENR compensatory planting stocks.",
      },
      {
        "@type": "GardenStore",
        "@id": `${SITE_URL}/nurseries#facility-tumaway`,
        name: "Forest Hills Garden - Tumaway Nursery Facility",
        url: `${SITE_URL}/nurseries`,
        telephone: "+63-916-566-7265",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Brgy. Tumaway",
          addressLocality: "Talisay",
          addressRegion: "Batangas",
          postalCode: "4220",
          addressCountry: "PH",
        },
        description:
          "Secondary 80,000+ capacity forest stock and heavy root-ball holding fields for ongoing infrastructure tenders and hardwood replacements.",
      },
      {
        "@type": "GardenStore",
        "@id": `${SITE_URL}/nurseries#facility-aya`,
        name: "Forest Hills Garden - Aya Nursery Facility",
        url: `${SITE_URL}/nurseries`,
        telephone: "+63-916-566-7265",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Brgy. Aya",
          addressLocality: "Talisay",
          addressRegion: "Batangas",
          postalCode: "4220",
          addressCountry: "PH",
        },
        description:
          "Specialized 50,000+ capacity ecological propagation nursery for endemic watershed saplings, rare ornamentals, and mature balled heritage trees.",
      },
    ],
  };

  return (
    <div className="relative min-h-screen bg-[#050d07] text-[#f6f7f4] selection:bg-[#22c55e] selection:text-[#050d07] overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* Header Banner & Breadcrumbs */}
      <section className="pt-32 pb-12 bg-linear-to-b from-[#0a1f10] via-[#050d07] to-[#050d07] border-b border-white/5">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs font-mono text-[#9aa89b]">
              <li>
                <Link href="/" className="hover:text-[#f6f7f4] transition-colors">
                  Home
                </Link>
              </li>
              <ChevronRight className="w-3.5 h-3.5 text-[#22c55e]" />
              <li className="text-[#f6f7f4] font-semibold">Plant Nurseries</li>
            </ol>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#22c55e] tracking-widest uppercase mb-3">
                <span>[ 230,000+ RESERVE CAPACITY • 3 TALISAY FACILITIES ]</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-bold font-heading text-[#f6f7f4] tracking-tight leading-tight">
                Batangas Production{" "}
                <span className="font-editorial italic font-normal text-[#4ade80]">
                  Plant Nurseries
                </span>
              </h1>
              <p className="mt-4 text-sm sm:text-base text-[#9aa89b] leading-relaxed">
                Direct grower supplier of DENR-certified indigenous saplings (Narra, Molave, Ipil, Banaba) and acclimatized mature specimen trees across 12+ hectares for commercial infrastructure and estate greening.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/contact"
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider bg-linear-to-r from-[#15803d] to-[#16a34a] hover:brightness-110 text-white shadow-lg shadow-[#16a34a]/20 transition-all"
              >
                <span>Inquire Nursery Stock</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:09165667265"
                className="flex items-center gap-2 px-5 py-3 rounded-lg font-medium text-xs text-[#f6f7f4] bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#22c55e]" />
                <span>0916 566 7265</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Nursery Hub Component */}
      <main>
        <NurseryHub initialSpecies={liveSpecies} initialCompany={liveCompany} />
      </main>

      <Footer initialCompany={liveCompany} />
      <FloatingActions />
    </div>
  );
}
