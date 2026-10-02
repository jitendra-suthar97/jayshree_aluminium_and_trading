import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Logo } from "@/components/common/Logo";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { footerCompanyLinks } from "@/data/nav";
import { mapDirectionsUrl, telHref, whatsappHref, whatsappMessages, whatsappVisible } from "@/lib/contact";

const heading = "mb-3 text-label font-semibold uppercase tracking-[0.06em] text-ink";
const link =
  "inline-flex min-h-10 items-center text-ink underline-offset-[3px] hover:text-blue-600 hover:underline";

/** White footer so the logo JPEG (near-white background) never shows a box. */
export function Footer() {
  const year = new Date().getFullYear();
  const a = site.address;

  return (
    <footer className="border-t border-line bg-white">
      <Container>
        <div className="grid gap-10 py-12 md:py-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:order-1 lg:col-span-4">
            <Logo lazy className="h-14 md:h-16" />
            <p className="mt-4 max-w-[34ch] text-body text-ink">{site.tagline}.</p>
          </div>

          <div className="lg:order-4 lg:col-span-3">
            <h2 className={heading}>Contact</h2>
            <address className="not-italic">
              <p>
                {a.line1}
                <br />
                {a.locality}, {a.district}
                <br />
                {a.region} {a.postalCode}
              </p>
            </address>
            <ul className="mt-3">
              {site.phones.map((p) => (
                <li key={p.e164}>
                  <a
                    href={telHref(p.e164)}
                    data-track="call_click"
                    data-placement="footer"
                    className={`${link} tabular-nums`}
                  >
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
                    data-placement="footer"
                    className={link}
                  >
                    WhatsApp
                  </a>
                </li>
              ) : null}
              <li>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className={link}>
                  Instagram {site.instagram.handle}
                </a>
              </li>
              <li>
                <a
                  href={mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="directions_click"
                  data-placement="footer"
                  className={link}
                >
                  Get directions
                </a>
              </li>
            </ul>
            {site.hours ? (
              <dl className="mt-3 text-small text-muted-foreground">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex gap-2">
                    <dt>{h.days}:</dt>
                    <dd>{h.hours}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-8 lg:contents">
            <div className="lg:order-2 lg:col-span-3">
              <h2 className={heading}>Services</h2>
              <ul>
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}/`} className={link}>
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:order-3 lg:col-span-2">
              <h2 className={heading}>Company</h2>
              <ul>
                {footerCompanyLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={link}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>

      <div className="bg-grey-100 py-4 text-small text-muted-foreground">
        <Container className="flex flex-wrap items-center justify-between gap-2">
          <p>
            &copy; {year} {site.name}
          </p>
          <Link href="/privacy/" className="underline underline-offset-[3px] hover:text-blue-600">
            Privacy
          </Link>
        </Container>
      </div>
    </footer>
  );
}
