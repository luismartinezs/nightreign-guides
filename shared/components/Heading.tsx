import { cn } from "@/shared/utils/cn";

type HeadingProps = React.ComponentPropsWithoutRef<"h1">;

function HeadingH1({
  className,
  children,
  ...rest
}: HeadingProps & {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        className,
        "mb-4 text-3xl font-bold leading-none tracking-tight text-slate-50 md:text-4xl lg:text-5xl"
      )}
      {...rest}
    >
      {children}
    </h1>
  );
}

function HeadingH2({
  className,
  children,
  ...rest
}: HeadingProps & {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        className,
        "mb-4 text-2xl font-semibold leading-none tracking-tight text-slate-50 md:text-3xl lg:text-4xl"
      )}
      {...rest}
    >
      {children}
    </h2>
  );
}

function HeadingH3({
  className,
  children,
  ...rest
}: HeadingProps & {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        className,
        "mb-4 text-lg font-semibold leading-none tracking-tight text-slate-50 md:text-xl lg:text-2xl"
      )}
      {...rest}
    >
      {children}
    </h3>
  );
}

export const Heading = {
  H1: HeadingH1,
  H2: HeadingH2,
  H3: HeadingH3,
};

export { HeadingH1, HeadingH2, HeadingH3 };