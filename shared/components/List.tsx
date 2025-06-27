import { cn } from "@/shared/utils/cn";
import type { ReactNode } from "react";

type ListVariant = "disc" | "none" | "decimal";

interface ListProps extends Omit<React.ComponentPropsWithoutRef<"ul">, "title"> {
  /**
   * Controls list marker style. Defaults to "disc" (unordered bullet).
   * "none" removes bullets and left padding. "decimal" renders an ordered list style.
   */
  variant?: ListVariant;
  /** Optional heading positioned immediately above the list */
  title?: ReactNode;
}

// List component: renders an optional title followed by a <ul> with configurable marker variant and spacing
export function List({ className, children, variant = "disc", title, ...other }: ListProps) {
  const variantClasses: Record<ListVariant, string> = {
    disc: "list-disc pl-5",
    none: "list-none pl-0",
    decimal: "list-decimal pl-5",
  };

  return (
    <>
      {title && <div className="mb-2">{title}</div>}
      <ul className={cn(variantClasses[variant], "space-y-2 mb-6", className)} {...other}>
        {children}
      </ul>
    </>
  );
}

// ListItem component: renders a <li> with subtle text styling
export function ListItem(
  props: React.ComponentPropsWithoutRef<"li">
) {
  const { className, children, ...other } = props;
  return (
    <li
      className={cn(
        "text-lg font-normal text-slate-300 hover:text-white transition-colors",
        className
      )}
      {...other}
    >
      {children}
    </li>
  );
}

// Allow importing both in a single statement
export const ListComponents = { List, ListItem };