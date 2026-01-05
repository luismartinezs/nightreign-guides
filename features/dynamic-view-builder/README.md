# Dynamic View Builder (DVB) Integration Guide

The Dynamic View Builder allows users to create custom layouts using widgets. These widgets are simply existing feature components wrapped for the DVB.

## How to Register a New Widget

1.  **Create your Feature Component:**
    Ensure your feature exists in `features/<feature-name>/`. The component should be responsive and capable of fitting into various container sizes (e.g., using `h-full`, `w-full`).

2.  **Import in Registry:**
    Open `features/dynamic-view-builder/widget-registry.tsx`.

3.  **Add to `WIDGET_REGISTRY`:**
    Add a new entry to the `WIDGET_REGISTRY` object.

    ```typescript
    import { MyNewFeature } from '@/features/my-feature/MyNewFeature';

    export const WIDGET_REGISTRY: Record<WidgetId, WidgetDefinition> = {
      // ... existing widgets
      'my-feature-widget': {
        id: 'my-feature-widget',
        title: 'My Feature Title', // Displayed in the window header
        component: <MyNewFeature />,
      },
    };
    ```

## Widget Guidelines

*   **Responsiveness:** Widgets will be resized arbitrarily. Ensure they handle small widths/heights gracefully (e.g., using `overflow-auto`).
*   **Theme:** Widgets should inherit or implement the dark theme (`bg-slate-900` or transparent) to match the DVB container.
*   **Isolation:** Widgets should ideally be self-contained and not rely on global page layout context that might be missing inside a mosaic window.
