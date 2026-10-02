import { Container } from "@/components/common/Container";
import { ButtonLink } from "@/components/common/ButtonLink";
import { SitePhoto, PhotoPlaceholder } from "@/components/common/SitePhoto";
import { CallButton, WhatsAppButton } from "@/components/features/ContactButtons";
import { site } from "@/data/site";
import { whatsappMessages, whatsappVisible } from "@/lib/contact";
import { SHOW_PLACEHOLDERS } from "@/lib/flags";
import { cn } from "@/lib/utils";

/** Split hero: solid white text panel + one real project photo. No text over the photo. */
export function Hero() {
  const photo = site.media.hero;
  const hasPhotoColumn = Boolean(photo) || SHOW_PLACEHOLDERS;

  return (
    <section aria-labelledby="hero-title" className="bg-white">
      <Container wide className="grid items-center gap-8 pb-10 md:pb-14 lg:grid-cols-12 lg:gap-12 lg:py-16">
        {hasPhotoColumn ? (
          <div className="order-1 -mx-4 md:-mx-6 lg:order-2 lg:col-span-7 lg:mx-0">
            {photo ? (
              <SitePhoto
                photo={photo}
                ratio="4/5"
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="md:aspect-[3/2] lg:rounded-sm"
              />
            ) : (
              <PhotoPlaceholder
                ratio="4/5"
                label="Hero: best finished aluminium + glass job (16:9 desktop crop, 4:5 mobile crop)"
                className="md:aspect-[3/2]"
              />
            )}
          </div>
        ) : null}

        <div className={cn("order-2 lg:order-1", hasPhotoColumn ? "lg:col-span-5" : "lg:col-span-8")}>
          <h1 id="hero-title" className="text-display font-bold tracking-[-0.01em]">
            Aluminium &amp; Glass Fabrication in Sanchore
          </h1>
          <p className="mt-5 max-w-[46ch] text-body-lg text-ink">
            Aluminium and glass doors, windows, partitions, kitchen cabinets and mirrors, with site measurement,
            fabrication and installation.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            <CallButton placement="hero" className={cn(!whatsappVisible && "col-span-2")} />
            <WhatsAppButton placement="hero" message={whatsappMessages.general} />
            <ButtonLink href="#quote" variant="outline" size="lg" className="col-span-2 sm:col-span-1">
              Request Site Measurement
            </ButtonLink>
          </div>

          <p className="mt-5 hidden text-small text-muted-foreground lg:block">
            Or call {site.phones.map((p) => p.display).join(" / ")}
          </p>
        </div>
      </Container>
    </section>
  );
}
