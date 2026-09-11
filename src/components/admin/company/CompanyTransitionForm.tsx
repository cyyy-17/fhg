import type { CompanyData } from "@/types/admin";

interface CompanyTransitionFormProps {
  data: CompanyData;
  onChange: (data: CompanyData) => void;
}

export default function CompanyTransitionForm({ data, onChange }: CompanyTransitionFormProps) {
  const transition = data.corporateTransition;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold font-heading text-[#f6f7f4] border-b border-white/10 pb-2">
        Corporate Entity &amp; SEC Conversion Standing
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            Transition Status Statement
          </label>
          <input
            type="text"
            value={transition.status}
            onChange={(e) =>
              onChange({
                ...data,
                corporateTransition: { ...transition, status: e.target.value },
              })
            }
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            Target Corporate Entity Name
          </label>
          <input
            type="text"
            value={transition.corporateEntity}
            onChange={(e) =>
              onChange({
                ...data,
                corporateTransition: {
                  ...transition,
                  corporateEntity: e.target.value,
                },
              })
            }
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            Corporate Structure Type
          </label>
          <input
            type="text"
            value={transition.type}
            onChange={(e) =>
              onChange({
                ...data,
                corporateTransition: { ...transition, type: e.target.value },
              })
            }
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            SEC Registration Certificate Number
          </label>
          <input
            type="text"
            value={transition.secRegNo}
            onChange={(e) =>
              onChange({
                ...data,
                corporateTransition: { ...transition, secRegNo: e.target.value },
              })
            }
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
          />
        </div>
      </div>
    </div>
  );
}
