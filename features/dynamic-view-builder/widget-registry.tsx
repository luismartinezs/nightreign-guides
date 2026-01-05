import React from 'react';
import { MockWidget } from './mock-widget';
import { WidgetDefinition, WidgetId } from './types';

export const WIDGET_REGISTRY: Record<WidgetId, WidgetDefinition> = {
  'widget-a': {
    id: 'widget-a',
    title: 'Server Status',
    component: <MockWidget label="Server Status" color="bg-emerald-50" content="All systems operational. Uptime: 99.9%" />,
  },
  'widget-b': {
    id: 'widget-b',
    title: 'Logs',
    component: <MockWidget label="System Logs" color="bg-slate-50" content="[INFO] User logged in..." />,
  },
  'widget-c': {
    id: 'widget-c',
    title: 'Map View',
    component: <MockWidget label="Map" color="bg-blue-50" content="Rendering map tiles..." />,
  },
  'widget-d': {
    id: 'widget-d',
    title: 'Chat',
    component: <MockWidget label="Global Chat" color="bg-purple-50" content="Player1: Hello world!" />,
  },
};

export const getWidget = (id: WidgetId) => WIDGET_REGISTRY[id];
