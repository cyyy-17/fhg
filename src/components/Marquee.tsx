export default function Marquee() {
  const items = [
    "PHILGEPS BLUE MEMBER CERTIFIED",
    "89 REGISTERED CHAINSAW INDUSTRIAL FLEET",
    "SLEX TR4 EXPRESSWAY RIGHT-OF-WAY CONTRACTOR",
    "METRO MANILA SUBWAY CP101 PARTNER",
    "AYALA LAND & MDC PRE-QUALIFIED",
    "SM PRIME & SMDC TURNKEY SUBCONTRACTOR",
    "150,000+ COMBINED PLANT NURSERY CAPACITY",
    "2,600+ HECTARES NGP WATERSHED REFORESTED",
    "DENR & PCA STATUTORY PERMIT COMPLIANT",
    "ZERO ENVIRONMENTAL INFRACTION RECORD",
  ];

  return (
    <div className="relative w-full py-3.5 bg-[#040905] border-y border-white/10 overflow-hidden z-20">
      {/* Edge gradient mask for smooth fade in/out */}
      <div className="relative w-full mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
          {[...items, ...items].map((text, idx) => (
            <div key={idx} className="flex items-center gap-8">
              <span className="text-[11px] sm:text-xs font-mono font-medium tracking-[0.2em] text-[#9aa89b] uppercase hover:text-[#dfbe76] transition-colors">
                {text}
              </span>
              <span className="text-[#c5a059] text-[8px] select-none">◆</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
