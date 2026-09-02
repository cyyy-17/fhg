export default function Marquee() {
  const items = [
    "PHILGEPS BLUE MEMBER CERTIFIED",
    "89 REGISTERED CHAINSAW INDUSTRIAL FLEET",
    "SLEX TR4 EXPRESSWAY CONTRACTOR",
    "METRO MANILA SUBWAY CP101 PARTNER",
    "AYALA LAND & MDC PRE-QUALIFIED",
    "SM PRIME & SMDC TURNKEY SUBCONTRACTOR",
    "100,000+ PLANT NURSERY CAPACITY",
    "2,600+ HECTARES NGP REFORESTED",
    "PCA COCONUT TREE PERMITTED CUTTER",
    "ZERO ENVIRONMENTAL INFRACTION RECORD",
  ];

  return (
    <div className="relative w-full py-4 bg-[#030a04] border-y border-[#4caf50]/15 overflow-hidden z-20">
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
        {[...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#a8d5a8] uppercase">
              {text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffd600]" />
          </div>
        ))}
      </div>
    </div>
  );
}
