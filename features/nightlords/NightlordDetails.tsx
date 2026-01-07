"use client";

import { useState } from "react";
import { Nightlord, Resistance, NightlordPhase } from "./types";
import { HeadingH2, HeadingH3 } from "@/shared/components/Heading";
import { Paragraph } from "@/shared/components/Paragraph";

interface NightlordDetailsProps {
  nightlord: Nightlord;
  onBack: () => void;
}

export function NightlordDetails({ nightlord, onBack }: NightlordDetailsProps) {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const activePhase = nightlord.phases[activePhaseIndex];

  // Helper to sort resistances: Weakest (lowest number) -> Strongest (highest/immune)
  const sortedResistances = [...activePhase.resistances].sort((a, b) => {
    if (a.value === "immune") return 1;
    if (b.value === "immune") return -1;
    return (a.value as number) - (b.value as number);
  });

  return (
    <div className="w-full bg-black/40 border border-white/10 rounded-2xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <button
          onClick={onBack}
          className="self-start px-4 py-2 text-sm text-gold border border-gold/30 rounded-lg hover:bg-gold/10 transition-colors"
        >
          ← Back to List
        </button>
        <div className="flex-1">
          <HeadingH2 className="text-3xl md:text-4xl text-gold mb-2">
            {nightlord.name}
          </HeadingH2>
          {nightlord.description && (
            <Paragraph className="text-gray-400">
              {nightlord.description}
            </Paragraph>
          )}
        </div>
      </div>

      {/* Phase Selector */}
      {nightlord.phases.length > 1 && (
        <div className="flex gap-2 mb-6 border-b border-white/10 pb-4 overflow-x-auto">
          {nightlord.phases.map((phase, idx) => (
            <button
              key={idx}
              onClick={() => setActivePhaseIndex(idx)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
                ${
                  idx === activePhaseIndex
                    ? "bg-gold text-black shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200"
                }
              `}
            >
              {phase.name}
            </button>
          ))}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Weakness Highlight (if any) */}
        {nightlord.mainWeaknessIcon &&
          nightlord.mainWeaknessIcon !== "none" && (
            <div className="lg:col-span-2 bg-gradient-to-r from-red-900/20 to-transparent p-4 rounded-xl border border-red-500/20 flex items-center gap-4">
              <div className="p-3 bg-red-500/10 rounded-full text-2xl">⚠️</div>
              <div>
                <HeadingH3 className="text-lg text-red-200 m-0">
                  Critical Vulnerability
                </HeadingH3>
                <p className="text-sm text-red-300/70">
                  Weakness to{" "}
                  <strong>{parseLabel(nightlord.mainWeaknessIcon)}</strong>{" "}
                  triggers special effects.
                </p>
              </div>
            </div>
          )}

        {/* Sorted Resistances */}
        <div className="lg:col-span-2">
          <HeadingH3 className="text-xl text-gray-200 mb-4 flex items-center gap-2">
            Combat Data{" "}
            <span className="text-xs text-gray-500 font-normal uppercase tracking-wider">
              (Sorted by Effectiveness)
            </span>
          </HeadingH3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sortedResistances.map((res, idx) => (
              <ResistanceRow key={res.type} resistance={res} rank={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResistanceRow({
  resistance,
  rank,
}: {
  resistance: Resistance;
  rank: number;
}) {
  const isImmune = resistance.value === "immune";
  const val = resistance.value as number;

  // Determine color based on value
  // < 0: Very Weak (Green/Gold)
  // 0: Neutral (White)
  // > 0: Resistant (Red)
  // Immune: Gray/DarkRed

  let colorClass = "text-gray-300";
  let labelSuffix = "";
  let barColor = "bg-gray-600";
  let barWidth = "50%"; // Default for 0

  if (isImmune) {
    colorClass = "text-red-500 font-bold";
    labelSuffix = "(IMMUNE)";
    barColor = "bg-red-900";
    barWidth = "100%";
  } else {
    if (val < 0) {
      colorClass = "text-green-400 font-bold";
      labelSuffix = "WEAK";
      barColor = "bg-green-500";
      // Scale negative: -40 is very weak (100% bar?), 0 is 50%?
      // Let's invert the thought:
      // We want to show "Effectiveness". Lower resistance = Higher effectiveness.
      // So -40 should have a FULL bar of effectiveness.
      // 542 should have an EMPTY bar.
      // This is "Resistance" values though.
      // Let's just show the number clearly.
      barWidth = `${Math.min(100, 50 - val)}%`; // -40 -> 90% width
    } else if (val > 0) {
      colorClass = "text-red-400";
      labelSuffix = "RESIST";
      barColor = "bg-red-500";
      barWidth = `${Math.max(5, 50 - val / 10)}%`; // 542 -> 50 - 54 = negative? clamp to 5%
    }
  }

  return (
    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 hover:border-gold/20 transition-colors group">
      <div className="flex items-center gap-3">
        {/* Rank Badge */}
        <span
          className={`text-xs font-mono w-6 h-6 flex items-center justify-center rounded bg-black/50 ${
            rank < 3 ? "text-gold" : "text-gray-600"
          }`}
        >
          #{rank + 1}
        </span>
        <span className="font-medium text-gray-200">{resistance.label}</span>
      </div>

      <div className="flex items-center gap-4">
        <span className={`text-sm font-mono whitespace-nowrap ${colorClass}`}>
          {isImmune ? "IMMUNE" : val > 0 ? `+${val}` : val}
        </span>
      </div>
    </div>
  );
}

function parseLabel(type: string) {
  // frequent enough to just split/capitalize
  return type
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}
