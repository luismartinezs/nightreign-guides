import { SectionWrapper } from "@/shared/components/SectionWrapper";
import { HeadingH1 } from "@/shared/components/Heading";
import { Resources } from "@/features/resources/resources";
import { Paragraph } from "@/shared/components/Paragraph";

export default function HomePage() {
  return (
    <SectionWrapper>
      <HeadingH1>Nightreign Hub</HeadingH1>
      <Paragraph>The one stop for Elden Ring Nightreign</Paragraph>
      <Resources className="px-0" id="resources" />
    </SectionWrapper>
  );
}
