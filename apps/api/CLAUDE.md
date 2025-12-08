# API Server Development Guide

This document provides comprehensive guidelines for NestJS API server development.

## Quick Reference

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server (port 8000) |
| `pnpm build` | Build the API application |
| `pnpm lint` | Run ESLint with auto-fix |
| `pnpm check-types` | TypeScript type validation |
| `pnpm test` | Run all tests (unit + integration) |
| `pnpm test:unit` | Run unit tests only |
| `pnpm test:integration` | Run integration tests (requires `.env.test`) |
| `pnpm prisma generate` | Generate Prisma client |

---

## Architecture Overview

### Layered Architecture

```
Controllers (HTTP Layer)
    |
    v
Use Cases / Queries (Business Logic)
    |
    v
Repositories (Data Access)
    |
    v
Database (Prisma + PostgreSQL)
```

**Dependency Flow**: `Features -> Shared -> Infra` (unidirectional, NEVER reverse)

### Directory Structure

```
src/
├── features/          # Domain-specific modules
│   ├── article/       # Article management
│   ├── member/        # User profile and stats
│   ├── series/        # Article collections
│   ├── tag/           # Tag management
│   ├── stats/         # Site-wide statistics
│   └── seo/           # SEO metadata
├── shared/            # Cross-feature utilities
│   ├── domain/        # Domain entities
│   ├── repository/    # Data access layer
│   ├── mapper/        # Entity mappers
│   └── validator/     # Business validators
├── common/            # Global decorators, guards, filters
├── auth/              # Authentication (OAuth, JWT)
├── config/            # Configuration services
└── infra/             # Infrastructure (database, storage)
```

### Shared Packages

| Package | Purpose |
|---------|---------|
| `@imkdw-dev/types` | Shared TypeScript interfaces and DTOs |
| `@imkdw-dev/consts` | Application constants (max lengths, limits) |
| `@imkdw-dev/exception` | Exception codes and messages |

---

## Development Patterns

### Controller Pattern

**IMPORTANT**: Controllers handle HTTP concerns only. Business logic belongs in Use Cases.

```typescript
@ApiTags('Articles')
@Controller()
@MemberRoles(MEMBER_ROLE.ADMIN)
export class ArticleController {
  @Public()
  @Get(GET_ARTICLES)
  async getArticles(@Query() query: RequestGetArticlesDto) {
    return this.getArticlesQuery.execute(query);
  }
}
```

**Key Rules**:
- Use `@Public()` to bypass authentication
- Use `@MemberRoles()` for role-based access (class-level default, method-level override)
- Use `@HttpCode(HttpStatus.NO_CONTENT)` for 204 responses
- Return Response DTOs, not domain entities

**Reference**: `src/features/article/controller/article.controller.ts`

---

### Use Case Pattern

**IMPORTANT**: Use Cases handle write operations with transactions. Use Queries for read-only operations.

```typescript
@Injectable()
export class CreateArticleUseCase {
  async execute(dto: CreateArticleDto): Promise<Article> {
    return this.prisma.$transaction(async tx => {
      await this.articleValidator.checkExistTitle(dto.title, undefined, tx);
      const article = Article.create({ ...dto });
      return this.articleRepository.create(article, tx);
    });
  }
}
```

**Key Rules**:
- **YOU MUST** wrap write operations in `prisma.$transaction()`
- **YOU MUST** pass `tx` to all validators and repositories within the transaction
- **YOU MUST** create domain entities via `Entity.create()` static factory
- Return domain entities (controller transforms to Response DTO)
- **NEVER** use `updateTitle()`, `updateContent()` mutation methods - create new objects instead

**Reference**: `src/features/article/use-case/create-article.use-case.ts`

---

### Query Pattern

**IMPORTANT**: Queries are read-only. They bypass repositories and access Prisma directly for performance.

