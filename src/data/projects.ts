import type { Project } from "@/types";

/**
 * REAL completed projects only. Empty until real photos are supplied.
 * No stock photos, no AI-generated images, no invented titles or locations.
 *
 * To add a project:
 * 1. Put the compressed photo in public/images/projects/<category>/ (see public/images/README.md)
 * 2. Add one entry below. Example (do not uncomment unless the photo is real):
 *
 *   {
 *     id: "glass-fluted-partition-01",
 *     title: "Fluted glass partition",
 *     category: "decorative-glass",
 *     image: {
 *       src: "/images/projects/decorative-glass/decorative-glass-fluted-partition-01.jpg",
 *       alt: "Fluted glass partition with an aluminium frame",
 *       width: 1600,
 *       height: 1200,
 *       focalPoint: { x: 50, y: 40 },
 *     },
 *     featured: true,
 *     // town: "Sanchore", townConsent: true,   // only with the client's permission
 *   },
 */
export const projects: Project[] = [];

export function featuredProjects(limit = 6): Project[] {
  return projects.filter((p) => p.featured).slice(0, limit);
}
