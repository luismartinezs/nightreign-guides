import { cn } from "@/shared/utils/cn";

interface FixedBottomRightStackProps {
  children: React.ReactNode;
  className?: string;
  gap?: number;
}

export function FixedBottomRightStack({
  children,
  className,
}: FixedBottomRightStackProps) {
  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 flex items-end gap-2",
        className
      )}
    >
      {children}
    </div>
  );
}
