"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Project } from "@/types";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { serviceForCategory } from "@/data/services";
import { whatsappMessages } from "@/lib/contact";
import { CallButton, WhatsAppButton } from "./ContactButtons";

/**
 * Project photo viewer: shadcn Dialog (fullscreen size). Radix handles focus trap, Esc, scroll lock and
 * returning focus. This component adds swipe (touch) and arrow keys. Must be rendered inside <Dialog>.
 */
export function Lightbox({
  items,
  index,
  onIndexChange,
  onNavigate,
}: {
  items: Project[];
  index: number;
  onIndexChange: (i: number) => void;
  /** Called when a link inside the viewer is followed (closes the dialog). */
  onNavigate: () => void;
}) {
  const touchStartX = useRef<number | null>(null);
  const count = items.length;
  const item = items[index];
  const go = (delta: number) => onIndexChange((index + delta + count) % count);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  if (!item) return null;
  const service = serviceForCategory(item.category);

  return (
    <DialogContent size="fullscreen" showCloseButton={false} className="gap-0 p-0">
      <DialogTitle className="sr-only">{item.title}</DialogTitle>
      <DialogDescription className="sr-only">
        Photo {index + 1} of {count}. Use the arrow keys or swipe to see other photos.
      </DialogDescription>

      <div className="flex h-14 shrink-0 items-center justify-between px-4">
        <p aria-hidden className="text-small">
          {index + 1} / {count}
        </p>
        <DialogClose asChild>
          <Button variant="ghost" size="icon" aria-label="Close photo viewer" className="text-white hover:bg-white/10 hover:text-white">
            <X size={24} aria-hidden />
          </Button>
        </DialogClose>
      </div>

      <div
        className="relative min-h-0 flex-1"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          const start = touchStartX.current;
          const end = e.changedTouches[0]?.clientX;
          touchStartX.current = null;
          if (start === null || end === undefined) return;
          const dx = end - start;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        }}
      >
        <Image key={item.id} src={item.image.src} alt={item.image.alt} fill sizes="100vw" className="object-contain" />
        {count > 1 ? (
          <>
            <Button
              type="button"
              size="icon"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="absolute top-1/2 left-4 hidden -translate-y-1/2 bg-ink hover:bg-blue-700 md:inline-flex"
            >
              <ChevronLeft size={24} aria-hidden />
            </Button>
            <Button
              type="button"
              size="icon"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="absolute top-1/2 right-4 hidden -translate-y-1/2 bg-ink hover:bg-blue-700 md:inline-flex"
            >
              <ChevronRight size={24} aria-hidden />
            </Button>
          </>
        ) : null}
      </div>

      <div className="shrink-0 bg-ink px-4 py-3">
        <div className="mx-auto flex max-w-[75rem] flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-base font-semibold">{item.title}</p>
            <p className="text-small text-line">
              {service?.shortName ?? item.category}
              {item.town && item.townConsent ? `, ${item.town}` : ""}
              {service ? (
                <>
                  {" "}
                  <Link
                    href={`/services/${service.slug}/`}
                    onClick={onNavigate}
                    className="text-white underline underline-offset-[3px]"
                  >
                    About {service.shortName.toLowerCase()}
                  </Link>
                </>
              ) : null}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:flex">
            <WhatsAppButton placement="lightbox" message={whatsappMessages.project(item.title)} size="default" label="I want this" />
            <CallButton placement="lightbox" size="default" variant="inverse" label="Call" />
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
