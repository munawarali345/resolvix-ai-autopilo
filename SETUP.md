# Resolvix AI Monorepo Setup

## Root Directory

### `package.json`

- `name`: resolvix-ai
- `private`: true (prevents accidental publishing)

### `pnpm-workspace.yaml`

Defines workspace packages:

- `frontend/` - Next.js React application
- `backend/` - Express API server

## Frontend Setup

### `tailwind.config.js`

- Content paths for Tailwind class scanning
- CSS variable-based color system for shadcn/ui theming
- Extended colors mapped to CSS variables (--background, --primary, etc.)
- Border radius utilities from --radius variable

### `postcss.config.js`

- Tailwind CSS plugin for processing
- Autoprefixer for vendor prefixes

### `components.json`

- shadcn/ui configuration
- Style: "new-york"
- RSC enabled for React Server Components
- Icon library: lucide
- Aliases for components, utils, hooks paths

### `tsconfig.json`

- Module Resolution: "bundler" (modern, for Next.js 15)
- Path alias: @/_ -> ./src/_

### `src/app/globals.css`

- `@import "tailwindcss"` - Tailwind v4 directive
- `@import "tw-animate-css"` - Animation utilities
- Light/dark mode CSS variables in `@layer base`

### `src/app/layout.tsx`

- Root layout component (Next.js App Router)
- Imports global CSS
- Sets HTML lang="en"

### `src/app/page.tsx`

- Home page component
- Uses shadcn Button component
- Centered flex layout

### `src/lib/utils.ts`

- `cn()` function merges Tailwind classes
- Uses `clsx` for conditional classes
- Uses `tailwind-merge` for conflict resolution

### `src/components/ui/button.tsx`

- shadcn/ui Button component
- Variants: default, destructive, outline, secondary, ghost, link
- Sizes: default, sm, lg, icon
- Uses Radix UI Slot for `asChild` prop

## Backend Setup

### `package.json`

- Dependencies: express, cors, dotenv, mongoose, jsonwebtoken, bcryptjs, zod, axios, winston
- DevDependencies: typescript, tsx, eslint, @typescript-eslint/\*

### `tsconfig.json`

- Target: ES2020
- Module: ESNext (ESM)
- OutDir: ./dist, RootDir: ./src
- ModuleResolution: node

### `.eslintrc.json`

- Extends: eslint:recommended
- TypeScript ESLint parser and plugin

### `src/server.ts`

- Express.js server entry point
- CORS enabled
- Health check endpoint at /health

## Commands

```bash
# Start frontend dev server (port 3000)
pnpm dev -F frontend

# Start backend dev server
pnpm dev -F backend

# Build backend
pnpm build -F backend

# Lint all packages
pnpm lint
```
