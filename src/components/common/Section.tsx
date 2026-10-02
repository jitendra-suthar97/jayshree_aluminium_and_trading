import { cn } from "@/lib/utils";
import { Container } from "./Container";

export type Tone = "white" | "grey";

export function Section({
  tone = "white",
  id,
  className,
  children,
  compact = false,
  labelledBy,
}: {
  tone?: Tone;
  id?: string;
  className?: string;
  children: React.ReactNode;
  compact?: boolean;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        tone === "grey" ? "bg-grey-100" : "bg-white",
        compact ? "py-8 md:py-10" : "py-14 md:py-18 lg:py-24",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
