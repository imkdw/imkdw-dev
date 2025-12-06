---
name: Backend Migrations
description: Create and manage Prisma database migrations for schema changes in PostgreSQL. Use this skill when modifying Prisma schema files (*.prisma), creating new database migrations, adding or modifying database tables/columns/indexes, managing foreign key relationships, or running migration commands. This includes files in prisma/schema/ directory (schema.prisma, member.prisma, article.prisma, series.prisma, tag.prisma, article-comment.prisma), and migration files in prisma/migrations/. Apply when using Prisma CLI commands like `prisma migrate dev`, `prisma generate`, `prisma db push`, or when restructuring the split schema architecture.
---

## When to use this skill

- When creating new Prisma schema files in `prisma/schema/` directory
- When modifying existing database models in \*.prisma files
- When adding new tables, columns, or indexes to the database
- When defining or modifying foreign key relationships
- When running `pnpm api prisma migrate dev` or `pnpm api prisma generate` commands
- When setting up database constraints (NOT NULL, UNIQUE, DEFAULT values)
- When adding timestamp fields (createdAt, updatedAt, deletedAt for soft delete)
- When creating many-to-many relationship tables (like ArticleTag)
- When restructuring schema files in the split schema architecture

# Backend Migrations

This Skill provides Claude Code with specific guidance on how to adhere to coding standards as they relate to how it should handle backend migrations.

## Instructions

For details, refer to the information provided in this file:
[backend migrations](../../../agent-os/standards/backend/migrations.md)

## Project-Specific Patterns

### Split Schema Architecture

The project uses split Prisma schema files organized by domain:

```
prisma/schema/
  schema.prisma      # Main schema with datasource and generator
  member.prisma      # Member-related models
  article.prisma     # Article-related models
  series.prisma      # Series-related models
  tag.prisma         # Tag-related models
  article-comment.prisma  # Comment-related models
```

### Common Model Pattern

```prisma
model Article {
  id        String   @id @default(uuid())
  title     String
  slug      String   @unique
  content   String
  viewCount Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  deletedAt DateTime?  // Soft delete pattern

  // Foreign keys
  seriesId  String
  series    Series   @relation(fields: [seriesId], references: [id])

  // Many-to-many via junction table
  tags      ArticleTag[]

  @@map("articles")  // Table name mapping
}
```

### Migration Commands

```bash
# Generate migration
pnpm api prisma migrate dev --name descriptive_migration_name

# Generate Prisma client after schema changes
pnpm api prisma generate

# Reset database (development only)
pnpm api prisma migrate reset

# Push schema without migration (development only)
pnpm api prisma db push
```

### Key Conventions

- Use UUID for primary keys (`@id @default(uuid())`)
- Always include `createdAt` and `updatedAt` timestamps
- Use soft delete pattern with optional `deletedAt` field
- Map model names to snake_case table names with `@@map()`
- Index foreign key columns and frequently queried fields
