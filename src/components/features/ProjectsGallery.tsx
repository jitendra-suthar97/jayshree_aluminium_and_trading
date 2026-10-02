"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Project, ProjectCategory } from "@/types";
import { categoryOrder, serviceForCategory } from "@/data/services";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ProjectGrid } from "./ProjectGrid";

const PAGE_SIZE = 12;

/** shadcn ToggleGroup chips + grid + "Load more". Chips exist only for categories that have projects. */
export function ProjectsGallery({ projects }: { projects: Project[] }) {
  const params = useSearchParams();
  const present = categoryOrder.filter((c) => projects.some((p) => p.category === c));
  const fromUrl = params.get("category") as ProjectCategory | null;

  const [category, setCategory] = useState<ProjectCategory | "all">(fromUrl && present.includes(fromUrl) ? fromUrl : "all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = category === "all" ? projects : projects.filter((p) => p.category === category);
  const shown = filtered.slice(0, visible);

  function select(next: string) {
    if (!next) return; // clicking the selected chip again keeps it selected
    const value = next as ProjectCategory | "all";
    setCategory(value);
    setVisible(PAGE_SIZE);
    const url = new URL(window.location.href);
    if (value === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", value);
    window.history.replaceState(null, "", url);
  }

  return (
    <div>
      {present.length > 1 ? (
        <ToggleGroup
          type="single"
          value={category}
          onValueChange={select}
          aria-label="Filter projects by category"
          className="-mx-4 mb-6 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
        >
          <ToggleGroupItem value="all">All</ToggleGroupItem>
          {present.map((c) => (
            <ToggleGroupItem key={c} value={c}>
              {serviceForCategory(c)?.shortName ?? c}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      ) : null}

      <ProjectGrid projects={shown} />

      {filtered.length > shown.length ? (
        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            Load more
          </Button>
        </div>
      ) : null}
    </div>
  );
}
