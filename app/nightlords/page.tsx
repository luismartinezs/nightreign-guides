import { SectionWrapper } from "@/shared/components/SectionWrapper";
import { HeadingH1 } from "@/shared/components/Heading";
import { Paragraph } from "@/shared/components/Paragraph";
import { NightlordWidget } from "@/features/nightlords/NightlordWidget";

export default function NightlordsPage() {
  return (
    <SectionWrapper>
      <HeadingH1>Nightlord Weaknesses</HeadingH1>
      <Paragraph>
        Detailed breakdown of resistances and weaknesses for all Nightlords.
      </Paragraph>

      <div className="my-12">
        <NightlordWidget />
      </div>
    </SectionWrapper>
  );
}
