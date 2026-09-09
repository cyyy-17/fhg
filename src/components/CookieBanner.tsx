"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, ShieldCheck, Settings2, X, Check } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";

export interface CookiePreferences {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  timestamp: number;
}

const STORAGE_KEY = "fhg_cookie_consent";

function getInitialPreferences(): { functional: boolean; analytics: boolean } {
  if (typeof window === "undefined") return { functional: true, analytics: false };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: CookiePreferences = JSON.parse(stored);
      return {
        functional: parsed.functional ?? true,
        analytics: parsed.analytics ?? false,
      };
    }
  } catch {
    // Fallback
  }
  return { functional: true, analytics: false };
}

export default function CookieBanner() {
  const mounted = useIsMounted();
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [functional, setFunctional] = useState(() => getInitialPreferences().functional);
  const [analytics, setAnalytics] = useState(() => getInitialPreferences().analytics);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleOpen = () => {
      setShowSettings(true);
      setVisible(true);
    };
    window.addEventListener("fhg_open_cookie_settings", handleOpen);
    return () => {
      window.removeEventListener("fhg_open_cookie_settings", handleOpen);
    };
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    setVisible(false);
    setShowSettings(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      functional: true,
      analytics: true,
      timestamp: Date.now(),
    });
  };

  const handleEssentialOnly = () => {
    saveConsent({
      essential: true,
      functional: false,
      analytics: false,
      timestamp: Date.now(),
    });
  };

  const handleSaveCustom = () => {
    saveConsent({
      essential: true,
      functional,
      analytics,
      timestamp: Date.now(),
    });
  };

  if (!mounted || !visible) return null;

  return (
    <aside
      aria-label="Cookie Consent Banner"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 animate-fadeIn"
    >
      <div className="rounded-2xl bg-[#0a150c]/98 backdrop-blur-xl border border-white/15 shadow-2xl p-5 text-[#f6f7f4] text-xs">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#c5a059]/15 text-[#dfbe76] flex items-center justify-center shrink-0">
              <Cookie className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-[#f6f7f4]">
                Cookie &amp; Privacy Disclosures
              </h3>
              <span className="text-[10px] text-[#9aa89b] font-mono">
                Republic Act No. 10173 Compliance
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleEssentialOnly}
            className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 text-[#9aa89b] hover:text-[#f6f7f4] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close and accept essential only"
          >
            <X className="w-3 h-3" />
          </button>
        </div>

        {/* Description */}
        <p className="text-[#9aa89b] leading-relaxed mb-3.5 text-[11px]">
          We use essential technical cookies to remember RFP parameters and ensure operational security. No third-party behavioral ads. Details in our{" "}
          <Link
            href="/privacy-policy#cookies"
            className="text-[#dfbe76] underline hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
          .
        </p>

        {/* Detailed Settings Modal */}
        {showSettings && (
          <div className="mb-3.5 p-3 rounded-xl bg-[#060d07] border border-white/10 space-y-2.5">
            {/* Essential */}
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="font-medium text-[#f6f7f4] block text-xs">
                  Strictly Necessary
                </span>
                <span className="text-[10px] text-[#9aa89b]">
                  Navigation, security &amp; basic functions.
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0a150c] text-[#dfbe76] border border-white/10 font-medium shrink-0">
                Always Active
              </span>
            </div>

            {/* Functional */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/10">
              <div>
                <span className="font-medium text-[#f6f7f4] block text-xs">
                  RFP Form Cache
                </span>
                <span className="text-[10px] text-[#9aa89b]">
                  Remembers RFP calculation parameters.
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={functional}
                onClick={() => setFunctional((prev) => !prev)}
                className={`w-8 h-4.5 rounded-full transition-colors cursor-pointer shrink-0 p-0.5 flex items-center ${
                  functional ? "bg-[#c5a059]" : "bg-white/20"
                }`}
                aria-label="Toggle Preferences and Form Cache Cookies"
              >
                <span
                  className={`block w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                    functional ? "translate-x-3.5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Analytics */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/10">
              <div>
                <span className="font-medium text-[#f6f7f4] block text-xs">
                  Operational Analytics
                </span>
                <span className="text-[10px] text-[#9aa89b]">
                  Anonymous performance metrics.
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={analytics}
                onClick={() => setAnalytics((prev) => !prev)}
                className={`w-8 h-4.5 rounded-full transition-colors cursor-pointer shrink-0 p-0.5 flex items-center ${
                  analytics ? "bg-[#c5a059]" : "bg-white/20"
                }`}
                aria-label="Toggle Operational Analytics Cookies"
              >
                <span
                  className={`block w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                    analytics ? "translate-x-3.5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {showSettings ? (
            <button
              type="button"
              onClick={handleSaveCustom}
              className="flex-1 py-2 px-3 rounded-lg font-semibold uppercase tracking-wider text-[11px] bg-[#c5a059] hover:bg-[#dfbe76] text-[#060d07] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Preferences</span>
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="flex-1 py-2 px-3 rounded-lg font-semibold uppercase tracking-wider text-[11px] bg-[#c5a059] hover:bg-[#dfbe76] text-[#060d07] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Accept All</span>
              </button>

              <button
                type="button"
                onClick={handleEssentialOnly}
                className="py-2 px-3 rounded-lg font-medium text-[11px] bg-white/5 hover:bg-white/10 text-[#f6f7f4] border border-white/10 transition-colors cursor-pointer"
              >
                Essential Only
              </button>

              <button
                type="button"
                onClick={() => setShowSettings(true)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#9aa89b] hover:text-[#f6f7f4] border border-white/10 transition-colors cursor-pointer"
                title="Customize Cookie Settings"
                aria-label="Customize Cookie Settings"
              >
                <Settings2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
