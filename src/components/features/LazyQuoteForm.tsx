"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { QuoteFormFallback } from "./QuoteFormFallback";
import { site } from "@/data/site";
import { primaryPhone } from "@/lib/contact";
import { cn } from "@/lib/utils";

// react-hook-form and the form components are only downloaded when the form is about to scroll into view.
const QuoteForm = dynamic(() => import("./QuoteForm").then((m) => m.QuoteForm), { ssr: false });

/** Keeps the quote form (and its JavaScript) off the critical path on every page. */
export function LazyQuoteForm({
  variant = "full",
  defaultService,
  placement = "form",
}: {
  variant?: "compact" | "full";
  defaultService?: string;
  placement?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const enabled = Boolean(site.form.accessKey);

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el || show) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [enabled, show]);

  if (!enabled) return <QuoteFormFallback placement={placement} />;

  return (
    <div ref={ref} className={cn(!show && (variant === "compact" ? "min-h-[22rem]" : "min-h-[34rem]"))}>
      {show ? (
        <QuoteForm variant={variant} defaultService={defaultService} placement={placement} />
      ) : (
        <noscript>
          <p className="text-body">The quote form needs JavaScript. Please call us on {primaryPhone.display}.</p>
        </noscript>
      )}
    </div>
  );
}
