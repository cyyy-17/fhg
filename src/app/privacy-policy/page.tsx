import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import {
  ChevronRight,
  ShieldCheck,
  Lock,
  FileText,
  UserCheck,
  Mail,
  AlertTriangle,
  Building2,
  Phone,
  Cookie,
} from "lucide-react";
import { companyData } from "@/data/company";

export const metadata: Metadata = {
  title: "Data Privacy Policy | Forest Hills Garden",
  description:
    "Official Data Privacy Policy of Forest Hills Garden pursuant to Republic Act No. 10173 (Data Privacy Act of 2012) and National Privacy Commission regulations.",
  keywords: [
    "Forest Hills Garden privacy policy",
    "Data Privacy Act 2012 compliance",
    "RA 10173",
    "National Privacy Commission Philippines",
    "tree contractor privacy policy",
  ],
  alternates: {
    canonical: "https://fhg-two.vercel.app/privacy-policy",
  },
  openGraph: {
    title: "Data Privacy Policy | Forest Hills Garden",
    description:
      "Statutory compliance under Republic Act No. 10173 (Data Privacy Act of 2012). How Forest Hills Garden processes and protects B2B inquiries and client data.",
    url: "https://fhg-two.vercel.app/privacy-policy",
    type: "website",
    locale: "en_PH",
  },
};

