import { pageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Section } from "@/components/common/Section";
import { ButtonLink } from "@/components/common/ButtonLink";
import { PageIntro } from "@/components/sections/PageIntro";
import { ProcessList } from "@/components/sections/ProcessList";
import { QuoteBand } from "@/components/sections/QuoteBand";

export const metadata = pageMetadata({
  title: "How We Work: Measurement to Installation | JAYSHREE",
  description:
    "How JAYSHREE Aluminium & Trading works: enquiry, site measurement, fabrication, glass fitting and hardware, and site installation in Sanchore, Jalore.",
  path: "/how-we-work/",
});

export default function HowWeWorkPage() {
  return (
    <>
      <PageIntro
        breadcrumbs={<Breadcrumbs items={[{ label: "How we work" }]} />}
        title="How we work"
        lead="From your first call to installation at your site."
      />
      <Section tone="grey" labelledBy="steps-heading">
        <h2 id="steps-heading" className="sr-only">
          Steps
        </h2>
        <ProcessList variant="full" />
        <div className="mt-10">
          <ButtonLink href="#quote" size="lg">
            Request Site Measurement
          </ButtonLink>
        </div>
      </Section>
      <QuoteBand tone="white" heading="Ready to start?" />
    </>
  );
}
