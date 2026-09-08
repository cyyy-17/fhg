import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import {
  ChevronRight,
  Scale,
  FileCheck2,
  Calculator,
  ShieldCheck,
  Building,
  AlertCircle,
  HelpCircle,
  Gavel,
} from "lucide-react";
import { companyData } from "@/data/company";

export const metadata: Metadata = {
  title: "Terms of Use & Commercial Disclaimers | Forest Hills Garden",
  description:
    "Terms of Use, warranty parameters, and statutory commercial disclaimers for Forest Hills Garden under Philippine commercial, consumer, and internet transaction statutes.",
  keywords: [
    "Forest Hills Garden terms of use",
    "commercial tree warranty terms",
    "tree earthballing guarantee",
    "RFP estimate disclaimer",
    "Internet Transactions Act 2023",
  ],
  alternates: {
    canonical: "https://fhg-two.vercel.app/terms",
  },
  openGraph: {
    title: "Terms of Use & Commercial Disclaimers | Forest Hills Garden",
    description:
      "Enterprise contracting terms, warranty scope, statistical claim substantiations, and governing law.",
    url: "https://fhg-two.vercel.app/terms",
    type: "website",
    locale: "en_PH",
  },
};

export default function TermsPage() {
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
            name: "Terms of Use",
            item: "https://fhg-two.vercel.app/terms",
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://fhg-two.vercel.app/terms#webpage",
        url: "https://fhg-two.vercel.app/terms",
        name: "Terms of Use & Disclaimers - Forest Hills Garden",
        description:
          "Official terms of use, proposal disclaimers, and warranty parameters for Forest Hills Garden.",
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
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs sm:text-sm text-[#a8d5a8]">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <ChevronRight className="w-3.5 h-3.5 text-[#ffd600]" />
              <li className="text-white font-semibold">Terms of Use</li>
            </ol>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#102414] border border-[#ffd600]/30 text-xs font-bold text-[#ffd600] uppercase tracking-wider mb-4">
              <Scale className="w-3.5 h-3.5" />
              <span>Commercial Terms & Disclaimers</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight leading-tight">
              Terms of Use & <span className="text-gradient-gold">Disclaimers</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#a8d5a8] leading-relaxed">
              These terms govern the use of the Forest Hills Garden website, RFP configurator, and corporate document repository under Philippine commercial statutes.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-[#a8d5a8]/80">
              <span>Established: June 10, 1998</span>
              <span>•</span>
              <span>Last Revised: September 2026</span>
              <span>•</span>
              <span className="text-[#ffd600]">Republic of the Philippines</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <main className="py-16 md:py-24">
        <div className="w-full max-w-5xl mx-auto px-6 md:px-12 space-y-12">
          {/* 1. General Agreement */}
          <section className="glass-panel rounded-3xl p-8 sm:p-10 border border-[#4caf50]/20 space-y-4">
            <div className="flex items-center gap-3 text-[#ffd600]">
              <FileCheck2 className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                1. Acceptance of Terms & B2B Commercial Scope
              </h2>
            </div>
            <p className="text-sm text-[#a8d5a8] leading-relaxed">
              By accessing or using this website, submitting an inquiry, or downloading compliance credentials, you agree to be bound by these Terms of Use in compliance with Republic Act No. 8792 (Electronic Commerce Act of 2000) and Republic Act No. 11967 (Internet Transactions Act of 2023).
            </p>
            <p className="text-sm text-[#a8d5a8] leading-relaxed">
              Forest Hills Garden (&ldquo;FHG&rdquo;) is a duly registered sole proprietorship under Philippine law (DTI Certificate No. 1729753, PhilGEPS Reg. No. 2005-23340), owned and operated by {companyData.manager}, with principal address at {companyData.headOffice.address}.
            </p>
          </section>

          {/* 2. RFP Estimator & Scope Builder Disclaimer */}
          <section className="glass-panel rounded-3xl p-8 sm:p-10 border border-[#ffd600]/30 space-y-4">
            <div className="flex items-center gap-3 text-[#ffd600]">
              <Calculator className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                2. RFP Estimator & Mobilization Calculator Disclaimer
              </h2>
            </div>
            <p className="text-sm text-[#a8d5a8] leading-relaxed">
              The interactive Request for Proposal (RFP) Configurator, fleet mobilization projections, and timeline calculators provided on this website are automated engineering heuristics intended strictly for preliminary planning, budget guidance, and B2B inquiry drafting.
            </p>
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs space-y-2 text-[#a8d5a8]">
              <p className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-[#ffd600] shrink-0 mt-0.5" />
                <span>
                  <strong>Non-Binding Estimates:</strong> Calculations regarding crew size, machinery allocation, and execution windows do NOT constitute a binding commercial quotation, formal tender bid, or guaranteed mobilization timeline.
                </span>
              </p>
              <p className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-[#ffd600] shrink-0 mt-0.5" />
                <span>
                  <strong>Site-Specific Verification Required:</strong> Binding contractual commitments require on-site caliper inspection, root zone assessment, terrain evaluation, and execution of a signed contract or formal Purchase Order (PO) with authorized FHG management.
                </span>
              </p>
            </div>
          </section>

          {/* 3. Statistical & Metric Claims Substantiation */}
          <section className="glass-panel rounded-3xl p-8 sm:p-10 border border-[#4caf50]/20 space-y-4">
            <div className="flex items-center gap-3 text-[#76c442]">
              <ShieldCheck className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                3. Performance Metrics & Statistical Claim Substantiations
              </h2>
            </div>
            <p className="text-sm text-[#a8d5a8] leading-relaxed">
              In adherence to fair trade practices under Republic Act No. 7394 (Consumer Act of the Philippines) and the Department of Trade and Industry (DTI) advertising guidelines, the quantitative performance metrics displayed on this site are substantiated as follows:
            </p>
            <div className="space-y-3 pt-2 text-xs">
              <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                <strong className="text-white block mb-1">98.7% Certified Tree Survival Rate</strong>
                <p className="text-[#a8d5a8]">
                  Derived from historical survival audits conducted across contracted tree earthballing, root-pruning, and transplanting projects between June 1998 and December 2024. Survival is contingent upon adherence to recommended 180-day micro-irrigation, anti-desiccant application, and scheduled canopy conditioning.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                <strong className="text-white block mb-1">1,240,000+ Safe Man-Hours without Lost-Time Accident</strong>
                <p className="text-[#a8d5a8]">
                  Reflects accumulated field operational hours without lost-time injuries (LTI), monitored pursuant to Department of Labor and Employment (DOLE) Department Order No. 198-18 and Construction Occupational Safety and Health (COSH) guidelines.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                <strong className="text-white block mb-1">100% Statutory Safety & Environmental Compliance Rating</strong>
                <p className="text-[#a8d5a8]">
                  Substantiated by zero regulatory infractions, stop-work notices, or administrative penalties across DENR, PCA, DPWH, and DOLE project audits throughout the firm&apos;s active contracting history.
                </p>
              </div>
            </div>
          </section>

          {/* 4. 12-Month Tree Survival Warranty Terms */}
          <section className="glass-panel rounded-3xl p-8 sm:p-10 border border-[#4caf50]/20 space-y-4">
            <div className="flex items-center gap-3 text-[#ffd600]">
              <ShieldCheck className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                4. 12-Month Tree Survival Warranty Terms
              </h2>
            </div>
            <p className="text-sm text-[#a8d5a8] leading-relaxed">
              Forest Hills Garden provides a twelve (12) month post-transplantation survival warranty for balled and relocated trees, subject to the following standard operating conditions:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-black/30 border border-white/10 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#76c442] block">
                  Warranty Inclusions
                </span>
                <ul className="list-disc list-inside text-xs text-[#a8d5a8] space-y-1.5">
                  <li>100% free specimen replacement from our twin Batangas nursery facilities upon verified death caused by transplant root shock.</li>
                  <li>Bi-weekly post-transplant monitoring and hormone stimulation during the initial 180-day establishment window.</li>
                  <li>Equally sized or caliper-equivalent acclimatized replacement sapling/specimen.</li>
                </ul>
              </div>
              <div className="p-5 rounded-2xl bg-black/30 border border-white/10 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-red-400 block">
                  Standard Warranty Exclusions
                </span>
                <ul className="list-disc list-inside text-xs text-[#a8d5a8] space-y-1.5">
                  <li>Acts of God / Force Majeure (typhoons exceeding Signal No. 3, severe Taal Volcano ashfall, flooding, landslides).</li>
                  <li>Unauthorized excavation or root zone disturbance by client third-party subcontractors.</li>
                  <li>Herbicide, chemical, or unauthorized fertilizer application without FHG arborist approval.</li>
                  <li>Failure by the property owner/developer to provide required irrigation access or maintenance water.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 5. Chainsaw Act Compliance (RA 9175) */}
          <section className="glass-panel rounded-3xl p-8 sm:p-10 border border-[#4caf50]/20 space-y-4">
            <div className="flex items-center gap-3 text-[#76c442]">
              <Building className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                5. Heavy Forestry Equipment & Chainsaw Act Compliance (RA 9175)
              </h2>
            </div>
            <p className="text-sm text-[#a8d5a8] leading-relaxed">
              All 89 units comprising our industrial chainsaw and heavy felling fleet are registered and operated strictly in compliance with Republic Act No. 9175 (The Chainsaw Act of 2002) and relevant Department of Environment and Natural Resources (DENR) Administrative Orders.
            </p>
            <p className="text-sm text-[#a8d5a8] leading-relaxed">
              Forest Hills Garden does NOT sell, distribute, or import power saws to the public. Our fleet is deployed exclusively by trained, DOLE-certified tree fellers holding valid tree cutting permits issued by CENRO/PENRO/DENR or the Philippine Coconut Authority (PCA).
            </p>
          </section>

          {/* 6. Document Vault & Tender Inclusions */}
          <section className="glass-panel rounded-3xl p-8 sm:p-10 border border-[#4caf50]/20 space-y-4">
            <div className="flex items-center gap-3 text-[#ffd600]">
              <FileCheck2 className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                6. Document Vault & Tender Submissions
              </h2>
            </div>
            <p className="text-sm text-[#a8d5a8] leading-relaxed">
              The compliance files available in the Document Vault (including PhilGEPS Blue Membership, DTI Business Registration, PCA Tree Cutter certificates, and BIR registrations) are true digital scans provided solely to assist prospective corporate clients and procurement committees with vendor accreditation and bidding dossier preparation.
            </p>
            <p className="text-sm text-[#a8d5a8] leading-relaxed">
              <strong className="text-white">Verification Responsibility:</strong> Prior to submitting bid envelopes or government tenders, contracting officers should contact our administration desk to obtain certified true hard copies with current validity dates.
            </p>
          </section>

          {/* 7. Intellectual Property & Project References */}
          <section className="glass-panel rounded-3xl p-8 sm:p-10 border border-[#4caf50]/20 space-y-4">
            <div className="flex items-center gap-3 text-white">
              <HelpCircle className="w-6 h-6 text-[#ffd600]" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading">
                7. Intellectual Property & Client Scope References
              </h2>
            </div>
            <p className="text-sm text-[#a8d5a8] leading-relaxed">
              All content on this website, including photographs, branding, layout design, icons, and software components, is the proprietary property of Forest Hills Garden and protected under Republic Act No. 8293 (Intellectual Property Code of the Philippines).
            </p>
            <p className="text-sm text-[#a8d5a8] leading-relaxed">
              All client names, project titles (e.g. SLEX TR4, Metro Manila Subway CP101, Ayala Land Nuvali, SM Prime, Zambales NGP), and logo mentions reference completed or active commercial contracting scopes performed by FHG. Such mentions do not imply exclusive corporate endorsement or joint venture partnership.
            </p>
          </section>

          {/* 8. Governing Law & Venue */}
          <section className="glass-panel rounded-3xl p-8 sm:p-10 border border-[#4caf50]/40 space-y-4">
            <div className="flex items-center gap-3 text-[#ffd600]">
              <Gavel className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                8. Governing Law & Jurisdiction
              </h2>
            </div>
            <p className="text-sm text-[#a8d5a8] leading-relaxed">
              These Terms of Use, their interpretation, and any dispute arising from the use of this website or communications through it shall be governed by and construed in accordance with the laws of the Republic of the Philippines.
            </p>
            <p className="text-sm text-[#a8d5a8] leading-relaxed">
              Any legal action or proceeding arising out of or in connection with these Terms shall be instituted exclusively in the proper courts of the Province of Batangas, Philippines, or other proper courts having jurisdiction.
            </p>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <Link
                href="/privacy-policy"
                className="text-xs font-bold text-[#ffd600] hover:text-white transition-colors"
              >
                ← Read our Data Privacy Policy (RA 10173)
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2e7d32] hover:bg-[#4caf50] text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <span>Contact Legal / Administration</span>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}
