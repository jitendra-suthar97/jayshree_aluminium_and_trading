import Link from "next/link";
import { ChevronRight } from "lucide-react";
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
  /** Detailed = hub page layout with variant lists and no "All services" tile. */
  detailed?: boolean;
}) {
  return (
    <Section tone={tone} labelledBy="services-heading">
      <SectionHeading id="services-heading" lead={lead}>
        {heading}
      </SectionHeading>
      <div
        className={
          detailed
            ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
            : "grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4 lg:gap-6"
        }
      >
        {services.map((s) => (
          <ServiceCard key={s.slug} service={s} showVariants={detailed} />
        ))}
        {!detailed ? (
          <Link
            href="/services/"
            className="flex min-h-24 items-center justify-center gap-1 rounded-md border border-line bg-white p-5 text-[17px] font-semibold text-blue-600 transition-colors duration-150 hover:border-blue-600"
          >
            All services <ChevronRight size={18} aria-hidden />
          </Link>
        ) : null}
      </div>
    </Section>
  );
}
