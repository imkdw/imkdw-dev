---
name: Backend Queries
description: Implement database queries, repositories, and use cases following the project's layered architecture with Prisma ORM. Use this skill when creating or modifying repository classes (*.repository.ts) in shared/repository/, use case classes (*.use-case.ts) in features/{feature}/use-case/, query classes (*.query.ts) for read operations, or working with Prisma transactions and query builders. This includes implementing CRUD operations, transaction handling with prisma.$transaction(), eager loading with include/select, soft delete patterns (deletedAt filtering), and optimizing database queries. Apply when using PrismaService, Prisma.TransactionClient, or building complex database queries with proper indexing considerations.
---

## When to use this skill

- When creating repository classes in `shared/repository/{entity}/` directories
- When implementing use case classes in `features/{feature}/use-case/` directories
- When creating query classes for read-only operations (\*.query.ts files)
- When writing Prisma queries with proper transaction support
- When implementing CRUD operations (create, findById, findAll, save, delete)
- When using `prisma.$transaction()` for atomic operations
- When filtering soft-deleted records (checking `deletedAt: null`)
- When implementing eager loading with Prisma `include` or `select`
- When optimizing queries to avoid N+1 problems
- When working with Prisma.TransactionClient for transaction-aware operations

# Backend Queries

This Skill provides Claude Code with specific guidance on how to adhere to coding standards as they relate to how it should handle backend queries.

## Instructions

For details, refer to the information provided in this file:
[backend queries](../../../agent-os/standards/backend/queries.md)

## Project-Specific Patterns

### Repository Pattern

```typescript
@Injectable()
export class ArticleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(article: Article, tx: Prisma.TransactionClient = this.prisma): Promise<Article> {
    const entity = await tx.article.create({
      data: {
        id: article.id,
        title: article.title,
        content: article.content.value,
        seriesId: article.seriesId,
      },
    });
    return ArticleMapper.toDomain(entity);
  }

  async findById(id: string, tx: Prisma.TransactionClient = this.prisma): Promise<Article | null> {
    const entity = await tx.article.findFirst({
      where: { id, deletedAt: null }, // Soft delete filtering
    });
    return entity ? ArticleMapper.toDomain(entity) : null;
  }

  async delete(id: string, tx: Prisma.TransactionClient = this.prisma): Promise<void> {
    await tx.article.update({
      where: { id },
      data: { deletedAt: new Date() }, // Soft delete
    });
  }
}
```

### Use Case Pattern

```typescript
@Injectable()
export class CreateArticleUseCase {
  constructor(
    private readonly articleValidator: ArticleValidator,
    private readonly articleRepository: ArticleRepository,
    private readonly prisma: PrismaService
  ) {}

  async execute(dto: CreateArticleDto): Promise<Article> {
    return this.prisma.$transaction(async tx => {
      await this.articleValidator.checkExistTitle(dto.title, undefined, tx);

      const article = Article.create({
        id: generateUUID(),
        title: dto.title,
        content: dto.content,
        createdAt: new Date(),
      });

      return this.articleRepository.create(article, tx);
    });
  }
}
```

### Query Pattern (Read-Only Operations)

```typescript
@Injectable()
export class GetArticlesQuery {
  constructor(private readonly prisma: PrismaService) {}

  async execute(dto: RequestGetArticlesDto): Promise<ResponseGetArticlesDto> {
    const articles = await this.prisma.article.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      take: dto.limit,
      skip: dto.offset,
      include: { tags: { include: { tag: true } } },
    });
    // Transform and return
  }
}
```

### Key Conventions

- Repository methods accept optional `tx: Prisma.TransactionClient` parameter
- Default to `this.prisma` when no transaction is provided
- Use cases wrap multiple operations in `prisma.$transaction()`
- Always filter soft-deleted records with `deletedAt: null`
- Separate read operations (Query classes) from write operations (UseCase classes)
- Use Mapper classes to convert Prisma entities to domain objects
