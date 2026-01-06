"use client";

import { useState, useMemo } from "react";
import { HeadingH2 } from "@/shared/components/Heading";
import { SectionWrapper } from "@/shared/components/SectionWrapper";
import { ALL_CRYSTALS, DISTRIBUTIONS } from "./config";
import { MapOverlay } from "./map-overlay";

export function GreatHollowClient({
  className,
  ...otherProps
}: React.ComponentPropsWithoutRef<"section">) {
  const [foundCrystalIds, setFoundCrystalIds] = useState<Set<string>>(
    new Set()
  );

  const handleCrystalClick = (id: string) => {
    setFoundCrystalIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleReset = () => {
    setFoundCrystalIds(new Set());
  };

  // Logic to filter visible crystals based on distributions
  const visibleCrystals = useMemo(() => {
    // 1. Find all distributions that are still valid given the found crystals
    // A distribution is valid if it contains ALL the crystals the user has marked as found.
    const validDistributions = DISTRIBUTIONS.filter((dist) => {
      for (const foundId of foundCrystalIds) {
        if (!dist.crystalIds.includes(foundId)) {
          return false;
        }
      }
      return true;
    });

    // 2. Get all crystal IDs that exist in any of the valid distributions
    const validCrystalIds = new Set<string>();
    validDistributions.forEach((dist) => {
      dist.crystalIds.forEach((id) => validCrystalIds.add(id));
    });

    // 3. Return the full crystal objects for these IDs
    return ALL_CRYSTALS.filter((c) => validCrystalIds.has(c.id));
  }, [foundCrystalIds]);

  const topCrystals = visibleCrystals.filter((c) => c.zone === "top");
  const bottomCrystals = visibleCrystals.filter((c) => c.zone === "bottom");

  return (
    <SectionWrapper className={className} {...otherProps}>
      <div className="flex flex-col gap-2 mb-8">
        <HeadingH2>Great Hollow Crystal Selector</HeadingH2>
        <p className="text-gray-400">
          Click on the crystals you have found to narrow down the possible
          locations of the remaining crystals.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <MapOverlay
          imageSrc="/features/great-hollow/great-hollow-top-crop.webp"
          alt="Great Hollow - Top"
          zone="top"
          crystals={topCrystals}
          foundCrystalIds={foundCrystalIds}
          onCrystalClick={handleCrystalClick}
          onReset={handleReset}
        />
        <MapOverlay
          imageSrc="/features/great-hollow/great-hollow-bot-crop.webp"
          alt="Great Hollow - Bottom"
          zone="bottom"
          crystals={bottomCrystals}
          foundCrystalIds={foundCrystalIds}
          onCrystalClick={handleCrystalClick}
          onReset={handleReset}
        />
      </div>
    </SectionWrapper>
  );
}
