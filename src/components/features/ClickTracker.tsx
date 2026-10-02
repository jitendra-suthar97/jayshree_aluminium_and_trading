"use client";

import { useEffect } from "react";

/**
 * One delegated click listener. Any element with data-track="event_name" and
 * data-placement="where" sends a GA4 event (only if GA is loaded). No other tracking.
 */
export function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      const event = el?.dataset.track;
      if (!el || !event) return;
      window.gtag?.("event", event, { placement: el.dataset.placement ?? "unknown" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
