import type { CompanyData } from "@/types/admin";

interface CompanySafetyFormProps {
  data: CompanyData;
  onChange: (data: CompanyData) => void;
}

export default function CompanySafetyForm({ data, onChange }: CompanySafetyFormProps) {
  const warranty = data.warranty;
  const safetyEhs = data.safetyEhs;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold font-heading text-[#f6f7f4] border-b border-white/10 pb-2">
        Earthballing Warranty Terms &amp; Safety Certifications
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            Warranty Guarantee Period
          </label>
          <input
            type="text"
            value={warranty.period}
            onChange={(e) =>
              onChange({ ...data, warranty: { ...warranty, period: e.target.value } })
            }
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            Certified Survival Rate Target
          </label>
          <input
            type="text"
            value={warranty.survivalRateTarget}
            onChange={(e) =>
              onChange({
                ...data,
                warranty: { ...warranty, survivalRateTarget: e.target.value },
              })
            }
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs focus:ring-1 focus:ring-[#22c55e] outline-none font-mono text-[#22c55e]"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            Replacement Coverage Terms
          </label>
          <textarea
            rows={2}
            value={warranty.coverage}
            onChange={(e) =>
              onChange({ ...data, warranty: { ...warranty, coverage: e.target.value } })
            }
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            Safe Manhours (Zero LTI)
          </label>
          <input
            type="text"
            value={safetyEhs.zeroLtaHours}
            onChange={(e) =>
              onChange({
                ...data,
                safetyEhs: { ...safetyEhs, zeroLtaHours: e.target.value },
              })
            }
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs focus:ring-1 focus:ring-[#22c55e] outline-none text-[#fbbf24] font-semibold"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            Safety Award Citation
          </label>
          <input
            type="text"
            value={safetyEhs.safetyAward}
            onChange={(e) =>
              onChange({
                ...data,
                safetyEhs: { ...safetyEhs, safetyAward: e.target.value },
              })
            }
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
          />
        </div>
      </div>
    </div>
  );
}
