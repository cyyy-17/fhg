import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import NurseryHub from "@/components/NurseryHub";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { ChevronRight, ArrowRight, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Plant Nursery Talisay Batangas | 150,000+ Native Seedlings | Forest Hills Garden",
  description:
    "Twin production facilities in Brgy. Tumaway & Brgy. Aya, Talisay, Batangas. Supplying 150,000+ indigenous forest saplings, Narra, Molave, mature balled trees, and DENR compensatory planting stocks.",
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
    canonical: "https://fhg-two.vercel.app/nurseries",
  },
  openGraph: {
    title: "Twin Plant Nurseries Talisay Batangas | Forest Hills Garden",
    description:
      "150,000+ native forest saplings and landscape-grade trees across two specialized propagation facilities in Talisay, Batangas.",
    url: "https://fhg-two.vercel.app/nurseries",
    type: "website",
    locale: "en_PH",
    images: [
      {
        url: "/images/og_image.jpg",
        width: 1200,
        height: 630,
        alt: "Forest Hills Garden Twin Nurseries - Talisay Batangas",
      },
    ],
  },
};

export default function NurseriesPage() {
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
            name: "Plant Nurseries",
            item: "https://fhg-two.vercel.app/nurseries",
          },
        ],
      },
      {
        "@type": "GardenStore",
        "@id": "https://fhg-two.vercel.app/nurseries#facility-tumaway",
        name: "Forest Hills Garden - Tumaway Nursery Facility",
        url: "https://fhg-two.vercel.app/nurseries",
        telephone: "+63-916-566-7265",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Brgy. Tumaway",
          addressLocality: "Talisay",
          addressRegion: "Batangas",
          addressCountry: "PH",
        },
        description:
          "Primary 100,000+ capacity production facility for containerized indigenous forest saplings, DENR compensatory planting stocks, and wholesale supply.",
      },
      {
        "@type": "GardenStore",
        "@id": "https://fhg-two.vercel.app/nurseries#facility-aya",
        name: "Forest Hills Garden - Aya Nursery Facility",
        url: "https://fhg-two.vercel.app/nurseries",
        telephone: "+63-916-566-7265",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Brgy. Aya",
          addressLocality: "Talisay",
          addressRegion: "Batangas",
          addressCountry: "PH",
        },
        description:
          "Specialized 50,000+ capacity holding and acclimatization nursery for mature earthballed heritage trees and landscape specimen stocks.",
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
              <li className="text-[#f6f7f4] font-semibold">Plant Nurseries</li>
            </ol>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c5a059] tracking-widest uppercase mb-3">
                <span>[ 150,000+ RESERVE CAPACITY • TALISAY, BATANGAS ]</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-bold font-heading text-[#f6f7f4] tracking-tight leading-tight">
                Twin Production{" "}
                <span className="font-editorial italic font-normal text-[#dfbe76]">
                  Plant Nurseries
                </span>
              </h1>
              <p className="mt-4 text-sm sm:text-base text-[#9aa89b] leading-relaxed">
                Direct grower supplier of DENR-certified indigenous saplings (Narra, Molave, Ipil, Banaba) and acclimatized mature specimen trees for commercial infrastructure and estate greening.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/contact"
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-xs uppercase tracking-wider bg-[#c5a059] hover:bg-[#dfbe76] text-[#060d07] shadow-md transition-colors"
              >
                <span>Inquire Nursery Stock</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:09165667265"
                className="flex items-center gap-2 px-5 py-3 rounded-lg font-medium text-xs text-[#f6f7f4] bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>0916 566 7265</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Nursery Hub Component */}
      <main>
        <NurseryHub />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}
