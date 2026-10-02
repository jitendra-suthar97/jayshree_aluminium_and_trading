import { Layers, MapPin, Ruler, Wrench } from "lucide-react";
import { Section } from "@/components/common/Section";

/** Only statements supported by what the business told us. No years, counts, awards or reviews. */
const items = [
  { icon: Layers, text: "Aluminium and glass only" },
  { icon: Ruler, text: "Made to your measurement" },
  { icon: Wrench, text: "Site measurement to installation" },
  { icon: MapPin, text: "Based in Sanchore, Jalore" },
];

export function TrustStrip() {
  return (
    <Section tone="grey" compact>
      <ul className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
        {items.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-start gap-3 bg-grey-100 p-4 md:p-5">
            <Icon size={24} strokeWidth={1.5} aria-hidden className="mt-0.5 shrink-0 text-ink" />
            <span className="text-base font-semibold leading-6 text-ink">{text}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
