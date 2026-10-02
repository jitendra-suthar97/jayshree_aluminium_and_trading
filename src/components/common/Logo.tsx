import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * The official logo file, delivered EXACTLY as supplied (byte-identical to the file the owner provided).
 * It is never resized, re-encoded, optimised, traced, recoloured or cropped, so this is a plain <img>
 * (not next/image). Sizing is done only by CSS height: set it with `className` (for example "h-10").
 *
 * The PNG has a transparent background, but the brand blue and red are low-contrast on dark surfaces,
 * so the logo is only ever placed on white (header, footer, menu).
 *
 * When a vector (SVG) version arrives: replace the file in public/brand/ and update LOGO.src.
 */
export const LOGO = {
  src: "/brand/jayshree-logo.png",
  width: 1138,
  height: 552,
} as const;

export function Logo({ className, lazy = false }: { className?: string; lazy?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGO.src}
      alt={site.name}
      width={LOGO.width}
      height={LOGO.height}
      decoding="async"
      loading={lazy ? "lazy" : "eager"}
      draggable={false}
      className={cn("inline-block w-auto shrink-0 align-middle", className)}
    />
  );
}
