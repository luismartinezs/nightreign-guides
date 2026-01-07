import { Nightlord, DamageType } from './types';

// Helper to create full resistance map
const createResistances = (
  std: number, sla: number, str: number, prc: number,
  mag: number, fir: number, lig: number, hol: number,
  poi: number | 'immune', rot: number | 'immune', bld: number | 'immune', fro: number | 'immune', mad: number | 'immune', slp: number | 'immune'
) => {
  return [
    { type: 'physical-standard' as DamageType, value: std, label: 'Standard' },
    { type: 'physical-slash' as DamageType, value: sla, label: 'Slash' },
    { type: 'physical-strike' as DamageType, value: str, label: 'Strike' },
    { type: 'physical-pierce' as DamageType, value: prc, label: 'Pierce' },
    { type: 'magic' as DamageType, value: mag, label: 'Magic' },
    { type: 'fire' as DamageType, value: fir, label: 'Fire' },
    { type: 'lightning' as DamageType, value: lig, label: 'Lightning' },
    { type: 'holy' as DamageType, value: hol, label: 'Holy' },
    { type: 'poison' as DamageType, value: poi, label: 'Poison' },
    { type: 'rot' as DamageType, value: rot, label: 'Scarlet Rot' },
    { type: 'bleed' as DamageType, value: bld, label: 'Hemorrhage' },
    { type: 'frost' as DamageType, value: fro, label: 'Frostbite' },
    { type: 'madness' as DamageType, value: mad, label: 'Madness' },
    { type: 'sleep' as DamageType, value: slp, label: 'Sleep' },
  ];
};

const getWeaknesses = (resistances: any[]) => resistances.filter(r => typeof r.value === 'number' && r.value < 0).sort((a, b) => (a.value as number) - (b.value as number));
const getImmunities = (resistances: any[]) => resistances.filter(r => r.value === 'immune');

