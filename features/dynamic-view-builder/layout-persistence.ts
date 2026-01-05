import { MosaicNode } from 'react-mosaic-component';
import { WidgetId, SavedLayout } from './types';

const STORAGE_KEY_LAYOUTS = 'dvb-layouts';
const STORAGE_KEY_CURRENT = 'dvb-current-layout';

export const saveLayout = (name: string, layout: MosaicNode<WidgetId> | null) => {
  if (typeof window === 'undefined') return;

  const savedLayoutsStr = localStorage.getItem(STORAGE_KEY_LAYOUTS);
  const savedLayouts: Record<string, SavedLayout> = savedLayoutsStr ? JSON.parse(savedLayoutsStr) : {};

  savedLayouts[name] = {
    name,
    layout,
    timestamp: Date.now(),
  };

  localStorage.setItem(STORAGE_KEY_LAYOUTS, JSON.stringify(savedLayouts));
};

export const loadLayout = (name: string): MosaicNode<WidgetId> | null => {
  if (typeof window === 'undefined') return null;

  const savedLayoutsStr = localStorage.getItem(STORAGE_KEY_LAYOUTS);
  if (!savedLayoutsStr) return null;

  const savedLayouts: Record<string, SavedLayout> = JSON.parse(savedLayoutsStr);
  return savedLayouts[name]?.layout || null;
};

export const getSavedLayouts = (): SavedLayout[] => {
  if (typeof window === 'undefined') return [];

  const savedLayoutsStr = localStorage.getItem(STORAGE_KEY_LAYOUTS);
  if (!savedLayoutsStr) return [];

  const savedLayouts: Record<string, SavedLayout> = JSON.parse(savedLayoutsStr);
  return Object.values(savedLayouts).sort((a, b) => b.timestamp - a.timestamp);
};

export const saveCurrentLayout = (layout: MosaicNode<WidgetId> | null) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(layout));
};

export const loadCurrentLayout = (): MosaicNode<WidgetId> | null => {
  if (typeof window === 'undefined') return null;
  const current = localStorage.getItem(STORAGE_KEY_CURRENT);
  return current ? JSON.parse(current) : null;
};
