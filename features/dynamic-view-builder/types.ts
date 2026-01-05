import { ReactNode } from 'react';

export type WidgetId = string;

export interface WidgetDefinition {
  id: WidgetId;
  title: string;
  component: ReactNode;
  defaultDimensions?: { width?: number; height?: number };
}

export interface SavedLayout {
  name: string;
  layout: any; // Using 'any' for now as MosaicNode<T> type depends on library import
  timestamp: number;
}
