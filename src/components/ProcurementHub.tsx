"use client";

import { useState, useMemo, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import confetti from "canvas-confetti";
import {
  FileText,
  Calculator,
  Phone,
  HelpCircle,
  ShieldCheck,
  Download,
  Eye,
  Send,
  CheckCircle2,
  X,
  MessageCircle,
  Copy,
  Check,
  MapPin,
  ExternalLink,
  ChevronDown,
  Clock,
  Sparkles,
  ArrowUpRight,
  AlertCircle,
  Building2,
  Mail,
  Truck,
  FileCheck,
} from "lucide-react";
import { companyData } from "@/data/company";

type ProcurementTab = "estimate" | "vault" | "contact" | "faq";

interface DocumentItem {
  id: string;
  title: string;
  category: string;
  docNumber: string;
  fileUrl: string;
  fileSize: string;
  description: string;
  status: string;
}

const documents: DocumentItem[] = [
  {
    id: "company-profile",
    title: "Official Company Profile & Capability Dossier",
    category: "Legal Registration",
    docNumber: "DTI Cert. No. 1729753",
    fileUrl: "/docs/company-profile.pdf",
    fileSize: "305 KB PDF",
    description: "Comprehensive corporate profile detailing 28 years of history, management, machinery assets, and signature infrastructure projects.",
    status: "Official Certified",
  },
  {
    id: "bir-cor",
    title: "BIR Certificate of Registration (COR)",
    category: "Tax Compliance",
    docNumber: "TIN Registered Enterprise",
    fileUrl: "/docs/bir-cor.pdf",
    fileSize: "1.15 MB PDF",
    description: "Official Bureau of Internal Revenue registered sole proprietorship status for commercial contract bidding and billing compliance.",
    status: "Audited & Active",
  },
  {
    id: "bir-2303",
    title: "BIR Form 2303 Tax Exemption & Filing Record",
    category: "Tax Compliance",
    docNumber: "BIR RDO 059 Batangas",
    fileUrl: "/docs/bir-2303.pdf",
    fileSize: "2.58 MB PDF",
    description: "Statutory tax clearance for enterprise withholding, corporate invoicing, and government procurement pre-qualification.",
    status: "Audited & Active",
  },
  {
    id: "clients-projects",
    title: "Audited List of Clients & Completed Works",
    category: "Project Audit",
    docNumber: "Track Record Archive 1998–2024",
    fileUrl: "/docs/clients-and-projects.pdf",
    fileSize: "170 KB PDF",
    description: "Certified list of infrastructure and commercial developers including San Miguel, Ayala Land, SM Prime, EEI, DMCI, and DPWH contracts.",
    status: "Official Certified",
  },
  {
    id: "office-map",
    title: "Head Office Location Map & Dispatch Hub",
    category: "Logistics & Site",
    docNumber: "Talisay Batangas HQ",
    fileUrl: "/docs/office-location-map.pdf",
    fileSize: "208 KB PDF",
    description: "Route guide to Sitio Sto. Niño, Banga, Talisay, Batangas (Plus Code: 32V9+5P) operations hub for vendor onboarding.",
    status: "Official Certified",
  },
  {
    id: "nursery-map",
    title: "Twin Plant Nursery Facilities Location Guide",
    category: "Logistics & Site",
    docNumber: "Tumaway & Aya Facilities",
    fileUrl: "/docs/nursery-location-map.pdf",
    fileSize: "141 KB PDF",
    description: "Access coordinates and site map for client tree inspection at Brgy. Tumaway and Brgy. Aya propagation farms.",
    status: "Official Certified",
  },
];

const generalFaqs = [
  {
    question: "What permits are needed before felling or earthballing trees in the Philippines?",
    answer: "A Special Tree Cutting Permit (STCP) or Tree Earthballing Permit issued by the DENR through CENRO/PENRO is legally mandatory for naturally growing and planted trees on private or public land. For coconut trees, a Permit to Cut from the Philippine Coconut Authority (PCA) is strictly required under RA 8048 / RA 10593. We handle the entire documentation, tree census, and endorsement turnkey."
  },
  {
    question: "Can you provide compensatory planting seedlings directly to DENR for our project?",
    answer: "Yes. As an accredited nursery operator with twin facilities holding 150,000+ native saplings, we supply, deliver, and officially turnover the mandated compensatory seedlings (1:50 or 1:100 ratio) directly to CENRO/PENRO and secure your official Certificate of Compliance."
  },
  {
    question: "What is your emergency mobilization SLA for highway or power line hazards?",
    answer: "We dispatch rapid crews across Calabarzon and Metro Manila during operating hours (8:00 AM – 5:00 PM). Emergency sectional felling and crane crews can mobilize within 4 to 12 hours of contract authorization."
  },
  {
    question: "Are your power chainsaws officially licensed by the government?",
    answer: "Yes. All 89 industrial forestry chainsaws in our fleet are registered with the Department of Environment and Natural Resources (DENR) pursuant to the Chainsaw Act of 2002 (Republic Act No. 9175). Our coconut palm saws hold active PCA permits (RNCR-00958 & R4-05595)."
  }
];

const emptySubscribe = () => () => {};

export default function ProcurementHub() {
  const [activeTab, setActiveTab] = useState<ProcurementTab>("estimate");

  // Document Vault State
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);

  // RFP Estimator State
  const [service, setService] = useState("Tree Earthballing & Relocation");
  const [region, setRegion] = useState("Batangas / Region IV-A (Calabarzon)");
  const [volume, setVolume] = useState("1 to 10 trees / Initial site assessment");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [rfpModalOpen, setRfpModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viberCopied, setViberCopied] = useState(false);

  // FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Deep-link hash listener
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      let matchedTab: ProcurementTab | null = null;
      if (hash === "#estimate" || hash === "#rfp") matchedTab = "estimate";
      else if (hash === "#vault" || hash === "#documents") matchedTab = "vault";
      else if (hash === "#contact" || hash === "#dispatch") matchedTab = "contact";
      else if (hash === "#faq") matchedTab = "faq";

      if (matchedTab) {
        setActiveTab(matchedTab);
        const el = document.getElementById("procurement-hub");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Lock scroll on modals
  useEffect(() => {
    if (!previewDoc && !rfpModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPreviewDoc(null);
        setRfpModalOpen(false);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewDoc, rfpModalOpen]);

  // RFP Submission
  const handleRfpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Please enter your name.";
    if (!phone.trim()) newErrors.phone = "Please enter your phone number.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setRfpModalOpen(true);
    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
  };

  const compiledRfpDossier =
    `[FOREST HILLS GARDEN - RFP TENDER DOSSIER]\n` +
    `Client: ${name}\n` +
    `Company: ${company || "Private Entity"}\n` +
    `Phone: ${phone}\n` +
    `Email: ${email}\n` +
    `Service: ${service}\n` +
    `Region: ${region}\n` +
    `Scope: ${volume}\n\n` +
    `Recipient: edluna1971@yahoo.com / iamfeluna@yahoo.com`;

  const tabs: { key: ProcurementTab; label: string; icon: typeof Calculator; badge?: string }[] = [
    { key: "estimate", label: "Tender / RFP Estimator", icon: Calculator, badge: "Instant" },
    { key: "vault", label: "Document Vault", icon: FileText, badge: "6 PDF Files" },
    { key: "contact", label: "Office & Dispatch", icon: Phone, badge: "8AM–5PM" },
    { key: "faq", label: "Statutory & FAQs", icon: HelpCircle },
  ];

  return (
    <section
      id="procurement-hub"
      className="py-20 md:py-28 bg-[#020702] relative z-20 overflow-hidden border-t border-[#4caf50]/15 scroll-mt-20 text-white"
      aria-label="Procurement, Estimator, Document Vault and Direct Dispatch Hub"
    >
      {/* Anchor targets */}
      <span id="estimate" className="absolute -top-24 pointer-events-none" />
      <span id="vault" className="absolute -top-24 pointer-events-none" />
      <span id="contact" className="absolute -top-24 pointer-events-none" />
      <span id="faq" className="absolute -top-24 pointer-events-none" />

      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#ffd600]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#ffd600] bg-[#ffd600]/10 border border-[#ffd600]/20 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#ffd600]" />
            <span>Commercial Onboarding & Rapid Procurement</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
            Tender Estimator, Legal Vault & Office Dispatch
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#a8d5a8]">
            Configure commercial arboricultural tenders, download verified statutory clearances, or reach our Talisay main office (8:00 AM – 5:00 PM).
          </p>
        </div>

        {/* Segmented Control Bar */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#0a1b0d]/90 border border-white/10 backdrop-blur-xl shadow-2xl max-w-full overflow-x-auto scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-linear-to-r from-[#ffd600] to-[#f9c923] text-[#050e07] shadow-lg shadow-[#ffd600]/25 scale-[1.02]"
                      : "text-[#a8d5a8] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#050e07]" : "text-[#76c442]"}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                        isActive ? "bg-[#050e07]/20 text-[#050e07] font-extrabold" : "bg-white/10 text-[#ffd600]"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: TENDER & RFP ESTIMATOR */}
        {activeTab === "estimate" && (
          <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-[#4caf50]/30 shadow-2xl animate-fadeIn max-w-5xl mx-auto">
            <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#ffd600] font-bold block mb-1">
                  Step 1 of 2: Technical Project Scope
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                  Commercial Tender & Mobilization Estimator
                </h3>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-[#76c442] bg-[#102414] px-3 py-1 rounded-full border border-[#76c442]/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Instant Turnaround</span>
              </span>
            </div>

            <form onSubmit={handleRfpSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Service Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white">
                    Service Required
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full p-3 rounded-xl form-input custom-select text-xs cursor-pointer"
                  >
                    <option value="Tree Earthballing & Relocation" className="bg-[#061409]">
                      Tree Earthballing & Relocation
                    </option>
                    <option value="Certified Chainsaw Tree Cutting (89 Units)" className="bg-[#061409]">
                      Chainsaw Tree Cutting (89 Saws)
                    </option>
                    <option value="PCA Coconut Tree Cutting & Trading" className="bg-[#061409]">
                      PCA Coconut Tree Removal
                    </option>
                    <option value="Tree Inventory, Calipering & DENR Permitting" className="bg-[#061409]">
                      Tree Census & GPS Tagging
                    </option>
                    <option value="Compensatory Seedling Supply & Delivery" className="bg-[#061409]">
                      Compensatory Nursery Seedlings
                    </option>
                    <option value="Watershed Reforestation & Greening" className="bg-[#061409]">
                      Watershed Reforestation
                    </option>
                  </select>
                </div>

                {/* Region Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white">
                    Project Region / Corridor
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full p-3 rounded-xl form-input custom-select text-xs cursor-pointer"
                  >
                    <option value="Batangas / Region IV-A (Calabarzon)" className="bg-[#061409]">
                      Batangas / Region IV-A (Calabarzon)
                    </option>
                    <option value="Metro Manila (NCR)" className="bg-[#061409]">
                      Metro Manila (NCR)
                    </option>
                    <option value="Cavite / Laguna / Rizal / Quezon" className="bg-[#061409]">
                      Cavite / Laguna / Rizal / Quezon
                    </option>
                    <option value="Central Luzon (Bulacan / Pampanga)" className="bg-[#061409]">
                      Central Luzon (Bulacan / Pampanga)
                    </option>
                    <option value="National / Inter-Island" className="bg-[#061409]">
                      National / Inter-Island
                    </option>
                  </select>
                </div>

                {/* Volume Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white">
                    Estimated Tree Volume
                  </label>
                  <select
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-full p-3 rounded-xl form-input custom-select text-xs cursor-pointer"
                  >
                    <option value="1 to 10 trees / Initial assessment" className="bg-[#061409]">
                      1 to 10 trees (Initial Site Assessment)
                    </option>
                    <option value="11 to 50 trees / Commercial lot" className="bg-[#061409]">
                      11 to 50 trees (Commercial Lot)
                    </option>
                    <option value="51 to 200 trees / Highway corridor" className="bg-[#061409]">
                      51 to 200 trees (Highway Corridor)
                    </option>
                    <option value="200+ trees / Mega concession" className="bg-[#061409]">
                      200+ trees (Concession / Mining)
                    </option>
                  </select>
                </div>
              </div>

              {/* Client Contact Inputs */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#a8d5a8]">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Engr. Juan Dela Cruz"
                    className="w-full p-3 rounded-xl form-input text-xs"
                  />
                  {errors.name && <span className="text-[10px] text-red-400">{errors.name}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#a8d5a8]">
                    Company / Entity
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="General Contractor"
                    className="w-full p-3 rounded-xl form-input text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#a8d5a8]">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0916 566 7265"
                    className="w-full p-3 rounded-xl form-input text-xs"
                  />
                  {errors.phone && <span className="text-[10px] text-red-400">{errors.phone}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#a8d5a8]">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="procurement@corp.com"
                    className="w-full p-3 rounded-xl form-input text-xs"
                  />
                  {errors.email && <span className="text-[10px] text-red-400">{errors.email}</span>}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-[#a8d5a8]">
                  <ShieldCheck className="w-4 h-4 text-[#76c442]" />
                  <span>PhilGEPS Blue Member & DTI 1729753 Verified Contractor</span>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-full bg-linear-to-r from-[#ffd600] to-[#f9c923] text-[#050e07] text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#ffd600]/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Generate Tender Dossier</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: CORPORATE DOCUMENT VAULT */}
        {activeTab === "vault" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0a1f0e] border border-[#ffd600]/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto mb-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-[#ffd600] shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">Vendor Pre-Qualification Center</h4>
                  <p className="text-xs text-[#a8d5a8]">Instant access to verified legal registrations, BIR clearances, and completed works archives.</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab("estimate")}
                className="px-5 py-2 rounded-full bg-[#ffd600] text-[#050e07] text-xs font-bold uppercase tracking-wider hover:brightness-110 shrink-0 cursor-pointer"
              >
                Request Custom Vendor Pack
              </button>
            </div>

            {/* Document Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between border border-white/10 group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#ffd600]/15 text-[#ffd600] border border-[#ffd600]/30">
                        {doc.docNumber}
                      </span>
                      <span className="text-[10px] font-bold text-[#76c442] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {doc.status}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#ffd600] transition-colors leading-snug">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-[#a8d5a8] leading-relaxed mb-4">
                      {doc.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#a8d5a8]">{doc.fileSize}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPreviewDoc(doc)}
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#ffd600]" />
                        <span>Preview</span>
                      </button>
                      <a
                        href={doc.fileUrl}
                        download
                        className="px-3 py-1.5 rounded-lg bg-[#2e7d32] hover:bg-[#4caf50] text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: OFFICE & DISPATCH HQ */}
        {activeTab === "contact" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn max-w-6xl mx-auto">
            {/* Headquarters Card (7 cols) */}
            <div className="lg:col-span-7 glass-panel rounded-3xl p-8 border border-[#4caf50]/30 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono font-bold uppercase text-[#ffd600] tracking-wider px-3 py-1 rounded-full bg-[#ffd600]/10 border border-[#ffd600]/20">
                    Operations Headquarters • 8:00 AM – 5:00 PM
                  </span>
                  <span className="text-xs font-mono text-[#76c442] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Mon–Sat 8:00 AM – 5:00 PM
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-heading text-white mb-2">
                  Forest Hills Garden Dispatch Center
                </h3>

                <p className="text-sm text-[#a8d5a8] leading-relaxed mb-6">
                  {companyData.headOffice.address}
                </p>

                <div className="p-4 rounded-2xl bg-[#0a1c0d] border border-white/10 space-y-3 mb-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#a8d5a8]">Plus Code:</span>
                    <strong className="text-white font-mono">{companyData.headOffice.plusCode}</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#a8d5a8]">Telefax:</span>
                    <strong className="text-white font-mono">{companyData.headOffice.telefax}</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#a8d5a8]">Official Emails:</span>
                    <span className="text-[#ffd600] font-mono text-[11px]">{companyData.headOffice.emails.join(" • ")}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={companyData.headOffice.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[#ffd600]" />
                  <span>Google Maps</span>
                </a>
                <a
                  href={companyData.headOffice.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-[#76c442]" />
                  <span>Waze Navigation</span>
                </a>
                <a
                  href="https://wa.me/639165667265"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-xl bg-[#25d366] text-white text-xs font-bold flex items-center gap-2 hover:brightness-110 shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp Dispatch</span>
                </a>
              </div>
            </div>

            {/* Direct Hotlines Card (5 cols) */}
            <div className="lg:col-span-5 glass-panel rounded-3xl p-8 border border-white/10 shadow-2xl flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-bold font-heading text-white mb-4">
                  Direct Arborist Dispatch Lines
                </h4>

                <div className="space-y-4">
                  {companyData.headOffice.mobiles.map((mobile, idx) => (
                    <a
                      key={idx}
                      href={`tel:${mobile.replace(/\s+/g, "")}`}
                      className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#ffd600]/20 text-[#ffd600] flex items-center justify-center">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div>
                          <strong className="text-sm font-bold text-white group-hover:text-[#ffd600] transition-colors block">
                            {mobile}
                          </strong>
                          <span className="text-[10px] text-[#a8d5a8]">Mobile & Viber Hotlink</span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#ffd600]" />
                    </a>
                  ))}

                  <div className="p-4 rounded-2xl bg-linear-to-r from-[#102414] to-[#0a180d] border border-[#76c442]/30">
                    <strong className="text-xs font-bold text-[#ffd600] uppercase tracking-wider block mb-1">
                      Emergency Corridor Clearing
                    </strong>
                    <p className="text-xs text-[#a8d5a8] leading-relaxed">
                      Instant mobilization for high-tension line hazards, fallen trees, and roadway blockages across Calabarzon and NCR.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-center">
                <span className="text-[11px] font-mono text-[#a8d5a8]">
                  Manager: {companyData.manager}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: STATUTORY FAQS */}
        {activeTab === "faq" && (
          <div className="max-w-4xl mx-auto space-y-4 animate-fadeIn">
            {generalFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-[#061409] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#ffd600] shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#a8d5a8] leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* PDF PREVIEW MODAL */}
      {previewDoc && mounted && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-9999 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeInSimple"
          onClick={() => setPreviewDoc(null)}
        >
          <div
            className="relative w-full max-w-5xl h-[90vh] rounded-3xl bg-[#061409] border border-[#4caf50]/40 shadow-2xl p-4 sm:p-6 flex flex-col text-white my-auto animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#ffd600]/20 text-[#ffd600]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-heading line-clamp-1">{previewDoc.title}</h3>
                  <span className="text-xs text-[#a8d5a8]">{previewDoc.docNumber} • {previewDoc.fileSize}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={previewDoc.fileUrl}
                  download
                  className="px-4 py-2 rounded-xl bg-[#2e7d32] hover:bg-[#4caf50] text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download PDF</span>
                </a>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ffd600] hover:text-[#050e07] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 w-full mt-4 rounded-xl overflow-hidden bg-black/40 border border-white/10">
              <iframe
                src={`${previewDoc.fileUrl}#toolbar=1&navpanes=0`}
                className="w-full h-full border-0"
                title={previewDoc.title}
              />
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* RFP SUBMISSION CELEBRATION MODAL */}
      {rfpModalOpen && mounted && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeInSimple"
          onClick={() => setRfpModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl bg-[#061409] border border-[#ffd600]/40 shadow-2xl p-6 sm:p-8 text-white animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#ffd600]/20 text-[#ffd600] flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Tender Dossier Compiled</h4>
                  <span className="text-[11px] text-[#76c442] font-mono">Ready for Dispatch</span>
                </div>
              </div>
              <button
                onClick={() => setRfpModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#a8d5a8] leading-relaxed mb-4">
              Your scope details have been organized. Send directly to management via WhatsApp, Viber, or Email:
            </p>

            <pre className="p-3.5 rounded-xl bg-black/50 border border-white/10 text-[11px] font-mono text-[#ffd600] overflow-x-auto mb-6 whitespace-pre-wrap">
              {compiledRfpDossier}
            </pre>

            <div className="space-y-2.5">
              <a
                href={`https://wa.me/639165667265?text=${encodeURIComponent(compiledRfpDossier)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-[#25d366] text-white text-xs font-bold uppercase tracking-wider hover:brightness-110 flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Send via WhatsApp (+63 916 566 7265)</span>
              </a>

              <a
                href={`mailto:edluna1971@yahoo.com,iamfeluna@yahoo.com?subject=${encodeURIComponent(`[RFP] ${service} - ${name}`)}&body=${encodeURIComponent(compiledRfpDossier)}`}
                className="w-full py-3 rounded-xl bg-[#2e7d32] hover:bg-[#4caf50] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Send via Email Client</span>
              </a>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(compiledRfpDossier);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-[#76c442]" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copied to Clipboard!" : "Copy Dossier Text"}</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
