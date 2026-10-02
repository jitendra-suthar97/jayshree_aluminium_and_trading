import { Container } from "@/components/common/Container";
import { CopyNumber } from "@/components/features/CopyNumber";
import { site } from "@/data/site";
import { telHref } from "@/lib/contact";

/** Desktop only. Ink bar with the two phone numbers (with copy buttons) and the location. */
export function TopBar() {
  return (
    <div className="hidden bg-ink text-small text-white lg:block">
      <Container wide className="flex h-9 items-center justify-between">
        <p className="flex items-center gap-5">
          {site.phones.map((p) => (
            <span key={p.e164} className="inline-flex items-center gap-1">
              <a
                href={telHref(p.e164)}
                data-track="call_click"
                data-placement="topbar"
                className="tabular-nums underline-offset-[3px] hover:underline"
              >
                {p.display}
              </a>
              <CopyNumber value={p.display} label={p.display} />
            </span>
          ))}
        </p>
        <p>
          {site.address.locality}, {site.address.district}, {site.address.region}
        </p>
      </Container>
    </div>
  );
}
