"use client";

import { useEffect } from "react";

export function VisitTracker({ locale }: { locale: string }) {
  useEffect(() => {
    const dayKey = new Date().toISOString().slice(0, 10);
    const storageKey = `lumos-visit-${dayKey}`;

    if (window.localStorage.getItem(storageKey)) {
      return;
    }

    fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale }),
    }).finally(() => {
      window.localStorage.setItem(storageKey, "1");
    });
  }, [locale]);

  return null;
}
