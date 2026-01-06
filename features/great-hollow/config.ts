export const CONFIG = {
  CRYSTAL_SIZE_PX: 64, // Crystal icon size in pixels
};

export type MapZone = 'top' | 'bottom';

export interface Crystal {
  id: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  zone: MapZone;
  isOptimal?: boolean;
}

export interface Distribution {
  id: string;
  name: string;
  crystalIds: string[];
}

// Real Data Groups
const GROUP_1: Crystal[] = [
  { id: 'g1-1', x: 22.58, y: 92.11, zone: 'top' },
  { id: 'g1-2', x: 17.03, y: 67.92, zone: 'top', isOptimal: true },
  { id: 'g1-3', x: 35.3, y: 70.43, zone: 'top' },
  { id: 'g1-4', x: 30.29, y: 41.22, zone: 'top' },
  { id: 'g1-5', x: 41.94, y: 20.07, zone: 'top', isOptimal: true },
  { id: 'g1-6', x: 74.19, y: 44.27, zone: 'top' },
  { id: 'g1-7', x: 64.16, y: 51.97, zone: 'bottom' },
  { id: 'g1-8', x: 44.27, y: 65.77, zone: 'bottom' },
];

const GROUP_2_NEW: Crystal[] = [
  { id: 'g2-1', x: 40.86, y: 95.88, zone: 'top', isOptimal: true },
  { id: 'g2-2', x: 50.54, y: 76.88, zone: 'top', isOptimal: true },
  { id: 'g2-3', x: 10.93, y: 48.57, zone: 'top' },
  { id: 'g2-4', x: 37.28, y: 48.03, zone: 'top' },
  { id: 'g2-5', x: 91.04, y: 48.75, zone: 'bottom' },
];

const GROUP_3_NEW: Crystal[] = [
  { id: 'g3-1', x: 41.22, y: 61.65, zone: 'top' },
  { id: 'g3-2', x: 82.8, y: 19.89, zone: 'top', isOptimal: true },
  { id: 'g3-3', x: 47.31, y: 83.15, zone: 'bottom' },
  { id: 'g3-4', x: 82.97, y: 86.38, zone: 'bottom' },
  { id: 'g3-5', x: 74.37, y: 24.37, zone: 'bottom' },
];

const GROUP_4_NEW: Crystal[] = [
  { id: 'g4-1', x: 4.66, y: 68.1, zone: 'top', isOptimal: true },
  { id: 'g4-2', x: 54.3, y: 38.35, zone: 'top', isOptimal: true },
  { id: 'g4-3', x: 87.28, y: 43.37, zone: 'top', isOptimal: true },
];

export const ALL_CRYSTALS: Crystal[] = [
  ...GROUP_1,
  ...GROUP_2_NEW,
  ...GROUP_3_NEW,
  ...GROUP_4_NEW,
];

export const DISTRIBUTIONS: Distribution[] = [
  {
    id: 'dist-1',
    name: 'Group 1 Distribution',
    crystalIds: GROUP_1.map(c => c.id),
  },
  {
    id: 'dist-2',
    name: 'Group 2 Distribution',
    crystalIds: [
      'g1-3', // Reused
      'g2-1',
      'g2-2',
      'g2-3',
      'g2-4',
      'g1-6', // Reused
      'g1-8', // Reused
      'g2-5',
    ],
  },
  {
    id: 'dist-3',
    name: 'Group 3 Distribution',
    crystalIds: [
      'g1-1', // Reused
      'g2-3', // Reused
      'g3-1',
      'g1-4', // Reused
      'g3-2',
      'g3-3',
      'g3-4',
      'g3-5',
    ],
  },
  {
    id: 'dist-4',
    name: 'Group 4 Distribution',
    crystalIds: [
      'g4-1',
      'g3-1', // Reused
      'g2-4', // Reused
      'g4-2',
      'g4-3',
      'g2-5', // Reused
      'g3-4', // Reused
      'g3-3', // Reused
    ],
  },
];
