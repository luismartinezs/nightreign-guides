import { HeadingH2 } from "@/shared/components/Heading";
import { Paragraph } from "@/shared/components/Paragraph";
import { SectionWrapper } from "@/shared/components/SectionWrapper";
import { List, ListItem } from "@/shared/components/List";
import { Link } from "@/shared/components/Link";

export function Resources({
  className,
  ...otherProps
}: React.ComponentPropsWithoutRef<"section">) {
  return (
    <SectionWrapper className={className} {...otherProps}>
      <HeadingH2>
        Nightreign Resources
      </HeadingH2>
      <Paragraph>
        List of useful links to Nightreign resources
      </Paragraph>
      <List variant="none">
        <ListItem>
          <Link href="https://www.youtube.com/watch?v=Jvw6Z10YdeU&ab_channel=ZoneX">
            STOP Doing The Shrouded City WRONG (More Loot & Runes) - Elden Ring Nightreign
          </Link>
        </ListItem>
      </List>
    </SectionWrapper>
  )
}