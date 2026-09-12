"use client";

import { useEffect } from "react";

export interface UnsavedChangesGuardProps {
  isDirty: boolean;
  message?: string;
}

export function useUnsavedChangesWarning(isDirty: boolean) {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isDirty) return;
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);
}

export default function UnsavedChangesBanner({
  isDirty,
  onSave,
  onDiscard,
  isSaving = false,
}: {
  isDirty: boolean;
  onSave: () => void;
  onDiscard: () => void;
  isSaving?: boolean;
}) {
  useUnsavedChangesWarning(isDirty);

  if (!isDirty) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 bg-[#0d2214] border border-amber-500/50 shadow-2xl rounded-xl p-4 flex items-center gap-4 text-sm animate-in slide-in-from-bottom-5">
      <div className="flex items-center gap-2 text-amber-300 font-medium">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
        </span>
        You have unsaved changes
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onDiscard}
          disabled={isSaving}
          className="px-3 py-1.5 rounded-lg border border-white/10 text-xs text-[#9aa89b] hover:text-white hover:bg-white/5 transition cursor-pointer"
        >
          Discard
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition cursor-pointer shadow-md disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
