"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Toaster = dynamic(() => import("@/components/ui/sonner").then((m) => m.Toaster), { ssr: false });

/** Toasts are only used by the desktop "copy number" buttons, so phones never download the toast library. */
export function LazyToaster() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => setEnabled(window.matchMedia("(min-width: 1024px)").matches), []);
  return enabled ? <Toaster /> : null;
}
