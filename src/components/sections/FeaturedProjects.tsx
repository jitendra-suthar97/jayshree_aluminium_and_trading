import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ButtonLink } from "@/components/common/ButtonLink";
import { PhotoPlaceholder } from "@/components/common/SitePhoto";
import { ProjectGrid } from "@/components/features/ProjectGrid";
import { featuredProjects } from "@/data/projects";
import { SHOW_PLACEHOLDERS } from "@/lib/flags";

/** Shows only when there are at least 3 real featured projects (or in dev placeholder mode). */
export function hasFeaturedProjects(): boolean {
  return featuredProjects(6).length >= 3 || SHOW_PLACEHOLDERS;
}

export function FeaturedProjects() {
  const featured = featuredProjects(6);
  if (!hasFeaturedProjects()) return null;

  return (
    <Section tone="grey" labelledBy="featured-heading">
      <SectionHeading id="featured-heading">Our work</SectionHeading>
      {featured.length >= 3 ? (
        <ProjectGrid projects={featured} />
      ) : (
        <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3 lg:gap-6">
          {Array.from({ length: 6 }, (_, i) => (
            <li key={i}>
              <PhotoPlaceholder label={`Featured project photo ${i + 1} (real, finished work)`} />
            </li>
          ))}
        </ul>
      )}
      <div className="mt-8">
        <ButtonLink href="/projects/" variant="outline">
          View all projects
        </ButtonLink>
      </div>
    </Section>
  );
}