export const NIGHTLORDS: Nightlord[] = [
  {
    id: 'gladius',
    name: 'Gladius, Beast of Night',
    description: 'The three-headed dragon.',
    image: '/images/nightlords/gladius.webp',
    mainWeaknessIcon: 'physical-pierce',
    phases: [
      {
        name: 'Phase 1',
        resistances: createResistances(
          0, 0, 0, -10, // Phys
          0, 50, 0, -35, // Elem
          542, 252, 252, 542, 'immune', 154 // Status: Mad=X? Image says X for 5th col (Madness)
        ),
        weaknesses: [], immunities: []
      }
    ]
  },
  {
    id: 'adel',
    name: 'Adel, Baron of Night',
    description: 'The dragon type.',
    image: '/images/nightlords/adel.webp',
    mainWeaknessIcon: 'poison', // Best guess for Green Icon
    phases: [
      {
        name: 'Phase 1',
        resistances: createResistances(
          0, 0, 0, 0,
          0, 20, 50, 0,
          154, 154, 542, 154, 'immune', 154
        ),
        weaknesses: [], immunities: []
      }
    ]
  },
  {
    id: 'gnoster',
    name: 'Gnoster & Faurtis',
    description: 'The Moth and Scorpion duo.',
    image: '/images/nightlords/gnoster.webp',
    mainWeaknessIcon: 'fire',
    phases: [
      {
        name: 'Gnoster (Moth)',
        resistances: createResistances(
          -15, -25, -15, -25,
          50, -40, 10, 10,
          542, 154, 154, 154, 'immune', 542
        ),
        weaknesses: [], immunities: []
      },
      {
        name: 'Faurtis (Scorpion)',
        resistances: createResistances(
          10, 20, -20, -10,
          10, -35, 10, 10,
          252, 154, 154, 154, 'immune', 154
        ),
        weaknesses: [], immunities: []
      }
    ]
  },
  {
    id: 'maris',
    name: 'Maris, Fathom of Night',
    description: 'The Gravity type.',
    image: '/images/nightlords/maris.webp',
    mainWeaknessIcon: 'lightning',
    phases: [
      {
        name: 'Phase 1',
        resistances: createResistances(
          0, -15, 20, 10,
          20, 50, -40, 15,
          'immune', 252, 'immune', 252, 'immune', 'immune'
        ),
        weaknesses: [], immunities: []
      }
    ]
  },
  {
    id: 'libra',
    name: 'Libra, Creature of Night',
    description: 'The Cosmic Entity.',
    image: '/images/nightlords/libra.webp',
    mainWeaknessIcon: 'madness',
    phases: [
      {
        name: 'Phase 1',
        resistances: createResistances(
          0, -10, 0, 0,
          20, -20, 0, -35,
          154, 154, 252, 252, 154, 'immune'
        ),
        weaknesses: [], immunities: []
      }
    ]
  },
  {
    id: 'fulghor',
    name: 'Fulghor, Champion of Nightglow',
    description: 'The Warrior.',
    image: '/images/nightlords/fulghor.webp',
    mainWeaknessIcon: 'lightning',
    phases: [
      {
        name: 'Phase 1',
        resistances: createResistances(
          0, 0, 0, 0,
          0, 0, -20, 30,
          154, 154, 154, 154, 'immune', 154
        ),
        weaknesses: [], immunities: []
      }
    ]
  },
  {
    id: 'caligo',
    name: 'Caligo, Miasma of Night',
    description: 'Ancient Dragon Type.',
    image: '/images/nightlords/caligo.webp',
    mainWeaknessIcon: 'fire',
    phases: [
      {
        name: 'Phase 1',
        resistances: createResistances(
          0, 15, -15, 10,
          20, -35, 20, 20,
          252, 252, 252, 542, 'immune', 542
        ),
        weaknesses: [], immunities: []
      }
    ]
  },
  {
    id: 'heolstor',
    name: 'Heolstor the Nightlord',
    description: 'Shadow Beast.',
    image: '/images/nightlords/heolstor.webp',
    mainWeaknessIcon: 'holy',
    phases: [
      {
        name: 'Phase 1',
        resistances: createResistances(
          0, -15, 10, -10,
          0, -20, 0, -35,
          'immune', 252, 'immune', 252, 'immune', 'immune'
        ),
        weaknesses: [], immunities: []
      },
      {
        name: 'Phase 2',
        resistances: createResistances(
          0, 10, -10, -15,
          0, 0, -20, -20,
          'immune', 252, 'immune', 252, 'immune', 'immune' // Assumed same status
        ),
        weaknesses: [], immunities: []
      }
    ]
  },
  {
    id: 'harmonia',
    name: 'Weapon-Bequeathed Harmonia',
    description: 'The Worm.',
    image: '/images/nightlords/harmonia.webp',
    mainWeaknessIcon: 'sleep',
    phases: [
      {
        name: 'Worm (Normal)',
        resistances: createResistances(
          0, 8, -10, 0,
          0, 8, 10, 30,
          252, 252, 252, 252, 'immune', 84
        ),
        weaknesses: [], immunities: []
      },
      {
        name: 'Worm (Everdark)',
        resistances: createResistances(
          -12, -23.2, -12, -23.2,
          -12, -12, -12, 32.8,
          252, 252, 252, 252, 'immune', 'immune' // Image showed X for Sleep (last col) on Everdark? Wait, extract says "X" for 5th(Madness) and "X" for 6th(Sleep)?
          // Let's look at crop 41. Worm (Everdark) Status row: 252, 252, 252, 252, X, X. Yes.
        ),
        weaknesses: [], immunities: []
      }
    ]
  },
  {
    id: 'death-lord',
    name: 'Death Lord',
    description: 'The Final Sovereign.',
    image: '/images/nightlords/death-lord.webp',
    mainWeaknessIcon: 'none',
    phases: [
      {
        name: 'Phase 1',
        resistances: createResistances(
          0, -10, 0, -10,
          0, -20, 10, -25,
          542, 542, 252, 252, 'immune', 252
        ),
        weaknesses: [], immunities: []
      },
      {
        name: 'Phase 2',
        resistances: createResistances(
          5, -5, 5, -5,
          5, -10, 15, -15,
          542, 542, 542, 542, 'immune', 999
        ),
        weaknesses: [], immunities: []
      }
    ]
  }
];

// Hydrate derived fields
NIGHTLORDS.forEach(lord => {
  lord.phases.forEach(phase => {
    phase.weaknesses = getWeaknesses(phase.resistances);
    phase.immunities = getImmunities(phase.resistances);
  });
});
