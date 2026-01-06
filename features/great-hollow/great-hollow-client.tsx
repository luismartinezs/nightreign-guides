"use client";

import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { IoScan, IoClose, IoReload } from "react-icons/io5";
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "f") {
        setIsFullscreen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
          <div className="flex gap-2">
            <button
              onClick={() => setIsFullscreen(true)}
              className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors uppercase tracking-wider group"
              title="Toggle Fullscreen"
            >
              <span>Fullscreen</span>
              <kbd className="border border-gray-600 rounded px-1.5 py-0.5 bg-gray-800 text-gray-300 group-hover:border-gray-500 group-hover:text-white transition-colors">
                F
              </kbd>
            </button>
            {/* Dev Mode Hidden

            {isDevMode ? "DEV MODE: ON" : "DEV MODE (click to enable)"}
          </button>
          */}
          </div>
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
      {mounted &&
        isFullscreen &&
        createPortal(
          <div className="fixed inset-0 z-50 bg-black flex flex-col md:flex-row animate-in fade-in duration-200">
            <div className="flex-1 relative flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-800 p-4">
              <div className="relative w-full h-full max-h-[50vh] md:max-h-full">
                <MapOverlay
                  imageSrc="/features/great-hollow/great-hollow-top-crop.webp"
                  alt="Great Hollow - Top"
                  zone="top"
                  crystals={topCrystals}
                  foundCrystalIds={foundCrystalIds}
                  onCrystalClick={handleCrystalClick}
                  // onReset hidden in top map
                  minimal
                  className="max-h-full max-w-full aspect-square mx-auto rounded-none border-none bg-black"
                  isDevMode={isDevMode}
                />
              </div>
            </div>

            <div className="flex-1 relative flex items-center justify-center p-4">
              <div className="relative w-full h-full max-h-[50vh] md:max-h-full">
                <MapOverlay
                  imageSrc="/features/great-hollow/great-hollow-bot-crop.webp"
                  alt="Great Hollow - Bottom"
                  zone="bottom"
                  crystals={bottomCrystals}
                  foundCrystalIds={foundCrystalIds}
                  onCrystalClick={handleCrystalClick}
                  // onReset hidden, using global control
                  minimal
                  className="max-h-full max-w-full aspect-square mx-auto rounded-none border-none bg-black"
                  isDevMode={isDevMode}
                />
              </div>
            </div>

            {/* Global Controls Dock - Bottom Right */}
            <div className="absolute bottom-6 right-4 z-[60] flex flex-col gap-4">
              {foundCrystalIds.size > 0 && (
                <button
                  onClick={handleReset}
                  className="p-3 bg-gray-900/80 hover:bg-gray-800 text-white rounded-full backdrop-blur-sm transition-colors border border-gray-700 shadow-xl"
                  title="Reset Selection"
                  aria-label="Reset Selection"
                >
                  <IoReload className="w-6 h-6" />
                </button>
              )}

              <button
                onClick={() => setIsFullscreen(false)}
                className="p-3 bg-gray-900/80 hover:bg-gray-800 text-white rounded-full backdrop-blur-sm transition-colors border border-gray-700 shadow-xl"
                title="Close Fullscreen"
                aria-label="Close"
              >
                <IoClose className="w-6 h-6" />
              </button>
            </div>
          </div>,
          document.body
        )}
    </SectionWrapper>
  );
}
