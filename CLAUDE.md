# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

If anything changes or if you have any new advice and requests, please update the convention and structure in that file

## Project Structure

This is a Turborepo monorepo using pnpm as the package manager. The project contains:

- `apps/api/` - NestJS API server with PostgreSQL via Prisma
- `apps/blog/` - Next.js blog application with Tailwind CSS v3 and Turbopack
- `packages/eslint-config/` - Shared ESLint configurations
- `packages/typescript-config/` - Shared TypeScript configurations  
- `packages/shared/` - Shared utility packages:
  - `consts/` - Application constants
  - `exception/` - Error handling utilities
  - `types/` - Shared TypeScript types

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
- `pnpm api test` - Run all tests (unit + integration)  
- `pnpm api test:unit` - Run unit tests only
- `pnpm api test:integration` - Run integration tests only (requires `.env.test`)
- `pnpm api test:cov` - Run tests with coverage

### Database Management (API)
- `pnpm api prisma generate` - Generate Prisma client
- `pnpm api prisma migrate dev` - Run migrations in development
- `pnpm api prisma studio` - Open Prisma Studio GUI

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
- Port 8000, NestJS server with PostgreSQL via Prisma
- Feature-based modular architecture
- Swagger documentation available at `/api` in non-production environments
- Shared workspace packages for types, constants, and exceptions
- **세부사항은 `/apps/api/CLAUDE.md` 참고**

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
- Workspace packages prefixed with `@imkdw-dev/` scope
- Shared packages must be built before dependent applications

## Requirements

- Node.js >= 22
- pnpm 10.0.0 (specified as package manager)

## Development Guidelines

## CLAUDE.md 구조

이 프로젝트는 LLM 컨텍스트 최적화를 위해 폴더별로 CLAUDE.md 파일을 관리합니다:

- `/CLAUDE.md` - 프로젝트 전체 개요 및 monorepo 구조
- `/apps/api/CLAUDE.md` - API 서버 개발 가이드라인
- `/apps/blog/CLAUDE.md` - Blog 애플리케이션 가이드라인  
- `/packages/*/CLAUDE.md` - 각 패키지별 상세 가이드

각 폴더에서 작업할 때는 해당 폴더의 CLAUDE.md를 참고하세요.