"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Phone, Mail, MapPin, Send, AlertCircle, Clock, Copy, Check, MessageCircle, ExternalLink, Navigation, X } from "lucide-react";
import { companyData } from "@/data/company";

export default function ContactSection() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
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

  const compiledInquiry =
    `[FOREST HILLS GARDEN - INQUIRY DOSSIER]\n` +
    `Client/Contact: ${fullName}\n` +
    `Email: ${email}\n` +
    `Phone: ${phone}\n` +
    `Subject/Location: ${subject}\n\n` +
    `Project Requirements:\n${message}\n\n` +
    `Target Recipient: edluna1971@yahoo.com / iamfeluna@yahoo.com`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = "Please enter your full name.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!phone.trim()) newErrors.phone = "Please enter your phone number.";
    if (!subject.trim()) newErrors.subject = "Please enter project subject or location.";
    if (!message.trim()) newErrors.message = "Please enter project details.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setModalOpen(true);

    // Also attempt mailto launch
    const emailSubject = encodeURIComponent(`[Website Inquiry] ${subject}`);
    const emailBody = encodeURIComponent(
      `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:edluna1971@yahoo.com?cc=iamfeluna@yahoo.com&subject=${emailSubject}&body=${emailBody}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(compiledInquiry);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const whatsappUrl = `https://wa.me/639165667265?text=${encodeURIComponent(
    `Hello Forest Hills Garden, this is ${fullName} regarding ${subject}.\n${message}`
  )}`;

  return (
    <section id="contact" className="py-24 bg-[#050e07] relative z-20">
      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#76c442] bg-[#4caf50]/10 border border-[#4caf50]/20 mb-4">
            Operations & Inquiries Desk
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
            Initiate Project Coordination
          </h2>
          <p className="mt-4 text-base sm:text-lg text-forest-muted">
            Direct lines to senior arboricultural project managers, heavy equipment dispatchers, and administrative compliance officers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Touchpoint Cards */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <a
              href="tel:0437410603"
              className="glass-panel glass-panel-hover rounded-2xl p-6 flex items-center gap-5 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#2e7d32]/20 border border-[#4caf50]/30 flex items-center justify-center text-[#76c442] group-hover:scale-110 group-hover:bg-[#2e7d32] group-hover:text-white transition-all">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#ffd600] uppercase tracking-wider block">
                  Telefax / Landline Desk
                </span>
                <span className="text-base font-bold text-white group-hover:text-[#ffd600] transition-colors">
                  {companyData.headOffice.telefax}
                </span>
              </div>
            </a>

            {/* Mobile Dispatch + Viber / WhatsApp links */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col gap-3">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-[#2e7d32]/20 border border-[#4caf50]/30 flex items-center justify-center text-[#76c442]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#ffd600] uppercase tracking-wider block">
                    Mobile Operations Dispatch
                  </span>
                  <span className="text-base font-bold text-white">
                    {companyData.headOffice.mobiles.join(" • ")}
                  </span>
                </div>
              </div>
              <div className="pt-3 border-t border-white/10 flex flex-wrap gap-2">
                <a
                  href="https://wa.me/639165667265"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25d366]/20 text-[#25d366] hover:bg-[#25d366] hover:text-white text-xs font-bold transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="viber://chat?number=%2B639165667265"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#7360f2]/20 text-[#a899ff] hover:bg-[#7360f2] hover:text-white text-xs font-bold transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Viber</span>
                </a>
                <a
                  href="tel:09165667265"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white hover:bg-[#2e7d32] text-xs font-bold transition-colors"
                >
                  <span>Call 0916 566 7265</span>
                </a>
              </div>
            </div>

            <a
              href="mailto:edluna1971@yahoo.com?cc=iamfeluna@yahoo.com"
              className="glass-panel glass-panel-hover rounded-2xl p-6 flex items-center gap-5 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#2e7d32]/20 border border-[#4caf50]/30 flex items-center justify-center text-[#76c442] group-hover:scale-110 group-hover:bg-[#2e7d32] group-hover:text-white transition-all">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#ffd600] uppercase tracking-wider block">
                  Executive Email
                </span>
                <span className="text-sm font-bold text-white group-hover:text-[#ffd600] transition-colors">
                  {companyData.headOffice.emails.join(" / ")}
                </span>
              </div>
            </a>

            {/* Head Office Location with Waze & Google Maps */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col gap-3">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#2e7d32]/20 border border-[#4caf50]/30 flex items-center justify-center text-[#76c442] shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold text-[#ffd600] uppercase tracking-wider block">
                      Head Office & Administration
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#76c442]/20 text-[#76c442]">
                      Open 24 Hours
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white block">
                    {companyData.headOffice.address}
                  </span>
                  <span className="text-[11px] font-mono text-[#a8d5a8] block mt-0.5">
                    Plus Code: {companyData.headOffice.plusCode} • Agricultural Service
                  </span>
                </div>
              </div>
              <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                <a
                  href={companyData.headOffice.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-[#33ccff] hover:text-[#050e07] text-xs font-bold text-white transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Waze Navigation</span>
                </a>
                <a
                  href={companyData.headOffice.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-[#4285f4] hover:text-white text-xs font-bold text-white transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </a>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3 text-xs text-forest-muted">
              <Clock className="w-4 h-4 text-[#ffd600] shrink-0" />
              <span>Operations Active: Open 24 Hours • 24/7 Dispatch & Arboricultural Operations</span>
            </div>

          </div>

          {/* Right Direct Inquiry Form */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-8 sm:p-12 border border-[#4caf50]/30 shadow-2xl">
            <h3 className="text-2xl font-bold font-heading text-white mb-2">
              Send Us a Direct Message
            </h3>
            <p className="text-sm text-forest-muted mb-8">
              We reply promptly during active operations hours with verified project feasibility advice.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-forest-muted uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: "" });
                    }}
                    placeholder="e.g. Engr. Juan Dela Cruz"
                    className={`w-full px-4 py-3 rounded-xl form-input text-sm ${
                      errors.fullName ? "form-input-error" : ""
                    }`}
                  />
                  {errors.fullName && (
                    <span className="flex items-center gap-1 text-xs text-red-400 mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.fullName}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-forest-muted uppercase tracking-wider mb-2">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-forest-muted uppercase tracking-wider mb-2">
                    Contact Phone Number
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
                  <label className="block text-xs font-bold text-forest-muted uppercase tracking-wider mb-2">
                    Project Subject / Scope
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                      if (errors.subject) setErrors({ ...errors, subject: "" });
                    }}
                    placeholder="e.g. SLEX TR4 Tree Cutting Tender"
                    className={`w-full px-4 py-3 rounded-xl form-input text-sm ${
                      errors.subject ? "form-input-error" : ""
                    }`}
                  />
                  {errors.subject && (
                    <span className="flex items-center gap-1 text-xs text-red-400 mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.subject}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-muted uppercase tracking-wider mb-2">
                  Project Details & Requirements
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors({ ...errors, message: "" });
                  }}
                  placeholder="Describe project location, estimated tree count, target start date, and any DENR permitting status..."
                  className={`w-full px-4 py-3 rounded-xl form-input text-sm resize-none ${
                    errors.message ? "form-input-error" : ""
                  }`}
                />
                {errors.message && (
                  <span className="flex items-center gap-1 text-xs text-red-400 mt-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl font-extrabold text-sm uppercase tracking-wider bg-linear-to-r from-[#2e7d32] to-[#1a5c1a] text-white hover:brightness-110 shadow-xl border border-[#4caf50]/40 flex items-center justify-center gap-2 hover:scale-[1.01] transition-all duration-200 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Compile & Dispatch Inquiry</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Confirmation & Multi-Channel Dispatch Modal */}
      {modalOpen && mounted && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-xl rounded-3xl bg-[#07170a] border border-[#4caf50]/40 shadow-2xl p-6 sm:p-8 text-white my-auto"
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
                <h3 className="text-xl font-bold font-heading">Inquiry Dossier Compiled</h3>
                <span className="text-xs text-[#76c442]">Ready for instant dispatch</span>
              </div>
            </div>

            <p className="text-xs text-forest-muted mb-4">
              Your default email client was triggered. If no mail program opened automatically, use the multi-channel dispatch options below:
            </p>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-[#a8d5a8] max-h-36 overflow-y-auto mb-5 whitespace-pre-wrap">
              {compiledInquiry}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-[#76c442]" /> : <Copy className="w-4 h-4 text-[#ffd600]" />}
                <span>{copied ? "Copied to Clipboard!" : "Copy Inquiry Text"}</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#25d366] text-white hover:brightness-110 shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Send via WhatsApp</span>
              </a>

              <a
                href={`viber://chat?number=%2B639165667265`}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#7360f2] text-white hover:brightness-110 shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Send via Viber</span>
              </a>

              <a
                href={`mailto:edluna1971@yahoo.com?cc=iamfeluna@yahoo.com&subject=${encodeURIComponent(`[Website Inquiry] ${subject}`)}&body=${encodeURIComponent(compiledInquiry)}`}
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
