"use client";

import Image from "next/image";
import { cn } from "@/shared/utils/cn";
import { CONFIG } from "./config";

interface CrystalMarkerProps {
  x: number;
  y: number;
  isSelected?: boolean;
  isOptimal?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function CrystalMarker({
  x,
  y,
  isSelected,
  isOptimal,
  onClick,
}: CrystalMarkerProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-200 focus:outline-none rounded-full",
        isSelected
          ? "grayscale opacity-80 hover:opacity-100 hover:grayscale-0"
          : "drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
      )}
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
      aria-label={isSelected ? "Unmark crystal" : "Mark crystal found"}
    >
      <div
        className="relative"
        style={{
          width: CONFIG.CRYSTAL_SIZE_PX,
          height: CONFIG.CRYSTAL_SIZE_PX,
        }}
      >
        <Image
          src="/features/great-hollow/crystal.webp"
          alt="Crystal"
          fill
          className={cn(
            "object-contain transition-[filter] duration-200",
            isOptimal &&
              !isSelected &&
              "hue-rotate-[45deg] saturate-[1.5] brightness-110"
          )}
          draggable={false}
        />
      </div>
    </button>
  );
}
