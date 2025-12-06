---
name: Global Conventions
description: Follow the project's development conventions for monorepo structure, version control, environment configuration, and code organization. Use this skill when working with the Turborepo monorepo structure, when organizing files and directories, when managing environment variables, when writing git commits, or when following the project's dependency management patterns. This includes understanding the apps/ and packages/ structure, using pnpm workspace commands, managing .env files, structuring feature modules, and following the unidirectional dependency flow (Features -> Shared -> Infra). Apply when creating new files, organizing code, or setting up new features.
---

## When to use this skill

- When creating new feature modules in the NestJS application
- When organizing files within the apps/ or packages/ directories
- When running pnpm workspace commands (pnpm api, pnpm blog, pnpm -w)
- When managing environment variables and .env files
- When understanding dependency flow between layers
- When creating or modifying package.json files
- When setting up new shared packages in packages/shared/
- When importing from workspace packages (@imkdw-dev/\*)
- When writing git commit messages
- When configuring Turborepo build and cache settings

# Global Conventions

This Skill provides Claude Code with specific guidance on how to adhere to coding standards as they relate to how it should handle global conventions.

## Instructions

For details, refer to the information provided in this file:
[global conventions](../../../agent-os/standards/global/conventions.md)

## Project-Specific Patterns

### Monorepo Structure

```
imkdw-dev/
  apps/
    api/           # NestJS API server (port 8000)
    blog/          # Next.js blog app (port 3000)
  packages/
    shared/
      consts/      # @imkdw-dev/consts - Shared constants
      exception/   # @imkdw-dev/exception - Exception codes
      types/       # @imkdw-dev/types - Shared TypeScript interfaces
      utils/       # @imkdw-dev/utils - Utility functions
    eslint-config/ # Shared ESLint configurations
    typescript-config/  # Shared TypeScript configurations
```

### Feature Module Structure

```
src/features/{feature}/
  controller/{feature}.controller.ts
  dto/
    create-{feature}.dto.ts
    update-{feature}.dto.ts
    get-{feature}.dto.ts
  exception/
    {feature}-not-found.exception.ts
    exist-{feature}.exception.ts
  swagger/{feature}.swagger.ts
  use-case/
    create-{feature}.use-case.ts
    update-{feature}.use-case.ts
    delete-{feature}.use-case.ts
  query/
    get-{feature}.query.ts
    get-{features}.query.ts
  validator/{feature}.validator.ts
  {feature}.module.ts
```

### Dependency Flow (Unidirectional)

```
Features  -->  Shared  -->  Infra
   |              |           |
   v              v           v
business     repository    database
 logic        domain       config
use-cases     mapper        http
```

### pnpm Workspace Commands

```bash
# Run commands in specific apps
pnpm api dev          # Start API server
pnpm blog dev         # Start blog app
pnpm api build        # Build API
pnpm api test         # Run API tests

# Workspace root commands
pnpm build            # Build all
pnpm lint             # Lint all
pnpm check-types      # Type check all

# Package management
pnpm api add {pkg}    # Add to API
pnpm blog add {pkg}   # Add to blog
```

### Environment Configuration

```bash
# Development
.env                  # Local development
.env.test             # Test environment

# Never commit
.env.local
.env.*.local
```

### Key Conventions

- Feature-based modular architecture
- Workspace packages use @imkdw-dev/\* scope
- Build shared packages before dependent apps
- Use pnpm workspace shortcuts (api, blog)
- Node.js >= 22, pnpm 10.0.0
- Turborepo handles build caching and orchestration
