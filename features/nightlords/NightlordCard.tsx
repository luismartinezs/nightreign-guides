import { Nightlord } from "./types";
import { HeadingH3 } from "@/shared/components/Heading";

interface NightlordCardProps {
  nightlord: Nightlord;
  onClick: () => void;
  isSelected?: boolean;
}

export function NightlordCard({
  nightlord,
  onClick,
  isSelected,
}: NightlordCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        group relative flex flex-col items-start text-left w-full
        bg-white/5 border border-white/10 p-4 rounded-xl transition-all duration-300
        hover:bg-white/10 hover:border-gold/50 hover:shadow-[0_0_20px_rgba(255,215,0,0.1)]
        ${
          isSelected
            ? "border-gold bg-white/10 shadow-[0_0_30px_rgba(255,215,0,0.2)]"
            : ""
        }
      `}
    >
      <div className="relative w-full aspect-video bg-black/50 rounded-lg mb-4 overflow-hidden border border-white/5 group-hover:border-gold/30 transition-colors">
        {/* Placeholder for now since we don't have images yet */}
        <div className="absolute inset-0 flex items-center justify-center text-white/20">
          <span className="text-4xl">?</span>
        </div>
        {nightlord.image && (
          <img
            src={nightlord.image}
            alt={nightlord.name}
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />
        )}
      </div>

      <HeadingH3 className="text-lg font-bold text-gray-100 group-hover:text-gold transition-colors mb-1">
        {nightlord.name}
      </HeadingH3>

      {nightlord.description && (
        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
          {nightlord.description}
        </p>
      )}
    </button>
  );
}
