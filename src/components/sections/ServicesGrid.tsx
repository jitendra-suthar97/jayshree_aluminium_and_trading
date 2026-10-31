import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, type Tone } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { services } from "@/data/services";
import { ServiceCard } from "./ServiceCard";

export function ServicesGrid({
  tone = "white",
  heading = "What we make",
  lead,
  detailed = false,
}: {
  tone?: Tone;
  heading?: string;
  lead?: string;
  detailed?: boolean;
}) {
  return (
    <Section tone={tone} labelledBy="services-heading">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <SectionHeading id="services-heading" lead={lead} className="mb-0">
          {heading}
        </SectionHeading>
        {!detailed ? (
          <Link href="/services/" className="mb-1 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-foreground underline decoration-brand-orange underline-offset-4 hover:text-primary">
            View all services <ArrowUpRight size={16} aria-hidden />
          </Link>
        ) : null}
      </div>
      <div className={detailed ? "mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5" : "mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"}>
        {services.map((s, index) => (
          <ServiceCard key={s.slug} service={s} showVariants={detailed} />
        ))}
      </div>
    </Section>
  );
}
