import Link from "next/link";
import { TreePine, Home, Phone, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#060d07] text-[#f6f7f4] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="relative z-10 max-w-xl text-center flex flex-col items-center">
        {/* Emblem Badge */}
        <div className="w-16 h-16 rounded-2xl bg-[#0a150c] border border-white/10 flex items-center justify-center mb-6 shadow-xl">
          <TreePine className="w-8 h-8 text-[#c5a059]" />
        </div>

        {/* 404 Code */}
        <span className="text-xs font-mono font-medium tracking-widest text-[#c5a059] uppercase px-3 py-1 rounded bg-[#0a150c] border border-white/10 mb-4">
          Error 404 • Boundary Marker Missing
        </span>

        <h1 className="text-3xl sm:text-5xl font-bold font-heading text-[#f6f7f4] mb-4 tracking-tight">
          Canopy Boundary{" "}
          <span className="font-editorial italic font-normal text-[#dfbe76]">Undefined</span>
        </h1>

        <p className="text-sm sm:text-base text-[#9aa89b] leading-relaxed mb-8 max-w-md">
          The project dossier, nursery record, or arboricultural resource you are navigating to has either been relocated or does not exist within the Forest Hills Garden registry.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#c5a059] text-[#060d07] text-xs font-semibold uppercase tracking-wider hover:bg-[#dfbe76] shadow-md transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/services"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0a150c] hover:bg-[#122014] text-[#f6f7f4] border border-white/10 text-xs font-semibold tracking-wider hover:border-[#c5a059]/40 transition-colors cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#c5a059]" />
            <span>Explore Services</span>
          </Link>

          <Link
            href="/contact"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0a150c] hover:bg-[#122014] text-[#f6f7f4] border border-white/10 text-xs font-semibold tracking-wider transition-colors cursor-pointer"
          >
            <Phone className="w-4 h-4 text-[#c5a059]" />
            <span>Contact Dispatch</span>
          </Link>
        </div>

        {/* Footer info */}
        <div className="mt-12 pt-6 border-t border-white/10 text-xs font-mono text-[#9aa89b] flex items-center justify-center gap-4">
          <span>Forest Hills Garden</span>
          <span>•</span>
          <span>Talisay, Batangas</span>
          <span>•</span>
          <span>Est. 1998</span>
        </div>
      </div>
    </div>
  );
}
