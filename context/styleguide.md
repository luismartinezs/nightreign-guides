# Style Guide - Nightreign Guides

## Core Principles
The visual identity is based on a dark, immersive theme suitable for "Elden Ring: Nightreign".
*   **Theme:** Dark Mode Only.
*   **Primary Colors:** "Nightreign Blues" (Primary) and "Arcane Purples" (Secondary).
*   **Backgrounds:** Deep slates and blacks.

## Color Palette

### Backgrounds
*   **Body/App Background:** `bg-slate-950` (Darkest Slate)
*   **Containers/Cards/Headers:** `bg-slate-800`
*   **Modals/Overlays:** `bg-black` (often with `bg-opacity` or specific RGBA)
*   **Interactive Elements (Hover):** `hover:bg-slate-700` or `hover:bg-slate-800` (depending on context)

### Text
*   **Headings (H1-H3):** `text-slate-50` (White-ish)
*   **Body Copy:** `text-slate-300` (Light Gray)
*   **Muted/Secondary Text:** `text-slate-500`
*   **Links/Brand:** `text-primary-300` (Bright Purple/Blue)
*   **Secondary Accent:** `text-secondary-300` (Pink/Purple)

### Borders
*   **Subtle Dividers:** `border-slate-700`
*   **Stronger Borders:** `border-slate-500`

## Typography
*   **Font Family:** `Geist Sans` (via `var(--font-geist-sans)` mapped to `font-sans`).
*   **Headings:** Bold/Semibold.
*   **Body:** Normal/Medium.

## Component Styles

### Buttons
Use the `Button` component from `shared/components/button.tsx`.
*   **Variants:** `primary`, `outline`, `danger`, `muted`, `nightreign` (gradient).
*   **Sizes:** Standard sizing defined in component.

### DVB Specific Adaptations
To align the Dynamic View Builder with this guide:
1.  **Container:** `bg-slate-950` instead of `bg-slate-50`.
2.  **Panels/Widgets:** `bg-slate-800` instead of `bg-white`.
3.  **Text:** `text-slate-50` for titles, `text-slate-300` for content.
4.  **Borders:** `border-slate-700` instead of `border-slate-200`.
5.  **Mosaic Theme:** Override `mosaic-blueprint-theme` to use dark colors for splitters and windows.
