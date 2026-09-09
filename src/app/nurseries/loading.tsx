export default function NurseriesLoading() {
  return (
    <div className="min-h-screen bg-[#050d07] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-[#22c55e]/20 border-t-[#22c55e] animate-spin" />
        <span className="text-xs font-mono text-[#9aa89b] tracking-widest uppercase">
          Forest Hills Garden • Loading Nurseries &amp; Inventory...
        </span>
      </div>
    </div>
  );
}
