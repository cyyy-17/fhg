export default function RootLoading() {
  return (
    <div className="min-h-screen bg-[#060d07] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-[#c5a059]/20 border-t-[#c5a059] animate-spin" />
        <span className="text-xs font-mono text-[#9aa89b] tracking-widest uppercase">
          Forest Hills Garden • Loading Dossier...
        </span>
      </div>
    </div>
  );
}
