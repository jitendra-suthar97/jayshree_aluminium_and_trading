import type { Metadata } from "next";
import { site } from "@/data/site";

/** Per-page metadata. Titles are absolute (already include the brand). Canonical paths are relative to metadataBase. */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: site.name, locale: "en_IN", title, description, url: path },
    // No og:image until a real photograph exists (the logo canvas is not used as a share image).
    twitter: { card: "summary", title, description },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
