import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Until a real domain is set in NEXT_PUBLIC_SITE_URL, block crawlers so a staging URL is never indexed.
  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/thank-you/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
