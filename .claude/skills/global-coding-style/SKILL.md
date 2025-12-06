---
name: Global Coding Style
description: Apply consistent coding style, naming conventions, and code formatting across the NestJS API codebase. Use this skill when writing any TypeScript code in the apps/api/ or packages/shared/ directories, when naming variables, functions, classes, or files, when structuring imports and exports, or when following the project's ESLint and Prettier configurations. This includes enforcing strict TypeScript settings (no any, prefer-nullish-coalescing, prefer-optional-chain), using proper file naming patterns (kebab-case for files, PascalCase for classes), organizing imports alphabetically, and maintaining 120 character line width. Apply when writing any *.ts file, refactoring code, or reviewing code quality.
---

## When to use this skill

- When writing any TypeScript code in apps/api/ or packages/shared/
- When naming files, classes, functions, variables, or constants
- When organizing import statements at the top of files
- When following ESLint rules (no-console: error, no-explicit-any: error)
- When formatting code with Prettier (printWidth: 120, singleQuote: true)
- When structuring module exports and barrel files (index.ts)
- When applying TypeScript strict mode features
- When using path aliases like @/ for src directory
- When refactoring code for better readability
- When removing dead code, unused imports, or commented-out blocks

# Global Coding Style

This Skill provides Claude Code with specific guidance on how to adhere to coding standards as they relate to how it should handle global coding style.

## Instructions

For details, refer to the information provided in this file:
[global coding style](../../../agent-os/standards/global/coding-style.md)

## Project-Specific Patterns

### File Naming Conventions

```
# Files (kebab-case)
create-article.use-case.ts
article-not-found.exception.ts
get-articles.dto.ts

# Classes (PascalCase)
CreateArticleUseCase
ArticleNotFoundException
GetArticlesDto
```

### Import Organization

```typescript
// 1. External packages (NestJS, third-party)
import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

// 2. Workspace packages (@imkdw-dev/*)
import { ARTICLE_MAX_TITLE_LENGTH } from '@imkdw-dev/consts';
import { ICreateArticleDto } from '@imkdw-dev/types';

// 3. Internal paths (@/ alias for src/)
import { ArticleRepository } from '@/shared/repository/article/article.repository';
import { Article } from '@/shared/domain/article/article';
```

### TypeScript Strict Rules

```typescript
// Use nullish coalescing
const value = input ?? defaultValue;  // Not: input || defaultValue

// Use optional chaining
const name = user?.profile?.name;  // Not: user && user.profile && user.profile.name

// Never use 'any' - use proper types
const items: Article[] = [];  // Not: any[]

// Use readonly for DTO properties
readonly title: string;
```

### ESLint Configuration

- `no-console: "error"` - No console.log (use proper logging)
- `@typescript-eslint/no-explicit-any: "error"` - Forbid any type
- Import sorting with alphabetical order
- Strict TypeScript rules enabled

### Prettier Configuration

```json
{
  "printWidth": 120,
  "singleQuote": true,
  "trailingComma": "es5",
  "arrowParens": "avoid"
}
```

### Key Conventions

- Small, focused functions with single responsibility
- Descriptive names that reveal intent
- Remove dead code and unused imports
- DRY principle - extract common logic into reusable modules
- Use @Injectable() for NestJS service classes
- Private constructors with static factory methods for immutable objects
