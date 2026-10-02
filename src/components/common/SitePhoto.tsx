import Image from "next/image";
import type { PhotoAsset } from "@/types";
import { cn } from "@/lib/utils";
import { SHOW_PLACEHOLDERS } from "@/lib/flags";

export type Ratio = "4/3" | "16/9" | "3/2" | "4/5" | "1/1";

const ratioClass: Record<Ratio, string> = {
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-[16/9]",
  "3/2": "aspect-[3/2]",
  "4/5": "aspect-[4/5]",
  "1/1": "aspect-square",
};

/** A real photo in a fixed-ratio box (no layout shift). No overlays, filters or gradients. */
export function SitePhoto({
  photo,
  ratio = "4/3",
  sizes,
  priority = false,
  className,
}: {
  photo: PhotoAsset;
  ratio?: Ratio;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const position = photo.focalPoint ? `${photo.focalPoint.x}% ${photo.focalPoint.y}%` : "center";
  return (
    <div className={cn("relative w-full overflow-hidden bg-grey-100", ratioClass[ratio], className)}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ objectPosition: position }}
      />
    </div>
  );
}

/**
 * Dev-only marker for a missing real photo. Renders NOTHING in production builds,
 * so no placeholder can ever ship to visitors.
 */
export function PhotoPlaceholder({
  ratio = "4/3",
  label,
  className,
}: {
  ratio?: Ratio;
  label: string;
  className?: string;
}) {
  if (!SHOW_PLACEHOLDERS) return null;
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}`}
      className={cn(
        "flex w-full items-center justify-center border-2 border-dashed border-line-strong bg-grey-100 p-4 text-center text-small text-muted-foreground",
        ratioClass[ratio],
        className,
      )}
    >
      PLACEHOLDER (dev only): real photo needed
      <br />
      {label}
    </div>
  );
}
