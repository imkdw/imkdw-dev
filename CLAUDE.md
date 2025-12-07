# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Essential Commands

- `pnpm dev` - Start all dev servers (API:8000 + Blog:3000)
- `pnpm build` - Build all packages and apps
- `pnpm lint` - Fix linting issues
- `pnpm check-types` - TypeScript validation
- `pnpm format` - Format with Prettier (120 char width)
- `pnpm api test` - Run API tests (unit + integration)
- `pnpm api prisma generate` - Generate Prisma client

### Package Shortcuts

- `pnpm api {cmd}` - Run command in API package
- `pnpm blog {cmd}` - Run command in Blog package
- `pnpm ui {cmd}` - Run command in UI package

## Project Overview

Turborepo monorepo with pnpm package manager.

### Applications

| App         | Stack                             | Port | Purpose         |
| ----------- | --------------------------------- | ---- | --------------- |
| `apps/api`  | NestJS 11, PostgreSQL, Prisma     | 8000 | REST API server |
| `apps/blog` | Next.js 16, React 19, Tailwind v3 | 3000 | Blog frontend   |

### Shared Packages (@imkdw-dev/*)

| Package      | Purpose                                          |
| ------------ | ------------------------------------------------ |
| `ui`         | Design system (Tailwind v3, Radix UI primitives) |
| `api-client` | Typed API client library                         |
| `types`      | Shared TypeScript interfaces and DTOs            |
| `consts`     | Application constants                            |
| `exception`  | Error codes and exception handlers               |
| `auth`       | Authentication utilities                         |
| `hooks`      | Custom React hooks                               |
| `toast`      | Toast notification system                        |
| `fonts`      | Font configurations                              |
| `utils`      | Utility functions                                |

### Build Dependencies

Shared packages must build before apps. Run `pnpm build` to build everything in correct order.

## Development Setup

### Prerequisites

- Node.js >= 22
- pnpm 10.0.0
- Docker (for PostgreSQL)
- Doppler CLI (for secrets management)

### First-Time Setup

1. `pnpm install` - Install all dependencies
2. `docker-compose up -d --wait` - Start PostgreSQL (port 6432)
3. `doppler run -- pnpm api prisma db push` - Apply database schema
4. `pnpm dev` - Start development servers

### Environment Variables

- Development secrets managed via Doppler
- Testing requires `.env.test` file for integration tests
- IMPORTANT: Never commit `.env` files to repository

## Code Quality Rules

IMPORTANT: These rules are enforced by ESLint and CI:

- **NO `any` type** - Use proper TypeScript types always
- **NO `console.log`** - Use proper logging utilities
- **NO `import * as`** - Import specific items only
- **120 character line width** - Enforced by Prettier
- **Strict null checks** - Handle all nullable values explicitly

### Pre-commit Hooks

Husky + lint-staged runs automatically:
- ESLint fixes applied to staged `.ts` and `.tsx` files
- Prettier formatting applied

## Testing

### API Tests

- `pnpm api test` - All tests (unit + integration)
- `pnpm api test:unit` - Unit tests only
- `pnpm api test:integration` - Integration tests (requires `.env.test`)

### Blog Tests

- Use Playwright MCP for E2E validation
- Test against `http://localhost:3000`
- Do not start web server from terminal in test scripts

## Common Workflows

### Adding a New API Feature

1. Create feature module in `apps/api/src/features/{name}/`
2. Add exception codes to `packages/shared/exception/`
3. Add shared DTOs to `packages/shared/types/`
4. Reference `/apps/api/CLAUDE.md` for patterns

### Adding a New UI Component

1. Primitives go in `packages/ui/src/primitives/`
2. Complex components go in `packages/ui/src/components/`
3. Export from `packages/ui/src/index.ts`
4. Reference `/packages/ui/CLAUDE.md` for patterns

### Database Changes

1. Modify schema files in `apps/api/prisma/schema/`
2. Run `pnpm api prisma generate`

## Project Quirks

IMPORTANT: Read before making changes:

1. **Tailwind CSS v3 Fixed** - Do NOT upgrade to v4 (stability issues with current setup)
2. **Turbopack Limitations** - Some font configurations disabled for compatibility
3. **Split Prisma Schema** - Schema files in `prisma/schema/` are imported by main schema file
4. **Build Order Matters** - If shared types change, run `pnpm build` before testing
5. **Port Auto-Adjustment** - Blog app auto-selects different port if 3000 is occupied
6. **Doppler Required** - Most environment variables managed via Doppler, not local `.env`

## Detailed Guides

Context-specific guidelines in sub-CLAUDE.md files:

| Path                     | Focus Area                                               |
| ------------------------ | -------------------------------------------------------- |
| `/apps/api/CLAUDE.md`    | NestJS patterns, DTOs, Use Cases, Testing                |
| `/apps/blog/CLAUDE.md`   | React/Next patterns, component usage, Playwright testing |
| `/packages/ui/CLAUDE.md` | Design system, Tailwind preset, theming                  |

IMPORTANT: Always check the relevant sub-CLAUDE.md before working in that directory.

## Questions

Use the Claude Question feature to ask the user for clarification when needed.

## Edit CLAUDE.md
- If some change with Claude Code, Update CLAUDE.md of that directory.
