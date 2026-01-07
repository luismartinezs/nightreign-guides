"use client";

import { useState } from "react";
import { NIGHTLORDS } from "./data";
import { NightlordSelector } from "./NightlordSelector";
import { NightlordDetails } from "./NightlordDetails";

export function NightlordWidget() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedNightlord = NIGHTLORDS.find((n) => n.id === selectedId);

  return (
    <div className="w-full max-w-7xl mx-auto">
      {selectedNightlord ? (
        <NightlordDetails
          nightlord={selectedNightlord}
          onBack={() => setSelectedId(null)}
        />
      ) : (
        <NightlordSelector
          nightlords={NIGHTLORDS}
          selectedId={null}
          onSelect={setSelectedId}
        />
      )}
    </div>
  );
}
