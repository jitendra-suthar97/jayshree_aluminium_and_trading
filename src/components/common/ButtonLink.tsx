import Link from "next/link";
import type { ComponentProps, MouseEvent, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * App-level composition on top of the shadcn Button (asChild): renders a Next <Link> for internal paths
 * and a plain <a> for tel:, https:, and #anchors. Adds `external` (new tab, safe rel), an icon slot,
 * `fullWidth`, and analytics data attributes read by ClickTracker.
 */
export interface ButtonLinkProps extends Pick<ComponentProps<typeof Button>, "variant" | "size"> {
  href: string;
  external?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  track?: { event: string; placement: string };
  className?: string;
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  id?: string;
  "aria-label"?: string;
}

export function ButtonLink({
  href,
  external,
  fullWidth,
  icon,
  track,
  className,
  children,
  variant,
  size,
  onClick,
  id,
  "aria-label": ariaLabel,
}: ButtonLinkProps) {
  const shared = {
    id,
    onClick,
    "aria-label": ariaLabel,
    ...(track ? { "data-track": track.event, "data-placement": track.placement } : {}),
  };

  return (
    <Button asChild variant={variant} size={size} className={cn(fullWidth && "w-full", className)}>
      {href.startsWith("/") ? (
        <Link href={href} {...shared}>
          {icon}
          {children}
        </Link>
      ) : (
        <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...shared}>
          {icon}
          {children}
        </a>
      )}
    </Button>
  );
}
