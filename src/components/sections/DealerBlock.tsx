import { Section } from "@/components/common/Section";
import { site } from "@/data/site";
import { SHOW_PLACEHOLDERS } from "@/lib/flags";

/**
 * Authorised-dealer statement. Renders ONLY when data/site.ts has dealer.verified = true AND exact wording.
 * Nothing here is assumed. A dealer logo is intentionally not supported until permission is confirmed.
 */
export function DealerBlock() {
  const { verified, wording } = site.dealer;

  if (!verified || !wording) {
    if (!SHOW_PLACEHOLDERS) return null;
    return (
      <Section compact>
        <p className="border-2 border-dashed border-line-strong p-4 text-small text-muted-foreground">
          PLACEHOLDER (dev only): the authorised dealer block is hidden until the dealership wording is verified.
        </p>
      </Section>
    );
  }

  return (
    <Section compact labelledBy="dealer-heading">
      <h2 id="dealer-heading" className="text-h3 font-semibold">
        Authorised dealer
      </h2>
      <p className="mt-2 max-w-[68ch] text-body-lg text-ink">{wording}</p>
    </Section>
  );
}
