"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { Check, Send, AlertCircle } from "lucide-react";

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
      `Please provide details on next steps, site inspection availability, and compliance requirements.\n\n` +
      `Thank you,\n${name} (${company})`
    );

    window.location.href = `mailto:edluna1971@yahoo.com?cc=iamfeluna@yahoo.com&subject=${subject}&body=${body}`;
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
                Select your required scopes and tree volume to generate a structured Request for Proposal (RFP). Our arbor engineers review parameters and return a formal technical quotation within 24–48 hours.
              </p>

              {/* Dynamic Fleet Recommendation Engine */}
              <div className="p-6 rounded-2xl bg-[#0a190d] border border-[#4caf50]/20">
                <span className="text-xs font-bold text-[#ffd600] uppercase tracking-wider block mb-3">
                  Recommended Mobilization Plan:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeRecommendations.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#2e7d32]/20 border border-[#4caf50]/30 text-[#f0fbf0]"
                    >
                      {tag}
                    </span>
                  ))}
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

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-extrabold text-sm uppercase tracking-wider bg-linear-to-r from-[#ffd600] to-[#f9c923] text-[#061008] hover:brightness-110 shadow-xl shadow-[#ffd600]/20 flex items-center justify-center gap-2 hover:scale-[1.01] transition-all duration-200 cursor-pointer mt-4"
                >
                  <Send className="w-4 h-4" />
                  <span>Generate Official Proposal RFP</span>
                </button>
              </form>

              {submitted && (
                <div className="mt-4 p-4 rounded-xl bg-[#4caf50]/20 border border-[#76c442]/40 text-center text-xs text-[#f0fbf0]">
                  Proposal generated! Mail client opened with pre-filled technical parameters.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
