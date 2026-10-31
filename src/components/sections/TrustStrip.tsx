import { Layers, MapPin, Ruler, Wrench } from "lucide-react";
import { Section } from "@/components/common/Section";

/** Practical brand proof points, without unverified awards, years or review counts. */
const items = [
  { icon: Layers, text: "Aluminium and glass" },
  { icon: Ruler, text: "Made to your measurement" },
  { icon: Wrench, text: "From fabrication to fitting" },
  { icon: MapPin, text: "Based in Sanchore, Jalore" },
];

export function TrustStrip() {
  return (
    <Section tone="grey" compact>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-4">
        {items.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-3 bg-transparent py-2">
            <Icon size={21} strokeWidth={1.4} aria-hidden className="shrink-0 text-brand-orange" />
            <span className="text-sm font-medium leading-5 text-ink">{text}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
