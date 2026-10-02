import { site } from "@/data/site";
import { SHOW_PLACEHOLDERS } from "./flags";

export const primaryPhone = site.phones[site.primaryPhoneIndex] ?? site.phones[0]!;

export const telHref = (e164: string) => `tel:${e164}`;

/** WhatsApp CTAs render only once the number is confirmed (or in dev placeholder mode). */
export const whatsappVisible = site.whatsapp.confirmed || SHOW_PLACEHOLDERS;

export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${site.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const whatsappMessages = {
  general: `Hello ${site.name}, I would like to enquire about your work.`,
  siteMeasurement: `Hello ${site.name}, I would like to request a site measurement.`,
  service: (serviceName: string) => `Hello ${site.name}, I would like a quote for ${serviceName}.`,
  project: (title: string) =>
    `Hello ${site.name}, I saw "${title}" on your website and want something similar.`,
};

export const addressLine = [
  site.address.line1,
  site.address.locality,
  site.address.district,
  `${site.address.region} ${site.address.postalCode}`,
].join(", ");

const query = encodeURIComponent(`${site.name}, ${addressLine}`);

/** Uses the confirmed map link if set, otherwise a Google Maps search on the address. */
export const mapOpenUrl = site.mapUrl ?? `https://www.google.com/maps/search/?api=1&query=${query}`;
export const mapDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
export const mapEmbedUrl = `https://www.google.com/maps?q=${query}&output=embed`;
