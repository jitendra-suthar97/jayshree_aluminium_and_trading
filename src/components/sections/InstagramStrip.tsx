import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SitePhoto } from "@/components/common/SitePhoto";
import { ButtonLink } from "@/components/common/ButtonLink";
import { site } from "@/data/site";

/** Static, self-hosted photos linking out to Instagram (no embed scripts). Hidden until 3+ photos exist. */
export function InstagramStrip() {
  const photos = site.media.instagram.slice(0, 6);
  if (photos.length < 3) return null;
  return (
    <Section labelledBy="instagram-heading">
      <SectionHeading id="instagram-heading">On Instagram</SectionHeading>
      <ul className="grid grid-cols-3 gap-2 lg:grid-cols-6 lg:gap-3">
        {photos.map((p) => (
          <li key={p.src}>
            <SitePhoto photo={p} ratio="1/1" sizes="(min-width: 1024px) 180px, 33vw" className="rounded-sm" />
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <ButtonLink href={site.instagram.url} external variant="outline">
          Follow {site.instagram.handle}
        </ButtonLink>
      </div>
    </Section>
  );
}
