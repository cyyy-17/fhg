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
    window.addEventListener("scroll", handleScroll, { passive: true });
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
    <div id="floating-actions" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 no-print flex flex-col items-end gap-3">
      {/* Smooth Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-[#0a1b0d]/90 hover:bg-[#2e7d32] border border-[#4caf50]/40 text-white flex items-center justify-center shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 animate-fadeIn cursor-pointer"
          aria-label="Smooth scroll to top"
        >
          <ChevronUp className="w-5 h-5 text-[#ffd600]" />
        </button>
      )}

      {/* Expanded Quick Dial Menu */}
      {expanded && (
        <div className="flex flex-col gap-2.5 mb-1 animate-scaleIn items-end">
          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/639165667265?text=Hello%20Forest%20Hills%20Garden,%20we%20have%20an%20inquiry%20regarding%20tree%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#25d366] text-white text-xs font-bold shadow-xl hover:scale-105 transition-transform"
            aria-label="WhatsApp Dispatch"
          >
            <span>WhatsApp Quick Dispatch</span>
            <MessageCircle className="w-4 h-4 fill-white" />
          </a>

          {/* Viber Direct */}
          <a
            href="viber://chat?number=639165667265"
            onClick={handleViberClick}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#7360f2] text-white text-xs font-bold shadow-xl hover:scale-105 transition-transform"
            aria-label="Viber Operations"
          >
            <span>{viberCopied ? "Viber (+63 916 566 7265) Copied!" : "Viber Commercial Operations"}</span>
            <MessageCircle className="w-4 h-4 fill-white" />
          </a>

          {/* Direct Phone Call */}
          <a
            href="tel:09165667265"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#2e7d32] text-white text-xs font-bold shadow-xl hover:scale-105 transition-transform"
            aria-label="Call Mobile Dispatch"
          >
            <span>Emergency Mobile Dispatch</span>
            <Phone className="w-4 h-4" />
          </a>

          {/* Download Official Company Profile PDF */}
          <a
            href="/docs/company-profile.pdf"
            download
            rel="noopener"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#ffd600] text-[#050e07] text-xs font-bold shadow-xl hover:scale-105 transition-transform cursor-pointer"
            aria-label="Download Official Company Profile PDF"
          >
            <span>Download Official Dossier (PDF)</span>
            <Download className="w-4 h-4" />
          </a>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-14 h-14 rounded-full bg-linear-to-r from-[#ffd600] to-[#f9c923] text-[#050e07] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-[#050e07] cursor-pointer group"
        aria-label={expanded ? "Close Quick Actions" : "Open Quick Contact & Print"}
      >
        {expanded ? (
          <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
        ) : (
          <div className="relative">
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#2e7d32] animate-ping" />
            <MessageCircle className="w-6 h-6" />
          </div>
        )}
      </button>
    </div>
  );
}
