import { Fragment } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/data/site";

export interface Crumb {
  label: string;
  href?: string;
}

/** shadcn Breadcrumb + BreadcrumbList JSON-LD. On phones it collapses to a single back link. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  const current = trail[trail.length - 1];
  const parent = [...trail].reverse().find((c) => c.href && c !== current);

  return (
    <Breadcrumb>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: trail.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            ...(c.href ? { item: `${site.url}${c.href}` } : {}),
          })),
        }}
      />
      {parent?.href ? (
        <BreadcrumbLink asChild className="inline-flex min-h-12 items-center gap-1 text-small md:hidden">
          <Link href={parent.href}>
            <ChevronLeft size={16} aria-hidden /> {parent.label}
          </Link>
        </BreadcrumbLink>
      ) : null}
      <BreadcrumbList className="hidden md:flex">
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <Fragment key={c.label}>
              <BreadcrumbItem>
                {c.href && !last ? (
                  <BreadcrumbLink asChild>
                    <Link href={c.href}>{c.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{c.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!last ? <BreadcrumbSeparator /> : null}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
