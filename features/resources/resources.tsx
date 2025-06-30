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
      <HeadingH2>Nightreign Resources</HeadingH2>
      <Paragraph>List of useful links to Nightreign resources</Paragraph>

      {/* Subreddits */}
      <List title={<HeadingH3>Subreddits</HeadingH3>} variant="none">
        <ListItem>
          <Link external href="https://www.reddit.com/r/Nightreign/">
            r/Nightreign
          </Link>
        </ListItem>
        <ListItem>
          <Link external href="https://www.reddit.com/r/Nightreigngameplay/">
            r/Nightreigngameplay
          </Link>
        </ListItem>
      </List>

      {/* YouTube Channels */}
      <List title={<HeadingH3>YouTube Channels</HeadingH3>} variant="none">
        <ListItem>
          <Link external href="https://www.youtube.com/@youwy">
            Youwy
          </Link>
        </ListItem>
      </List>

      {/* General Guides */}
      <List title={<HeadingH3>General Guides</HeadingH3>} variant="none">
        <ListItem>
          <Link
            external
            href="https://www.reddit.com/r/Nightreigngameplay/comments/1l0j0or/psa_how_to_win_every_match_in_nightreign_super/"
          >
            PSA: How to Win Every Match in Nightreign (Super Guide)
          </Link>
        </ListItem>
        <ListItem>
          <Link
            external
            href="https://www.reddit.com/r/Nightreign/comments/1l3328v/i_have_defeated_all_nightlords_and_finished_all/"
          >
            I Have Defeated All Nightlords and Finished All Quests - Experience
            Report
          </Link>
        </ListItem>
      </List>

      {/* Castle Guides */}
      <List title={<HeadingH3>Castle Guides</HeadingH3>} variant="none">
        <ListItem>
          <Link
            external
            href="https://www.youtube.com/watch?v=d6BdvSp5Y5A&ab_channel=ZoneX"
          >
            Complete Castle Walkthrough &amp; Secrets - ZoneX
          </Link>
        </ListItem>
      </List>

      {/* Crater Guides */}
      <List title={<HeadingH3>Crater Guides</HeadingH3>} variant="none">
        <ListItem>
          <Link
            external
            href="https://www.youtube.com/watch?v=eiOW0GpeRGY&ab_channel=ZoneX"
          >
            Crater Area Guide - ZoneX
          </Link>
        </ListItem>
      </List>

      {/* Mountain Guides */}
      <List title={<HeadingH3>Crater Guides</HeadingH3>} variant="none">
        <ListItem>
          <Link
            external
            href="https://www.youtube.com/watch?v=t9aK7lXYci0&ab_channel=ZoneX"
          >
            STOP Doing The Mountaintops WRONG (More Loot & Runes) - Elden Ring
            Nightreign
          </Link>
        </ListItem>
      </List>

      {/* Noklateo Guides */}
      <List title={<HeadingH3>Noklateo Guides</HeadingH3>} variant="none">
        <ListItem>
          <Link
            external
            href="https://www.youtube.com/watch?v=Jvw6Z10YdeU&ab_channel=ZoneX"
          >
            STOP Doing The Shrouded City WRONG (More Loot & Runes) - Elden Ring
            Nightreign
          </Link>
        </ListItem>
        <ListItem>
          <List variant="decimal">
            <ListItem>right after 1st night boss, head to city entrance immediately</ListItem>
            <ListItem>enter, go right, straight till reching wall, then right again</ListItem>
            <ListItem>find white marks in wall and go up</ListItem>
            <ListItem>go up wood scaffolding, to end up facing left side</ListItem>
            <ListItem>straight through the arch way, then jump small gap to balcony in front</ListItem>
            <ListItem>hit grace, then drop down, and walk straight</ListItem>
            <ListItem>drop down again, kill revenant boss and some basilisks</ListItem>
            <ListItem>hit grace, then go up a fallen column, follow straight line after column, fall down twice. You have a dark corridor in front, instead go left</ListItem>
            <ListItem>kill black knife assassin that will be directly on the left side</ListItem>
            <ListItem>after killing BKA, go in the left direction where it was, jump up the platforms, then down right in front, to a spirit spring</ListItem>
            <ListItem>with spirit spring, jump up toward the big building nearby (left), grab the scarab</ListItem>
            <ListItem>go down the stairway in same platform, kill knight and get chest</ListItem>
            <ListItem>go up the stars again, exiting the stairs to the right, drop down and right in front there is a small dome with a grace</ListItem>
            <ListItem>take down the knight with the glowing spear</ListItem>
            <ListItem>go up stairs, take down astel</ListItem>
            <ListItem>exit astel room but in the grace turn right (opposite from where you came from)</ListItem>
            <ListItem>move in that direction until reaching a BKA, kill it</ListItem>
            <ListItem>if you wanna dupe a weapon, there is a dupe coffin nearby BKA. Next to the place where you grab an item for Wylder&apos;s rememberance quest, inside the building in the right side as you enter, then jump up</ListItem>
            <ListItem>take out the troll in the middle of a water path, right below a bridge. Easy to find after BKA</ListItem>
            <ListItem>follow river down to dragonkin, and kill it</ListItem>
            <ListItem>head outside city to the left side and kill royal carian knight</ListItem>
            <ListItem>if you have time, go to the opposite side of the city and kill the dragon, skip dragon if no time</ListItem>
            <ListItem>kill hipo nearby city entrance (down the gorge)</ListItem>
          </List>
        </ListItem>
      </List>

      {/* Tools */}
      <List title={<HeadingH3>Tools</HeadingH3>} variant="none">
        <ListItem>
          <Link external href="https://baspla.github.io/nightreign/">
            Nightreign Damage Calculator &amp; Build Planner
          </Link>
        </ListItem>
      </List>

      {/* Maps */}
      <List title={<HeadingH3>Maps</HeadingH3>} variant="none">
        <ListItem>
          <Link
            external
            href="https://mapgenie.io/elden-ring-nightreign/maps/limveld"
          >
            Mapgenie Limveld Map
          </Link>
        </ListItem>
      </List>

      {/* Other */}
      <List title={<HeadingH3>Other</HeadingH3>} variant="none">
        <ListItem>
          <Link
            external
            href="https://www.reddit.com/r/Nightreign/comments/1l96vp4/boss_weaknesses/"
          >
            Boss Weaknesses Cheat-Sheet
          </Link>
        </ListItem>
      </List>
    </SectionWrapper>
  );
}
