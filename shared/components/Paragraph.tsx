import { cn } from "@/shared/utils/cn";

export function Paragraph({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-6 text-lg font-normal text-slate-300 lg:text-xl",
        className
      )}
    >
      {children}
    </p>
  );
}
