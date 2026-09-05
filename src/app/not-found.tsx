import Link from "next/link";
import { TreePine, Home, Phone, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050e07] text-[#f0fbf0] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-[#2e7d32]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#ffd600]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-xl text-center flex flex-col items-center">
        {/* Emblem Badge */}
        <div className="w-20 h-20 rounded-3xl bg-[#102414] border border-[#ffd600]/40 flex items-center justify-center mb-8 shadow-2xl shadow-[#ffd600]/10">
          <TreePine className="w-10 h-10 text-[#ffd600]" />
        </div>

        {/* 404 Code */}
        <span className="text-xs font-mono font-bold tracking-widest text-[#ffd600] uppercase px-4 py-1.5 rounded-full bg-[#ffd600]/10 border border-[#ffd600]/25 mb-4">
          Error 404 • Boundary Marker Missing
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-white mb-4 tracking-tight">
          Canopy Path <span className="text-gradient-gold">Undefined</span>
        </h1>

        <p className="text-base text-[#a8d5a8] leading-relaxed mb-10 max-w-md">
          The project dossier, nursery record, or arboricultural resource you are navigating to has either been relocated or does not exist within the Forest Hills Garden registry.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#ffd600] text-[#050e07] text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#ffd600]/25 transition-all hover:scale-105 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/services"
            className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-semibold tracking-wider hover:border-[#ffd600] transition-all hover:scale-105 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#ffd600]" />
            <span>Explore Services</span>
          </Link>

          <Link
            href="/contact"
            className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#102414] hover:bg-[#1a3820] text-[#f0fbf0] border border-[#4caf50]/30 text-xs font-semibold tracking-wider transition-all hover:scale-105 cursor-pointer"
          >
            <Phone className="w-4 h-4 text-[#76c442]" />
            <span>Contact Dispatch</span>
          </Link>
        </div>

        {/* Footer info */}
        <div className="mt-14 pt-8 border-t border-white/10 text-xs text-[#a8d5a8]/70 flex items-center justify-center gap-4">
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
