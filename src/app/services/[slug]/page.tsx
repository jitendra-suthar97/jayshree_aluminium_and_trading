import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/metadata";
import { getService, getServices, services } from "@/data/services";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { whatsappMessages } from "@/lib/contact";
import { SHOW_PLACEHOLDERS } from "@/lib/flags";
import { Container } from "@/components/common/Container";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Section, type Tone } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ButtonLink } from "@/components/common/ButtonLink";
import { SitePhoto, PhotoPlaceholder } from "@/components/common/SitePhoto";
import { JsonLd } from "@/components/seo/JsonLd";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectGrid } from "@/components/features/ProjectGrid";
import { CallButton, WhatsAppButton } from "@/components/features/ContactButtons";
import { ProcessList } from "@/components/sections/ProcessList";
import { QuoteBand } from "@/components/sections/QuoteBand";
import { ServiceCard } from "@/components/sections/ServiceCard";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}/`,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const relatedProjects = projects.filter((p) => p.category === service.projectCategory);
  const hasUseCases = Boolean(service.useCases?.length);
  const hasMaterials = Boolean(service.materials?.length);
  const hasProjects = relatedProjects.length > 0 || SHOW_PLACEHOLDERS;
  const isCustom = service.slug === "custom-fabrication";

  // Alternate section surfaces (grey first after the white hero), skipping sections that are not shown
  let grey = true;
  const take = (): Tone => {
    const tone: Tone = grey ? "grey" : "white";
    grey = !grey;
    return tone;
  };
  const tVariants = take();
  const tUse = hasUseCases ? take() : "white";
  const tMaterials = hasMaterials ? take() : "white";
  const tProjects = hasProjects ? take() : "white";
  const tProcess = take();
  const tQuote = take();
  const tRelated = take();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.name,
          description: service.summary,
          url: `${site.url}/services/${service.slug}/`,
          provider: { "@type": "HomeAndConstructionBusiness", "@id": `${site.url}/#business`, name: site.name },
          ...(site.serviceAreas.length ? { areaServed: site.serviceAreas } : {}),
        }}
      />

      {/* 1-2. Breadcrumb and hero */}
      <section className="bg-white pb-10 pt-4 md:pb-14 lg:pb-16">
        <Container>
          <Breadcrumbs items={[{ label: "Services", href: "/services/" }, { label: service.name }]} />
          <div className="mt-4 grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className={service.image || SHOW_PLACEHOLDERS ? "lg:col-span-6" : "lg:col-span-9"}>
              <h1 className="text-h1 font-bold">{service.h1}</h1>
              <p className="mt-4 max-w-[52ch] text-body-lg text-ink">{service.intro}</p>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
                <CallButton placement={`service-${service.slug}`} className="col-span-2 sm:col-span-1" />
                <WhatsAppButton placement={`service-${service.slug}`} message={whatsappMessages.service(service.name)} />
                <ButtonLink href="#quote" variant="outline" size="lg" className="col-span-2 sm:col-span-1">
                  Request Quote
                </ButtonLink>
              </div>
            </div>
            {service.image ? (
              <div className="lg:col-span-6">
                <SitePhoto
                  photo={service.image}
                  ratio="4/3"
                  priority
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="md:aspect-[16/9] rounded-sm"
                />
              </div>
            ) : SHOW_PLACEHOLDERS ? (
              <div className="lg:col-span-6">
                <PhotoPlaceholder ratio="4/3" label={`${service.name}: hero photo (16:9, mobile 4:3)`} className="md:aspect-[16/9]" />
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      {/* 3. What we make */}
      <Section tone={tVariants} labelledBy="variants-heading">
        <SectionHeading id="variants-heading">{isCustom ? "What the work covers" : "What we make"}</SectionHeading>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {service.variants.map((v) => (
            <li key={v.name}>
              <Card className="h-full">
                {v.image ? (
                  <SitePhoto photo={v.image} ratio="4/3" sizes="(min-width: 1024px) 360px, 50vw" className="rounded-t-md" />
                ) : null}
                <CardContent>
                  <p className="text-base font-semibold">{v.name}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      {/* 4. Where it is used (only when confirmed) */}
      {hasUseCases ? (
        <Section tone={tUse} labelledBy="use-heading">
          <SectionHeading id="use-heading">Where it is used</SectionHeading>
          <ul className="grid max-w-[44rem] list-disc gap-2 pl-5 text-body-lg text-ink">
            {service.useCases?.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* 5. Materials and options (only when confirmed) */}
      {hasMaterials ? (
        <Section tone={tMaterials} labelledBy="materials-heading">
          <SectionHeading id="materials-heading">Materials and options</SectionHeading>
          <dl className="grid max-w-[44rem] gap-3">
            {service.materials?.map((m) => (
              <div key={m.label} className="border-b border-line pb-3">
                <dt className="font-semibold text-ink">{m.label}</dt>
                <dd className="text-body text-ink">{m.value}</dd>
              </div>
            ))}
          </dl>
        </Section>
      ) : null}

      {/* 6. Related projects (real photos only) */}
      {hasProjects ? (
        <Section tone={tProjects} labelledBy="related-projects-heading">
          <SectionHeading id="related-projects-heading">{service.shortName} projects</SectionHeading>
          {relatedProjects.length > 0 ? (
            <>
              <ProjectGrid projects={relatedProjects.slice(0, 6)} />
              <div className="mt-8">
                <ButtonLink href={`/projects/?category=${service.projectCategory}`} variant="outline">
                  See all {service.shortName.toLowerCase()} projects
                </ButtonLink>
              </div>
            </>
          ) : (
            <ul className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-6">
              {Array.from({ length: 3 }, (_, i) => (
                <li key={i}>
                  <PhotoPlaceholder label={`${service.name}: real project photo ${i + 1}`} />
                </li>
              ))}
            </ul>
          )}
        </Section>
      ) : null}

      {/* 7. How it works */}
      <Section tone={tProcess} labelledBy="process-heading">
        <SectionHeading id="process-heading">How it works</SectionHeading>
        <ProcessList variant="short" />
        <p className="mt-8 text-body text-ink">
          Read more on the{" "}
          <Link href="/how-we-work/" className="text-blue-600 underline underline-offset-[3px] hover:text-blue-700">
            How we work
          </Link>{" "}
          page.
        </p>
      </Section>

      {/* 8. Quote block */}
      <QuoteBand
        tone={tQuote}
        service={service}
        heading={`Request a quote for ${service.name.toLowerCase()}`}
        lead="Tell us what you need. Call us, message us on WhatsApp or send the form."
      />

      {/* 9. Other services */}
      <Section tone={tRelated} labelledBy="related-services-heading">
        <SectionHeading id="related-services-heading">Other services</SectionHeading>
        <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
          {getServices(service.related).map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>
    </>
  );
}
