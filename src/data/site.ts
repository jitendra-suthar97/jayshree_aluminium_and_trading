import type { SiteConfig } from "@/types";

/**
 * Single source of truth for business information.
 * Change a phone number, the address or Instagram here and it updates everywhere.
 * Anything marked PENDING is unverified and is hidden from the UI until confirmed.
 */
export const site: SiteConfig = {
  name: "JAYSHREE Aluminium & Trading",
  shortName: "JAYSHREE",
  tagline: "Aluminium and glass fabrication in Sanchore, Jalore",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),

  address: {
    line1: "Shop No. 1, Suthar Samaj",
    locality: "Sanchore",
    district: "Jalore",
    region: "Rajasthan",
    postalCode: "343041",
    country: "IN",
  },

  phones: [
    { display: "+91 99832 72985", e164: "+919983272985" },
    { display: "+91 94132 72985", e164: "+919413272985" },
  ],
  // PENDING: confirm which number the Call buttons should dial. Defaults to the first.
  primaryPhoneIndex: 1,

  whatsapp: {
    // PENDING: confirm WHICH number is on WhatsApp, then set confirmed: true.
    // While confirmed is false, WhatsApp buttons are hidden in production builds.
    number: "+919983272985",
    confirmed: true,
  },

  instagram: {
    handle: "@jayshree_aluminium_and_trading",
    url: "https://www.instagram.com/jayshree_aluminium_and_trading/",
  },

  // PENDING: business hours. Example once confirmed:
  // hours: [{ days: "Monday to Saturday", hours: "9:00 am to 7:00 pm" }]
  hours: null,

  // PENDING: dealer company name, authorised wording and logo permission.
  // Do not fill in from memory. Copy exact wording from the dealership documents.
  dealer: { verified: false, wording: null },

  // PENDING: towns actually served, e.g. ["Sanchore"]. Empty = not shown anywhere.
  serviceAreas: ["Sanchore", "Jalore", "Bhinmal", "Raniwara", "Barmer", "Jodhpur"],

  // PENDING: Google Maps link from the Google Business Profile. null = address search link.
  mapUrl: null,

  about: {
    // PENDING: the owner's own introduction (60-100 words). null = factual default text.
    intro: null,
  },

  media: {
    // PENDING real photos. See public/images/README.md for folders and sizes.
    hero: null,
    shopFront: null,
    workshop: [],
    instagram: [],
  },

  analytics: { gaId: process.env.NEXT_PUBLIC_GA_ID ?? "" },
  form: { accessKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "f5956f5f-b5b0-4146-9d37-b65c102088b0" },
};
