import { Section, type Tone } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ButtonLink } from "@/components/common/ButtonLink";
import { ProcessList } from "./ProcessList";

export function HowItWorks({
  tone = "white",
  heading = "From measurement to installation",
}: {
  tone?: Tone;
  heading?: string;
}) {
  return (
    <Section tone={tone} labelledBy="process-heading">
      <SectionHeading id="process-heading">{heading}</SectionHeading>
      <ProcessList variant="short" />
      <div className="mt-8">
        <ButtonLink href="/how-we-work/" variant="outline">
          How we work
        </ButtonLink>
      </div>
    </Section>
  );
}
