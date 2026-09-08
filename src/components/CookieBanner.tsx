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
      // Delay slightly for smooth entrance after page load
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for open settings event from footer or privacy policy
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
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-lg z-50 animate-fadeIn"
    >
      <div className="rounded-3xl bg-[#07180a]/95 backdrop-blur-xl border border-[#4caf50]/30 shadow-2xl p-6 text-white text-xs">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#ffd600]/20 text-[#ffd600] flex items-center justify-center shrink-0">
              <Cookie className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-heading text-white">
                Cookie &amp; Privacy Preferences
              </h3>
              <span className="text-[10px] text-[#a8d5a8]">
                Transparency under RA 10173
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleEssentialOnly}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#ffd600] hover:text-[#050e07] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close and accept essential only"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Description */}
        <p className="text-[#a8d5a8] leading-relaxed mb-4">
          We use essential cookies and local storage to optimize user navigation, remember your RFP configurations, and ensure secure operations. We do not use third-party behavioral advertising cookies. Learn more in our{" "}
          <Link
            href="/privacy-policy#cookies"
            className="text-[#ffd600] underline hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
          .
        </p>

        {/* Detailed Settings Modal/Drawer */}
        {showSettings && (
          <div className="mb-4 p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
            {/* Essential */}
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="font-bold text-white block">
                  Strictly Necessary
                </span>
                <span className="text-[11px] text-[#a8d5a8]/70">
                  Required for site navigation, security &amp; basic functions.
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#76c442]/20 text-[#76c442] font-bold shrink-0">
                Always Active
              </span>
            </div>

            {/* Functional */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/10">
              <div>
                <span className="font-bold text-white block">
                  Preferences &amp; Form Cache
                </span>
                <span className="text-[11px] text-[#a8d5a8]/70">
                  Remembers RFP calculation parameters &amp; UI settings.
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={functional}
                onClick={() => setFunctional((prev) => !prev)}
                className={`w-9 h-5 rounded-full transition-colors cursor-pointer shrink-0 p-0.5 flex items-center ${
                  functional ? "bg-[#2e7d32]" : "bg-white/20"
                }`}
                aria-label="Toggle Preferences and Form Cache Cookies"
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                    functional ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Analytics */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/10">
              <div>
                <span className="font-bold text-white block">
                  Operational Analytics
                </span>
                <span className="text-[11px] text-[#a8d5a8]/70">
                  Anonymous performance metrics to improve response speeds.
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={analytics}
                onClick={() => setAnalytics((prev) => !prev)}
                className={`w-9 h-5 rounded-full transition-colors cursor-pointer shrink-0 p-0.5 flex items-center ${
                  analytics ? "bg-[#2e7d32]" : "bg-white/20"
                }`}
                aria-label="Toggle Operational Analytics Cookies"
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                    analytics ? "translate-x-4" : "translate-x-0"
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
              className="flex-1 py-2.5 px-4 rounded-xl font-bold uppercase tracking-wider text-[11px] bg-[#ffd600] text-[#050e07] hover:brightness-110 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Preferences</span>
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="flex-1 py-2.5 px-3 rounded-xl font-bold uppercase tracking-wider text-[11px] bg-[#ffd600] text-[#050e07] hover:brightness-110 flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Accept All</span>
              </button>

              <button
                type="button"
                onClick={handleEssentialOnly}
                className="py-2.5 px-3 rounded-xl font-semibold text-[11px] bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all cursor-pointer"
              >
                Essential Only
              </button>

              <button
                type="button"
                onClick={() => setShowSettings(true)}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#a8d5a8] hover:text-white border border-white/15 transition-all cursor-pointer"
                title="Customize Cookie Settings"
                aria-label="Customize Cookie Settings"
              >
                <Settings2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
