"use client";

import { createPortal } from "react-dom";
import { UserCheck, X } from "lucide-react";

interface ProfileBioModalProps {
  isOpen: boolean;
  onClose: () => void;
  mounted: boolean;
}

export default function ProfileBioModal({ isOpen, onClose, mounted }: ProfileBioModalProps) {
  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xs animate-fadeInSimple"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] rounded-2xl bg-[#0a150c] border border-white/15 shadow-2xl p-6 sm:p-10 flex flex-col text-[#f6f7f4] overflow-y-auto animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#c5a059]/15 text-[#dfbe76] flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-[#f6f7f4]">
                Corporate Leadership &amp; Heritage
              </h3>
              <p className="text-xs text-[#9aa89b]">Forest Hills Garden Official Dossier</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-[#9aa89b] hover:text-[#f6f7f4] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close Dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="space-y-6 text-sm text-[#9aa89b] leading-relaxed">
          {/* Founder Memorial Section */}
          <div className="p-6 rounded-xl bg-[#060d07] border border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#dfbe76] mb-2">
              <span>Founder Memorial Tribute</span>
              <span className="text-white/20">•</span>
              <span>June 10, 1998</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold font-heading text-[#f6f7f4] mb-2">
              Mr. Edwin G. Luna (1971–2021)
            </h4>
            <p className="mb-3">
              Founded Forest Hills Garden on June 10, 1998 in Talisay, Batangas with a clear charter: provide rapid, high-discipline earthballing and specialized heavy chainsaw felling for emerging developments.
            </p>
            <p className="text-xs text-[#9aa89b]/80 italic">
              His technical discipline in precision felling and root-conditioning lives on in every crew mobilized across Luzon.
            </p>
          </div>

          {/* Current Executive Leadership */}
          <div className="p-6 rounded-xl bg-[#060d07] border border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#c5a059] mb-2">
              <span>Proprietress &amp; General Manager</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold font-heading text-[#f6f7f4] mb-2">
              Ms. Marife B. Luna
            </h4>
            <p className="mb-3">
              Under Ms. Marife B. Luna&apos;s decisive executive stewardship, Forest Hills Garden transitioned into mega-scale infrastructure right-of-way concessions. She steered major contracts for San Miguel Corporation (SLEX TR4, CALAX) and EEI Corporation (Metro Manila Subway CP101).
            </p>
            <p>
              She maintains direct executive oversight over the 89-unit chainsaw fleet, DTI/PhilGEPS procurement standing, and twin propagation nurseries.
            </p>
          </div>

          {/* Corporate Core Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-lg bg-[#060d07] border border-white/10">
              <h5 className="font-mono text-xs uppercase tracking-wider text-[#dfbe76] mb-1">
                Direct Owner Accountability
              </h5>
              <p className="text-xs text-[#9aa89b]">
                Clients interface directly with executive leadership for rapid decision-making on emergency felling and critical path project milestones.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-[#060d07] border border-white/10">
              <h5 className="font-mono text-xs uppercase tracking-wider text-[#dfbe76] mb-1">
                Statutory Zero-Infraction
              </h5>
              <p className="text-xs text-[#9aa89b]">
                Zero stop-work orders, zero environmental penalties, and 100% full compliance with DENR, PCA, and DOLE standards across 28+ years.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs font-mono text-[#9aa89b]">
            DTI Certificate: 1729753
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#c5a059] hover:bg-[#dfbe76] text-[#060d07] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
