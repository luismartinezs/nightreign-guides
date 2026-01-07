import { Nightlord } from "./types";
import { NightlordCard } from "./NightlordCard";

interface NightlordSelectorProps {
  nightlords: Nightlord[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function NightlordSelector({
  nightlords,
  selectedId,
  onSelect,
}: NightlordSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {nightlords.map((lord) => (
        <NightlordCard
          key={lord.id}
          nightlord={lord}
          isSelected={lord.id === selectedId}
          onClick={() => onSelect(lord.id)}
        />
      ))}
    </div>
  );
}
