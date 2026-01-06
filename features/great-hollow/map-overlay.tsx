"use client";

import Image from "next/image";
import { IoReload } from "react-icons/io5";
import { Crystal, MapZone } from "./config";
import { CrystalMarker } from "./crystal-marker";

interface MapOverlayProps {
  imageSrc: string;
  alt: string;
  zone: MapZone;
  crystals: Crystal[];
  foundCrystalIds: Set<string>;
  onCrystalClick: (id: string) => void;
  onReset?: () => void;
}

export function MapOverlay({
  imageSrc,
  alt,
  crystals,
  foundCrystalIds,
  onCrystalClick,
  onReset,
}: MapOverlayProps) {
  return (
    <div className="relative w-full rounded-lg overflow-hidden bg-gray-900 border border-gray-800">
      {/*
        Container is now relative w-full.
        Image uses w-full h-auto to maintain intrinsic aspect ratio without cropping.
      */}
      <div className="relative w-full">
        <Image
          src={imageSrc}
          alt={alt}
          width={800}
          height={600}
          className="w-full h-auto block"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />

        {/* Overlay layer for markers */}
        <div className="absolute inset-0">
          {crystals.map((crystal) => (
            <CrystalMarker
              key={crystal.id}
              x={crystal.x}
              y={crystal.y}
              isSelected={foundCrystalIds.has(crystal.id)}
              onClick={() => onCrystalClick(crystal.id)}
            />
          ))}
        </div>

        {/* Reset Button - Top Right */}
        {foundCrystalIds.size > 0 && onReset && (
          <button
            onClick={onReset}
            className="absolute top-3 right-3 z-10 p-2 bg-gray-900/80 hover:bg-gray-800 text-white rounded-full backdrop-blur-sm transition-colors border border-gray-700 shadow-lg"
            title="Reset Selection"
            aria-label="Reset Selection"
          >
            <IoReload className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="p-3 bg-gray-900/90 backdrop-blur text-center border-t border-gray-800">
        <p className="text-sm font-medium text-gray-200">{alt}</p>
      </div>
    </div>
  );
}
