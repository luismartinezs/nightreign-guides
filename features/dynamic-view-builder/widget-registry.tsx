import React from 'react';
import { WidgetDefinition, WidgetId } from './types';

// Registry is currently empty.
// Import feature components here and add them to the registry.
export const WIDGET_REGISTRY: Record<WidgetId, WidgetDefinition> = {
  // Example:
  // 'resource-list': {
  //   id: 'resource-list',
  //   title: 'Resources',
  //   component: <ResourceListFeature />,
  // },
};

export const getWidget = (id: WidgetId) => WIDGET_REGISTRY[id];