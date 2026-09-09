"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  Send,
  ShieldCheck,
  X,
  FileText,
  MessageCircle,
  Mail,
  Copy,
  Check,
} from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useLenisScrollLock } from "@/hooks/useLenisScrollLock";

export default function ProcurementEstimatorTab() {
  const [service, setService] = useState("Tree Earthballing & Relocation");
  const [region, setRegion] = useState("Batangas / Region IV-A (Calabarzon)");
  const [volume, setVolume] = useState("1 to 10 trees / Initial assessment");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [rfpModalOpen, setRfpModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mounted = useIsMounted();
  useLenisScrollLock(rfpModalOpen);

  useEffect(() => {
    if (!rfpModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setRfpModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [rfpModalOpen]);

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

  const handleRfpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Bot trap
    if (honeypot) return;

    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Please enter your name.";
    if (!phone.trim()) newErrors.phone = "Please enter your phone number.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!consent) {
      newErrors.consent = "You must consent to data processing under RA 10173 to proceed.";
    }

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
          fullName: name,
          company,
          phone,
          email,
          subject: `[RFP] ${service} - ${region}`,
          message: `Scope: ${volume}`,
          consent,
          website: honeypot,
        }),
      });
    } catch {
      // Graceful fallback to client-side modal
    } finally {
      setIsSubmitting(false);
      setRfpModalOpen(true);
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className="rounded-2xl p-6 sm:p-10 bg-[#0a150c] border border-white/10 shadow-2xl animate-fadeIn max-w-5xl mx-auto">
      <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#dfbe76] font-semibold block mb-1">
            Step 1 of 2: Technical Project Scope
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#f6f7f4]">
            Commercial Tender &amp; Mobilization Estimator
          </h3>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-[#dfbe76] bg-[#060d07] px-3 py-1 rounded border border-white/10">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>Instant Mobilization SLA</span>
        </span>
      </div>

      <form onSubmit={handleRfpSubmit} className="space-y-6">
        {/* Anti-bot honeypot */}
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Service Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#f6f7f4]">
              Service Required
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full p-3 rounded-lg form-input custom-select text-xs cursor-pointer"
            >
              <option value="Tree Earthballing & Relocation" className="bg-[#0a150c]">
                Tree Earthballing &amp; Relocation
              </option>
              <option value="Certified Chainsaw Tree Cutting (90 Units)" className="bg-[#0a150c]">
                Chainsaw Tree Cutting (90 Saws)
              </option>
              <option value="PCA Coconut Tree Cutting & Trading" className="bg-[#0a150c]">
                PCA Coconut Tree Removal
              </option>
              <option value="Tree Inventory, Calipering & DENR Permitting" className="bg-[#0a150c]">
                Tree Census &amp; GPS Tagging
              </option>
              <option value="Compensatory Seedling Supply & Delivery" className="bg-[#0a150c]">
                Compensatory Nursery Seedlings
              </option>
              <option value="Watershed Reforestation & Greening" className="bg-[#0a150c]">
                Watershed Reforestation
              </option>
            </select>
          </div>

          {/* Region Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#f6f7f4]">
              Project Region / Corridor
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full p-3 rounded-lg form-input custom-select text-xs cursor-pointer"
            >
              <option value="Batangas / Region IV-A (Calabarzon)" className="bg-[#0a150c]">
                Batangas / Region IV-A (Calabarzon)
              </option>
              <option value="Metro Manila (NCR)" className="bg-[#0a150c]">
                Metro Manila (NCR)
              </option>
              <option value="Cavite / Laguna / Rizal / Quezon" className="bg-[#0a150c]">
                Cavite / Laguna / Rizal / Quezon
              </option>
              <option value="Central Luzon (Bulacan / Pampanga)" className="bg-[#0a150c]">
                Central Luzon (Bulacan / Pampanga)
              </option>
              <option value="National / Inter-Island" className="bg-[#0a150c]">
                National / Inter-Island
              </option>
            </select>
          </div>

          {/* Volume Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#f6f7f4]">
              Estimated Tree Volume
            </label>
            <select
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="w-full p-3 rounded-lg form-input custom-select text-xs cursor-pointer"
            >
              <option value="1 to 10 trees / Initial assessment" className="bg-[#0a150c]">
                1 to 10 trees (Initial Site Assessment)
              </option>
              <option value="11 to 50 trees / Commercial lot" className="bg-[#0a150c]">
                11 to 50 trees (Commercial Lot)
              </option>
              <option value="51 to 200 trees / Highway corridor" className="bg-[#0a150c]">
                51 to 200 trees (Highway Corridor)
              </option>
              <option value="200+ trees / Mega concession" className="bg-[#0a150c]">
                200+ trees (Concession / Mining)
              </option>
            </select>
          </div>
        </div>

        {/* Client Contact Inputs */}
        <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#9aa89b]">
              Your Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: "" });
              }}
              placeholder="Engr. Juan Dela Cruz"
              className="w-full p-3 rounded-lg form-input text-xs"
            />
            {errors.name && <span className="text-[10px] text-red-400">{errors.name}</span>}
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#9aa89b]">
              Company / Entity
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="General Contractor"
              className="w-full p-3 rounded-lg form-input text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#9aa89b]">
              Contact Phone *
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors({ ...errors, phone: "" });
              }}
              placeholder="0916 566 7265"
              className="w-full p-3 rounded-lg form-input text-xs"
            />
            {errors.phone && <span className="text-[10px] text-red-400">{errors.phone}</span>}
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#9aa89b]">
              Official Email *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              placeholder="procurement@corp.com"
              className="w-full p-3 rounded-lg form-input text-xs"
            />
            {errors.email && <span className="text-[10px] text-red-400">{errors.email}</span>}
          </div>
        </div>

        {/* Data Privacy Consent (RA 10173) */}
        <div className="pt-3 border-t border-white/10 space-y-2">
          <label className="flex items-start gap-3 cursor-pointer select-none">
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
              I consent to Forest Hills Garden processing my contact details for this project assessment in accordance with Republic Act No. 10173 (
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
            <span className="text-[10px] text-red-400 block">{errors.consent}</span>
          )}
          <p className="text-[11px] text-[#9aa89b]/70 italic">
            *Projections and mobilization heuristics are non-binding estimates subject to formal site inspection and our{" "}
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#dfbe76] underline hover:text-white transition-colors"
            >
              Terms of Use &amp; Disclaimers
            </a>
            .
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#9aa89b]">
            <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
            <span>PhilGEPS Blue Member &amp; DTI 1729753 Verified Contractor</span>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#c5a059] hover:bg-[#dfbe76] text-[#060d07] text-xs font-semibold uppercase tracking-wider shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? "Submitting..." : "Generate Tender Dossier"}</span>
          </button>
        </div>
      </form>

      {/* RFP SUBMISSION CELEBRATION MODAL */}
      {rfpModalOpen && mounted && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-fadeInSimple"
          onClick={() => setRfpModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl bg-[#0a150c] border border-white/15 shadow-2xl p-6 sm:p-8 text-[#f6f7f4] animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#c5a059]/20 text-[#dfbe76] flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#f6f7f4]">Tender Dossier Compiled</h4>
                  <span className="text-[11px] text-[#9aa89b] font-mono">Ready for Instant Dispatch</span>
                </div>
              </div>
              <button
                onClick={() => setRfpModalOpen(false)}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-[#9aa89b] hover:text-[#f6f7f4] flex items-center justify-center cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#9aa89b] leading-relaxed mb-4">
              Your project parameters have been structured. Dispatch directly to FHG administration via WhatsApp, Email, or Print:
            </p>

            <pre className="p-3.5 rounded-lg bg-[#060d07] border border-white/10 text-[11px] font-mono text-[#dfbe76] overflow-x-auto mb-6 whitespace-pre-wrap">
              {compiledRfpDossier}
            </pre>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  const printWindow = window.open("", "_blank");
                  if (printWindow) {
                    printWindow.document.write(`
                      <!DOCTYPE html>
                      <html>
                        <head>
                          <title>Forest Hills Garden - RFP Specification Dossier</title>
                          <style>
                            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #111; line-height: 1.5; }
                            .header { border-bottom: 2px solid #c5a059; padding-bottom: 15px; margin-bottom: 25px; }
                            h1 { color: #060d07; margin: 0 0 5px 0; font-size: 24px; letter-spacing: 0.05em; }
                            .sub { color: #555; font-size: 13px; }
                            .box { background: #fbfbfa; border: 1px solid #ddd; border-radius: 6px; padding: 20px; font-family: monospace; font-size: 13px; white-space: pre-wrap; margin-bottom: 25px; }
                            .footer { border-top: 1px solid #ddd; padding-top: 15px; font-size: 11px; color: #777; }
                          </style>
                        </head>
                        <body>
                          <div class="header">
                            <h1>FOREST HILLS GARDEN</h1>
                            <div class="sub">Industrial Tree Earthballing, Precision Chainsaw Felling &amp; Batangas Plant Nurseries • Est. 1998</div>
                            <div class="sub">Sitio Sto. Niño, Banga, Talisay, Batangas • DTI Reg. 1729753 (Valid to 2030) • PhilGEPS 2005-23340</div>
                          </div>
                          <div class="box">${compiledRfpDossier.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
                          <div class="footer">
                            <p><strong>Notice:</strong> This project specification dossier represents a preliminary engineering inquiry for procurement planning. Formal binding quotations require on-site tree caliper assessment and signed Purchase Order. Warranty terms: 12-Month Post-Transplantation 100% Free Specimen Replacement.</p>
                            <p>Forest Hills Garden Administration Desk • Telefax: (043) 741 0603 • Mobile: 0916 566 7265 • Email: edluna1971@yahoo.com</p>
                          </div>
                          <script>window.onload = function() { window.print(); };</script>
                        </body>
                      </html>
                    `);
                    printWindow.document.close();
                  }
                }}
                className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#f6f7f4] border border-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#c5a059]" />
                <span>Print / Save as PDF Quotation Sheet</span>
              </button>

              <a
                href={`https://wa.me/639165667265?text=${encodeURIComponent(compiledRfpDossier)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-lg bg-[#25d366] text-white text-xs font-semibold uppercase tracking-wider hover:brightness-105 flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Send via WhatsApp (+63 916 566 7265)</span>
              </a>

              <a
                href={`mailto:edluna1971@yahoo.com,iamfeluna@yahoo.com?subject=${encodeURIComponent(`[RFP] ${service} - ${name}`)}&body=${encodeURIComponent(compiledRfpDossier)}`}
                className="w-full py-3 rounded-lg bg-[#060d07] hover:bg-[#122014] text-[#f6f7f4] border border-white/10 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <Mail className="w-4 h-4 text-[#c5a059]" />
                <span>Send via Email Client</span>
              </a>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(compiledRfpDossier);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#9aa89b] hover:text-[#f6f7f4] border border-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-[#c5a059]" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copied to Clipboard!" : "Copy Dossier Text"}</span>
              </button>
            </div>

            <p className="text-[11px] text-[#9aa89b]/70 text-center mt-3">
              No desktop email app? Click &ldquo;Copy Dossier Text&rdquo; and email directly to <strong className="text-[#f6f7f4]">edluna1971@yahoo.com</strong>
            </p>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
