import type { CompanyData } from "@/types/admin";

interface CompanyStatsFormProps {
  data: CompanyData;
  onChange: (data: CompanyData) => void;
}

export default function CompanyStatsForm({ data, onChange }: CompanyStatsFormProps) {
  const stats = data.stats;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold font-heading text-[#f6f7f4] border-b border-white/10 pb-2">
        Website Hero Metric Counters
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((st, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-[#050e07] border border-white/10 space-y-2">
            <div className="text-xs font-mono text-[#22c55e] font-semibold">
              Metric #{idx + 1}
            </div>
            <div>
              <label className="block text-[10px] font-mono text-[#9aa89b] uppercase">
                Numeric Value
              </label>
              <input
                type="number"
                value={st.value}
                onChange={(e) => {
                  const next = [...stats];
                  next[idx] = { ...next[idx], value: Number(e.target.value) };
                  onChange({ ...data, stats: next });
                }}
                className="w-full p-1.5 rounded bg-[#0a170d] border border-white/15 text-sm font-bold text-[#f6f7f4]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-[#9aa89b] uppercase">
                Suffix (+, M, etc.)
              </label>
              <input
                type="text"
                value={st.suffix}
                onChange={(e) => {
                  const next = [...stats];
                  next[idx] = { ...next[idx], suffix: e.target.value };
                  onChange({ ...data, stats: next });
                }}
                className="w-full p-1.5 rounded bg-[#0a170d] border border-white/15 text-xs text-[#f6f7f4]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-[#9aa89b] uppercase">
                Label Text
              </label>
              <input
                type="text"
                value={st.label}
                onChange={(e) => {
                  const next = [...stats];
                  next[idx] = { ...next[idx], label: e.target.value };
                  onChange({ ...data, stats: next });
                }}
                className="w-full p-1.5 rounded bg-[#0a170d] border border-white/15 text-xs text-[#f6f7f4]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-[#9aa89b] uppercase">
                Sub-caption
              </label>
              <input
                type="text"
                value={st.sub}
                onChange={(e) => {
                  const next = [...stats];
                  next[idx] = { ...next[idx], sub: e.target.value };
                  onChange({ ...data, stats: next });
                }}
                className="w-full p-1.5 rounded bg-[#0a170d] border border-white/15 text-xs text-[#9aa89b]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
