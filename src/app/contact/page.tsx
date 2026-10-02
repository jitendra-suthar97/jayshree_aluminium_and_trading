import { pageMetadata } from "@/lib/metadata";
import { site } from "@/data/site";
import { addressLine, mapDirectionsUrl, mapOpenUrl, telHref, whatsappHref, whatsappMessages, whatsappVisible } from "@/lib/contact";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Section } from "@/components/common/Section";
import { ButtonLink } from "@/components/common/ButtonLink";
import { PageIntro } from "@/components/sections/PageIntro";
import { CallButton, WhatsAppButton } from "@/components/features/ContactButtons";
import { LazyQuoteForm } from "@/components/features/LazyQuoteForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapFacade } from "@/components/features/MapFacade";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";

export const metadata = pageMetadata({
  title: "Contact & Request Quote | JAYSHREE Aluminium, Sanchore",
  description:
    "Call, WhatsApp or send a form to request a quote or site measurement from JAYSHREE Aluminium & Trading, Suthar Samaj, Sanchore, Jalore.",
  path: "/contact/",
});

const linkClass =
  "inline-flex min-h-12 items-center text-base font-semibold text-blue-600 underline underline-offset-[3px] hover:text-blue-700 tabular-nums";

export default function ContactPage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <PageIntro
        breadcrumbs={<Breadcrumbs items={[{ label: "Contact" }]} />}
        title={`Contact ${site.name}`}
        lead="Call us, message us on WhatsApp or send the form to request a quote or a site measurement."
      >
        <div className="grid gap-3 sm:flex sm:flex-wrap">
          <CallButton placement="contact-top" />
          <WhatsAppButton placement="contact-top" message={whatsappMessages.siteMeasurement} />
        </div>
      </PageIntro>

      <Section tone="grey" labelledBy="quote-heading">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div id="quote" className="lg:col-span-7">
            <Card>
              <CardHeader className="pb-0">
                <h2 id="quote-heading" className="text-h3 font-semibold">
                  Request a quote or site measurement
                </h2>
              </CardHeader>
              <CardContent>
                <LazyQuoteForm variant="full" placement="contact" />
              </CardContent>
            </Card>
            <p className="mt-5 max-w-[60ch] text-body text-ink">
              To help us understand what you need, have these ready: the size of the opening or space, a photo of the
              area, and the type of work you want.
            </p>
          </div>

          <div className="lg:col-span-5">
            <h2 className="text-h3 font-semibold">Visit or call</h2>
            <address className="mt-3 not-italic text-body-lg text-ink">
              {site.name}
              <br />
              {site.address.line1}
              <br />
              {site.address.locality}, {site.address.district}
              <br />
              {site.address.region} {site.address.postalCode}
            </address>

            <ul className="mt-4">
              {site.phones.map((p) => (
                <li key={p.e164}>
                  <a href={telHref(p.e164)} data-track="call_click" data-placement="contact-list" className={linkClass}>
                    {p.display}
                  </a>
                </li>
              ))}
              {whatsappVisible ? (
                <li>
                  <a
                    href={whatsappHref(whatsappMessages.general)}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="whatsapp_click"
                    data-placement="contact-list"
                    className={linkClass}
                  >
                    WhatsApp
                  </a>
                </li>
              ) : null}
              <li>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Instagram {site.instagram.handle}
                </a>
              </li>
            </ul>

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
              <ButtonLink href={mapOpenUrl} external variant="outline" track={{ event: "directions_click", placement: "contact-open" }}>
                Open in Google Maps
              </ButtonLink>
              <ButtonLink href={mapDirectionsUrl} external variant="outline" track={{ event: "directions_click", placement: "contact" }}>
                Get directions
              </ButtonLink>
            </div>

            <div className="mt-6">
              <MapFacade />
              <p className="mt-2 text-small text-muted-foreground">{addressLine}</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
