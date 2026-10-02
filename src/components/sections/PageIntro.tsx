import { Container } from "@/components/common/Container";

/** Top of an inner page: optional breadcrumbs, one H1, optional lead and actions. */
export function PageIntro({
  breadcrumbs,
  title,
  lead,
  children,
}: {
  breadcrumbs?: React.ReactNode;
  title: string;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-white pb-10 pt-4 md:pb-12 md:pt-6 lg:pb-14">
      <Container>
        {breadcrumbs}
        <h1 className="mt-4 text-h1 font-bold">{title}</h1>
        {lead ? <p className="mt-4 max-w-[68ch] text-body-lg text-ink">{lead}</p> : null}
        {children ? <div className="mt-6">{children}</div> : null}
      </Container>
    </section>
  );
}
