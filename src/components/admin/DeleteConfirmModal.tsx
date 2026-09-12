"use client";

import { useState, useEffect, useCallback } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { useLenisScrollLock } from "@/hooks/useLenisScrollLock";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemTitle: string;
  itemType?: string;
  requireTypedConfirm?: boolean;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  itemTitle,
  itemType = "item",
  requireTypedConfirm = false,
}: DeleteConfirmModalProps) {
  useLenisScrollLock(isOpen);
  const [typedValue, setTypedValue] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClose = useCallback(() => {
    setTypedValue("");
    setIsDeleting(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const isConfirmed = !requireTypedConfirm || typedValue.trim().toUpperCase() === "DELETE";

  const handleConfirm = async () => {
    if (!isConfirmed || isDeleting) return;
    setIsDeleting(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      {/* Dialog Box */}
      <div
        data-lenis-prevent="true"
        className="relative w-full max-w-md bg-[#0a170d] border border-red-500/30 rounded-2xl shadow-2xl z-10 overflow-hidden"
      >
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="p-1 rounded-lg text-[#9aa89b] hover:text-[#f6f7f4] hover:bg-white/10 transition cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-bold font-heading text-[#f6f7f4]">
              Delete {itemType}?
            </h3>
            <p className="text-sm text-[#9aa89b] mt-2">
              Are you sure you want to permanently delete{" "}
              <span className="font-semibold text-white">&ldquo;{itemTitle}&rdquo;</span>? This action cannot be undone.
            </p>
          </div>

          {requireTypedConfirm && (
            <div className="mt-4">
              <label className="block text-xs text-[#9aa89b] mb-1">
                Type <span className="font-mono text-red-400 font-bold">DELETE</span> to confirm:
              </label>
              <input
                type="text"
                value={typedValue}
                onChange={(e) => setTypedValue(e.target.value)}
                placeholder="DELETE"
                className="w-full px-3 py-2 bg-[#061008] border border-red-500/30 rounded-lg text-sm text-[#f6f7f4] focus:outline-none focus:ring-1 focus:ring-red-500"
                autoFocus
              />
            </div>
          )}

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isDeleting}
              className="px-4 py-2 rounded-lg text-sm font-medium text-[#9aa89b] hover:text-white hover:bg-white/5 border border-white/10 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!isConfirmed || isDeleting}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-red-600 hover:bg-red-700 text-white transition cursor-pointer disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-red-950/50"
            >
              <Trash2 className="w-4 h-4" />
              {isDeleting ? "Deleting..." : "Confirm Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
