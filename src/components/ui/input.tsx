import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * 48px field, 16px text (stops iOS zoom), 1px control border (4.8:1).
 * Invalid state: border + inner 1px outline (no layout shift, keeps the global focus ring visible).
 */
const fieldBase =
  "w-full rounded-md border border-input bg-background px-3.5 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-destructive aria-invalid:outline-1 aria-invalid:-outline-offset-1 aria-invalid:outline-destructive";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return <input type={type} data-slot="input" className={cn(fieldBase, "h-12", className)} {...props} />;
}

export { Input, fieldBase };
