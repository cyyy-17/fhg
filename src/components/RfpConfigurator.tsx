"use client";

import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import confetti from "canvas-confetti";
import { Check, Send, AlertCircle, Users, Truck, Clock, ShieldCheck, Copy, MessageCircle, Mail, X, Shield } from "lucide-react";
import { companyData } from "@/data/company";

export default function RfpConfigurator() {
  const [service, setService] = useState("Tree Earthballing & Relocation");
  const [region, setRegion] = useState("Batangas / Region IV-A (Calabarzon)");
  const [volume, setVolume] = useState("1 to 10 trees / Initial site assessment");

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viberCopied, setViberCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and handle ESC key
  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalOpen]);


  // Dynamic Fleet Recommendations
  const recommendations: Record<string, string[]> = {
    "Tree Earthballing & Relocation": [
      "Heavy Crane 25T/50T Rigging",
      "Root Ball Trenching Crew",
      "Burlap & Wire Conditioning",
      "Boom Truck Transport",
    ],
    "Certified Chainsaw Tree Cutting (89 Units)": [
      "89-Chainsaw Permitted Operators",
      "Sectional Aerial Riggers",
      "High-Tension Powerline Protocol",
      "Timber Transport Flatbeds",
    ],
    "PCA Coconut Tree Cutting & Trading": [
      "PCA Permit Enforcement Team",
      "Coco-Lumber Sawmill Routing",
      "Heavy Winch Rigging Equipment",
    ],
    "DENR Tree Inventory & Risk Tagging": [
      "GPS Digital Mapping Team",
      "Caliper & Risk Level Census",
      "DENR Special Tree Cutting Dossier",
    ],
    "Native Seedling Nursery Supply": [
      "100K-Capacity Nursery Allocation",
      "Indurated Container Stock",
      "Compensatory Proof Certification",
    ],
    "Watershed Reforestation & NGP": [
      "Contour Planting Labor Force",
      "3-Year Firebreak Maintenance",
      "Site Seedling Mortality Buffer",
    ],
  };

  const activeRecommendations =
    recommendations[service] || recommendations["Tree Earthballing & Relocation"];

  // Real-time calculated deployment projections
  const calculations = useMemo(() => {
    let crew = "4–6 Certified Riggers & Sawyers";
    let machinery = "1x Crane / Boom Truck + 4x Chainsaws";
    let timeframe = "3–5 Working Days";
    let permitting = "CENRO STCP Pre-Survey Ready";

    if (volume.includes("11 to 50")) {
      crew = "8–14 Certified Personnel + 1 Safety Officer";
      machinery = "2x Heavy Boom Trucks + 8x Chainsaws + 1x Chipper";
      timeframe = "7–14 Working Days";
      permitting = "Full DENR STCP Clearance Dossier";
    } else if (volume.includes("51 to 200")) {
      crew = "16–28 Certified Personnel + 2 Safety Officers";
      machinery = "50T Crane + 4x Boom Trucks + 16x Chainsaws + Chippers";
      timeframe = "15–30 Working Days";
      permitting = "PENRO / Regional Director Special Tree Permit";
    } else if (volume.includes("200+")) {
      crew = "35–60 Certified Personnel (Staged Corridor Crews)";
      machinery = "Dedicated Multi-Crane Fleet + 30+ Heavy Chainsaws";
      timeframe = "Project Concession Phased Schedule";
      permitting = "Turnkey Infrastructure Priority STCP Clearance";
    } else if (volume.includes("seedlings")) {
      crew = "Nursery Propagation & Logistics Dispatch Team";
      machinery = "10,000L Water Tankers + Flatbed Seedling Haulers";
      timeframe = "Staggered Weekly Delivery Batches";
      permitting = "DENR Official Seedling Receipt & Offset Certificate";
    }

    return { crew, machinery, timeframe, permitting };
  }, [volume]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Please enter contact person name.";
    if (!company.trim()) newErrors.company = "Please enter company or developer name.";
    if (!phone.trim()) newErrors.phone = "Please enter contact phone number.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
    setModalOpen(true);

    // Tactile celebration
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ffd600", "#4caf50", "#76c442", "#ffffff"],
    });

    const subject = encodeURIComponent(`[FHG Project Assessment Request] ${company} - ${service}`);
    const body = encodeURIComponent(
      `Dear Forest Hills Garden Management,\n\n` +
      `We would like to request an official project assessment / proposal with the following parameters:\n\n` +
      `• Client/Contact Person: ${name}\n` +
      `• Company/Entity: ${company}\n` +
      `• Contact Number: ${phone}\n` +
      `• Email: ${email}\n` +
      `• Primary Service: ${service}\n` +
      `• Location / Region: ${region}\n` +
      `• Estimated Scope / Volume: ${volume}\n\n` +
      `• Projected Mobilization: ${calculations.crew} | ${calculations.machinery}\n` +
      `• Estimated Project Window: ${calculations.timeframe}\n` +
      `• Warranty Specification: 12-Month 100% Free Specimen Replacement\n\n` +
      `Please provide details on next steps, site inspection availability, and compliance requirements.\n\n` +
      `Thank you,\n${name} (${company})`
    );

    window.location.href = `mailto:edluna1971@yahoo.com?cc=iamfeluna@yahoo.com&subject=${subject}&body=${body}`;
  };

  const compiledRfp =
    `[FOREST HILLS GARDEN - RFP SPECIFICATION]\n` +
    `Client: ${name} (${company})\n` +
    `Contact: ${phone} | ${email}\n` +
    `Scope: ${service}\n` +
    `Region: ${region}\n` +
    `Estimated Volume: ${volume}\n` +
    `Mobilization Crew: ${calculations.crew}\n` +
    `Mobilization Machinery: ${calculations.machinery}\n` +
    `Projected Window: ${calculations.timeframe}\n` +
    `Warranty: 12-Month Post-Transplantation Free Specimen Replacement`;

  const handleCopy = () => {
    navigator.clipboard.writeText(compiledRfp);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };


  return (
    <section id="estimate" className="py-24 bg-[#030a04] relative z-20">
      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12">
        <div className="glass-panel rounded-3xl p-8 sm:p-14 border border-[#4caf50]/30 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Specification Column */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="inline-flex items-center self-start px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#76c442] bg-[#4caf50]/10 border border-[#4caf50]/20">
                Interactive Scope & RFP Builder
              </div>

              <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
                Configure Your Project Assessment
              </h2>

              <p className="text-base text-[#a8d5a8] leading-relaxed">
                Select required scopes and tree volume to generate a structured Request for Proposal (RFP). Our arbor engineers review parameters and return a formal technical quotation within 24–48 hours.
              </p>

              {/* Dynamic Fleet Recommendation Engine */}
              <div className="p-6 rounded-2xl bg-[#0a190d] border border-[#4caf50]/20">
                <span className="text-xs font-bold text-[#ffd600] uppercase tracking-wider block mb-3">
                  Recommended Mobilization Equipment:
                </span>
                <div className="flex flex-wrap gap-2 mb-4">
                  {activeRecommendations.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#2e7d32]/20 border border-[#4caf50]/30 text-[#f0fbf0]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Real-Time Calculated Mobilization Summary */}
                <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[#a8d5a8]">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#ffd600]" />
                      <span>Estimated Crew Size:</span>
                    </span>
                    <strong className="text-white">{calculations.crew}</strong>
                  </div>
                  <div className="flex items-center justify-between text-[#a8d5a8]">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-[#76c442]" />
                      <span>Equipment Fleet:</span>
                    </span>
                    <strong className="text-white text-right">{calculations.machinery}</strong>
                  </div>
                  <div className="flex items-center justify-between text-[#a8d5a8]">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#ffd600]" />
                      <span>Estimated Window:</span>
                    </span>
                    <strong className="text-white">{calculations.timeframe}</strong>
                  </div>
                  <div className="flex items-center justify-between text-[#a8d5a8]">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#76c442]" />
                      <span>Permitting Plan:</span>
                    </span>
                    <strong className="text-[#76c442]">{calculations.permitting}</strong>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2.5 text-sm text-[#f0fbf0]">
                  <Check className="w-4 h-4 text-[#ffd600]" />
                  <span>Free Initial Site Evaluation & Caliper Inspection</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-[#f0fbf0]">
                  <Check className="w-4 h-4 text-[#76c442]" />
                  <span>Turnkey DENR/CENRO/PCA Permitting Assistance</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-[#f0fbf0]">
                  <Check className="w-4 h-4 text-[#ffd600]" />
                  <span>Full Comprehensive Contractor's All-Risk & OSHA Compliance</span>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-6 bg-[#08150a]/90 rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-bold text-[#a8d5a8] uppercase tracking-wider mb-2">
                    Primary Required Service
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl form-input custom-select text-sm cursor-pointer"
                  >
                    <option value="Tree Earthballing & Relocation">Tree Earthballing & Relocation</option>
                    <option value="Certified Chainsaw Tree Cutting (89 Units)">Certified Chainsaw Tree Cutting (89 Units)</option>
                    <option value="PCA Coconut Tree Cutting & Trading">PCA Coconut Tree Cutting & Trading</option>
                    <option value="DENR Tree Inventory & Risk Tagging">DENR Tree Inventory & Risk Tagging</option>
                    <option value="Native Seedling Nursery Supply">Native Seedling Nursery Supply</option>
                    <option value="Watershed Reforestation & NGP">Watershed Reforestation & NGP</option>
                  </select>
                </div>

                {/* Location Selection */}
                <div>
                  <label className="block text-xs font-bold text-[#a8d5a8] uppercase tracking-wider mb-2">
                    Project Location / Region
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl form-input custom-select text-sm cursor-pointer"
                  >
                    <option value="Batangas / Region IV-A (Calabarzon)">Batangas / Region IV-A (Calabarzon)</option>
                    <option value="Metro Manila (NCR) / Railway Alignment">Metro Manila (NCR) / Railway Alignment</option>
                    <option value="Cavite / Laguna / Rizal / Quezon">Cavite / Laguna / Rizal / Quezon</option>
                    <option value="Central Luzon (Bulacan / Pampanga / Tarlac)">Central Luzon (Bulacan / Pampanga / Tarlac)</option>
                    <option value="Zambales / Northern Luzon Corridors">Zambales / Northern Luzon Corridors</option>
                    <option value="Visayas / Mindanao (Provincial)">Visayas / Mindanao (Provincial)</option>
                  </select>
                </div>

                {/* Scope Volume */}
                <div>
                  <label className="block text-xs font-bold text-[#a8d5a8] uppercase tracking-wider mb-2">
                    Estimated Scope / Quantity
                  </label>
                  <select
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl form-input custom-select text-sm cursor-pointer"
                  >
                    <option value="1 to 10 trees / Initial site assessment">1 to 10 trees / Initial site assessment</option>
                    <option value="11 to 50 trees / Medium development">11 to 50 trees / Medium development</option>
                    <option value="51 to 200 trees / Major commercial estate">51 to 200 trees / Major commercial estate</option>
                    <option value="200+ trees / Full right-of-way corridor">200+ trees / Full right-of-way corridor</option>
                    <option value="1,000 to 50,000+ seedlings / Compensatory nursery supply">1,000 to 50,000+ seedlings / Compensatory nursery supply</option>
                  </select>
                </div>

                {/* Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#a8d5a8] uppercase tracking-wider mb-2">
                      Contact Person / Engineer
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors({ ...errors, name: "" });
                      }}
                      placeholder="Engr. / Arch. / Manager Name"
                      className={`w-full px-4 py-3 rounded-xl form-input text-sm ${
                        errors.name ? "form-input-error" : ""
                      }`}
                    />
                    {errors.name && (
                      <span className="flex items-center gap-1 text-xs text-red-400 mt-1.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#a8d5a8] uppercase tracking-wider mb-2">
                      Company / Developer
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => {
                        setCompany(e.target.value);
                        if (errors.company) setErrors({ ...errors, company: "" });
                      }}
                      placeholder="e.g. San Miguel / Ayala / SM Prime"
                      className={`w-full px-4 py-3 rounded-xl form-input text-sm ${
                        errors.company ? "form-input-error" : ""
                      }`}
                    />
                    {errors.company && (
                      <span className="flex items-center gap-1 text-xs text-red-400 mt-1.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.company}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#a8d5a8] uppercase tracking-wider mb-2">
                      Phone / Mobile No.
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors({ ...errors, phone: "" });
                      }}
                      placeholder="0917 XXX XXXX"
                      className={`w-full px-4 py-3 rounded-xl form-input text-sm ${
                        errors.phone ? "form-input-error" : ""
                      }`}
                    />
                    {errors.phone && (
                      <span className="flex items-center gap-1 text-xs text-red-400 mt-1.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#a8d5a8] uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: "" });
                      }}
                      placeholder="name@company.com"
                      className={`w-full px-4 py-3 rounded-xl form-input text-sm ${
                        errors.email ? "form-input-error" : ""
                      }`}
                    />
                    {errors.email && (
                      <span className="flex items-center gap-1 text-xs text-red-400 mt-1.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Formal Survival Warranty Assurance */}
                <div className="p-3.5 rounded-xl bg-[#ffd600]/10 border border-[#ffd600]/30 flex items-center gap-3 mt-2">
                  <ShieldCheck className="w-5 h-5 text-[#ffd600] shrink-0" />
                  <div className="text-xs">
                    <strong className="text-white block">12-Month Tree Survival Warranty Included</strong>
                    <span className="text-forest-muted">100% free specimen replacement backed by our twin Batangas nurseries.</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-extrabold text-sm uppercase tracking-wider bg-linear-to-r from-[#ffd600] to-[#f9c923] text-[#061008] hover:brightness-110 shadow-xl shadow-[#ffd600]/20 flex items-center justify-center gap-2 hover:scale-[1.01] transition-all duration-200 cursor-pointer mt-4"
                >
                  <Send className="w-4 h-4" />
                  <span>Generate & Dispatch Official Proposal RFP</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* RFP Dispatch Modal */}
      {modalOpen && mounted && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-xl rounded-3xl bg-[#07170a] border border-[#ffd600]/40 shadow-2xl p-6 sm:p-8 text-white my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-[#ffd600] hover:text-[#050e07] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#ffd600]/20 flex items-center justify-center text-[#ffd600]">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-heading">RFP Specification Prepared</h3>
                <span className="text-xs text-[#76c442]">Direct submission ready</span>
              </div>
            </div>

            <p className="text-xs text-forest-muted mb-4">
              Your default email app was triggered. If your system did not launch a mail client, select an instant dispatch option below:
            </p>

            <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 font-mono text-xs text-[#ffd600] max-h-40 overflow-y-auto mb-5 whitespace-pre-wrap">
              {compiledRfp}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-[#76c442]" /> : <Copy className="w-4 h-4 text-[#ffd600]" />}
                <span>{copied ? "Copied Specification!" : "1-Click Copy RFP"}</span>
              </button>

              <a
                href={`https://wa.me/639165667265?text=${encodeURIComponent(compiledRfp)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#25d366] text-white hover:brightness-110 shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Forward via WhatsApp</span>
              </a>

              <a
                href="viber://chat?number=639165667265"
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.clipboard) {
                    navigator.clipboard.writeText(compiledRfp);
                    setViberCopied(true);
                    setTimeout(() => setViberCopied(false), 4000);
                  }
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#7360f2] text-white hover:brightness-110 shadow-lg transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{viberCopied ? "RFP Copied for Viber!" : "Forward via Viber"}</span>
              </a>

              <a
                href={`mailto:edluna1971@yahoo.com?cc=iamfeluna@yahoo.com&subject=${encodeURIComponent(`[FHG Project Assessment Request] ${company} - ${service}`)}&body=${encodeURIComponent(compiledRfp)}`}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#ffd600] text-[#050e07] hover:brightness-110 shadow-lg transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Retry Mail Client</span>
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}

