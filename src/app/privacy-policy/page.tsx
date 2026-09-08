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
              <li className="text-white font-semibold">Privacy Policy</li>
            </ol>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#102414] border border-[#ffd600]/30 text-xs font-bold text-[#ffd600] uppercase tracking-wider mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Republic Act No. 10173 • Data Privacy Act of 2012</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight leading-tight">
              Data Privacy <span className="text-gradient-gold">Policy</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#a8d5a8] leading-relaxed">
              Forest Hills Garden is committed to safeguarding your personal and corporate information. This policy governs how we collect, process, retain, and protect contact data received through our communications and RFP portal.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-[#a8d5a8]/80">
              <span>Effective Date: June 10, 1998</span>
              <span>•</span>
              <span>Last Revised: September 2026</span>
              <span>•</span>
              <span className="text-[#ffd600]">DTI Reg. No. 1729753</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <main className="py-16 md:py-24">
        <div className="w-full max-w-5xl mx-auto px-6 md:px-12 space-y-12">
          {/* 1. Controller Details */}
          <section className="glass-panel rounded-3xl p-8 sm:p-10 border border-[#4caf50]/20 space-y-4">
            <div className="flex items-center gap-3 text-[#ffd600]">
              <Building2 className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                1. Personal Information Controller (PIC)
              </h2>
            </div>
            <p className="text-sm text-[#a8d5a8] leading-relaxed">
              Under Republic Act No. 10173 (Data Privacy Act of 2012 or &ldquo;DPA&rdquo;) and its Implementing Rules and Regulations (IRR), the Personal Information Controller responsible for your personal data is:
            </p>
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs space-y-1.5 font-mono text-[#a8d5a8]">
              <p><strong className="text-white">Business Name:</strong> Forest Hills Garden (FHG)</p>
              <p><strong className="text-white">Legal Structure:</strong> Sole Proprietorship registered with DTI (Certificate No. 1729753)</p>
              <p><strong className="text-white">Proprietress & General Manager:</strong> {companyData.manager}</p>
              <p><strong className="text-white">Principal Office:</strong> {companyData.headOffice.address}</p>
              <p><strong className="text-white">Email Desk:</strong> {companyData.headOffice.emails.join(" / ")}</p>
              <p><strong className="text-white">Telefax / Phone:</strong> {companyData.headOffice.telefax} • {companyData.headOffice.mobiles.join(" • ")}</p>
            </div>
          </section>

          {/* 2. What Data We Collect */}
          <section className="glass-panel rounded-3xl p-8 sm:p-10 border border-[#4caf50]/20 space-y-4">
            <div className="flex items-center gap-3 text-[#76c442]">
              <FileText className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                2. Information We Collect
              </h2>
            </div>
            <p className="text-sm text-[#a8d5a8] leading-relaxed">
              We collect information directly from you when you submit an inquiry through our Contact Desk or configure a project estimate via our RFP Configurator. The personal data collected is limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-[#a8d5a8] pl-2">
              <li><strong className="text-white">Contact Identity:</strong> Full name, professional title, or engineering designation.</li>
              <li><strong className="text-white">Organizational Affiliation:</strong> Company name, developer entity, or contractor firm.</li>
              <li><strong className="text-white">Communications:</strong> Official email address, mobile phone number, and landline number.</li>
              <li><strong className="text-white">Project Parameters:</strong> Project site location, required scope (earthballing, cutting, nursery stock, reforestation), tree count estimates, and permit status.</li>
            </ul>
            <div className="p-4 rounded-xl bg-[#ffd600]/10 border border-[#ffd600]/30 text-xs text-[#f0fbf0] flex items-start gap-3">
              <Lock className="w-4 h-4 text-[#ffd600] shrink-0 mt-0.5" />
              <span>
                <strong>No Financial or Sensitive Personal Data Collected:</strong> This website does not process credit cards, bank accounts, government identification numbers (TIN, SSS, Passport), biometrics, or sensitive personal data under Section 3(l) of the DPA.
              </span>
            </div>
          </section>

          {/* 3. Purpose & Legal Basis */}
          <section className="glass-panel rounded-3xl p-8 sm:p-10 border border-[#4caf50]/20 space-y-4">
            <div className="flex items-center gap-3 text-[#ffd600]">
              <UserCheck className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                3. Purpose and Legal Basis for Processing
              </h2>
            </div>
            <p className="text-sm text-[#a8d5a8] leading-relaxed">
              Under Section 12 of the Data Privacy Act of 2012, we process your personal data under the following legitimate grounds:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-black/30 border border-white/10 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ffd600] block">
                  Pre-Contractual & Project Coordination
                </span>
                <p className="text-xs text-[#a8d5a8] leading-relaxed">
                  Evaluating arboricultural feasibility, formulating technical commercial quotations, preparing mobilization schedules, and conducting on-site tree caliper inspections at your request.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-black/30 border border-white/10 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#76c442] block">
                  Explicit Consent (Section 12.a)
                </span>
                <p className="text-xs text-[#a8d5a8] leading-relaxed">
                  By ticking our consent confirmation prior to dispatching your inquiry or RFP, you grant explicit consent for our operations team to communicate regarding your requested project.
                </p>
              </div>
            </div>
          </section>

          {/* 4. Transmission & Third Parties */}
          <section className="glass-panel rounded-3xl p-8 sm:p-10 border border-[#4caf50]/20 space-y-4">
            <div className="flex items-center gap-3 text-[#76c442]">
              <Lock className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                4. Data Transmission & Third-Party Processors
              </h2>
            </div>
            <p className="text-sm text-[#a8d5a8] leading-relaxed">
              We prioritize data minimization. Inquiries created through our website are compiled client-side in your browser and dispatched via chosen communication protocols:
            </p>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-[#a8d5a8] pl-2">
              <li><strong className="text-white">Direct Email (mailto):</strong> Transmitted directly through your local email application to our verified corporate email accounts (<span className="text-white font-mono">edluna1971@yahoo.com</span> and <span className="text-white font-mono">iamfeluna@yahoo.com</span>).</li>
              <li><strong className="text-white">WhatsApp Dispatch:</strong> Formatted messages initiated by the user through Meta Platforms, Inc.&apos;s WhatsApp messaging interface, subject to WhatsApp&apos;s end-to-end encryption and terms.</li>
              <li><strong className="text-white">Viber Dispatch:</strong> Inquiries copied for direct transmission via Rakuten Viber messaging services.</li>
            </ul>
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs text-[#a8d5a8]">
              <strong className="text-white">Server-Side Storage:</strong> This website does NOT store contact submissions or inquiries in a public internet-facing database. Inquiries are handled solely within our secure administrative business email and messaging accounts.
            </div>
          </section>

          {/* 5. Data Subject Rights */}
          <section className="glass-panel rounded-3xl p-8 sm:p-10 border border-[#4caf50]/20 space-y-4">
            <div className="flex items-center gap-3 text-[#ffd600]">
              <ShieldCheck className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                5. Your Rights as a Data Subject
              </h2>
            </div>
            <p className="text-sm text-[#a8d5a8] leading-relaxed">
              Pursuant to Section 16 of Republic Act No. 10173, you are entitled to the following statutory rights regarding your personal information:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                <strong className="text-white block mb-1">Right to be Informed</strong>
                <span className="text-[#a8d5a8]">Understand how and why your personal data is collected, stored, and processed.</span>
              </div>
              <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                <strong className="text-white block mb-1">Right to Access</strong>
                <span className="text-[#a8d5a8]">Obtain confirmation of what personal information concerning you is held in our records.</span>
              </div>
              <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                <strong className="text-white block mb-1">Right to Rectification</strong>
                <span className="text-[#a8d5a8]">Request timely correction of inaccurate, outdated, or incomplete personal data.</span>
              </div>
              <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                <strong className="text-white block mb-1">Right to Erasure or Blocking</strong>
                <span className="text-[#a8d5a8]">Request deletion of your contact information when no longer necessary for the original B2B purpose.</span>
              </div>
              <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                <strong className="text-white block mb-1">Right to Object</strong>
                <span className="text-[#a8d5a8]">Refuse or withdraw consent for data processing at any point during communication.</span>
              </div>
              <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                <strong className="text-white block mb-1">Right to Damages & Redress</strong>
                <span className="text-[#a8d5a8]">Lodge a complaint before the National Privacy Commission (NPC) in case of rights violation.</span>
              </div>
            </div>
          </section>

          {/* 6. Security Measures & Retention */}
          <section className="glass-panel rounded-3xl p-8 sm:p-10 border border-[#4caf50]/20 space-y-4">
            <div className="flex items-center gap-3 text-[#76c442]">
              <Lock className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                6. Security Safeguards & Data Retention
              </h2>
            </div>
            <p className="text-sm text-[#a8d5a8] leading-relaxed">
              In accordance with Section 20 of RA 10173, Forest Hills Garden implements strict organizational, physical, and technical measures to protect your information against unauthorized access, accidental loss, or unlawful destruction:
            </p>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-[#a8d5a8] pl-2">
              <li><strong className="text-white">Transport Security:</strong> All web traffic is strictly encrypted using modern Transport Layer Security (TLS 1.3 / HTTPS) with strict Content Security Policy headers.</li>
              <li><strong className="text-white">Access Restrictions:</strong> Project inquiries are restricted strictly to authorized arboricultural project coordinators and executive management.</li>
              <li><strong className="text-white">Retention Schedule:</strong> B2B inquiry records are retained for a maximum of twenty-four (24) months for project coordination and warranty follow-up, or as mandated by Philippine commercial and taxation statutes (e.g. BIR commercial record retention rules). Records are securely purged thereafter.</li>
            </ul>
          </section>

          {/* 7. National Privacy Commission Regulatory Note */}
          <section className="glass-panel rounded-3xl p-8 sm:p-10 border border-[#ffd600]/30 space-y-4">
            <div className="flex items-center gap-3 text-[#ffd600]">
              <AlertTriangle className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                7. Regulatory Compliance & NPC Circular No. 2022-04
              </h2>
            </div>
            <p className="text-sm text-[#a8d5a8] leading-relaxed">
              Forest Hills Garden operates as a commercial agricultural service and landscape contractor. Data collected through this platform is strictly limited to transactional B2B communications. In accordance with National Privacy Commission (NPC) guidelines, should our processing operations trigger mandatory registration thresholds (including processing records of at least one thousand individuals or processing sensitive data), formal Data Protection Officer (DPO) registration with the NPC is maintained in full compliance with law.
            </p>
          </section>

          {/* 8. Cookies and Browser Local Storage Policy */}
          <section id="cookies" className="glass-panel rounded-3xl p-8 sm:p-10 border border-[#4caf50]/20 space-y-4 scroll-mt-28">
            <div className="flex items-center gap-3 text-[#ffd600]">
              <Cookie className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                8. Cookies &amp; Browser Local Storage Policy
              </h2>
            </div>
            <p className="text-sm text-[#a8d5a8] leading-relaxed">
              In accordance with NPC transparency guidelines, Forest Hills Garden informs users regarding our use of cookies and browser local storage:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-1.5">
                <strong className="text-white block">Strictly Necessary</strong>
                <span className="text-[#a8d5a8]">
                  Used for Lenis smooth scroll coordination, UI accessibility state, security header enforcement, and saving your consent preferences (<code className="text-[#ffd600]">fhg_cookie_consent</code>). Always active.
                </span>
              </div>
              <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-1.5">
                <strong className="text-white block">Functional / Cache</strong>
                <span className="text-[#a8d5a8]">
                  Caches active RFP calculation values and volume parameters temporarily in browser memory so configurations are preserved if you switch tabs.
                </span>
              </div>
              <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-1.5">
                <strong className="text-white block">No Third-Party Ad Trackers</strong>
                <span className="text-[#a8d5a8]">
                  We do NOT employ third-party advertising cookies, cross-site trackers, or data-broker pixels. Your browsing activity on this site remains private.
                </span>
              </div>
            </div>
            <p className="text-xs text-[#a8d5a8] pt-2">
              You can adjust or revoke your cookie choices at any time using the <strong>Cookie Preferences</strong> link in the footer of every page.
            </p>
          </section>

          {/* 9. Contact Our Compliance Desk */}
          <section className="glass-panel rounded-3xl p-8 sm:p-10 border border-[#4caf50]/40 space-y-6">
            <div className="flex items-center gap-3 text-white">
              <Mail className="w-6 h-6 text-[#ffd600]" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading">
                9. Privacy Inquiries &amp; Exercising Your Rights
              </h2>
            </div>
            <p className="text-sm text-[#a8d5a8] leading-relaxed">
              To exercise your rights under Republic Act No. 10173, submit an inquiry, or request data deletion, contact our administrative management desk directly:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ffd600] block">
                  Data Protection Contact
                </span>
                <p className="text-sm font-bold text-white">Forest Hills Garden Administration</p>
                <p className="text-xs text-[#a8d5a8]">Attn: Compliance & Operations Desk</p>
                <p className="text-xs text-[#a8d5a8] font-mono">Sitio Sto. Niño, Banga, Talisay, Batangas</p>
              </div>

              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#76c442] block">
                  Direct Electronic Channels
                </span>
                <p className="text-xs text-[#a8d5a8]">
                  <strong className="text-white">Email:</strong>{" "}
                  <a href="mailto:edluna1971@yahoo.com" className="text-[#ffd600] underline">
                    edluna1971@yahoo.com
                  </a>{" "}
                  /{" "}
                  <a href="mailto:iamfeluna@yahoo.com" className="text-[#ffd600] underline">
                    iamfeluna@yahoo.com
                  </a>
                </p>
                <p className="text-xs text-[#a8d5a8]">
                  <strong className="text-white">Telephone:</strong> (043) 741 0603 • 0916 566 7265
                </p>
                <p className="text-xs text-[#a8d5a8]">
                  <strong className="text-white">National Privacy Commission:</strong>{" "}
                  <a
                    href="https://privacy.gov.ph"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#76c442] underline hover:text-[#ffd600]"
                  >
                    privacy.gov.ph
                  </a>
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <Link
                href="/terms"
                className="text-xs font-bold text-[#ffd600] hover:text-white transition-colors"
              >
                ← View Terms of Use & Commercial Disclaimers
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2e7d32] hover:bg-[#4caf50] text-white text-xs font-bold uppercase tracking-wider transition-colors"
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
