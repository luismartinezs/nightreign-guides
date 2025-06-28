import { HeadingH2, HeadingH3 } from "@/shared/components/Heading";
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

      {/* Subreddits */}
      <List title={<HeadingH3>Subreddits</HeadingH3>} variant="none">
        <ListItem>
          <Link external href="https://www.reddit.com/r/Nightreign/">r/Nightreign</Link>
        </ListItem>
        <ListItem>
          <Link external href="https://www.reddit.com/r/Nightreigngameplay/">r/Nightreigngameplay</Link>
        </ListItem>
      </List>

      {/* General Guides */}
      <List title={<HeadingH3>General Guides</HeadingH3>} variant="none">
        <ListItem>
          <Link external href="https://www.reddit.com/r/Nightreigngameplay/comments/1l0j0or/psa_how_to_win_every_match_in_nightreign_super/">
            PSA: How to Win Every Match in Nightreign (Super Guide)
          </Link>
        </ListItem>
        <ListItem>
          <Link external href="https://www.reddit.com/r/Nightreign/comments/1l3328v/i_have_defeated_all_nightlords_and_finished_all/">
            I Have Defeated All Nightlords and Finished All Quests - Experience Report
          </Link>
        </ListItem>
      </List>


      {/* Castle Guides */}
      <List title={<HeadingH3>Castle Guides</HeadingH3>} variant="none">
        <ListItem>
          <Link external href="https://www.youtube.com/watch?v=d6BdvSp5Y5A&ab_channel=ZoneX">
            Complete Castle Walkthrough &amp; Secrets - ZoneX
          </Link>
        </ListItem>
      </List>

      {/* Crater Guides */}
      <List title={<HeadingH3>Crater Guides</HeadingH3>} variant="none">
        <ListItem>
          <Link external href="https://www.youtube.com/watch?v=eiOW0GpeRGY&ab_channel=ZoneX">
            Crater Area Guide - ZoneX
          </Link>
        </ListItem>
      </List>

      {/* Noklateo Guides */}
      <List title={<HeadingH3>Noklateo Guides</HeadingH3>} variant="none">
        <ListItem>
          <Link external href="https://www.youtube.com/watch?v=Jvw6Z10YdeU&ab_channel=ZoneX">
            STOP Doing The Shrouded City WRONG (More Loot & Runes) - Elden Ring Nightreign
          </Link>
        </ListItem>
      </List>

      {/* Tools */}
      <List title={<HeadingH3>Tools</HeadingH3>} variant="none">
        <ListItem>
          <Link external href="https://baspla.github.io/nightreign/">Nightreign Damage Calculator &amp; Build Planner</Link>
        </ListItem>
      </List>

      {/* Maps */}
      <List title={<HeadingH3>Maps</HeadingH3>} variant="none">
        <ListItem>
          <Link external href="https://mapgenie.io/elden-ring-nightreign/maps/limveld">
            Mapgenie Limveld Map
          </Link>
        </ListItem>
      </List>

      {/* Other */}
      <List title={<HeadingH3>Other</HeadingH3>} variant="none">
        <ListItem>
          <Link external href="https://www.reddit.com/r/Nightreign/comments/1l96vp4/boss_weaknesses/">
            Boss Weaknesses Cheat-Sheet
          </Link>
        </ListItem>
      </List>


    </SectionWrapper>
  )
}