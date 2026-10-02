import type { ProjectCategory, Service, ServiceSlug } from "@/types";

/**
 * The 7 service categories. Text here uses only facts supplied by the business.
 * `useCases` and `materials` are intentionally empty: add them only when the owner confirms them.
 */
export const services: Service[] = [
  {
    slug: "aluminium-doors-windows",
    name: "Aluminium Doors & Windows",
    shortName: "Doors & Windows",
    h1: "Aluminium Doors & Windows in Sanchore",
    metaTitle: "Aluminium Doors & Windows in Sanchore | JAYSHREE",
    metaDescription:
      "Aluminium section doors, windows and frames made to your measurement in Sanchore, Jalore. Request a quote from JAYSHREE Aluminium & Trading.",
    summary: "Aluminium section doors, windows and frames, made to your measurement and installed at your site.",
    intro:
      "JAYSHREE Aluminium & Trading makes aluminium section doors, windows and frames in Sanchore, Jalore. The work is made to your measurement, then fitted and installed at your site.",
    variants: [{ name: "Aluminium section doors" }, { name: "Aluminium windows" }, { name: "Aluminium frames" }],
    projectCategory: "doors-windows",
    related: ["sliding-doors-partitions", "glass-doors-partitions", "custom-fabrication"],
  },
  {
    slug: "sliding-doors-partitions",
    name: "Aluminium Sliding Doors & Partitions",
    shortName: "Sliding & Partitions",
    h1: "Aluminium Sliding Doors & Partitions in Sanchore",
    metaTitle: "Aluminium Sliding Doors & Partitions, Sanchore | JAYSHREE",
    metaDescription:
      "Aluminium sliding doors and aluminium partitions, fabricated and installed in Sanchore, Jalore. Request a quote from JAYSHREE Aluminium & Trading.",
    summary: "Aluminium sliding doors and partitions, fabricated to your measurement and installed at your site.",
    intro:
      "We fabricate aluminium sliding doors and aluminium partitions in Sanchore, Jalore. Each one is made to your measurement and installed at your site.",
    variants: [{ name: "Aluminium sliding doors" }, { name: "Aluminium partitions" }],
    projectCategory: "sliding-partitions",
    related: ["glass-doors-partitions", "aluminium-doors-windows", "custom-fabrication"],
  },
  {
    slug: "kitchen-aluminium-cabinets",
    name: "Kitchen & Aluminium Cabinets",
    shortName: "Kitchen & Cabinets",
    h1: "Aluminium Kitchen Cabinets in Sanchore",
    metaTitle: "Aluminium Kitchen Cabinets in Sanchore | JAYSHREE",
    metaDescription:
      "Aluminium kitchen cabinets and cabinet framing made to measure in Sanchore, Jalore. Request a quote from JAYSHREE Aluminium & Trading.",
    summary: "Kitchen aluminium cabinets and aluminium cabinet framing, made to measure.",
    intro:
      "We make kitchen aluminium cabinets and aluminium cabinet framing in Sanchore, Jalore, made to the measurements of your space.",
    variants: [{ name: "Kitchen aluminium cabinets" }, { name: "Aluminium cabinet framing" }],
    projectCategory: "kitchen-cabinets",
    related: ["custom-fabrication", "glass-doors-partitions", "aluminium-doors-windows"],
  },
  {
    slug: "glass-doors-partitions",
    name: "Glass Doors & Partitions",
    shortName: "Glass",
    h1: "Glass Doors & Partitions in Sanchore",
    metaTitle: "Glass Doors & Partitions in Sanchore | JAYSHREE",
    metaDescription:
      "Glass doors, glass partitions and clear glass, fitted and installed in Sanchore, Jalore. Request a quote from JAYSHREE Aluminium & Trading.",
    summary: "Glass doors, glass partitions and clear glass, with glass fitting and hardware installation.",
    intro:
      "We work with glass doors, glass partitions and clear glass in Sanchore, Jalore, including glass fitting and hardware installation at your site.",
    variants: [{ name: "Glass doors" }, { name: "Glass partitions" }, { name: "Clear glass" }],
    projectCategory: "glass",
    related: ["sliding-doors-partitions", "decorative-glass", "aluminium-doors-windows"],
  },
  {
    slug: "decorative-glass",
    name: "Decorative Glass",
    shortName: "Decorative Glass",
    h1: "Fluted, Etched & Decorative Glass in Sanchore",
    metaTitle: "Fluted & Decorative Glass in Sanchore | JAYSHREE",
    metaDescription:
      "Fluted (reeded) glass, etched glass and decorative glass in Sanchore, Jalore. Request a quote from JAYSHREE Aluminium & Trading.",
    summary: "Fluted (reeded) glass, etched glass and other decorative glass.",
    intro:
      "JAYSHREE Aluminium & Trading works with fluted (reeded) glass, etched glass and other decorative glass in Sanchore, Jalore, fitted at your site.",
    variants: [{ name: "Fluted / reeded glass" }, { name: "Etched glass" }, { name: "Decorative glass" }],
    projectCategory: "decorative-glass",
    related: ["glass-doors-partitions", "mirrors", "custom-fabrication"],
  },
  {
    slug: "mirrors",
    name: "Mirrors",
    shortName: "Mirrors",
    h1: "Decorative & LED Vanity Mirrors in Sanchore",
    metaTitle: "Decorative & LED Vanity Mirrors, Sanchore | JAYSHREE",
    metaDescription:
      "Decorative mirrors and LED vanity mirrors in Sanchore, Jalore. Request a quote from JAYSHREE Aluminium & Trading.",
    summary: "Decorative mirrors and LED vanity mirrors.",
    intro: "JAYSHREE Aluminium & Trading makes decorative mirrors and LED vanity mirrors in Sanchore, Jalore.",
    variants: [{ name: "Decorative mirrors" }, { name: "LED vanity mirrors" }],
    projectCategory: "mirrors",
    related: ["decorative-glass", "custom-fabrication", "glass-doors-partitions"],
  },
  {
    slug: "custom-fabrication",
    name: "Custom Fabrication",
    shortName: "Custom",
    h1: "Custom Aluminium & Glass Fabrication in Sanchore",
    metaTitle: "Custom Aluminium & Glass Fabrication, Sanchore | JAYSHREE",
    metaDescription:
      "Custom aluminium and glass fabrication in Sanchore, Jalore: site measurement, fabrication, glass fitting, hardware and site installation.",
    summary: "Custom aluminium and glass work made to your requirement, from site measurement to installation.",
    intro:
      "If you need aluminium or glass work that is not a standard item, tell us what you need. The work covers site measurement, fabrication, glass fitting, hardware installation and site installation.",
    variants: [
      { name: "Custom aluminium and glass fabrication" },
      { name: "Site measurement" },
      { name: "Fabrication" },
      { name: "Glass fitting" },
      { name: "Hardware installation" },
      { name: "Site installation" },
    ],
    projectCategory: "custom",
    related: ["aluminium-doors-windows", "glass-doors-partitions", "kitchen-aluminium-cabinets"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function serviceForCategory(category: ProjectCategory): Service | undefined {
  return services.find((s) => s.projectCategory === category);
}

export function getServices(slugs: ServiceSlug[]): Service[] {
  return slugs.map((s) => getService(s)).filter((s): s is Service => Boolean(s));
}

/** Category order = service order. */
export const categoryOrder: ProjectCategory[] = services.map((s) => s.projectCategory);
