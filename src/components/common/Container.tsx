import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  wide = false,
}: {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div className={cn("mx-auto w-full px-4 md:px-6 lg:px-8", wide ? "max-w-[80rem]" : "max-w-[75rem]", className)}>
      {children}
    </div>
  );
}
