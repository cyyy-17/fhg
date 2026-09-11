import type { CompanyData } from "@/types/admin";

interface CompanyIdentityFormProps {
  data: CompanyData;
  onChange: (data: CompanyData) => void;
}

export default function CompanyIdentityForm({ data, onChange }: CompanyIdentityFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold font-heading text-[#f6f7f4] border-b border-white/10 pb-2">
        Brand Identity &amp; Leadership Tenure
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            Full Registered Enterprise Name
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            Short Acronym / Brand Code
          </label>
          <input
            type="text"
            value={data.shortName}
            onChange={(e) => onChange({ ...data, shortName: e.target.value })}
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            Company Tagline
          </label>
          <input
            type="text"
            value={data.tagline}
            onChange={(e) => onChange({ ...data, tagline: e.target.value })}
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            Date Established
          </label>
          <input
            type="text"
            value={data.established}
            onChange={(e) => onChange({ ...data, established: e.target.value })}
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            Founder
          </label>
          <input
            type="text"
            value={data.founder}
            onChange={(e) => onChange({ ...data, founder: e.target.value })}
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            Founder Tenure Range
          </label>
          <input
            type="text"
            value={data.founderTenure}
            onChange={(e) => onChange({ ...data, founderTenure: e.target.value })}
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            General Manager / Principal Operator
          </label>
          <input
            type="text"
            value={data.manager}
            onChange={(e) => onChange({ ...data, manager: e.target.value })}
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            General Manager Tenure Range
          </label>
          <input
            type="text"
            value={data.managerTenure}
            onChange={(e) => onChange({ ...data, managerTenure: e.target.value })}
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
          />
        </div>
      </div>
    </div>
  );
}
