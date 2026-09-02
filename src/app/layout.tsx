import type { Metadata } from "next";
import { Outfit, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

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
  metadataBase: new URL("https://fhg.vercel.app"),
  title: "Forest Hills Garden | Forest Hill Garden Philippines — Tree Services & Landscaping",
  description:
    "Forest Hills Garden (Forest Hill Garden) — Philippines' premier contractor for commercial tree earthballing, precision tree cutting, right-of-way felling, plant nurseries, and reforestation since 1998 in Talisay, Batangas. 'We Do It Right and Fast.'",
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
    title: "Forest Hills Garden (Forest Hill Garden) | Industrial Tree Services Authority",
    description:
      "We Do It Right and Fast. Philippines' premier tree earthballing, chainsaw felling, plant nursery, and reforestation contractor since 1998. Trusted by San Miguel, Ayala, SM, NLEX, EEI, DMCI.",
    type: "website",
    locale: "en_PH",
    images: [
      {
        url: "/images/logo.png",
        width: 699,
        height: 357,
        alt: "Forest Hills Garden Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forest Hills Garden | Forest Hill Garden Philippines",
    description:
      "Official website of Forest Hills Garden. Industrial tree earthballing, felling, nursery supply, and environmental greening since 1998.",
    images: ["/images/logo.png"],
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Forest Hills Garden",
    alternateName: [
      "Forest Hill Garden",
      "FHG",
      "Forest Hills Garden Philippines",
      "Forest Hill Garden Batangas",
      "Forest Hills Garden Talisay",
    ],
    image: "https://fhg.vercel.app/images/logo.png",
    logo: "https://fhg.vercel.app/images/logo.png",
    slogan: "We Do It Right and Fast",
    foundingDate: "1998-06-10",
    founder: {
      "@type": "Person",
      name: "Edwin G. Luna",
    },
    founderOrManager: {
      "@type": "Person",
      name: "Marife B. Luna",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "4th Floor, Luna Building, Malvar St., Poblacion 8",
      addressLocality: "Talisay",
      addressRegion: "Batangas",
      postalCode: "4220",
      addressCountry: "PH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 14.095,
      longitude: 120.978,
    },
    telephone: "+63-43-741-0603",
    email: "edluna1971@yahoo.com",
    priceRange: "$$",
    areaServed: {
      "@type": "Country",
      name: "Philippines",
    },
    description:
      "Forest Hills Garden is the premier Philippine enterprise contractor for tree earthballing, relocation, certified chainsaw felling, plant nursery propagation, commercial greening, and large-scale watershed reforestation.",
  };

  return (
    <html lang="en" className="dark scroll-smooth">
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
      </body>
    </html>
  );
}