```typescript
@Injectable()
export class GetArticlesQuery {
  async execute(params: RequestGetArticlesDto): Promise<ResponseGetArticlesDto> {
    const [items, totalCount] = await Promise.all([
      this.prisma.article.findMany({ where: { deletedAt: null }, take: params.limit }),
      this.prisma.article.count({ where: { deletedAt: null } }),
    ]);
    return getOffsetPagingResult({ items, totalCount, ...params });
  }
}
```

**Key Rules**:
- Use `Promise.all()` for parallel queries
- Always filter `deletedAt: null` for soft-deleted records
- Return Response DTOs directly
- Use pagination helpers from shared utilities

**Reference**: `src/features/article/query/get-articles.query.ts`

---

### DTO Pattern

**IMPORTANT**: Request and Response DTOs are separate. Each DTO is independently written.

**Request DTO**:
```typescript
export class CreateArticleDto implements ICreateArticleDto {
  @ApiProperty({ description: 'Title', maxLength: ARTICLE_MAX_TITLE_LENGTH })
  @MaxLength(ARTICLE_MAX_TITLE_LENGTH)
  @IsNotEmptyString()
  readonly title: string;
}
```

**Response DTO**:
```typescript
export class ResponseCreateArticleDto implements IResponseCreateArticleDto {
  private constructor(id: string, slug: string) { /* ... */ }

  static from(article: Article): ResponseCreateArticleDto {
    return new ResponseCreateArticleDto(article.id, article.slug);
  }
}
```

**Key Rules**:
- **YOU MUST** implement shared interface from `@imkdw-dev/types`
- **NEVER** use `PickType`, `OmitType`, or inheritance - write each DTO independently
- Use `@IsNotEmptyString()` custom decorator for required strings
- Response DTOs use private constructor + static `from()` factory
- **DO NOT** create Response DTO for 204 No Content responses

**Reference**: `src/features/article/dto/create-article.dto.ts`

---

### Repository Pattern

**IMPORTANT**: Repositories abstract data access. All methods accept optional transaction client.

```typescript
@Injectable()
export class ArticleRepository {
  async create(article: Article, tx: Prisma.TransactionClient = this.prisma): Promise<Article> {
    const entity = await tx.article.create({ data: { /* ... */ } });
    return ArticleMapper.toDomain(entity);
  }

  async delete(id: string, tx: Prisma.TransactionClient = this.prisma): Promise<void> {
    await tx.article.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}
```

**Key Rules**:
- **YOU MUST** accept `tx?: Prisma.TransactionClient` parameter with default `this.prisma`
- Return domain entities via Mapper, not Prisma types
- Use soft delete: `update({ data: { deletedAt: new Date() } })`

**Reference**: `src/shared/repository/article/article.repository.ts`

---

### Domain Entity Pattern

```typescript
export class Article {
  private constructor(props: Params) { /* ... */ }

  static create(props: Params): Article {
    return new Article(props);
  }

  static calculateReadMinute(content: string): number {
    // Korean: 300 chars/min, English: 200 words/min
  }
}
```

**Key Rules**:
- Private constructor + static `create()` factory method
- Use Value Objects for complex fields (e.g., `ArticleContent`)
- Static utility methods for domain calculations
- **NEVER** add mutation methods - create new instances instead

**Reference**: `src/shared/domain/article/article.ts`

---

### Exception Pattern

**Custom Exception**:
```typescript
export class ArticleNotFoundException extends CustomException {
  constructor(message: string) {
    super({
      message,
      errorCode: EXCEPTION_CODES.ARTICLE_NOT_FOUND,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}
```

**Key Rules**:
- Extend `CustomException` base class
- Exception codes defined in `@imkdw-dev/exception` package
- File naming: `{entity}-{error-type}.exception.ts`
- Use NestJS `HttpStatus` enum for status codes

**Reference**: `src/features/article/exception/article-not-found.exception.ts`

---

### Validator Pattern

