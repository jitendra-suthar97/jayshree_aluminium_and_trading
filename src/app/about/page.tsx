import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { addressLine, mapDirectionsUrl } from "@/lib/contact";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ButtonLink } from "@/components/common/ButtonLink";
import { Container } from "@/components/common/Container";
import { SitePhoto } from "@/components/common/SitePhoto";
import { PageIntro } from "@/components/sections/PageIntro";
import { DealerBlock } from "@/components/sections/DealerBlock";
import { QuoteBand } from "@/components/sections/QuoteBand";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";

export const metadata = pageMetadata({
  title: "About JAYSHREE Aluminium & Trading | Sanchore",
  description:
    "JAYSHREE Aluminium & Trading is an aluminium and glass fabrication business at Suthar Samaj, Sanchore, Jalore, Rajasthan.",
  path: "/about/",
});

export default function AboutPage() {
  // Owner's own text if supplied; otherwise a factual default built only from confirmed facts.
  const intro =
    site.about.intro ??
    `${site.name} is an aluminium and glass fabrication business based at ${addressLine}. We make, fit and install aluminium and glass work for doors, windows, partitions, kitchen cabinets, decorative glass and mirrors.`;

  return (
    <>
      <LocalBusinessJsonLd />
      <PageIntro
        breadcrumbs={<Breadcrumbs items={[{ label: "About" }]} />}
        title={`About ${site.name}`}
        lead={intro}
      />

      {site.media.shopFront ? (
        <section className="bg-white pb-14 md:pb-18">
          <Container>
            <SitePhoto
              photo={site.media.shopFront}
              ratio="3/2"
              priority
              sizes="(min-width: 1200px) 1100px, 100vw"
              className="md:aspect-[16/9] rounded-sm"
            />
          </Container>
        </section>
      ) : null}

      <Section tone="grey" labelledBy="what-we-do-heading">
        <SectionHeading id="what-we-do-heading" lead="We work only with aluminium and glass.">
          What we do
        </SectionHeading>
        <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}/`}
                className="inline-flex min-h-12 items-center text-base font-semibold text-blue-600 underline underline-offset-[3px] hover:text-blue-700"
              >
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {site.media.workshop.length > 0 ? (
        <Section labelledBy="workshop-heading">
          <SectionHeading id="workshop-heading">Our workshop</SectionHeading>
          <ul className="grid gap-4 md:grid-cols-3">
            {site.media.workshop.slice(0, 3).map((p) => (
              <li key={p.src}>
                <SitePhoto photo={p} ratio="3/2" sizes="(min-width: 1024px) 360px, 100vw" className="rounded-sm" />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <DealerBlock />

      <Section tone="grey" labelledBy="find-us-heading">
        <SectionHeading id="find-us-heading">Find us</SectionHeading>
        <address className="not-italic text-body-lg text-ink">
          {site.name}
          <br />
          {site.address.line1}
          <br />
          {site.address.locality}, {site.address.district}
          <br />
          {site.address.region} {site.address.postalCode}
        </address>
        {site.hours ? (
          <dl className="mt-4 text-body text-ink">
            {site.hours.map((h) => (
              <div key={h.days} className="flex gap-2">
                <dt className="font-semibold">{h.days}:</dt>
                <dd>{h.hours}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href={mapDirectionsUrl} external variant="outline" track={{ event: "directions_click", placement: "about" }}>
            Get directions
          </ButtonLink>
          <ButtonLink href="/contact/" variant="outline">
            Contact us
          </ButtonLink>
        </div>
      </Section>

      <QuoteBand tone="white" />
    </>
  );
}
