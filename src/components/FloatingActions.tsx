"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Phone, Download, X, ChevronUp } from "lucide-react";

export default function FloatingActions() {
  const [expanded, setExpanded] = useState(false);
  const [viberCopied, setViberCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { duration?: number }) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.25 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleViberClick = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("+639165667265");
      setViberCopied(true);
      setTimeout(() => setViberCopied(false), 3000);
    }
  };

  return (
    <div id="floating-actions" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 no-print flex flex-col items-end gap-2.5">
      {/* Smooth Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-9 h-9 rounded-lg bg-[#0a150c] hover:bg-[#122014] border border-white/10 hover:border-[#c5a059]/50 text-[#dfbe76] flex items-center justify-center shadow-lg transition-colors animate-fadeIn cursor-pointer"
          aria-label="Smooth scroll to top"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      )}

      {/* Expanded Quick Dial Menu */}
      {expanded && (
        <div className="flex flex-col gap-2 mb-1 animate-scaleIn items-end">
          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/639165667265?text=Hello%20Forest%20Hills%20Garden,%20we%20have%20an%20inquiry%20regarding%20tree%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25d366] text-white text-xs font-semibold shadow-xl hover:brightness-105 transition-all"
            aria-label="WhatsApp Dispatch"
          >
            <span>WhatsApp Dispatch</span>
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
          </a>

          {/* Viber Direct */}
          <a
            href="viber://chat?number=639165667265"
            onClick={handleViberClick}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#7360f2] text-white text-xs font-semibold shadow-xl hover:brightness-105 transition-all"
            aria-label="Viber Operations"
          >
            <span>{viberCopied ? "Viber (+63 916 566 7265) Copied!" : "Viber Hotline"}</span>
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
          </a>

          {/* Direct Phone Call */}
          <a
            href="tel:09165667265"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0a150c] text-[#f6f7f4] border border-white/10 hover:border-[#c5a059]/50 text-xs font-semibold shadow-xl transition-colors"
            aria-label="Call Mobile Dispatch"
          >
            <span>Call 0916 566 7265</span>
            <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
          </a>

          {/* Download Official Company Profile PDF */}
          <a
            href="/docs/company-profile.pdf"
            download
            rel="noopener"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#c5a059] text-[#060d07] text-xs font-semibold uppercase tracking-wider shadow-xl hover:bg-[#dfbe76] transition-colors cursor-pointer"
            aria-label="Download Official Company Profile PDF"
          >
            <span>Download Company Dossier (PDF)</span>
            <Download className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-12 h-12 rounded-xl bg-[#c5a059] hover:bg-[#dfbe76] text-[#060d07] flex items-center justify-center shadow-2xl transition-colors border border-black/20 cursor-pointer group"
        aria-label={expanded ? "Close Quick Actions" : "Open Quick Contact"}
      >
        {expanded ? (
          <X className="w-5 h-5" />
        ) : (
          <MessageCircle className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