```typescript
@Injectable()
export class ArticleValidator {
  async checkExist(id: string, tx?: Prisma.TransactionClient): Promise<Article> {
    const article = await this.articleRepository.findById(id, tx);
    if (!article) throw new ArticleNotFoundException('Article not found');
    return article;
  }

  async checkExistTitle(title: string, excludeId?: string, tx?: Prisma.TransactionClient) {
    const article = await this.articleRepository.findByTitle(title, tx);
    if (article && article.id !== excludeId) throw new ExistArticleException('...');
  }
}
```

**Key Rules**:
- Method naming: `checkExist{Property}` for uniqueness checks
- Accept optional `excludeId` for update operations
- **YOU MUST** accept optional `tx` parameter for transaction support
- Return entity from existence checks (caller can use it)

**Reference**: `src/shared/validator/article.validator.ts`

---

## Guards and Decorators

| Decorator | Purpose | Example |
|-----------|---------|---------|
| `@Public()` | Skip JWT authentication | `@Public() @Get()` |
| `@MemberRoles()` | Require specific roles | `@MemberRoles(MEMBER_ROLE.ADMIN)` |
| `@CurrentRequester()` | Inject authenticated user | `@CurrentRequester() user: Requester` |
| `@IsNotEmptyString()` | Validate non-empty trimmed string | `@IsNotEmptyString() title: string` |

**Guard Execution Order**:
1. `JwtGuard` - Validates JWT token, attaches `requester` to request
2. `MemberRoleGuard` - Checks user role against required roles

**Reference**: `src/common/decorator/`, `src/common/guards/`

---

## Testing Guidelines

### Unit Tests

**IMPORTANT**: Unit tests validate DTOs and domain logic. No database access.

```typescript
describe('CreateArticleDto', () => {
  it('throws error when title is empty', async () => {
    const dto = plainToClass(CreateArticleDto, { title: '', /* ... */ });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
```

**Location**: `test/unit/features/{feature}/dto/*.spec.ts`

---

### Integration Tests

**IMPORTANT**: Integration tests validate Use Cases with real database transactions.

```typescript
describe('CreateArticleUseCase', () => {
  let testHelper: IntegrationTestHelper;

  beforeAll(async () => {
    testHelper = new IntegrationTestHelper([CreateArticleUseCase, /* providers */]);
    await testHelper.setup();
  });

  beforeEach(async () => {
    await testHelper.startTransaction();
  });

  afterEach(() => {
    testHelper.rollbackTransaction();  // Isolation via rollback
  });

  it('creates article successfully', async () => {
    const sut = testHelper.getService(CreateArticleUseCase);
    const result = await sut.execute(dto);
    expect(result.id).toBeDefined();
  });
});
```

**Key Rules**:
- Use `IntegrationTestHelper` for test setup
- Call `startTransaction()` in `beforeEach`
- Call `rollbackTransaction()` in `afterEach` for isolation
- Create test data with helper functions (e.g., `createTestArticle()`)

**Location**: `test/integration/features/{feature}/*.spec.ts`

**Reference**: `test/integration/features/article/create-article.use-case.spec.ts`

---

### Test Helpers

```typescript
export const createTestArticle = async (prisma: PrismaClient, data: { seriesId: string; title?: string }) => {
  return prisma.article.create({
    data: { id: generateUUID(), title: data.title ?? `Test Article ${Date.now()}`, /* ... */ },
  });
};
```

**Location**: `test/integration/helpers/`

---

## API Design

### Swagger Documentation

**Custom Swagger Decorator**:
```typescript
export function createArticle(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: CreateArticleDto }),
  );
}

// Usage in controller
@Swagger.createArticle('Create new article')
@Post(CREATE_ARTICLE)
async createArticle(@Body() dto: CreateArticleDto) { /* ... */ }
```

**Reference**: `src/features/article/swagger/article.swagger.ts`

### Response Format

