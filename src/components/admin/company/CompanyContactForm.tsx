import type { CompanyData } from "@/types/admin";

interface CompanyContactFormProps {
  data: CompanyData;
  onChange: (data: CompanyData) => void;
}

export default function CompanyContactForm({ data, onChange }: CompanyContactFormProps) {
  const headOffice = data.headOffice;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold font-heading text-[#f6f7f4] border-b border-white/10 pb-2">
        Dispatch Hub &amp; Contact Access Points
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            Head Office Physical Address
          </label>
          <input
            type="text"
            value={headOffice.address}
            onChange={(e) =>
              onChange({ ...data, headOffice: { ...headOffice, address: e.target.value } })
            }
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            Town Office Location
          </label>
          <input
            type="text"
            value={headOffice.townOffice}
            onChange={(e) =>
              onChange({
                ...data,
                headOffice: { ...headOffice, townOffice: e.target.value },
              })
            }
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            Google Plus Code
          </label>
          <input
            type="text"
            value={headOffice.plusCode}
            onChange={(e) =>
              onChange({
                ...data,
                headOffice: { ...headOffice, plusCode: e.target.value },
              })
            }
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            GPS Coordinates
          </label>
          <input
            type="text"
            value={headOffice.coordinates}
            onChange={(e) =>
              onChange({
                ...data,
                headOffice: { ...headOffice, coordinates: e.target.value },
              })
            }
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            Office Hours
          </label>
          <input
            type="text"
            value={headOffice.hours}
            onChange={(e) =>
              onChange({
                ...data,
                headOffice: { ...headOffice, hours: e.target.value },
              })
            }
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            Landline / Telefax
          </label>
          <input
            type="text"
            value={headOffice.telefax}
            onChange={(e) =>
              onChange({
                ...data,
                headOffice: { ...headOffice, telefax: e.target.value },
              })
            }
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            Primary Mobile Number
          </label>
          <input
            type="text"
            value={headOffice.mobiles[0] || ""}
            onChange={(e) => {
              const next = [...headOffice.mobiles];
              next[0] = e.target.value;
              onChange({ ...data, headOffice: { ...headOffice, mobiles: next } });
            }}
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            Secondary Mobile Number
          </label>
          <input
            type="text"
            value={headOffice.mobiles[1] || ""}
            onChange={(e) => {
              const next = [...headOffice.mobiles];
              next[1] = e.target.value;
              onChange({ ...data, headOffice: { ...headOffice, mobiles: next } });
            }}
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            Official Email (Primary)
          </label>
          <input
            type="email"
            value={headOffice.emails[0] || ""}
            onChange={(e) => {
              const next = [...headOffice.emails];
              next[0] = e.target.value;
              onChange({ ...data, headOffice: { ...headOffice, emails: next } });
            }}
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            Alternate Email
          </label>
          <input
            type="email"
            value={headOffice.emails[1] || ""}
            onChange={(e) => {
              const next = [...headOffice.emails];
              next[1] = e.target.value;
              onChange({ ...data, headOffice: { ...headOffice, emails: next } });
            }}
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
          />
        </div>
      </div>
    </div>
  );
}
