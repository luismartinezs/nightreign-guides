export interface LinkProps extends React.ComponentPropsWithoutRef<"a"> {
  children: React.ReactNode;
  className?: string;
}

export function Link(props: LinkProps) {
  return <a {...props}>{props.children}</a>;
}