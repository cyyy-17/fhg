import type { CompanyData } from "@/types/admin";

interface CompanyLegalFormProps {
  data: CompanyData;
  onChange: (data: CompanyData) => void;
}

export default function CompanyLegalForm({ data, onChange }: CompanyLegalFormProps) {
  const legal = data.legal;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold font-heading text-[#f6f7f4] border-b border-white/10 pb-2">
        Statutory Government Permits &amp; Accreditations
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            DTI Certificate Number
          </label>
          <input
            type="text"
            value={legal.dtiCertNo}
            onChange={(e) =>
              onChange({ ...data, legal: { ...legal, dtiCertNo: e.target.value } })
            }
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            DTI Validity Expiry
          </label>
          <input
            type="text"
            value={legal.dtiExpiry}
            onChange={(e) =>
              onChange({ ...data, legal: { ...legal, dtiExpiry: e.target.value } })
            }
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            BIR Official Confirmation No. (OCN)
          </label>
          <input
            type="text"
            value={legal.birOcn}
            onChange={(e) =>
              onChange({ ...data, legal: { ...legal, birOcn: e.target.value } })
            }
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            Tax Identification Number (TIN)
          </label>
          <input
            type="text"
            value={legal.tin}
            onChange={(e) =>
              onChange({ ...data, legal: { ...legal, tin: e.target.value } })
            }
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            BIR Revenue District Office (RDO)
          </label>
          <input
            type="text"
            value={legal.birRdo}
            onChange={(e) =>
              onChange({ ...data, legal: { ...legal, birRdo: e.target.value } })
            }
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            Primary PSIC Classification
          </label>
          <input
            type="text"
            value={legal.primaryPsic}
            onChange={(e) =>
              onChange({ ...data, legal: { ...legal, primaryPsic: e.target.value } })
            }
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            PhilGEPS Certificate &amp; Membership
          </label>
          <input
            type="text"
            value={legal.philgepsCertNo}
            onChange={(e) =>
              onChange({ ...data, legal: { ...legal, philgepsCertNo: e.target.value } })
            }
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            DENR Registered Chainsaws Authority
          </label>
          <input
            type="text"
            value={legal.denrChainsaws}
            onChange={(e) =>
              onChange({ ...data, legal: { ...legal, denrChainsaws: e.target.value } })
            }
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            DENR Nursery Accreditation Number
          </label>
          <input
            type="text"
            value={legal.denrNurseryAccreditation}
            onChange={(e) =>
              onChange({
                ...data,
                legal: { ...legal, denrNurseryAccreditation: e.target.value },
              })
            }
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            SSS Employer ID
          </label>
          <input
            type="text"
            value={legal.sssNo}
            onChange={(e) =>
              onChange({ ...data, legal: { ...legal, sssNo: e.target.value } })
            }
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            PhilHealth Registration No.
          </label>
          <input
            type="text"
            value={legal.philhealthNo}
            onChange={(e) =>
              onChange({ ...data, legal: { ...legal, philhealthNo: e.target.value } })
            }
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            Pag-IBIG Employer No.
          </label>
          <input
            type="text"
            value={legal.pagibigNo}
            onChange={(e) =>
              onChange({ ...data, legal: { ...legal, pagibigNo: e.target.value } })
            }
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            DBP Forest Partner Accreditation
          </label>
          <input
            type="text"
            value={legal.dbpAccreditationNo}
            onChange={(e) =>
              onChange({ ...data, legal: { ...legal, dbpAccreditationNo: e.target.value } })
            }
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
          />
        </div>
      </div>
    </div>
  );
}
