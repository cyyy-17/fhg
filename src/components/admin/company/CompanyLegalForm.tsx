import { Plus, Trash2, ShieldCheck } from "lucide-react";
import type { CompanyData } from "@/types/admin";

interface CompanyLegalFormProps {
  data: CompanyData;
  onChange: (data: CompanyData) => void;
}

export default function CompanyLegalForm({ data, onChange }: CompanyLegalFormProps) {
  const legal = data.legal;
  const pcaList = legal.pcaRegistrations || [];

  function handleAddPca() {
    const next = [...pcaList, { jurisdiction: "", certNo: "" }];
    onChange({
      ...data,
      legal: { ...legal, pcaRegistrations: next },
    });
  }

  function handleUpdatePca(index: number, field: "jurisdiction" | "certNo", val: string) {
    const next = [...pcaList];
    next[index] = { ...next[index], [field]: val };
    onChange({
      ...data,
      legal: { ...legal, pcaRegistrations: next },
    });
  }

  function handleRemovePca(index: number) {
    const next = pcaList.filter((_, i) => i !== index);
    onChange({
      ...data,
      legal: { ...legal, pcaRegistrations: next },
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold font-heading text-[#f6f7f4] border-b border-white/10 pb-2 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#22c55e]" />
          <span>Statutory Government Permits &amp; Accreditations</span>
        </h3>
      </div>

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
            PhilGEPS Registration No.
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
            PhilGEPS Membership Category
          </label>
          <input
            type="text"
            value={legal.philgepsMembership || ""}
            onChange={(e) =>
              onChange({ ...data, legal: { ...legal, philgepsMembership: e.target.value } })
            }
            placeholder="e.g. Blue Membership (Issued May 24, 2005)"
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
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
            DBP Forest Partner Accreditation No.
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

        <div>
          <label className="block text-xs font-mono uppercase text-[#9aa89b] mb-1">
            DBP Partnership Accreditation Date
          </label>
          <input
            type="text"
            value={legal.dbpDate || ""}
            onChange={(e) =>
              onChange({ ...data, legal: { ...legal, dbpDate: e.target.value } })
            }
            placeholder="e.g. September 12, 2005"
            className="w-full p-2.5 rounded-lg bg-[#050e07] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none font-mono"
          />
        </div>
      </div>

      {/* PCA Registrations Array Editor */}
      <div className="p-4 rounded-xl bg-[#08130a] border border-white/10 space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div>
            <h4 className="text-xs font-bold font-mono uppercase text-[#22c55e]">
              Philippine Coconut Authority (PCA) Registrations ({pcaList.length})
            </h4>
            <p className="text-[11px] text-[#9aa89b] mt-0.5">
              Certified Coconut Tree Cutter &amp; Trader regional registration certificates.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddPca}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/30 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add PCA Region</span>
          </button>
        </div>

        {pcaList.length === 0 ? (
          <div className="py-4 text-center text-xs text-[#9aa89b] italic">
            No PCA registrations currently listed. Click &quot;Add PCA Region&quot; to add one.
          </div>
        ) : (
          <div className="space-y-2">
            {pcaList.map((pca, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2.5 rounded-lg bg-[#050e07] border border-white/10"
              >
                <div className="flex-1">
                  <label className="block text-[10px] font-mono uppercase text-[#9aa89b] mb-0.5 sm:hidden">
                    Jurisdiction
                  </label>
                  <input
                    type="text"
                    value={pca.jurisdiction}
                    onChange={(e) => handleUpdatePca(idx, "jurisdiction", e.target.value)}
                    placeholder="Jurisdiction (e.g. National Capital Region (NCR))"
                    className="w-full p-2 rounded-lg bg-[#08130a] border border-white/15 text-xs text-[#f6f7f4] focus:ring-1 focus:ring-[#22c55e] outline-none"
                  />
                </div>
                <div className="sm:w-48">
                  <label className="block text-[10px] font-mono uppercase text-[#9aa89b] mb-0.5 sm:hidden">
                    Certificate Number
                  </label>
                  <input
                    type="text"
                    value={pca.certNo}
                    onChange={(e) => handleUpdatePca(idx, "certNo", e.target.value)}
                    placeholder="Cert No. (e.g. RNCR-1000203)"
                    className="w-full p-2 rounded-lg bg-[#08130a] border border-white/15 text-xs text-[#f6f7f4] font-mono focus:ring-1 focus:ring-[#22c55e] outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemovePca(idx)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-[#9aa89b] hover:text-red-400 transition cursor-pointer self-end sm:self-center"
                  title="Remove Registration"
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
