import { cn } from "@/lib/utils";

export function SectionHeading({
  id,
  children,
  lead,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-6 md:mb-8 lg:mb-10", className)}>
      <h2 id={id} className="text-h2 font-semibold">
        {children}
      </h2>
      {lead ? <p className="mt-3 max-w-[68ch] text-body-lg text-muted-foreground">{lead}</p> : null}
    </div>
  );
}
