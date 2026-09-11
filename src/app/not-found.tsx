import type { Metadata } from "next";
import Link from "next/link";
import { TreePine, Home, Phone, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found | Forest Hills Garden",
  description: "The requested page could not be found on Forest Hills Garden.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050d07] text-[#f6f7f4] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="relative z-10 max-w-xl text-center flex flex-col items-center">
        {/* Emblem Badge */}
        <div className="w-16 h-16 rounded-2xl bg-[#0a170d] border border-white/10 flex items-center justify-center mb-6 shadow-xl">
          <TreePine className="w-8 h-8 text-[#22c55e]" />
        </div>

        {/* 404 Code */}
        <span className="text-xs font-mono font-medium tracking-widest text-[#4ade80] uppercase px-3 py-1 rounded bg-[#0a170d] border border-[#16a34a]/30 mb-4">
          Error 404 • Boundary Marker Missing
        </span>

        <h1 className="text-3xl sm:text-5xl font-bold font-heading text-[#f6f7f4] mb-4 tracking-tight">
          Canopy Boundary{" "}
          <span className="font-editorial italic font-normal text-[#4ade80]">Undefined</span>
        </h1>

        <p className="text-sm sm:text-base text-[#9aa89b] leading-relaxed mb-8 max-w-md">
          The project dossier, nursery record, or arboricultural resource you are navigating to has either been relocated or does not exist within the Forest Hills Garden registry.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r from-[#15803d] to-[#16a34a] text-white text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#16a34a]/20 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/services"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0a170d] hover:bg-[#0f2413] text-[#f6f7f4] border border-white/10 text-xs font-semibold tracking-wider hover:border-[#22c55e]/40 transition-colors cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#22c55e]" />
            <span>Explore Services</span>
          </Link>

          <Link
            href="/contact"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0a170d] hover:bg-[#0f2413] text-[#f6f7f4] border border-white/10 text-xs font-semibold tracking-wider hover:border-[#22c55e]/40 transition-colors cursor-pointer"
          >
            <Phone className="w-4 h-4 text-[#22c55e]" />
            <span>Contact Dispatch</span>
          </Link>
        </div>

        {/* Footer info */}
        <div className="mt-12 pt-6 border-t border-white/10 text-xs font-mono text-[#9aa89b] flex items-center justify-center gap-4">
          <span>Forest Hills Garden</span>
          <span>•</span>
          <span>WE DO IT RIGHT AND FAST</span>
          <span>•</span>
          <span>Est. 1998</span>
        </div>
      </div>
    </div>
  );
}
