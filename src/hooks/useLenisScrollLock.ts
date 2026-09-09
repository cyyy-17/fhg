"use client";

import { useEffect } from "react";

let lockCount = 0;
let originalOverflow = "";

export function useLenisScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked || typeof window === "undefined") return;

    if (lockCount === 0) {
      originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      window.__lenis?.stop();
    }
    lockCount++;

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        document.body.style.overflow = originalOverflow || "";
        window.__lenis?.start();
      }
    };
  }, [isLocked]);
}
