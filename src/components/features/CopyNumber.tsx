"use client";

import { Copy } from "lucide-react";

/** Desktop helper: tel: links do nothing on most PCs, so offer to copy the number (shadcn Sonner toast). */
export function CopyNumber({ value, label }: { value: string; label: string }) {
  return (
    <button
      type="button"
      aria-label={`Copy ${label}`}
      onClick={async () => {
        const { toast } = await import("sonner"); // loaded on demand
        try {
          await navigator.clipboard.writeText(value);
          toast.success(`Copied ${value}`);
        } catch {
          toast.error("Could not copy. Please select the number and copy it.");
        }
      }}
      className="inline-flex size-7 items-center justify-center rounded-sm text-white hover:bg-white/10"
    >
      <Copy size={14} aria-hidden />
    </button>
  );
}
