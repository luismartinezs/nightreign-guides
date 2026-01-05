# Nightreign Guides - Project Context

## Project Overview
**Nightreign Guides** is a web application built with **Next.js 15** (App Router) and **React 19**, focused on providing guides and resources, likely related to "Elden Ring: Nightreign" (inferred from `EldenRingLogo.tsx` and content).

## Technology Stack
*   **Framework**: Next.js 15.3.6 (App Router)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS v4, `clsx`, `tailwind-merge`
*   **Icons**: `react-icons`
*   **Fonts**: `next/font` (Geist/Inter)
*   **Runtime/Package Manager**: Bun (preferred), though `npm`/`yarn`/`pnpm` are supported.
*   **UI Components**: Custom components in `shared/components`.

## Architecture & Directory Structure
The project follows a feature-based and shared-component architecture:

*   **`app/`**: Next.js App Router pages and layouts.
    *   `layout.tsx`: Root layout including `Header`, `Footer`, and global providers.
    *   `page.tsx`: Landing page.
    *   `[feature]/page.tsx`: Feature-specific pages (e.g., `changelog`, `contact`, `faq`).
*   **`features/`**: Contains self-contained feature logic and components (e.g., `donate`, `resources`).
*   **`shared/`**: Reusable code used across the application.
    *   `components/`: UI components (Buttons, Layout wrappers, etc.).
    *   `hooks/`: Custom React hooks (e.g., `useButtonA11y`).
    *   `utils/`: Helper functions (e.g., `cn` for class merging).
    *   `metadata.ts`: Global site metadata.
*   **`memory-bank/`**: Project documentation, cheatsheets, and active development notes.
*   **`public/`**: Static assets (images, SVGs).

## Development Workflow

### Key Commands
*   **Development Server**: `bun run dev` (uses Turbopack)
*   **Build**: `bun run build`
*   **Start Production**: `bun run start`
*   **Lint**: `bun run lint`

### Conventions
*   **Path Aliases**: Use `@/` to import from the project root (configured in `tsconfig.json`).
*   **Styling**: Use Tailwind CSS utility classes. Use the `cn()` utility (in `@/shared/utils/cn`) for conditional class merging.
*   **Strict Mode**: TypeScript `strict` mode is enabled.
*   **Layouts**: The root layout (`app/layout.tsx`) handles global structure (Header, Footer, Toast containers).
*   **Components**: Prefer functional components. Place shared UI in `shared/components` and feature-specific UI in `features/[feature-name]`.

## Key Files
*   `next.config.ts`: Next.js configuration.
*   `tailwind.config.ts`: (Implicit in v4 or via `postcss`) Tailwind configuration.
*   `app/globals.css`: Global styles and Tailwind directives.
*   `shared/utils/cn.ts`: Standard utility for class name manipulation.
*   `memory-bank/dev.md`: Current development tasks and notes.
