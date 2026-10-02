import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/** Inline feedback (errors, success). A 4px left rule plus an icon, so meaning is never colour-only. */
const alertVariants = cva(
  "relative grid w-full grid-cols-[auto_1fr] items-start gap-x-3 gap-y-1 rounded-md border border-l-4 border-border bg-card p-4 text-body text-foreground [&>svg]:mt-0.5 [&>svg]:size-5 [&>svg~*]:col-start-2",
  {
    variants: {
      variant: {
        default: "border-l-primary [&>svg]:text-primary",
        destructive: "border-l-destructive [&>svg]:text-destructive",
        success: "border-l-success [&>svg]:text-success",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Alert({ className, variant, ...props }: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return <div data-slot="alert" role="alert" className={cn(alertVariants({ variant }), className)} {...props} />;
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-title" className={cn("col-start-2 font-semibold", className)} {...props} />;
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-description" className={cn("col-start-2 text-body", className)} {...props} />;
}

export { Alert, AlertTitle, AlertDescription };
