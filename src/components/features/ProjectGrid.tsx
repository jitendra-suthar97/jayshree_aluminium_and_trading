"use client";

import { useState } from "react";
import type { Project } from "@/types";
import { SitePhoto } from "@/components/common/SitePhoto";
import { Dialog } from "@/components/ui/dialog";
import { serviceForCategory } from "@/data/services";
import { cn } from "@/lib/utils";
import { Lightbox } from "./Lightbox";

/** Grid of real project photos. Each card opens the Dialog lightbox. Used on Home (featured), service pages and Projects. */
export function ProjectGrid({ projects, className }: { projects: Project[]; className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const close = () => setOpenIndex(null);

  return (
    <>
      <ul className={cn("grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3 lg:gap-6", className)}>
        {projects.map((p, i) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group block w-full rounded-sm text-left"
              aria-label={`View photo: ${p.title}`}
            >
              <SitePhoto photo={p.image} ratio="4/3" sizes="(min-width: 1024px) 380px, 50vw" className="rounded-sm" />
              <span className="mt-3 block text-base font-semibold underline-offset-[3px] group-hover:underline">{p.title}</span>
              <span className="block text-small text-muted-foreground">
                {serviceForCategory(p.category)?.shortName ?? p.category}
                {p.town && p.townConsent ? `, ${p.town}` : ""}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Dialog open={openIndex !== null} onOpenChange={(open) => !open && close()}>
        {openIndex !== null ? (
          <Lightbox items={projects} index={openIndex} onIndexChange={setOpenIndex} onNavigate={close} />
        ) : null}
      </Dialog>
    </>
  );
}
