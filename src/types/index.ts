export type ServiceSlug =
  | "aluminium-doors-windows"
  | "sliding-doors-partitions"
  | "kitchen-aluminium-cabinets"
  | "glass-doors-partitions"
  | "decorative-glass"
  | "mirrors"
  | "custom-fabrication";

export type ProjectCategory =
  | "doors-windows"
  | "sliding-partitions"
  | "kitchen-cabinets"
  | "glass"
  | "decorative-glass"
  | "mirrors"
  | "custom";

/** A real photograph. Never use stock or AI-generated images as a completed project. */
export interface PhotoAsset {
  /** Path under /public, e.g. "/images/projects/glass/glass-partition-01.jpg" */
  src: string;
  /** Describe what is actually visible in the photo. */
  alt: string;
  width: number;
  height: number;
  /** Where to keep the crop centred, in percent (0-100). Default: centre. */
  focalPoint?: { x: number; y: number };
}

export interface Phone {
  display: string;
  /** E.164 format, used in tel: links */
  e164: string;
}

export interface HoursRow {
  days: string;
  hours: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  url: string;
  address: {
    line1: string;
    locality: string;
    district: string;
    region: string;
    postalCode: string;
    country: string;
  };
  phones: Phone[];
  /** Index in `phones` that the Call buttons dial. PENDING: confirm with the business owner. */
  primaryPhoneIndex: number;
  whatsapp: {
    /** Digits only, with country code, e.g. 919876543210 */
    number: string;
    /** Set true only after confirming this number is on WhatsApp. */
    confirmed: boolean;
  };
  instagram: { handle: string; url: string };
  /** null = not confirmed, nothing is shown. */
  hours: HoursRow[] | null;
  dealer: {
    /** Set true only when the dealership paperwork has been checked. */
    verified: boolean;
    /** Exact authorised wording, copied from the dealership documents. */
    wording: string | null;
  };
  /** Towns actually served. Empty = nothing is shown or put in schema. */
  serviceAreas: string[];
  /** Google Maps link for the shop (from Google Business Profile). null = address search link is used. */
  mapUrl: string | null;
  about: {
    /** The owner's own 60-100 word introduction. null = a factual default is shown. */
    intro: string | null;
  };
  media: {
    hero: PhotoAsset | null;
    shopFront: PhotoAsset | null;
    workshop: PhotoAsset[];
    instagram: PhotoAsset[];
  };
  analytics: { gaId: string };
  form: { accessKey: string };
}

export interface ServiceVariant {
  name: string;
  image?: PhotoAsset;
}

export interface Service {
  slug: ServiceSlug;
  /** Full name, used in headings and the form dropdown */
  name: string;
  /** Short label for chips and tags */
  shortName: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** One line, used on cards and as the hero sub-line */
  summary: string;
  intro: string;
  variants: ServiceVariant[];
  projectCategory: ProjectCategory;
  related: ServiceSlug[];
  image?: PhotoAsset;
  /** Empty or omitted = the section is not rendered. Fill only with owner-confirmed facts. */
  useCases?: string[];
  materials?: { label: string; value: string }[];
}

export interface Project {
  id: string;
  /** Descriptive, e.g. "Fluted glass partition". No invented brand names. */
  title: string;
  category: ProjectCategory;
  image: PhotoAsset;
  featured?: boolean;
  /** Only shown when townConsent is true. */
  town?: string;
  townConsent?: boolean;
}

export interface ProcessStep {
  title: string;
  detail: string;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}
