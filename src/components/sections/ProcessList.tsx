import { processSteps } from "@/data/process";
import { cn } from "@/lib/utils";

/**
 * Numbered steps (this content really is a sequence).
 * The square number tiles are one of only two places orange is allowed.
 */
export function ProcessList({ variant = "short" }: { variant?: "short" | "full" }) {
  const full = variant === "full";
  return (
    <ol
      className={cn(
        full
          ? "grid max-w-[44rem] gap-8"
          : "relative grid gap-6 lg:grid-cols-5 lg:before:absolute lg:before:left-5 lg:before:right-5 lg:before:top-5 lg:before:h-px lg:before:bg-line",
      )}
    >
      {processSteps.map((step, i) => (
        <li key={step.title} className={cn("flex gap-4", !full && "lg:block")}>
          <span
            aria-hidden
            className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center bg-brand-orange font-heading text-lg font-bold text-ink"
          >
            {i + 1}
          </span>
          <div className={cn(!full && "lg:mt-4")}>
            <h3 className="text-h4 font-semibold">
              <span className="sr-only">Step {i + 1}: </span>
              {step.title}
            </h3>
            <p className="mt-1 text-body text-ink">{step.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
