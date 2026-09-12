import { Plus, Trash2, Phone, Mail, MapPin } from "lucide-react";
import type { CompanyData } from "@/types/admin";

interface CompanyContactFormProps {
  data: CompanyData;
  onChange: (data: CompanyData) => void;
}

export default function CompanyContactForm({ data, onChange }: CompanyContactFormProps) {
  const headOffice = data.headOffice;
  const mobiles = headOffice.mobiles || [];
  const emails = headOffice.emails || [];

  function handleAddMobile() {
    const next = [...mobiles, ""];
    onChange({
      ...data,
      headOffice: { ...headOffice, mobiles: next },
    });
  }

  function handleUpdateMobile(idx: number, val: string) {
    const next = [...mobiles];
    next[idx] = val;
    onChange({
      ...data,
      headOffice: { ...headOffice, mobiles: next },
    });
  }

  function handleRemoveMobile(idx: number) {
    const next = mobiles.filter((_, i) => i !== idx);
    onChange({
      ...data,
      headOffice: { ...headOffice, mobiles: next },
    });
  }

  function handleAddEmail() {
    const next = [...emails, ""];
    onChange({
      ...data,
      headOffice: { ...headOffice, emails: next },
    });
  }

  function handleUpdateEmail(idx: number, val: string) {
    const next = [...emails];
    next[idx] = val;
    onChange({
      ...data,
      headOffice: { ...headOffice, emails: next },
    });
  }

  function handleRemoveEmail(idx: number) {
    const next = emails.filter((_, i) => i !== idx);
    onChange({
      ...data,
      headOffice: { ...headOffice, emails: next },
    });
  }

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-bold font-heading text-[#f6f7f4] border-b border-white/10 pb-2 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-[#22c55e]" />
        <span>Dispatch Hub &amp; Contact Access Points</span>
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
      </div>

      {/* Official Mobile Numbers Array Editor */}
      <div className="p-4 rounded-xl bg-[#08130a] border border-white/10 space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#22c55e]" />
            <h4 className="text-xs font-bold font-mono uppercase text-[#22c55e]">
              Official Mobile Numbers ({mobiles.length})
            </h4>
          </div>
          <button
            type="button"
            onClick={handleAddMobile}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/30 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Mobile Number</span>
          </button>
        </div>

        {mobiles.length === 0 ? (
          <div className="py-3 text-center text-xs text-[#9aa89b] italic">
            No mobile numbers added. Click &quot;Add Mobile Number&quot; above.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {mobiles.map((mob, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={mob}
                  onChange={(e) => handleUpdateMobile(idx, e.target.value)}
                  placeholder="e.g. 0916 566 7265"
                  className="flex-1 p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveMobile(idx)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-[#9aa89b] hover:text-red-400 transition cursor-pointer"
                  title="Remove Number"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Official Email Addresses Array Editor */}
      <div className="p-4 rounded-xl bg-[#08130a] border border-white/10 space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#22c55e]" />
            <h4 className="text-xs font-bold font-mono uppercase text-[#22c55e]">
              Official Email Addresses ({emails.length})
            </h4>
          </div>
          <button
            type="button"
            onClick={handleAddEmail}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/30 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Email Address</span>
          </button>
        </div>

        {emails.length === 0 ? (
          <div className="py-3 text-center text-xs text-[#9aa89b] italic">
            No emails added. Click &quot;Add Email Address&quot; above.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {emails.map((em, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="email"
                  value={em}
                  onChange={(e) => handleUpdateEmail(idx, e.target.value)}
                  placeholder="e.g. edluna1971@yahoo.com"
                  className="flex-1 p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveEmail(idx)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-[#9aa89b] hover:text-red-400 transition cursor-pointer"
                  title="Remove Email"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