All responses are wrapped by `TransformInterceptor`:
```json
{ "data": { /* response payload */ } }
```

### API Versioning

- URI-based versioning (default: v1)
- Base path: `/v1/...`
- Swagger available at `/api` (non-production only)

---

## Database Patterns

### Transaction Handling

```typescript
return this.prisma.$transaction(async tx => {
  await this.validator.checkExist(id, tx);        // Pass tx
  const entity = await this.repository.create(data, tx);  // Pass tx
  await this.service.process(entity, tx);         // Pass tx
  return entity;
});
```

**IMPORTANT**: All operations within a transaction MUST receive the `tx` parameter.

### Soft Delete

**IMPORTANT**: All entities use soft delete. NEVER use hard delete.

```typescript
// Delete (soft)
await tx.article.update({ where: { id }, data: { deletedAt: new Date() } });

// Query (filter deleted)
await tx.article.findMany({ where: { deletedAt: null } });
```

### Split Schema

Prisma schema files are organized by domain in `prisma/schema/`:
- `schema.prisma` - Main schema (imports others)
- `member.prisma` - Member entities
- `article.prisma` - Article, ArticleComment, ArticleTag
- `series.prisma` - Series entities
- `tag.prisma` - Tag entities

---

## Common Pitfalls

**IMPORTANT: Avoid these mistakes**

| Pitfall | Correct Approach |
|---------|------------------|
| Forgetting to pass `tx` in transaction | **YOU MUST** pass `tx` to all validators/repositories |
| Hard deleting records | Use soft delete: `update({ data: { deletedAt: new Date() } })` |
| Using `PickType`/`OmitType` for DTOs | Write each DTO independently |
| Returning Prisma types from repository | Return domain entities via Mapper |
| Business logic in controller | Move to Use Case |
| Write operations in Query class | Use Use Case for writes |
| Mutation methods on domain entities | Create new instances instead |
| Missing `deletedAt: null` filter | Always filter soft-deleted records |
| Skipping interface implementation | DTOs **MUST** implement `@imkdw-dev/types` interfaces |

---

## Feature Directory Structure

```
src/features/{feature}/
├── controller/{feature}.controller.ts
├── dto/
│   ├── create-{feature}.dto.ts
│   ├── update-{feature}.dto.ts
│   └── get-{feature}.dto.ts
├── exception/
│   ├── {feature}-not-found.exception.ts
│   └── exist-{feature}.exception.ts
├── swagger/{feature}.swagger.ts
├── use-case/
│   ├── create-{feature}.use-case.ts
│   ├── update-{feature}.use-case.ts
│   └── delete-{feature}.use-case.ts
├── query/
│   └── get-{feature}.query.ts
├── validator/{feature}.validator.ts
└── {feature}.module.ts
```

---

## File Reference Table

| Pattern | File Path |
|---------|-----------|
| Controller | `src/features/article/controller/article.controller.ts` |
| Use Case | `src/features/article/use-case/create-article.use-case.ts` |
| Query | `src/features/article/query/get-articles.query.ts` |
| DTO | `src/features/article/dto/create-article.dto.ts` |
| Repository | `src/shared/repository/article/article.repository.ts` |
| Domain Entity | `src/shared/domain/article/article.ts` |
| Validator | `src/shared/validator/article.validator.ts` |
| Exception | `src/features/article/exception/article-not-found.exception.ts` |
| Guard | `src/common/guards/member-role.guard.ts` |
| Decorator | `src/common/decorator/public.decorator.ts` |
| Unit Test | `test/unit/features/article/dto/create-article.dto.spec.ts` |
| Integration Test | `test/integration/features/article/create-article.use-case.spec.ts` |
| Test Helper | `test/integration/helpers/article.helper.ts` |
| Swagger | `src/features/article/swagger/article.swagger.ts` |
| Mapper | `src/shared/mapper/article/article.mapper.ts` |
