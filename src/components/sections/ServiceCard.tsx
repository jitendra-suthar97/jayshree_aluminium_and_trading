import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Service } from "@/types";
import { SitePhoto } from "@/components/common/SitePhoto";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

/** shadcn Card. The whole card is one link (stretched link). Text-only when no real photo exists. */
export function ServiceCard({ service, showVariants = false }: { service: Service; showVariants?: boolean }) {
  return (
    <Card className="group relative h-full transition-colors duration-150 hover:border-primary has-[a:focus-visible]:shadow-[var(--shadow-focus)]">
      {service.image ? (
        <SitePhoto
          photo={service.image}
          ratio="4/3"
          sizes="(min-width: 1024px) 280px, (min-width: 768px) 33vw, 50vw"
          className="rounded-t-md"
        />
      ) : null}
      <CardContent className="flex flex-1 flex-col">
        <CardTitle>
          <Link
            href={`/services/${service.slug}/`}
            className="rounded-md after:absolute after:inset-0 group-hover:text-primary focus-visible:shadow-none"
          >
            {service.name}
          </Link>
        </CardTitle>
        <CardDescription className="mt-2">{service.summary}</CardDescription>
        {showVariants ? (
          <ul className="mt-3 list-disc pl-5 text-[15px] leading-6">
            {service.variants.map((v) => (
              <li key={v.name}>{v.name}</li>
            ))}
          </ul>
        ) : null}
        <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[15px] font-semibold text-primary">
          View details <ChevronRight size={16} aria-hidden />
        </span>
      </CardContent>
    </Card>
  );
}
