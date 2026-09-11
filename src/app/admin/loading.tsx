export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#22c55e] border-t-transparent animate-spin" />
        <span className="text-xs font-mono uppercase tracking-widest text-[#9aa89b]">
          Loading Console...
        </span>
      </div>
    </div>
  );
}
