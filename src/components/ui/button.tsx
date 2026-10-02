import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

/**
 * shadcn/ui Button, restyled to the JAYSHREE Stage 3 system:
 * 4px radius, no shadows, colour-only hover, 48px default touch target.
 * Extra variants: whatsapp (WhatsApp green, ink text) and inverse (for ink surfaces).
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-semibold whitespace-nowrap transition-colors duration-150 disabled:pointer-events-none disabled:bg-line disabled:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-blue-700 active:bg-blue-800",
        outline: "border-2 border-primary bg-background text-primary hover:bg-accent active:border-blue-800",
        secondary: "bg-secondary text-secondary-foreground hover:bg-line",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        link: "text-primary underline underline-offset-[3px] hover:text-blue-700",
        whatsapp: "bg-whatsapp text-ink hover:bg-whatsapp-hover active:bg-whatsapp-hover",
        inverse: "border-2 border-white text-white hover:bg-white hover:text-ink",
      },
      size: {
        default: "h-12 px-5 text-base",
        sm: "h-10 px-4 text-[15px]",
        lg: "h-14 px-6 text-[17px]",
        icon: "size-12",
      },
    },
    compoundVariants: [{ variant: "link", className: "h-auto rounded-sm p-0" }],
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };
