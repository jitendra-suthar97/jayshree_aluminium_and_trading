import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/types";
import { SitePhoto } from "@/components/common/SitePhoto";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

export function ServiceCard({ service, showVariants = false }: { service: Service; showVariants?: boolean }) {
  return (
    <Card className="group relative h-full border-0 border-t border-line bg-transparent shadow-none transition-colors duration-200 hover:border-brand-orange has-[a:focus-visible]:shadow-[var(--shadow-focus)]">
      {service.image ? (
        <SitePhoto
          photo={service.image}
          ratio="4/3"
          sizes="(min-width: 1024px) 280px, (min-width: 768px) 33vw, 50vw"
          className="mb-2"
        />
      ) : null}
      <CardContent className="flex flex-1 flex-col px-0 pb-5 pt-5">
        <CardTitle className="text-lg font-semibold tracking-[-0.02em]">
          <Link
            href={`/services/${service.slug}/`}
            className="rounded-sm after:absolute after:inset-0 group-hover:text-primary focus-visible:shadow-none"
          >
            {service.name}
          </Link>
        </CardTitle>
        <CardDescription className="mt-2 max-w-[42ch] text-sm leading-6">{service.summary}</CardDescription>
        {showVariants ? (
          <ul className="mt-3 list-disc pl-5 text-sm leading-6">
            {service.variants.map((v) => <li key={v.name}>{v.name}</li>)}
          </ul>
        ) : null}
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-foreground">
          Explore service <ArrowUpRight size={16} aria-hidden className="text-brand-orange transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </CardContent>
    </Card>
  );
}
