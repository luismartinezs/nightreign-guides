import Image from "next/image";
import { HeadingH2 } from "@/shared/components/Heading";
import { SectionWrapper } from "@/shared/components/SectionWrapper";

export function GreatHollow({
  className,
  ...otherProps
}: React.ComponentPropsWithoutRef<"section">) {
  return (
    <SectionWrapper className={className} {...otherProps}>
      <HeadingH2>Great Hollow</HeadingH2>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <figure>
          <Image
            src="/features/great-hollow/great-hollow-top-crop.webp"
            alt="Great Hollow - Top view"
            width={800}
            height={600}
            className="rounded-lg"
          />
          <figcaption className="mt-2 text-center text-sm text-gray-400">
            Great Hollow - Top
          </figcaption>
        </figure>
        <figure>
          <Image
            src="/features/great-hollow/great-hollow-bot-crop.webp"
            alt="Great Hollow - Bottom view"
            width={800}
            height={600}
            className="rounded-lg"
          />
          <figcaption className="mt-2 text-center text-sm text-gray-400">
            Great Hollow - Bottom
          </figcaption>
        </figure>
      </div>
    </SectionWrapper>
  );
}
