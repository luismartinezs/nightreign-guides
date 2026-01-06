export const CONFIG = {
  CRYSTAL_SIZE_PX: 64, // Crystal icon size in pixels
};

export type MapZone = 'top' | 'bottom';

export interface Crystal {
  id: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  zone: MapZone;
}

export interface Distribution {
  id: string;
  name: string;
  crystalIds: string[];
}

// Generate dummy crystals for each quadrant in both zones
const createQuadrantCrystals = (zone: MapZone, startId: number): Crystal[] => {
  return [
    // Top-Left (Quadrant 1)
    { id: `${zone}-q1-1`, x: 25, y: 25, zone },
    { id: `${zone}-q1-2`, x: 30, y: 30, zone },
    // Top-Right (Quadrant 2)
    { id: `${zone}-q2-1`, x: 75, y: 25, zone },
    { id: `${zone}-q2-2`, x: 70, y: 30, zone },
    // Bottom-Left (Quadrant 3)
    { id: `${zone}-q3-1`, x: 25, y: 75, zone },
    { id: `${zone}-q3-2`, x: 30, y: 70, zone },
    // Bottom-Right (Quadrant 4)
    { id: `${zone}-q4-1`, x: 75, y: 75, zone },
    { id: `${zone}-q4-2`, x: 70, y: 70, zone },
  ];
};

const topCrystals = createQuadrantCrystals('top', 0);
const bottomCrystals = createQuadrantCrystals('bottom', 100);

export const ALL_CRYSTALS: Crystal[] = [...topCrystals, ...bottomCrystals];

export const DISTRIBUTIONS: Distribution[] = [
  {
    id: 'dist-1',
    name: 'Top-Left Distribution',
    crystalIds: [
      ...topCrystals.filter((c) => c.id.includes('q1')).map((c) => c.id),
      ...bottomCrystals.filter((c) => c.id.includes('q1')).map((c) => c.id),
    ],
  },
  {
    id: 'dist-2',
    name: 'Top-Right Distribution',
    crystalIds: [
      ...topCrystals.filter((c) => c.id.includes('q2')).map((c) => c.id),
      ...bottomCrystals.filter((c) => c.id.includes('q2')).map((c) => c.id),
    ],
  },
  {
    id: 'dist-3',
    name: 'Bottom-Left Distribution',
    crystalIds: [
      ...topCrystals.filter((c) => c.id.includes('q3')).map((c) => c.id),
      ...bottomCrystals.filter((c) => c.id.includes('q3')).map((c) => c.id),
    ],
  },
  {
    id: 'dist-4',
    name: 'Bottom-Right Distribution',
    crystalIds: [
      ...topCrystals.filter((c) => c.id.includes('q4')).map((c) => c.id),
      ...bottomCrystals.filter((c) => c.id.includes('q4')).map((c) => c.id),
    ],
  },
];
