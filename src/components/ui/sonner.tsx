"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

/** shadcn/ui Sonner toaster, flattened to the Stage 3 look (4px radius, 1px border, one popover shadow). */
function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="light"
      position="bottom-center"
      toastOptions={{
        classNames: {
          toast: "!rounded-md !border !border-border !bg-card !text-foreground !shadow-pop !font-body !text-[15px]",
          description: "!text-muted-foreground",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
