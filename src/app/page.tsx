import { pageMetadata } from "@/lib/metadata";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FeaturedProjects, hasFeaturedProjects } from "@/components/sections/FeaturedProjects";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { DealerBlock } from "@/components/sections/DealerBlock";
import { InstagramStrip } from "@/components/sections/InstagramStrip";
import { QuoteBand } from "@/components/sections/QuoteBand";

export const metadata = pageMetadata({
  title: "Aluminium & Glass Fabrication in Sanchore | JAYSHREE",
  description:
    "Aluminium doors, windows, partitions, kitchen cabinets, glass and mirrors in Sanchore, Jalore. Call JAYSHREE Aluminium & Trading to request a quote.",
  path: "/",
});

export default function HomePage() {
  // Keep the white / grey rhythm intact when the featured-projects section is hidden
  const featured = hasFeaturedProjects();
  return (
    <>
      <LocalBusinessJsonLd />
      <Hero />
      <TrustStrip />
      <ServicesGrid />
      <FeaturedProjects />
      <HowItWorks tone={featured ? "white" : "grey"} />
      <DealerBlock />
      <InstagramStrip />
      <QuoteBand tone={featured ? "grey" : "white"} />
    </>
  );
}
