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
              <span>June 10, 1998 – April 24, 2015</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold font-heading text-[#f6f7f4] mb-2">
              Mr. Edwin G. Luna
            </h4>
            <p className="mb-3">
              Founded and led Forest Hills Garden from June 10, 1998 until he passed away on April 24, 2015 in Talisay, Batangas. Under his leadership, the firm established its foundational capabilities in tree earthballing, chainsaw felling, and nursery propagation across Luzon.
            </p>
            <p className="text-xs text-[#9aa89b]/80 italic">
              His enduring corporate creed — &ldquo;We Do It Right and Fast&rdquo; — remains the company&apos;s guiding operational principle.
            </p>
          </div>

          {/* Current Executive Leadership */}
          <div className="p-6 rounded-xl bg-[#060d07] border border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#c5a059] mb-2">
              <span>Proprietress &amp; General Manager</span>
              <span className="text-white/20">•</span>
              <span>May 7, 2015 – Present</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold font-heading text-[#f6f7f4] mb-2">
              Mrs. Marife B. Luna
            </h4>
            <p className="mb-3">
              Taking over executive management on May 7, 2015, Mrs. Marife B. Luna expanded Forest Hills Garden into major infrastructure rights-of-way concessions, high-voltage renewable corridors, and rail alignments. She steered flagship contracts for Giga ACE 6 (Quezon North Wind), San Miguel Corporation (SLEX TR4), Ayala Land (Vermosa &amp; Nuvali), and EEI Corporation (Subway CP101).
            </p>
            <p className="mb-3">
              She maintains direct executive oversight over the 90-unit DENR-registered chainsaw fleet, PCA certifications, three Batangas propagation facilities, and the ongoing corporate transition to <strong className="text-[#f6f7f4]">Forest Hills Ventures Incorporated</strong> (SEC Reg. No. 2023060103408-45).
            </p>
          </div>

          {/* Corporate Core Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-lg bg-[#060d07] border border-white/10">
              <h5 className="font-mono text-xs uppercase tracking-wider text-[#dfbe76] mb-1">
                Direct Executive Accountability
              </h5>
              <p className="text-xs text-[#9aa89b]">
                Clients interface directly with executive leadership for rapid decision-making on emergency felling, storm response, and critical path project milestones.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-[#060d07] border border-white/10">
              <h5 className="font-mono text-xs uppercase tracking-wider text-[#dfbe76] mb-1">
                Statutory Zero-Infraction
              </h5>
              <p className="text-xs text-[#9aa89b]">
                Zero stop-work orders, zero environmental penalties, and 100% compliance across DENR, PCA, DPWH, and DOLE audits across 28+ years of contracting history.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs font-mono text-[#9aa89b]">
            DTI Certificate: 1729753 (Valid to May 28, 2030)
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
