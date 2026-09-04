import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { ChevronRight, Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";

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
          "Official contact channels for Forest Hills Garden head office, heavy equipment dispatch, and twin Batangas nursery facilities.",
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
              <li className="text-white font-semibold">Contact & Dispatch</li>
            </ol>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#102414] border border-[#ffd600]/30 text-xs font-bold text-[#ffd600] uppercase tracking-wider mb-4">
              <Phone className="w-3.5 h-3.5" />
              <span>Head Office & Rapid Deployment Dispatch</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight leading-tight">
              Contact &{" "}
              <span className="text-gradient-gold">Dispatch Operations</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#a8d5a8] leading-relaxed">
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
