import { cn } from "@/shared/utils/cn";
import React from "react";
import { Link, type LinkProps } from "@/shared/components/Link";

export function PrimaryLink(
  props: LinkProps
) {
  return (
    <Link
      {...props}
      className={cn("hover:opacity-70", props.className)}
    >
      {props.children}
    </Link>
  );
}