export default function PrivacyPolicyPage() {
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
            name: "Privacy Policy",
            item: "https://fhg-two.vercel.app/privacy-policy",
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://fhg-two.vercel.app/privacy-policy#webpage",
        url: "https://fhg-two.vercel.app/privacy-policy",
        name: "Data Privacy Policy - Forest Hills Garden",
        description:
          "Official Data Privacy Policy for Forest Hills Garden under RA 10173.",
        publisher: {
          "@type": "HomeAndConstructionBusiness",
          name: "Forest Hills Garden",
          telephone: "+63-916-566-7265",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Sitio Sto. Niño, Banga",
            addressLocality: "Talisay",
            addressRegion: "Batangas",
            postalCode: "4220",
            addressCountry: "PH",
          },
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
      <section className="pt-32 pb-12 bg-linear-to-b from-[#0a150c] via-[#060d07] to-[#060d07] border-b border-white/8">
        <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs sm:text-sm text-[#9aa89b]">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <ChevronRight className="w-3.5 h-3.5 text-[#c5a059]" />
              <li className="text-white font-semibold">Privacy Policy</li>
            </ol>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a150c] border border-[#c5a059]/30 text-xs font-mono uppercase tracking-wider text-[#dfbe76] mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Republic Act No. 10173 • Data Privacy Act of 2012</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold font-heading text-[#f6f7f4] tracking-tight leading-tight">
              Data Privacy <span className="font-editorial italic font-normal text-[#dfbe76]">Policy</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#9aa89b] leading-relaxed">
              Forest Hills Garden is committed to safeguarding your personal and corporate information. This policy governs how we collect, process, retain, and protect contact data received through our communications and RFP portal.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-[#9aa89b]">
              <span>Effective Date: June 10, 1998</span>
              <span>•</span>
              <span>Last Revised: September 2026</span>
              <span>•</span>
              <span className="text-[#dfbe76]">DTI Reg. No. 1729753 (Valid to May 28, 2030)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <main className="py-16 md:py-24">
        <div className="w-full max-w-5xl mx-auto px-6 md:px-12 space-y-12">
          {/* 1. Controller Details */}
          <section className="bg-[#0a150c]/80 rounded-3xl p-8 sm:p-10 border border-white/8 space-y-4">
            <div className="flex items-center gap-3 text-[#c5a059]">
              <Building2 className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#f6f7f4]">
                1. Personal Information Controller (PIC)
              </h2>
            </div>
            <p className="text-sm text-[#9aa89b] leading-relaxed">
              Under Republic Act No. 10173 (Data Privacy Act of 2012 or &ldquo;DPA&rdquo;) and its Implementing Rules and Regulations (IRR), the Personal Information Controller responsible for your personal data is:
            </p>
            <div className="p-4 rounded-xl bg-[#060d07]/80 border border-white/8 text-xs space-y-1.5 font-mono text-[#9aa89b]">
              <p><strong className="text-[#f6f7f4]">Business Name:</strong> Forest Hills Garden (FHG)</p>
              <p><strong className="text-[#f6f7f4]">Legal Structure:</strong> Sole Proprietorship registered with DTI (Certificate No. 1729753, valid until May 28, 2030); in transition of ownership to Forest Hills Ventures Incorporated (SEC Reg. No. 2023060103408-45)</p>
              <p><strong className="text-[#f6f7f4]">Proprietress & General Manager:</strong> {companyData.manager}</p>
              <p><strong className="text-[#f6f7f4]">Principal Office:</strong> {companyData.headOffice.address}</p>
              <p><strong className="text-[#f6f7f4]">Email Desk:</strong> {companyData.headOffice.emails.join(" / ")}</p>
              <p><strong className="text-[#f6f7f4]">Telefax / Phone:</strong> {companyData.headOffice.telefax} • {companyData.headOffice.mobiles.join(" • ")}</p>
            </div>
          </section>

          {/* 2. What Data We Collect */}
          <section className="bg-[#0a150c]/80 rounded-3xl p-8 sm:p-10 border border-white/8 space-y-4">
            <div className="flex items-center gap-3 text-[#c5a059]">
              <FileText className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#f6f7f4]">
                2. Information We Collect
              </h2>
            </div>
            <p className="text-sm text-[#9aa89b] leading-relaxed">
              We collect information directly from you when you submit an inquiry through our Contact Desk or configure a project estimate via our RFP Configurator. The personal data collected is limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-[#9aa89b] pl-2">
              <li><strong className="text-[#f6f7f4]">Contact Identity:</strong> Full name, professional title, or engineering designation.</li>
              <li><strong className="text-[#f6f7f4]">Organizational Affiliation:</strong> Company name, developer entity, or contractor firm.</li>
              <li><strong className="text-[#f6f7f4]">Communications:</strong> Official email address, mobile phone number, and landline number.</li>
              <li><strong className="text-[#f6f7f4]">Project Parameters:</strong> Project site location, required scope (earthballing, cutting, nursery stock, reforestation), tree count estimates, and permit status.</li>
            </ul>
            <div className="p-4 rounded-xl bg-[#c5a059]/10 border border-[#c5a059]/30 text-xs text-[#f6f7f4] flex items-start gap-3">
              <Lock className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
              <span>
                <strong>No Financial or Sensitive Personal Data Collected:</strong> This website does not process credit cards, bank accounts, government identification numbers (TIN, SSS, Passport), biometrics, or sensitive personal data under Section 3(l) of the DPA.
              </span>
            </div>
          </section>

          {/* 3. Purpose & Legal Basis */}
          <section className="bg-[#0a150c]/80 rounded-3xl p-8 sm:p-10 border border-white/8 space-y-4">
            <div className="flex items-center gap-3 text-[#c5a059]">
              <UserCheck className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#f6f7f4]">
                3. Purpose and Legal Basis for Processing
              </h2>
            </div>
            <p className="text-sm text-[#9aa89b] leading-relaxed">
              Under Section 12 of the Data Privacy Act of 2012, we process your personal data under the following legitimate grounds:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-[#060d07]/60 border border-white/8 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#dfbe76] block font-bold">
                  Pre-Contractual & Project Coordination
                </span>
                <p className="text-xs text-[#9aa89b] leading-relaxed">
                  Evaluating arboricultural feasibility, formulating technical commercial quotations, preparing mobilization schedules, and conducting on-site tree caliper inspections at your request.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-[#060d07]/60 border border-white/8 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#81c784] block font-bold">
                  Explicit Consent (Section 12.a)
                </span>
                <p className="text-xs text-[#9aa89b] leading-relaxed">
                  By ticking our consent confirmation prior to dispatching your inquiry or RFP, you grant explicit consent for our operations team to communicate regarding your requested project.
                </p>
              </div>
            </div>
          </section>

          {/* 4. Transmission & Third Parties */}
          <section className="bg-[#0a150c]/80 rounded-3xl p-8 sm:p-10 border border-white/8 space-y-4">
            <div className="flex items-center gap-3 text-[#c5a059]">
              <Lock className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#f6f7f4]">
                4. Data Transmission & Third-Party Processors
              </h2>
            </div>
            <p className="text-sm text-[#9aa89b] leading-relaxed">
              We prioritize data minimization. Inquiries created through our website are compiled client-side in your browser and dispatched via chosen communication protocols:
            </p>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-[#9aa89b] pl-2">
              <li><strong className="text-[#f6f7f4]">Direct Email (mailto):</strong> Transmitted directly through your local email application to our verified corporate email accounts (<span className="text-[#f6f7f4] font-mono">edluna1971@yahoo.com</span> and <span className="text-[#f6f7f4] font-mono">iamfeluna@yahoo.com</span>).</li>
              <li><strong className="text-[#f6f7f4]">WhatsApp Dispatch:</strong> Formatted messages initiated by the user through Meta Platforms, Inc.&apos;s WhatsApp messaging interface, subject to WhatsApp&apos;s end-to-end encryption and terms.</li>
              <li><strong className="text-[#f6f7f4]">Viber Dispatch:</strong> Inquiries copied for direct transmission via Rakuten Viber messaging services.</li>
            </ul>
            <div className="p-4 rounded-xl bg-[#060d07]/80 border border-white/8 text-xs text-[#9aa89b]">
              <strong className="text-[#f6f7f4]">Server-Side Storage:</strong> This website does NOT store contact submissions or inquiries in a public internet-facing database. Inquiries are handled solely within our secure administrative business email and messaging accounts.
            </div>
          </section>

          {/* 5. Data Subject Rights */}
          <section className="bg-[#0a150c]/80 rounded-3xl p-8 sm:p-10 border border-white/8 space-y-4">
            <div className="flex items-center gap-3 text-[#c5a059]">
              <ShieldCheck className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#f6f7f4]">
                5. Your Rights as a Data Subject
              </h2>
            </div>
            <p className="text-sm text-[#9aa89b] leading-relaxed">
              Pursuant to Section 16 of Republic Act No. 10173, you are entitled to the following statutory rights regarding your personal information:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-[#060d07]/60 border border-white/8">
                <strong className="text-[#f6f7f4] block mb-1">Right to be Informed</strong>
                <span className="text-[#9aa89b]">Understand how and why your personal data is collected, stored, and processed.</span>
              </div>
              <div className="p-4 rounded-xl bg-[#060d07]/60 border border-white/8">
                <strong className="text-[#f6f7f4] block mb-1">Right to Access</strong>
                <span className="text-[#9aa89b]">Obtain confirmation of what personal information concerning you is held in our records.</span>
              </div>
              <div className="p-4 rounded-xl bg-[#060d07]/60 border border-white/8">
                <strong className="text-[#f6f7f4] block mb-1">Right to Rectification</strong>
                <span className="text-[#9aa89b]">Request timely correction of inaccurate, outdated, or incomplete personal data.</span>
              </div>
              <div className="p-4 rounded-xl bg-[#060d07]/60 border border-white/8">
                <strong className="text-[#f6f7f4] block mb-1">Right to Erasure or Blocking</strong>
                <span className="text-[#9aa89b]">Request deletion of your contact information when no longer necessary for the original B2B purpose.</span>
              </div>
              <div className="p-4 rounded-xl bg-[#060d07]/60 border border-white/8">
                <strong className="text-[#f6f7f4] block mb-1">Right to Object</strong>
                <span className="text-[#9aa89b]">Refuse or withdraw consent for data processing at any point during communication.</span>
              </div>
              <div className="p-4 rounded-xl bg-[#060d07]/60 border border-white/8">
                <strong className="text-[#f6f7f4] block mb-1">Right to Damages & Redress</strong>
                <span className="text-[#9aa89b]">Lodge a complaint before the National Privacy Commission (NPC) in case of rights violation.</span>
              </div>
            </div>
          </section>

          {/* 6. Security Measures & Retention */}
          <section className="bg-[#0a150c]/80 rounded-3xl p-8 sm:p-10 border border-white/8 space-y-4">
            <div className="flex items-center gap-3 text-[#c5a059]">
              <Lock className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#f6f7f4]">
                6. Security Safeguards & Data Retention
              </h2>
            </div>
            <p className="text-sm text-[#9aa89b] leading-relaxed">
              In accordance with Section 20 of RA 10173, Forest Hills Garden implements strict organizational, physical, and technical measures to protect your information against unauthorized access, accidental loss, or unlawful destruction:
            </p>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-[#9aa89b] pl-2">
              <li><strong className="text-[#f6f7f4]">Transport Security:</strong> All web traffic is strictly encrypted using modern Transport Layer Security (TLS 1.3 / HTTPS) with strict Content Security Policy headers.</li>
              <li><strong className="text-[#f6f7f4]">Access Restrictions:</strong> Project inquiries are restricted strictly to authorized arboricultural project coordinators and executive management.</li>
              <li><strong className="text-[#f6f7f4]">Retention Schedule:</strong> B2B inquiry records are retained for a maximum of twenty-four (24) months for project coordination and warranty follow-up, or as mandated by Philippine commercial and taxation statutes (e.g. BIR commercial record retention rules). Records are securely purged thereafter.</li>
            </ul>
          </section>

          {/* 7. National Privacy Commission Regulatory Note */}
          <section className="bg-[#0a150c]/80 rounded-3xl p-8 sm:p-10 border border-[#c5a059]/30 space-y-4">
            <div className="flex items-center gap-3 text-[#c5a059]">
              <AlertTriangle className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#f6f7f4]">
                7. Regulatory Compliance & NPC Circular No. 2022-04
              </h2>
            </div>
            <p className="text-sm text-[#9aa89b] leading-relaxed">
              Forest Hills Garden operates as a commercial agricultural service and landscape contractor. Data collected through this platform is strictly limited to transactional B2B communications. In accordance with National Privacy Commission (NPC) guidelines, should our processing operations trigger mandatory registration thresholds (including processing records of at least one thousand individuals or processing sensitive data), formal Data Protection Officer (DPO) registration with the NPC is maintained in full compliance with law.
            </p>
          </section>

          {/* 8. Cookies and Browser Local Storage Policy */}
          <section id="cookies" className="bg-[#0a150c]/80 rounded-3xl p-8 sm:p-10 border border-white/8 space-y-4 scroll-mt-28">
            <div className="flex items-center gap-3 text-[#c5a059]">
              <Cookie className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#f6f7f4]">
                8. Cookies &amp; Browser Local Storage Policy
              </h2>
            </div>
            <p className="text-sm text-[#9aa89b] leading-relaxed">
              In accordance with NPC transparency guidelines, Forest Hills Garden informs users regarding our use of cookies and browser local storage:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-xl bg-[#060d07]/60 border border-white/8 space-y-1.5">
                <strong className="text-[#f6f7f4] block">Strictly Necessary</strong>
                <span className="text-[#9aa89b]">
                  Used for Lenis smooth scroll coordination, UI accessibility state, security header enforcement, and saving your consent preferences (<code className="text-[#dfbe76]">fhg_cookie_consent</code>). Always active.
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[#060d07]/60 border border-white/8 space-y-1.5">
                <strong className="text-[#f6f7f4] block">Functional / Cache</strong>
                <span className="text-[#9aa89b]">
                  Caches active RFP calculation values and volume parameters temporarily in browser memory so configurations are preserved if you switch tabs.
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[#060d07]/60 border border-white/8 space-y-1.5">
                <strong className="text-[#f6f7f4] block">No Third-Party Ad Trackers</strong>
                <span className="text-[#9aa89b]">
                  We do NOT employ third-party advertising cookies, cross-site trackers, or data-broker pixels. Your browsing activity on this site remains private.
                </span>
              </div>
            </div>
            <p className="text-xs text-[#9aa89b] pt-2">
              You can adjust or revoke your cookie choices at any time using the <strong className="text-[#f6f7f4]">Cookie Preferences</strong> link in the footer of every page.
            </p>
          </section>

          {/* 9. Contact Our Compliance Desk */}
          <section className="bg-[#0a150c]/80 rounded-3xl p-8 sm:p-10 border border-[#c5a059]/40 space-y-6">
            <div className="flex items-center gap-3 text-[#f6f7f4]">
              <Mail className="w-6 h-6 text-[#c5a059]" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading">
                9. Privacy Inquiries &amp; Exercising Your Rights
              </h2>
            </div>
            <p className="text-sm text-[#9aa89b] leading-relaxed">
              To exercise your rights under Republic Act No. 10173, submit an inquiry, or request data deletion, contact our administrative management desk directly:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#060d07]/80 border border-white/8 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#dfbe76] block font-bold">
                  Data Protection Contact
                </span>
                <p className="text-sm font-bold text-[#f6f7f4]">Forest Hills Garden Administration</p>
                <p className="text-xs text-[#9aa89b]">Attn: Compliance & Operations Desk</p>
                <p className="text-xs text-[#9aa89b] font-mono">Sitio Sto. Niño, Banga, Talisay, Batangas</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#060d07]/80 border border-white/8 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#81c784] block font-bold">
                  Direct Electronic Channels
                </span>
                <p className="text-xs text-[#9aa89b]">
                  <strong className="text-[#f6f7f4]">Email:</strong>{" "}
                  <a href="mailto:edluna1971@yahoo.com" className="text-[#dfbe76] underline">
                    edluna1971@yahoo.com
                  </a>{" "}
                  /{" "}
                  <a href="mailto:iamfeluna@yahoo.com" className="text-[#dfbe76] underline">
                    iamfeluna@yahoo.com
                  </a>
                </p>
                <p className="text-xs text-[#9aa89b]">
                  <strong className="text-[#f6f7f4]">Telephone:</strong> (043) 741 0603 • 0916 566 7265
                </p>
                <p className="text-xs text-[#9aa89b]">
                  <strong className="text-[#f6f7f4]">National Privacy Commission:</strong>{" "}
                  <a
                    href="https://privacy.gov.ph"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#81c784] underline hover:text-[#dfbe76]"
                  >
                    privacy.gov.ph
                  </a>
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/8 flex items-center justify-between">
              <Link
                href="/terms"
                className="text-xs font-semibold text-[#dfbe76] hover:text-[#f6f7f4] transition-colors"
              >
                ← View Terms of Use & Commercial Disclaimers
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c5a059] hover:bg-[#dfbe76] text-[#060d07] text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Contact Operations Desk</span>
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
