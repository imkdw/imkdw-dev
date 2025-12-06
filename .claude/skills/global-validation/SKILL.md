---
name: Global Validation
description: Implement input validation using class-validator decorators, custom validators, and business rule validation patterns. Use this skill when adding validation decorators to DTOs, creating validator service classes (*.validator.ts), implementing existence/uniqueness checks, or validating business rules in use cases. This includes using decorators like @IsNotEmptyString, @MaxLength, @IsArray, @IsString, creating custom decorators, and implementing fail-fast validation patterns in validator classes. Apply when working with DTO files, validator classes in shared/validator/, or implementing input sanitization.
---

## When to use this skill

- When adding validation decorators to DTO classes
- When creating custom validation decorators
- When implementing validator service classes in shared/validator/
- When validating existence (checkExist) or uniqueness (checkExistTitle)
- When using class-validator decorators (@IsNotEmptyString, @MaxLength, etc.)
- When importing validation constants from @imkdw-dev/consts
- When implementing fail-fast validation in use cases
- When sanitizing user input
- When validating business rules at the application layer
- When working with Prisma transactions for validation queries

# Global Validation

This Skill provides Claude Code with specific guidance on how to adhere to coding standards as they relate to how it should handle global validation.

## Instructions

For details, refer to the information provided in this file:
[global validation](../../../agent-os/standards/global/validation.md)

## Project-Specific Patterns

### DTO Validation with Decorators

```typescript
import { IsNotEmptyString } from '@/common/decorator/is-not-empty-string.decorator';
import { ARTICLE_MAX_TITLE_LENGTH, ARTICLE_MAX_TAGS } from '@imkdw-dev/consts';

export class CreateArticleDto {
  @ApiProperty({ maxLength: ARTICLE_MAX_TITLE_LENGTH })
  @MaxLength(ARTICLE_MAX_TITLE_LENGTH)
  @IsNotEmptyString()
  readonly title: string;

  @ArrayMaxSize(ARTICLE_MAX_TAGS)
  @IsArray()
  @IsString({ each: true })
  readonly tags: string[];
}
```

### Validator Service Pattern

```typescript
// shared/validator/{entity}.validator.ts
@Injectable()
export class ArticleValidator {
  constructor(private readonly articleRepository: ArticleRepository) {}

  // Existence check - throws if not found
  async checkExist(id: string, tx?: Prisma.TransactionClient) {
    const article = await this.articleRepository.findById(id, tx);
    if (!article) {
      throw new ArticleNotFoundException('게시글을 찾을 수 없습니다');
    }
    return article;
  }

  // Uniqueness check - throws if duplicate exists
  async checkExistTitle(title: string, excludeId?: string, tx?: Prisma.TransactionClient) {
    const article = await this.articleRepository.findByTitle(title, tx);
    if (article && article.id !== excludeId) {
      throw new ExistArticleException(`${title}은 이미 존재하는 게시글 제목입니다`);
    }
  }

  // Slug uniqueness check
  async checkExistSlug(slug: string, tx?: Prisma.TransactionClient) {
    const article = await this.articleRepository.findBySlug(slug, tx);
    if (article) {
      throw new ExistArticleSlugException(`${slug}은 이미 존재하는 슬러그입니다`);
    }
  }
}
```

### Validator Naming Convention

```
checkExist(id)           # Entity existence by ID
checkExistBySlug(slug)   # Entity existence by slug
checkExistTitle(title)   # Title uniqueness check
checkExistSlug(slug)     # Slug uniqueness check
```

### Usage in Use Cases

```typescript
@Injectable()
export class UpdateArticleUseCase {
  async execute(slug: string, dto: UpdateArticleDto): Promise<void> {
    return this.prisma.$transaction(async tx => {
      // Validate existence first (fail fast)
      const article = await this.articleValidator.checkExistBySlug(slug, tx);

      // Validate uniqueness for updates
      await this.articleValidator.checkExistTitle(dto.title, article.id, tx);

      // Proceed with update
      await this.articleRepository.save(updatedArticle, tx);
    });
  }
}
```

### Custom Decorator Example

```typescript
// common/decorator/is-not-empty-string.decorator.ts
export function IsNotEmptyString() {
  return applyDecorators(
    IsString(),
    IsNotEmpty(),
    Transform(({ value }) => value?.trim())
  );
}
```

### Key Conventions

- Server-side validation always (never trust client)
- Use constants from @imkdw-dev/consts for limits
- Validator methods: checkExist, checkExistTitle, checkExistSlug
- Fail fast: validate at the start of use cases
- Transaction-aware validation with optional tx parameter
- Korean error messages for user-facing validation errors
