import { JsonLd } from "./JsonLd";
import { site } from "@/data/site";

/**
 * LocalBusiness structured data built ONLY from verified fields in data/site.ts.
 * Deliberately absent: ratings, reviews, price range, founding date, awards, dealer claims, opening hours
 * (add opening hours here once the hours are confirmed).
 */
export function LocalBusinessJsonLd() {
  const a = site.address;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "HomeAndConstructionBusiness",
        "@id": `${site.url}/#business`,
        name: site.name,
        url: `${site.url}/`,
        description: `${site.tagline}.`,
        telephone: site.phones.map((p) => p.e164),
        address: {
          "@type": "PostalAddress",
          streetAddress: a.line1,
          addressLocality: a.locality,
          addressRegion: a.region,
          postalCode: a.postalCode,
          addressCountry: a.country,
        },
        sameAs: [site.instagram.url],
        ...(site.media.hero ? { image: `${site.url}${site.media.hero.src}` } : {}),
        ...(site.serviceAreas.length ? { areaServed: site.serviceAreas } : {}),
      }}
    />
  );
}
