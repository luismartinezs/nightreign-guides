"use client";

import Image from "next/image";
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
  const [isDevMode, setIsDevMode] = useState(false);

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
        <div className="flex justify-between items-start">
          <HeadingH2>Great Hollow Crystal Selector</HeadingH2>
          {/* Dev Mode Hidden
          <button
            onClick={() => setIsDevMode(!isDevMode)}
            className="text-xs px-2 py-1 bg-gray-800 rounded font-mono text-gray-400 hover:text-white"
          >
            {isDevMode ? "DEV MODE: ON" : "DEV MODE (click to enable)"}
          </button>
          */}
        </div>
        <p className="text-gray-400">
          Click on the crystals you have found to narrow down the possible
          locations of the remaining crystals.
        </p>

        <div className="flex items-center gap-3 mt-2 text-sm text-purple-200 bg-purple-500/10 border border-purple-500/20 px-3 py-2 rounded-lg w-fit">
          <div className="relative w-6 h-6">
            <Image
              src="/features/great-hollow/crystal.webp"
              alt="Optimal Crystal"
              fill
              className="object-contain hue-rotate-[45deg] saturate-[1.5] brightness-110"
            />
          </div>
          <span>Look for these crystals first</span>
        </div>
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
          isDevMode={isDevMode}
        />
        <MapOverlay
          imageSrc="/features/great-hollow/great-hollow-bot-crop.webp"
          alt="Great Hollow - Bottom"
          zone="bottom"
          crystals={bottomCrystals}
          foundCrystalIds={foundCrystalIds}
          onCrystalClick={handleCrystalClick}
          onReset={handleReset}
          isDevMode={isDevMode}
        />
      </div>

      <p className="mt-8 text-xs text-center text-gray-500">
        Special thanks to{" "}
        <a
          href="https://www.reddit.com/r/Nightreign/comments/1pljy7p/the_great_hollow_crystals_definitive_map/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300 underline transition-colors"
        >
          u/Alex0Goat and SisterNun on Reddit
        </a>{" "}
        for the definitive map data.
      </p>
    </SectionWrapper>
  );
}
