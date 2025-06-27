export interface LinkProps extends React.ComponentPropsWithoutRef<"a"> {
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export function Link(props: LinkProps) {
  const { external, ...otherProps } = props;
  return <a {...otherProps} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>{props.children}</a>;
}