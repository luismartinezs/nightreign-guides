"use client";

import Image from "next/image";
import { IoReload } from "react-icons/io5";
import { Crystal, MapZone } from "./config";
import { CrystalMarker } from "./crystal-marker";
import { toast } from "sonner"; // Assuming sonner is available based on package.json

interface MapOverlayProps {
  imageSrc: string;
  alt: string;
  zone: MapZone;
  crystals: Crystal[];
  foundCrystalIds: Set<string>;
  onCrystalClick: (id: string) => void;
  onReset?: () => void;
  isDevMode?: boolean;
}

export function MapOverlay({
  imageSrc,
  alt,
  zone,
  crystals,
  foundCrystalIds,
  onCrystalClick,
  onReset,
  isDevMode,
}: MapOverlayProps) {
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDevMode) return;

    // Prevent interfering with crystal clicks if they propagate (though they usually stop propagation or are on top)
    // We only want clicks on the map background to trigger this, but crystals are children.
    // However, CrystalMarker is a button so it should capture its own clicks.

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const xFixed = parseFloat(x.toFixed(2));
    const yFixed = parseFloat(y.toFixed(2));

    const logString = `{ id: '${zone}-NEW', x: ${xFixed}, y: ${yFixed}, zone: '${zone}' },`;

    console.log(logString);
    navigator.clipboard.writeText(logString);
    toast.success(`Copied: ${xFixed}, ${yFixed}`);
  };

  return (
    <div className="relative w-full rounded-lg overflow-hidden bg-gray-900 border border-gray-800">
      {/*
        Container is now relative w-full.
        Image uses w-full h-auto to maintain intrinsic aspect ratio without cropping.
      */}
      <div
        className={`relative w-full ${
          isDevMode ? "cursor-crosshair ring-2 ring-red-500" : ""
        }`}
        onClick={handleMapClick}
      >
        <Image
          src={imageSrc}
          alt={alt}
          width={800}
          height={600}
          className="w-full h-auto block pointer-events-none" // Disable pointer events on image to ensure click hits container
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
              onClick={(e) => {
                if (isDevMode) {
                  e.stopPropagation(); // Stop map click handler
                  const logString = `{ id: '${crystal.id}', x: ${crystal.x}, y: ${crystal.y}, zone: '${zone}' }, // REUSED`;
                  console.log(logString);
                  navigator.clipboard.writeText(logString);
                  toast.success(`Copied Existing: ${crystal.id}`);
                  return;
                }
                onCrystalClick(crystal.id);
              }}
            />
          ))}
        </div>

        {/* Reset Button - Top Right */}
        {foundCrystalIds.size > 0 && onReset && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onReset();
            }}
            className="absolute top-3 right-3 z-10 p-2 bg-gray-900/80 hover:bg-gray-800 text-white rounded-full backdrop-blur-sm transition-colors border border-gray-700 shadow-lg"
            title="Reset Selection"
            aria-label="Reset Selection"
          >
            <IoReload className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="p-3 bg-gray-900/90 backdrop-blur text-center border-t border-gray-800 flex justify-between items-center">
        <p className="text-sm font-medium text-gray-200 flex-1">{alt}</p>
        {isDevMode && (
          <span className="text-xs text-red-400 font-mono">DEV MODE</span>
        )}
      </div>
    </div>
  );
}
