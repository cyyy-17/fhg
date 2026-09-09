"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, AlertCircle, Clock, Copy, Check, MessageCircle, ExternalLink, Navigation, X } from "lucide-react";
import { companyData } from "@/data/company";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useLenisScrollLock } from "@/hooks/useLenisScrollLock";

export default function ContactSection() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viberCopied, setViberCopied] = useState(false);
  const mounted = useIsMounted();

  useLenisScrollLock(modalOpen);

  // Handle ESC key
  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Silently drop bots
    if (honeypot) return;

    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = "Please enter your full name.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!phone.trim()) newErrors.phone = "Please enter your phone number.";
    if (!subject.trim()) newErrors.subject = "Please enter project subject or location.";
    if (!message.trim()) newErrors.message = "Please enter project details.";
    if (!consent) newErrors.consent = "You must consent to data processing under RA 10173 to submit.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          subject,
          message,
          consent,
          website: honeypot,
        }),
      });
    } catch {
      // Graceful fallback
    } finally {
      setIsSubmitting(false);
      setModalOpen(true);
    }
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
    <section id="contact" className="py-24 bg-[#060d07] relative z-20 border-t border-white/5">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c5a059] tracking-widest uppercase mb-3">
            <span>[ 08 / DIRECT CONTRACTOR ENGAGEMENT ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading text-[#f6f7f4] tracking-tight leading-tight">
            Initiate Project Coordination &amp; <br />
            <span className="font-editorial italic font-normal text-[#dfbe76]">
              Field Dispatch
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#9aa89b]">
            Direct lines to senior arboricultural project managers, heavy equipment dispatchers, and administrative compliance officers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Touchpoint Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Rapid Hazard & Typhoon Mobilization Notice */}
            <div className="rounded-xl bg-[#0a150c] p-5 border border-[#c5a059]/40 bg-radial from-[#c5a059]/5 to-transparent flex flex-col gap-2.5 shadow-lg">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#dfbe76]">
                    Rapid Hazard &amp; Storm Dispatch
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#9aa89b] bg-[#060d07] px-2 py-0.5 rounded border border-white/5">4–12h SLA</span>
              </div>
              <p className="text-xs text-[#9aa89b] leading-relaxed">
                Emergency sectional dismantling for fallen trees obstructing national expressways, high-voltage lines, and commercial estates across Luzon.
              </p>
              <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                <a
                  href="tel:09165667265"
                  className="flex-1 py-2 rounded-lg bg-[#c5a059] text-[#060d07] text-xs font-bold text-center hover:bg-[#dfbe76] transition-colors"
                >
                  Hotline: 0916 566 7265
                </a>
                <a
                  href="https://wa.me/639165667265?text=EMERGENCY%20DISPATCH:%20Tree%20hazard%20obstruction%20requiring%20immediate%20crew%20mobilization."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-[#25d366] text-white text-xs font-semibold flex items-center gap-1.5 hover:brightness-105 transition-all shrink-0"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            <a
              href="tel:0437410603"
              className="rounded-xl bg-[#0a150c] p-6 flex items-center gap-4 border border-white/10 group hover:border-[#c5a059]/40 transition-colors"
            >
              <div className="w-11 h-11 rounded-lg bg-[#060d07] border border-white/10 flex items-center justify-center text-[#c5a059] group-hover:border-[#c5a059]/50 transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#9aa89b] block">
                  Telefax / Landline Desk
                </span>
                <span className="text-base font-semibold text-[#f6f7f4] group-hover:text-[#dfbe76] transition-colors">
                  {companyData.headOffice.telefax}
                </span>
              </div>
            </a>

            {/* Mobile Dispatch + Viber / WhatsApp links */}
            <div className="rounded-xl bg-[#0a150c] p-6 border border-white/10 flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-lg bg-[#060d07] border border-white/10 flex items-center justify-center text-[#c5a059]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#9aa89b] block">
                    Mobile Operations Dispatch
                  </span>
                  <span className="text-sm font-semibold text-[#f6f7f4]">
                    {companyData.headOffice.mobiles.join(" • ")}
                  </span>
                </div>
              </div>
              <div className="pt-3 border-t border-white/10 flex flex-wrap gap-2">
                <a
                  href="https://wa.me/639165667265"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25d366]/15 text-[#25d366] hover:bg-[#25d366] hover:text-white text-xs font-semibold transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="viber://chat?number=639165667265"
                  onClick={() => {
                    if (typeof navigator !== "undefined" && navigator.clipboard) {
                      navigator.clipboard.writeText("+639165667265");
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-[#9aa89b] hover:text-[#f6f7f4] border border-white/10 text-xs font-semibold transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Viber</span>
                </a>
                <a
                  href="tel:09165667265"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-[#9aa89b] hover:text-[#f6f7f4] border border-white/10 text-xs font-semibold transition-colors"
                >
                  <span>Call 0916 566 7265</span>
                </a>
              </div>
            </div>

            <a
              href="mailto:edluna1971@yahoo.com?cc=iamfeluna@yahoo.com"
              className="rounded-xl bg-[#0a150c] p-6 flex items-center gap-4 border border-white/10 group hover:border-[#c5a059]/40 transition-colors"
            >
              <div className="w-11 h-11 rounded-lg bg-[#060d07] border border-white/10 flex items-center justify-center text-[#c5a059] group-hover:border-[#c5a059]/50 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#9aa89b] block">
                  Executive Email
                </span>
                <span className="text-sm font-semibold text-[#f6f7f4] group-hover:text-[#dfbe76] transition-colors">
                  {companyData.headOffice.emails.join(" / ")}
                </span>
              </div>
            </a>

            {/* Head Office Location with Waze & Google Maps */}
            <div className="rounded-xl bg-[#0a150c] p-6 border border-white/10 flex flex-col gap-3">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-[#060d07] border border-white/10 flex items-center justify-center text-[#c5a059] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#9aa89b] block">
                      Head Office &amp; Administration
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#060d07] text-[#dfbe76] border border-white/10">
                      8:00 AM – 5:00 PM
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-[#f6f7f4] block">
                    {companyData.headOffice.address}
                  </span>
                  <span className="text-[11px] font-mono text-[#9aa89b] block mt-0.5">
                    Plus Code: {companyData.headOffice.plusCode}
                  </span>
                </div>
              </div>
              <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                <a
                  href={companyData.headOffice.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-[#f6f7f4] border border-white/10 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Waze</span>
                </a>
                <a
                  href={companyData.headOffice.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-[#f6f7f4] border border-white/10 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Google Maps</span>
                </a>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#0a150c] border border-white/10 flex items-center gap-3 text-xs text-[#9aa89b]">
              <Clock className="w-4 h-4 text-[#c5a059] shrink-0" />
              <span>Operations Active: 8:00 AM – 5:00 PM (Mon–Sat) • Field &amp; Arboricultural Dispatch</span>
            </div>
          </div>

          {/* Right Direct Inquiry Form */}
          <div className="lg:col-span-7 rounded-2xl bg-[#0a150c] p-8 sm:p-10 border border-white/10 shadow-2xl">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#f6f7f4] mb-2">
              Send a Project Inquiry
            </h3>
            <p className="text-xs sm:text-sm text-[#9aa89b] mb-6">
              Inquiries are processed directly by our Batangas operations desk within official business hours.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Anti-bot Honeypot */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#9aa89b] uppercase tracking-wider mb-1.5">
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
                    className={`w-full px-3.5 py-2.5 rounded-lg form-input text-xs ${
                      errors.fullName ? "form-input-error" : ""
                    }`}
                  />
                  {errors.fullName && (
                    <span className="flex items-center gap-1 text-[11px] text-red-400 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.fullName}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#9aa89b] uppercase tracking-wider mb-1.5">
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
                    className={`w-full px-3.5 py-2.5 rounded-lg form-input text-xs ${
                      errors.email ? "form-input-error" : ""
                    }`}
                  />
                  {errors.email && (
                    <span className="flex items-center gap-1 text-[11px] text-red-400 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#9aa89b] uppercase tracking-wider mb-1.5">
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
                    className={`w-full px-3.5 py-2.5 rounded-lg form-input text-xs ${
                      errors.phone ? "form-input-error" : ""
                    }`}
                  />
                  {errors.phone && (
                    <span className="flex items-center gap-1 text-[11px] text-red-400 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.phone}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#9aa89b] uppercase tracking-wider mb-1.5">
                    Project Subject / Scope
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                      if (errors.subject) setErrors({ ...errors, subject: "" });
                    }}
                    placeholder="e.g. Expressway Tree Cutting Tender"
                    className={`w-full px-3.5 py-2.5 rounded-lg form-input text-xs ${
                      errors.subject ? "form-input-error" : ""
                    }`}
                  />
                  {errors.subject && (
                    <span className="flex items-center gap-1 text-[11px] text-red-400 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.subject}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#9aa89b] uppercase tracking-wider mb-1.5">
                  Project Details &amp; Requirements
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors({ ...errors, message: "" });
                  }}
                  placeholder="Describe project location, estimated tree count, target start date, and any DENR permitting status..."
                  className={`w-full px-3.5 py-2.5 rounded-lg form-input text-xs resize-none ${
                    errors.message ? "form-input-error" : ""
                  }`}
                />
                {errors.message && (
                  <span className="flex items-center gap-1 text-[11px] text-red-400 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Data Privacy Consent (RA 10173) */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      if (errors.consent) setErrors({ ...errors, consent: "" });
                    }}
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-[#060d07] text-[#c5a059] focus:ring-[#c5a059] focus:ring-offset-0 cursor-pointer shrink-0"
                  />
                  <span className="text-xs text-[#9aa89b] leading-relaxed">
                    I consent to Forest Hills Garden processing my contact details in accordance with Republic Act No. 10173 (
                    <a
                      href="/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#dfbe76] underline hover:text-white transition-colors"
                    >
                      Data Privacy Policy
                    </a>
                    ).
                  </span>
                </label>
                {errors.consent && (
                  <span className="flex items-center gap-1 text-[11px] text-red-400 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.consent}
                  </span>
                )}
              </div>

              <p className="text-[11px] text-[#9aa89b]/70">
                Your data is used solely to evaluate and respond to your inquiry. No information is disclosed to third parties.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-lg font-semibold text-xs uppercase tracking-wider bg-[#c5a059] hover:bg-[#dfbe76] text-[#060d07] shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "Dispatching..." : "Compile & Dispatch Inquiry"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {modalOpen && mounted && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-fadeInSimple"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl bg-[#0a150c] border border-white/15 shadow-2xl p-6 sm:p-8 text-[#f6f7f4] my-auto animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-[#9aa89b] hover:text-[#f6f7f4] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#c5a059]/20 flex items-center justify-center text-[#dfbe76]">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-heading">Inquiry Dossier Compiled</h3>
                <span className="text-xs text-[#9aa89b] font-mono">Ready for instant dispatch</span>
              </div>
            </div>

            <p className="text-xs text-[#9aa89b] mb-4">
              Your inquiry dossier is ready. Choose your preferred dispatch channel:
            </p>

            <pre className="p-3.5 rounded-lg bg-[#060d07] border border-white/10 font-mono text-xs text-[#dfbe76] max-h-36 overflow-y-auto mb-5 whitespace-pre-wrap">
              {compiledInquiry}
            </pre>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-xs uppercase tracking-wider bg-white/5 hover:bg-white/10 border border-white/10 text-[#f6f7f4] transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-[#c5a059]" /> : <Copy className="w-4 h-4 text-[#c5a059]" />}
                <span>{copied ? "Copied!" : "Copy Text"}</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-xs uppercase tracking-wider bg-[#25d366] text-white hover:brightness-105 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp</span>
              </a>

              <a
                href="viber://chat?number=639165667265"
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.clipboard) {
                    navigator.clipboard.writeText(compiledInquiry);
                    setViberCopied(true);
                    setTimeout(() => setViberCopied(false), 4000);
                  }
                }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-xs uppercase tracking-wider bg-white/5 hover:bg-white/10 border border-white/10 text-[#f6f7f4] transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{viberCopied ? "Copied for Viber!" : "Send via Viber"}</span>
              </a>

              <a
                href={`mailto:edluna1971@yahoo.com?cc=iamfeluna@yahoo.com&subject=${encodeURIComponent(`[Website Inquiry] ${subject}`)}&body=${encodeURIComponent(compiledInquiry)}`}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-xs uppercase tracking-wider bg-[#c5a059] text-[#060d07] hover:bg-[#dfbe76] shadow-md transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Email Client</span>
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
