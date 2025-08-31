# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

If anything changes or if you have any new advice and requests, please update the convention and structure in that file

## Project Structure

This is a Turborepo monorepo using pnpm as the package manager. The project contains:

- `apps/api/` - NestJS API server
- `apps/blog/` - Next.js blog application with Tailwind CSS v3 and Turbopack
- `packages/eslint-config/` - Shared ESLint configurations
- `packages/typescript-config/` - Shared TypeScript configurations

## Common Commands

### Development
- `pnpm dev` - Start all development servers (API + Blog)
- `pnpm api dev` - Start only the API server (port 8000)
- `pnpm blog dev` - Start only the blog app (port 3000)

### Building
- `pnpm build` - Build all applications and packages
- `pnpm api build` - Build only the API server
- `pnpm blog build` - Build only the blog application

### Package Management
- `pnpm api add {package}` - Add dependency to API
- `pnpm blog add {package}` - Add dependency to Blog
- `pnpm api remove {package}` - Remove dependency from API
- `pnpm blog remove {package}` - Remove dependency from Blog

### Code Quality
- `pnpm lint` - Run ESLint across all packages
- `pnpm api lint` - Run ESLint on API only
- `pnpm blog lint` - Run ESLint on Blog only
- `pnpm check-types` - Run TypeScript type checking across all packages
- `pnpm format` - Format code using Prettier (printWidth: 120)

### Testing (API only)
- `pnpm api test` - Run unit tests
- `pnpm api test:watch` - Run tests in watch mode
- `pnpm api test:e2e` - Run end-to-end tests
- `pnpm api test:cov` - Run tests with coverage

## Port Configuration

- **API Server**: Port 8000 (configured in `apps/api/src/main.ts`)
- **Blog App**: Port 3000 (Next.js default, auto-adjusts if occupied)

## Shared Configurations

### TypeScript Configuration
- **Base config**: `packages/typescript-config/base.json` - Common settings for all projects
- **NestJS config**: `packages/typescript-config/nestjs.json` - Server-side specific settings
- **Next.js config**: `packages/typescript-config/nextjs.json` - Client-side specific settings
- Each app extends the appropriate config via relative paths

### ESLint Configuration
- **Base config**: `packages/eslint-config/base.js` - Strict rules for all projects
  - `no-console: "error"` - Console logs are errors
  - `@typescript-eslint/no-explicit-any: "error"` - Any type forbidden
  - Import sorting with alphabetical order and proper grouping
  - Strict TypeScript rules (prefer-optional-chain, prefer-nullish-coalescing)
- **NestJS config**: `packages/eslint-config/nestjs.js` - Server-specific rules
- **Next.js config**: `packages/eslint-config/next.js` - Client-specific rules with React hooks validation
- Each app imports configs via relative paths

### Prettier Configuration
- **Global config**: `.prettierrc` in root
- `printWidth: 120` - Line width as requested
- `singleQuote: true`, `trailingComma: "es5"`, `arrowParens: "avoid"`
- Formats: TypeScript, JavaScript, JSON, Markdown, YAML

## Architecture Notes

### API Application (NestJS)
- Port 8000, standard NestJS architecture
- Uses shared TypeScript and ESLint configs
- Jest configured for testing with TypeScript
- Console warnings allowed for development debugging

### Blog Application (Next.js)
- Port 3000, Next.js 15 with App Router and Turbopack
- **Tailwind CSS v3** for styling (fixed version for stability)
  - Standard v3 configuration with `tailwind.config.ts`
  - PostCSS integration with autoprefixer
  - Traditional `@tailwind` directives in CSS
- Font configurations removed to avoid Turbopack compatibility issues
- Strict React Hooks dependency array checking
- Next.js image optimization enforced

### Monorepo Structure
- Turborepo manages task orchestration and caching
- Output directories: `.next/**`, `dist/**` for proper caching
- Development tasks are not cached and run persistently
- Uses pnpm workspaces with convenient shortcuts (`pnpm api`, `pnpm blog`)

## Requirements

- Node.js >= 22
- pnpm 10.0.0 (specified as package manager)

## API (NestJS)
- Prevent circular dependencies
- Clear layer separation
- Scalable modular structure
- Maximize code reusability

### 1.2 Core Principles
- **Unidirectional Dependencies**: Upper layers depend on lower layers
- **Domain-Centric Design**: Business logic separated from infrastructure
- **Module-Based Organization**: Leverage NestJS module system