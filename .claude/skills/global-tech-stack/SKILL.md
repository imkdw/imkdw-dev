---
name: Global Tech Stack
description: Understand and utilize the project's technology stack including NestJS, Next.js, Prisma, PostgreSQL, and TypeScript. Use this skill when making technology decisions, when choosing libraries or packages, when understanding framework-specific patterns, or when configuring development tools. This includes NestJS with feature-based modular architecture, Next.js 15 with App Router, Prisma ORM for database access, PostgreSQL, TypeScript with strict mode, pnpm for package management, Turborepo for monorepo orchestration, and shared workspace packages. Apply when setting up new features, choosing dependencies, or understanding the overall system architecture.
---

## When to use this skill

- When understanding the overall project architecture and technology choices
- When choosing new dependencies or libraries
- When working with NestJS-specific features (modules, providers, guards)
- When working with Prisma ORM queries and schema
- When configuring TypeScript or ESLint settings
- When using pnpm workspace commands
- When understanding Turborepo build and cache configuration
- When working with shared workspace packages (@imkdw-dev/\*)
- When setting up or modifying development tools
- When reviewing technology patterns and best practices

# Global Tech Stack

This Skill provides Claude Code with specific guidance on how to adhere to coding standards as they relate to how it should handle global tech stack.

## Instructions

For details, refer to the information provided in this file:
[global tech stack](../../../agent-os/standards/global/tech-stack.md)

## Project-Specific Tech Stack

### Framework & Runtime

- **API Framework:** NestJS with feature-based modular architecture
- **Blog Framework:** Next.js 15 with App Router and Turbopack
- **Language:** TypeScript (strict mode enabled)
- **Runtime:** Node.js >= 22
- **Package Manager:** pnpm 10.0.0

### Monorepo Tooling

- **Orchestration:** Turborepo
- **Workspaces:** pnpm workspaces
- **Shared Configs:** @imkdw-dev/\* scoped packages

### Database & Storage

- **Database:** PostgreSQL
- **ORM:** Prisma with split schema architecture
- **Schema Location:** prisma/schema/\*.prisma

### Testing & Quality

- **Test Framework:** Jest (via NestJS testing)
- **Unit Tests:** test/unit/
- **Integration Tests:** test/integration/
- **Linting:** ESLint with strict TypeScript rules
- **Formatting:** Prettier (printWidth: 120)

### API Documentation

- **Swagger:** @nestjs/swagger
- **Available at:** /api (non-production)

### Workspace Packages

```
@imkdw-dev/consts      # Shared constants, limits, enums
@imkdw-dev/types       # Shared TypeScript interfaces
@imkdw-dev/exception   # Exception codes and messages
@imkdw-dev/utils       # Utility functions
```

### Port Configuration

- **API Server:** Port 8000
- **Blog App:** Port 3000

### Key Architecture Decisions

- Feature-based modular architecture (not layer-based)
- Controllers -> Use Cases -> Repositories layering
- Domain entities with static factory methods
- Soft delete pattern with deletedAt field
- Split Prisma schema by domain
- Shared type interfaces in workspace packages

### Development Commands

```bash
pnpm dev              # Start all dev servers
pnpm api dev          # API only (port 8000)
pnpm blog dev         # Blog only (port 3000)
pnpm build            # Build all
pnpm lint             # Lint all
pnpm check-types      # Type check all
pnpm api test         # Run API tests
```
