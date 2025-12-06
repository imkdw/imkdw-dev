---
name: Testing Test Writing
description: Write unit and integration tests following the project's testing patterns with Jest. Use this skill when creating test files (*.spec.ts), writing unit tests for DTOs and domain entities, writing integration tests for use cases and queries, setting up test fixtures, or using test utilities. This includes organizing tests in test/unit/ and test/integration/ directories, using proper test naming conventions, mocking external dependencies, and testing with real database transactions for integration tests. Apply when working with any *.spec.ts file, test fixtures, or implementing the project's test-behavior-not-implementation philosophy.
---

## When to use this skill

- When creating new test files (\*.spec.ts)
- When writing unit tests for DTO validation in test/unit/
- When writing integration tests for use cases in test/integration/
- When setting up test fixtures in test/fixtures/
- When mocking dependencies for isolated unit tests
- When testing with real database transactions (integration tests)
- When following the "test behavior, not implementation" principle
- When writing descriptive test names that explain expected outcomes
- When testing only core user flows and critical paths
- When using NestJS testing utilities (Test.createTestingModule)

# Testing Test Writing

This Skill provides Claude Code with specific guidance on how to adhere to coding standards as they relate to how it should handle testing test writing.

## Instructions

For details, refer to the information provided in this file:
[testing test writing](../../../agent-os/standards/testing/test-writing.md)

## Project-Specific Patterns

### Test Directory Structure

```
apps/api/test/
  fixtures/          # Shared test data and utilities
  unit/              # Unit tests (fast, isolated)
    features/{feature}/dto/
    shared/domain/{entity}/
  integration/       # Integration tests (with DB)
    features/{feature}/
```

### Unit Test Pattern (DTO Validation)

```typescript
// test/unit/features/article/dto/create-article.dto.spec.ts
describe('CreateArticleDto', () => {
  let validator: ClassValidator;

  beforeAll(() => {
    validator = new ClassValidator();
  });

  it('should pass validation with valid data', async () => {
    const dto = plainToInstance(CreateArticleDto, {
      title: 'Valid Title',
      slug: 'valid-slug',
      content: 'Valid content',
      seriesId: 'uuid',
      tags: ['tag1'],
      uploadedImageUrls: [],
    });
    const errors = await validator.validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail when title exceeds max length', async () => {
    const dto = plainToInstance(CreateArticleDto, {
      title: 'a'.repeat(ARTICLE_MAX_TITLE_LENGTH + 1),
      // ...other fields
    });
    const errors = await validator.validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
```

### Integration Test Pattern (Use Case)

```typescript
// test/integration/features/article/create-article.use-case.spec.ts
describe('CreateArticleUseCase', () => {
  let module: TestingModule;
  let useCase: CreateArticleUseCase;
  let prisma: PrismaService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    useCase = module.get(CreateArticleUseCase);
    prisma = module.get(PrismaService);
  });

  afterEach(async () => {
    // Clean up test data
    await prisma.article.deleteMany();
  });

  it('should create article with valid data', async () => {
    const dto = createValidArticleDto();
    const result = await useCase.execute(dto);

    expect(result.id).toBeDefined();
    expect(result.title).toBe(dto.title);
  });

  it('should throw ExistArticleException when title exists', async () => {
    const dto = createValidArticleDto();
    await useCase.execute(dto);

    await expect(useCase.execute(dto)).rejects.toThrow(ExistArticleException);
  });
});
```

### Test Naming Convention

```typescript
describe('ComponentName', () => {
  it('should [expected behavior] when [condition]', () => {});
  it('should throw [ExceptionType] when [error condition]', () => {});
});
```

### Test Commands

```bash
pnpm api test              # All tests
pnpm api test:unit         # Unit tests only
pnpm api test:integration  # Integration tests (needs .env.test)
pnpm api test:cov          # With coverage
```

### Key Conventions

- Minimal tests during development - focus on feature completion first
- Test only core user flows and critical paths
- Test behavior, not implementation details
- Clear test names describing expected outcome
- Mock external dependencies in unit tests
- Use real DB in integration tests with cleanup
- Fast unit tests (milliseconds)
- Defer edge case testing unless business-critical
