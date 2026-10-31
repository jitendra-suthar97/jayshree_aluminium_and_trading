import { Container } from "@/components/common/Container";
import { ButtonLink } from "@/components/common/ButtonLink";
import { SitePhoto } from "@/components/common/SitePhoto";
import { CallButton, WhatsAppButton } from "@/components/features/ContactButtons";
import { site } from "@/data/site";
import { whatsappMessages, whatsappVisible } from "@/lib/contact";
import { cn } from "@/lib/utils";

/** Quiet, editorial hero. Real owner photography appears only when supplied. */
export function Hero() {
  const photo = site.media.hero;

  return (
    <section aria-labelledby="hero-title" className="bg-white">
      <Container wide className="grid items-center gap-9 py-12 md:gap-12 md:py-16 lg:grid-cols-12 lg:gap-14 lg:py-24">
        <div className={cn("lg:col-span-6", photo ? "order-2 lg:order-1" : "lg:col-span-8")}>
          <p className="mb-5 flex items-center gap-3 text-label font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-px w-8 bg-brand-orange" aria-hidden />
            JAYSHREE Aluminium &amp; Trading · Sanchore
          </p>
          <h1 id="hero-title" className="max-w-[13ch] text-display font-semibold tracking-[-0.045em]">
            Spaces shaped in aluminium &amp; glass.
          </h1>
          <p className="mt-6 max-w-[52ch] text-body-lg text-muted-foreground">
            Thoughtfully fabricated doors, windows, partitions, kitchen cabinets and mirrors — measured for your space and finished at your site.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/contact/#quote" size="lg">
              Discuss your project
            </ButtonLink>
            <ButtonLink href="/projects/" variant="outline" size="lg">
              Explore our work
            </ButtonLink>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-5 text-small text-muted-foreground">
            <span>Made to measure</span>
            <span className="h-1 w-1 rounded-full bg-brand-orange" aria-hidden />
            <span>Fabricated in Sanchore</span>
            <span className="h-1 w-1 rounded-full bg-brand-orange" aria-hidden />
            <span>Installed at your site</span>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <CallButton placement="hero" />
            <WhatsAppButton placement="hero" message={whatsappMessages.general} />
          </div>
          <p className="mt-3 text-small text-muted-foreground">
            {site.phones.map((p) => p.display).join("  ·  ")}
          </p>
        </div>

        {photo ? (
          <div className="order-1 lg:order-2 lg:col-span-6">
            <SitePhoto
              photo={photo}
              ratio="4/5"
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="max-h-[680px]"
            />
          </div>
        ) : null}
      </Container>
    </section>
  );
}
