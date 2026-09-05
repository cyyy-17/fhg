"use client";

import { ArrowUp } from "lucide-react";

export default function ScrollTopButton() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { duration?: number }) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.3 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <button
      onClick={scrollToTop}
      className="w-10 h-10 rounded-full bg-[#112414] hover:bg-[#2e7d32] text-white border border-[#4caf50]/30 flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-110"
      aria-label="Back to Top"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}
