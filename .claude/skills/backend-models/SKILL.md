---
name: Backend Models
description: Design and implement domain entities, DTOs, and data transfer objects following the project's domain-driven design patterns. Use this skill when creating or modifying domain entity classes in shared/domain/, DTO classes in features/{feature}/dto/, entity mappers in shared/mapper/, or shared type interfaces in packages/shared/types/src/dto/. This includes implementing the static factory pattern (Entity.create()), writing DTO validation decorators (class-validator), creating response DTOs with static from() methods, and defining shared interfaces that API DTOs must implement. Apply when working with @imkdw-dev/types package interfaces, ArticleContent value objects, or any file ending in .dto.ts, domain entities, or mapper classes.
---

## When to use this skill

- When creating new domain entity classes in `shared/domain/{entity}/` directories
- When implementing static `create()` factory methods for domain entities
- When creating request/response DTO classes in `features/{feature}/dto/` directories
- When adding class-validator decorators (@IsNotEmptyString, @MaxLength, @IsArray, etc.)
- When implementing shared type interfaces from `@imkdw-dev/types` package
- When creating entity mapper classes in `shared/mapper/{entity}/` directories
- When defining response DTOs with static `from()` factory methods
- When working with value objects like ArticleContent
- When importing constants from `@imkdw-dev/consts` for validation rules
- When creating interfaces in `packages/shared/types/src/dto/{feature}/`

# Backend Models

This Skill provides Claude Code with specific guidance on how to adhere to coding standards as they relate to how it should handle backend models.

## Instructions

For details, refer to the information provided in this file:
[backend models](../../../agent-os/standards/backend/models.md)

## Project-Specific Patterns

### Domain Entity Pattern

```typescript
interface Params {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

export class Article {
  id: string;
  title: string;
  content: ArticleContent; // Value object
  createdAt: Date;

  private constructor(props: Params) {
    this.id = props.id;
    this.title = props.title;
    this.content = new ArticleContent(props.content);
    this.createdAt = props.createdAt;
  }

  static create(props: Params): Article {
    return new Article(props);
  }

  static calculateReadMinute(content: string): number {
    // Domain logic here
  }
}
```

### Request DTO Pattern

```typescript
import { ICreateArticleDto } from '@imkdw-dev/types';
import { ARTICLE_MAX_TITLE_LENGTH } from '@imkdw-dev/consts';

export class CreateArticleDto implements ICreateArticleDto {
  @ApiProperty({ description: 'Title', maxLength: ARTICLE_MAX_TITLE_LENGTH })
  @MaxLength(ARTICLE_MAX_TITLE_LENGTH)
  @IsNotEmptyString()
  readonly title: string;

  @IsArray()
  @IsString({ each: true })
  readonly tags: string[];
}
```

### Response DTO Pattern

```typescript
export class ResponseCreateArticleDto implements IResponseCreateArticleDto {
  private constructor(id: string, slug: string) {
    this.id = id;
    this.slug = slug;
  }

  @ApiProperty({ description: 'Created article ID' })
  readonly id: string;

  static from(article: Article): ResponseCreateArticleDto {
    return new ResponseCreateArticleDto(article.id, article.slug);
  }
}
```

### Mapper Pattern

```typescript
@Injectable()
export class ArticleMapper {
  static toDomain(entity: PrismaArticle): Article {
    return Article.create({
      id: entity.id,
      title: entity.title,
      content: entity.content,
      createdAt: entity.createdAt,
    });
  }
}
```

### Key Conventions

- Domain entities use private constructors with static `create()` factory methods
- Request DTOs implement interfaces from `@imkdw-dev/types`
- Response DTOs have private constructors with static `from()` factory methods
- Use constants from `@imkdw-dev/consts` for validation limits
- No 204 No Content response DTOs (return void instead)
- DTOs are written independently (no PickType, OmitType usage)
