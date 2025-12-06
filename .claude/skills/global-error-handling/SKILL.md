---
name: Global Error Handling
description: Implement consistent error handling using custom exceptions, exception codes, and NestJS exception filters. Use this skill when creating custom exception classes (*.exception.ts), defining exception codes in the @imkdw-dev/exception package, implementing exception filters, or handling errors in use cases and controllers. This includes extending CustomException base class, using HttpStatus from NestJS, defining feature-specific exception codes (EXCEPTION_CODES), and providing user-friendly error messages. Apply when working with files in features/{feature}/exception/, common/exception/, packages/shared/exception/, or when throwing/catching exceptions anywhere in the codebase.
---

## When to use this skill

- When creating new custom exception classes in features/{feature}/exception/
- When defining exception codes in packages/shared/exception/src/{feature}/
- When extending CustomException base class
- When throwing exceptions in use cases or validators
- When handling errors in controllers or exception filters
- When providing user-friendly error messages
- When using NestJS HttpStatus enum for status codes
- When implementing fail-fast validation patterns
- When working with common/exception/custom.exception.ts
- When categorizing exceptions by feature domain

# Global Error Handling

This Skill provides Claude Code with specific guidance on how to adhere to coding standards as they relate to how it should handle global error handling.

## Instructions

For details, refer to the information provided in this file:
[global error handling](../../../agent-os/standards/global/error-handling.md)

## Project-Specific Patterns

### Exception Class Structure

```typescript
// features/{feature}/exception/{feature}-{error-type}.exception.ts
import { CustomException } from '@/common/exception/custom.exception';
import { EXCEPTION_CODES } from '@imkdw-dev/exception';
import { HttpStatus } from '@nestjs/common';

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

### Exception Codes Definition

```typescript
// packages/shared/exception/src/{feature}/{feature}-exception-codes.ts
export const ARTICLE_EXCEPTION_CODES = {
  EXIST_ARTICLE_TITLE: 'ARTICLE-0001',
  INVALID_ARTICLE_TITLE: 'ARTICLE-0002',
  ARTICLE_NOT_FOUND: 'ARTICLE-0004',
  EXIST_ARTICLE_SLUG: 'ARTICLE-0005',
} as const;

// Exception messages (Korean)
export const ARTICLE_EXCEPTION_MESSAGES: Record<ArticleExceptionCode, string> = {
  [ARTICLE_EXCEPTION_CODES.EXIST_ARTICLE_TITLE]: '이미 존재하는 게시글 제목입니다.',
  [ARTICLE_EXCEPTION_CODES.ARTICLE_NOT_FOUND]: '게시글을 찾을 수 없습니다.',
} as const;
```

### Base Exception Class

```typescript
// common/exception/custom.exception.ts
interface CustomExceptionParams {
  message: string;
  errorCode: string;
  statusCode: HttpStatus;
}

export class CustomException extends HttpException {
  constructor(params: CustomExceptionParams) {
    super({ message: params.message, errorCode: params.errorCode }, params.statusCode);
  }
}
```

### Exception Naming Convention

```
{Entity}{ErrorType}Exception

Examples:
- ArticleNotFoundException       (404)
- ExistArticleException         (409 - duplicate title)
- ExistArticleSlugException     (409 - duplicate slug)
- InvalidJwtException           (401)
- CannotDeleteArticleComment    (403)
```

### Usage in Validators

```typescript
@Injectable()
export class ArticleValidator {
  async checkExist(id: string, tx?: Prisma.TransactionClient) {
    const article = await this.articleRepository.findById(id, tx);
    if (!article) {
      throw new ArticleNotFoundException('게시글을 찾을 수 없습니다');
    }
    return article;
  }
}
```

### Key Conventions

- Specific exception types per error scenario
- Exception codes prefixed with feature name (ARTICLE-, MEMBER-)
- Korean messages for user-facing errors
- HttpStatus enum for HTTP status codes
- Fail fast: validate early, throw with clear messages
- Centralized exception handling via NestJS filters
