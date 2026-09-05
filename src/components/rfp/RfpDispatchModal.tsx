"use client";

import { createPortal } from "react-dom";
import { Check, X, Copy, MessageCircle, Mail } from "lucide-react";

interface RfpDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  mounted: boolean;
  compiledRfp: string;
  company: string;
  service: string;
  copied: boolean;
  onCopy: () => void;
  viberCopied: boolean;
  onViberClick: () => void;
}

export default function RfpDispatchModal({
  isOpen,
  onClose,
  mounted,
  compiledRfp,
  company,
  service,
  copied,
  onCopy,
  viberCopied,
  onViberClick,
}: RfpDispatchModalProps) {
  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeInSimple"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-3xl bg-[#07170a] border border-[#ffd600]/40 shadow-2xl p-6 sm:p-8 text-white my-auto animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
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
            onClick={onCopy}
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

          <button
            type="button"
            onClick={onViberClick}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#7360f2] text-white hover:brightness-110 shadow-lg transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>{viberCopied ? "RFP Copied for Viber!" : "Forward via Viber"}</span>
          </button>

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
  );
}
