import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { services } from "@/data/services";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/services/",
    ...services.map((s) => `/services/${s.slug}/`),
    "/projects/",
    "/about/",
    "/how-we-work/",
    "/contact/",
    "/privacy/",
  ];
  return paths.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path.startsWith("/services/") ? 0.8 : 0.6,
  }));
}
