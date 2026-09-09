import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Forest Hills Garden | Office & Dispatch Talisay, Batangas",
  description:
    "Direct arborist inquiry, chainsaw dispatch, and nursery orders. Sitio Sto. Niño, Banga, Talisay, Batangas. Call 0916 566 7265, WhatsApp, Viber, or submit your RFP dossier.",
  keywords: [
    "Forest Hills Garden contact",
    "Forest Hills Garden phone number",
    "Forest Hills Garden Talisay Batangas address",
    "emergency tree cutting dispatch Philippines",
    "DENR tree permit consultant contact",
    "nursery seedling bulk inquiry",
  ],
  alternates: {
    canonical: "https://fhg-two.vercel.app/contact",
  },
  openGraph: {
    title: "Contact Forest Hills Garden | Office & Heavy Dispatch",
    description:
      "Rapid arborist consultation and equipment mobilization. Operating across Metro Manila, Batangas, Cavite, Laguna, Rizal, and Zambales.",
    url: "https://fhg-two.vercel.app/contact",
    type: "website",
    locale: "en_PH",
    images: [
      {
        url: "/images/og_image.jpg",
        width: 1200,
        height: 630,
        alt: "Forest Hills Garden Office & Dispatch",
      },
    ],
  },
};

export default function ContactPage() {
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
            name: "Contact & Dispatch",
            item: "https://fhg-two.vercel.app/contact",
          },
        ],
      },
      {
        "@type": "ContactPage",
        "@id": "https://fhg-two.vercel.app/contact#webpage",
        url: "https://fhg-two.vercel.app/contact",
        name: "Contact Forest Hills Garden",
        description:
          "Official contact channels for Forest Hills Garden head office, heavy equipment dispatch, and three Batangas nursery facilities.",
        mainEntity: {
          "@type": "HomeAndConstructionBusiness",
          name: "Forest Hills Garden",
          telephone: "+63-916-566-7265",
          email: "edluna1971@yahoo.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Sitio Sto. Niño, Banga",
            addressLocality: "Talisay",
            addressRegion: "Batangas",
            postalCode: "4220",
            addressCountry: "PH",
          },
          openingHours: "Mo-Sa 08:00-17:00",
        },
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
              <li className="text-[#f6f7f4] font-semibold">Contact &amp; Dispatch</li>
            </ol>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c5a059] tracking-widest uppercase mb-3">
              <span>[ DIRECT DISPATCH &amp; REGULATORY DESK ]</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold font-heading text-[#f6f7f4] tracking-tight leading-tight">
              Contact &amp;{" "}
              <span className="font-editorial italic font-normal text-[#dfbe76]">
                Dispatch Operations
              </span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-[#9aa89b] leading-relaxed">
              Connect with our certified arborists, nursery dispatch coordinators, and permit compliance specialists. Mobilization within 48–72 hours across Luzon.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <main>
        <ContactSection />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}
