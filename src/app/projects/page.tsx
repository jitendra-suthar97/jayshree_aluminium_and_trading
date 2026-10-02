import { Suspense } from "react";
import { pageMetadata } from "@/lib/metadata";
import { projects } from "@/data/projects";
import { SHOW_PLACEHOLDERS } from "@/lib/flags";
import { whatsappMessages } from "@/lib/contact";
import { Section } from "@/components/common/Section";
import { PhotoPlaceholder } from "@/components/common/SitePhoto";
import { PageIntro } from "@/components/sections/PageIntro";
import { QuoteBand } from "@/components/sections/QuoteBand";
import { ProjectsGallery } from "@/components/features/ProjectsGallery";
import { CallButton, WhatsAppButton } from "@/components/features/ContactButtons";

export const metadata = pageMetadata({
  title: "Aluminium & Glass Projects | JAYSHREE Sanchore",
  description:
    "Photos of aluminium and glass work by JAYSHREE Aluminium & Trading in Sanchore, Jalore: doors, windows, partitions, kitchen cabinets, glass and mirrors.",
  path: "/projects/",
});

export default function ProjectsPage() {
  const hasProjects = projects.length > 0;
  return (
    <>
      <PageIntro
        title="Our work"
        lead={
          hasProjects
            ? "Photos of completed aluminium and glass work."
            : "Photos of our completed work will be added here. To see our work now, call us or message us on WhatsApp."
        }
      >
        {!hasProjects ? (
          <div className="grid gap-3 sm:flex sm:flex-wrap">
            <CallButton placement="projects-empty" />
            <WhatsAppButton placement="projects-empty" message={whatsappMessages.general} />
          </div>
        ) : null}
      </PageIntro>

      {hasProjects ? (
        <Section tone="grey" labelledBy="gallery-heading">
          <h2 id="gallery-heading" className="sr-only">
            Project photos
          </h2>
          <Suspense fallback={null}>
            <ProjectsGallery projects={projects} />
          </Suspense>
        </Section>
      ) : SHOW_PLACEHOLDERS ? (
        <Section tone="grey">
          <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3 lg:gap-6">
            {Array.from({ length: 6 }, (_, i) => (
              <li key={i}>
                <PhotoPlaceholder label={`Project photo ${i + 1} (real, finished work)`} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <QuoteBand tone={hasProjects || SHOW_PLACEHOLDERS ? "white" : "grey"} />
    </>
  );
}
