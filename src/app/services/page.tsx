import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Section } from "@/components/common/Section";
import { ButtonLink } from "@/components/common/ButtonLink";
import { PageIntro } from "@/components/sections/PageIntro";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { QuoteBand } from "@/components/sections/QuoteBand";
import { CallButton, WhatsAppButton } from "@/components/features/ContactButtons";
import { whatsappMessages } from "@/lib/contact";

export const metadata = pageMetadata({
  title: "Aluminium & Glass Services in Sanchore | JAYSHREE",
  description:
    "Aluminium doors and windows, sliding doors, partitions, kitchen cabinets, glass, decorative glass, mirrors and custom fabrication in Sanchore, Jalore.",
  path: "/services/",
});

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        breadcrumbs={<Breadcrumbs items={[{ label: "Services" }]} />}
        title="Our services"
        lead="Aluminium and glass work for homes, shops and offices, made to your measurement and installed at your site."
      />
      <ServicesGrid tone="grey" heading="What we make" detailed />
      <Section labelledBy="custom-heading">
        <div className="max-w-[68ch]">
          <h2 id="custom-heading" className="text-h2 font-semibold">
            Something that is not on the list?
          </h2>
          <p className="mt-3 text-body-lg text-ink">
            We also take on custom aluminium and glass work. Tell us what you need and we will tell you whether we can
            make it.
          </p>
          <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
            <CallButton placement="services-custom" />
            <WhatsAppButton placement="services-custom" message={whatsappMessages.general} />
            <ButtonLink href="/services/custom-fabrication/" variant="outline" size="lg">
              About custom fabrication
            </ButtonLink>
          </div>
          <p className="mt-6 text-small text-muted-foreground">
            See how a job runs on the{" "}
            <Link href="/how-we-work/" className="text-blue-600 underline underline-offset-[3px]">
              How we work
            </Link>{" "}
            page.
          </p>
        </div>
      </Section>
      <QuoteBand tone="grey" />
    </>
  );
}
