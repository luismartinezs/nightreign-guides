export type DamageType =
  | 'physical-standard'
  | 'physical-slash'
  | 'physical-strike'
  | 'physical-pierce'
  | 'magic'
  | 'fire'
  | 'lightning'
  | 'holy'
  | 'poison'
  | 'rot'
  | 'bleed'
  | 'frost'
  | 'madness'
  | 'sleep';

export type DamageCategory = 'Physical' | 'Elemental' | 'Status';

export interface Resistance {
  type: DamageType;
  value: number | 'immune';
  label: string;
}

export interface NightlordPhase {
  name: string;
  resistances: Resistance[];
  weaknesses: Resistance[]; // Subset of resistances that are negative (weak)
  immunities: Resistance[]; // Subset of resistances that are 'immune'
}

export interface Nightlord {
  id: string;
  name: string;
  description?: string;
  image?: string;
  mainWeaknessIcon?: DamageType | 'none'; // The top-left icon special weakness
  phases: NightlordPhase[];
}
