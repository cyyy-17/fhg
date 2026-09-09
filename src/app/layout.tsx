import type { Metadata, Viewport } from "next";
import { Outfit, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CookieBanner from "@/components/CookieBanner";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fhg-two.vercel.app"),
  title: "Forest Hills Garden | Industrial Tree Services Philippines",
  description:
    "Philippines' premier contractor for tree earthballing, precision chainsaw felling, DENR permits, and plant nurseries since 1998. Trusted by SMC, Ayala & EEI.",
  keywords: [
    "Forest Hills Garden",
    "Forest Hill Garden",
    "Forest Hills Garden Batangas",
    "Forest Hill Garden Philippines",
    "FHG",
    "tree earthballing Philippines",
    "tree cutting contractor Manila",
    "DENR chainsaw permit",
    "plant nursery Talisay Batangas",
    "commercial landscaping Philippines",
    "reforestation Zambales",
  ],
  authors: [{ name: "Forest Hills Garden" }],
  alternates: {
    canonical: "https://fhg-two.vercel.app",
  },
  verification: {
    google: "85t1JuUj8lLOWuWFYqwNk79r8NNBJSovLkpZYjoLQno",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    siteName: "Forest Hills Garden",
    title: "Forest Hills Garden | Industrial Tree Services Philippines",
    description:
      "Philippines' premier contractor for tree earthballing, precision chainsaw felling, DENR permits, and plant nurseries since 1998. Trusted by SMC, Ayala & EEI.",
    url: "https://fhg-two.vercel.app",
    type: "website",
    locale: "en_PH",
    images: [
      {
        url: "/images/og_image.jpg",
        width: 1200,
        height: 630,
        alt: "Forest Hills Garden - Industrial Tree Services Authority Philippines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forest Hills Garden | Industrial Tree Services Philippines",
    description:
      "Official website of Forest Hills Garden. Industrial tree earthballing, felling, nursery supply, and environmental greening since 1998.",
    images: ["/images/og_image.jpg"],
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050e07",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://fhg-two.vercel.app/#website",
        url: "https://fhg-two.vercel.app",
        name: "Forest Hills Garden",
        alternateName: [
          "Forest Hill Garden",
          "FHG",
          "Forest Hills Garden Philippines",
          "Forest Hill Garden Philippines",
          "Forest Hills Garden Batangas",
        ],
        description:
          "Official website of Forest Hills Garden. Industrial tree earthballing, precision felling, plant nursery supply, and environmental compliance contractor since 1998.",
        publisher: {
          "@id": "https://fhg-two.vercel.app/#organization",
        },
        inLanguage: "en-PH",
        sameAs: ["https://www.facebook.com/forest.hills.garden.2024/"],
      },
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": "https://fhg-two.vercel.app/#organization",
        name: "Forest Hills Garden",
        alternateName: [
          "Forest Hill Garden",
          "FHG",
          "Forest Hills Garden Philippines",
          "Forest Hill Garden Batangas",
          "Forest Hills Garden Talisay",
        ],
        url: "https://fhg-two.vercel.app",
        image: "https://fhg-two.vercel.app/images/logo.png",
        logo: "https://fhg-two.vercel.app/images/logo.png",
        slogan: "We Do It Right and Fast",
        foundingDate: "1998-06-10",
        sameAs: [
          "https://www.facebook.com/forest.hills.garden.2024/",
          "https://www.google.com/maps/search/?api=1&query=32V9%2B5P+Talisay,+Batangas"
        ],
        founder: {
          "@type": "Person",
          name: "Edwin G. Luna",
          jobTitle: "Founder & Operations Head",
        },
        employee: {
          "@type": "Person",
          name: "Marife B. Luna",
          jobTitle: "General Manager",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Sitio Sto. Niño, Banga",
          addressLocality: "Talisay",
          addressRegion: "Batangas",
          postalCode: "4220",
          addressCountry: "PH",
        },
        hasMap: "https://www.google.com/maps/search/?api=1&query=32V9%2B5P+Talisay,+Batangas",
        openingHours: "Mo-Sa 08:00-17:00",
        geo: {
          "@type": "GeoCoordinates",
          latitude: 14.090054,
          longitude: 121.021166,
        },
        telephone: "+63-916-566-7265",
        email: "edluna1971@yahoo.com",
        taxID: "922-166-219-00000",
        priceRange: "$$$",

        areaServed: [
          {
            "@type": "AdministrativeArea",
            name: "Metro Manila",
          },
          {
            "@type": "AdministrativeArea",
            name: "Calabarzon",
          },
          {
            "@type": "AdministrativeArea",
            name: "Batangas",
          },
          {
            "@type": "AdministrativeArea",
            name: "Cavite",
          },
          {
            "@type": "AdministrativeArea",
            name: "Laguna",
          },
          {
            "@type": "AdministrativeArea",
            name: "Rizal",
          },
          {
            "@type": "AdministrativeArea",
            name: "Zambales",
          },
          {
            "@type": "Country",
            name: "Philippines",
          },
        ],
        description:
          "Forest Hills Garden is the premier Philippine enterprise contractor for commercial tree earthballing, relocation, certified chainsaw felling, plant nursery propagation, commercial greening, and large-scale watershed reforestation.",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Industrial Tree Care & Environmental Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Commercial Tree Earthballing & Relocation",
                description: "Specialized root-ball excavation, hydraulic crane rigging, and specimen tree preservation.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Certified Chainsaw Tree Cutting (90 Fleet)",
                description: "DENR and PCA registered controlled sectional felling for expressway and railway right-of-way.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Batangas Plant Nursery Seedling Supply",
                description: "150,000+ native forest saplings and compensatory planting stocks across Talisay, Batangas facilities.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "DENR Tree Inventory & STCP Permitting",
                description: "Turnkey GPS tree census, caliper tagging, and statutory Special Tree Cutting Permit processing.",
              },
            },
          ],
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://fhg-two.vercel.app/#breadcrumbs",
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
            name: "Services",
            item: "https://fhg-two.vercel.app/services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Nurseries",
            item: "https://fhg-two.vercel.app/nurseries",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Projects",
            item: "https://fhg-two.vercel.app/projects",
          },
          {
            "@type": "ListItem",
            position: 5,
            name: "Contact",
            item: "https://fhg-two.vercel.app/contact",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://fhg-two.vercel.app/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is the typical lead time for DENR Special Tree Cutting Permit (STCP) processing?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "STCP processing generally spans 30 to 60 working days depending on jurisdiction. Forest Hills Garden handles turnkey compliance: arborist GPS tree inventory, caliper measurements, risk tagging, and LGU clearances."
            }
          },
          {
            "@type": "Question",
            name: "How fast can your 90-chainsaw fleet and heavy crane machinery mobilize?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "For projects across Metro Manila, Batangas, Laguna, Cavite, and Rizal, crews mobilize within 48 to 72 hours following Notice to Proceed and permit verification."
            }
          },
          {
            "@type": "Question",
            name: "What are your tree survival warranty terms for commercial earthballing?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We provide a 12-Month Post-Transplantation Warranty with a 98.7% survival rate. Should a transplanted tree fail due to shock, Forest Hills Garden provides 100% free specimen replacement from Batangas nursery reserves."
            }
          },
          {
            "@type": "Question",
            name: "What is the standard DENR compensatory seedling replacement ratio?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under DENR guidelines, developers must typically turn over 50 to 100 indigenous seedlings for every tree removed. Forest Hills Garden supplies certified native hard species with official inspection certificates."
            }
          }
        ]
      },
    ],
  };


  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${outfit.variable} ${playfair.variable} ${jakarta.variable} font-body antialiased bg-[#050e07] text-[#f0fbf0]`}
      >
        <SmoothScroll>{children}</SmoothScroll>
        <CookieBanner />
      </body>
    </html>
  );
}
