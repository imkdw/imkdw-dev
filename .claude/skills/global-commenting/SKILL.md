---
name: Global Commenting
description: Write appropriate code comments following the project's self-documenting code philosophy. Use this skill when deciding whether to add comments to code, when writing JSDoc comments for public APIs, when documenting complex business logic, or when maintaining existing code comments. This includes avoiding comments that describe recent changes or temporary fixes, writing evergreen informational comments, using clear naming instead of comments where possible, and adding minimal but helpful comments for large code sections. Apply when writing any TypeScript code and deciding on documentation approach.
---

## When to use this skill

- When deciding whether code needs a comment or should be self-documenting
- When writing JSDoc comments for exported functions or classes
- When documenting complex algorithms or business logic
- When explaining "why" rather than "what" in code sections
- When reviewing existing comments for relevance and accuracy
- When refactoring code to be more self-documenting
- When adding API documentation with @ApiProperty decorators
- When writing Korean comments for Korean-specific business logic
- When avoiding comments that describe changes or fixes

# Global Commenting

This Skill provides Claude Code with specific guidance on how to adhere to coding standards as they relate to how it should handle global commenting.

## Instructions

For details, refer to the information provided in this file:
[global commenting](../../../agent-os/standards/global/commenting.md)

## Project-Specific Patterns

### Self-Documenting Code (Preferred)

```typescript
// Good: Clear function name explains intent
async checkExistTitle(title: string, excludeId?: string): Promise<void> {
  const article = await this.articleRepository.findByTitle(title);
  if (article && article.id !== excludeId) {
    throw new ExistArticleException(`${title} already exists`);
  }
}

// Bad: Comment describes obvious code
// Check if article title exists
async check(t: string): Promise<void> { ... }
```

### When Comments Are Appropriate

````typescript
// Algorithm explanation (complex business logic)
static calculateReadMinute(content: string): number {
  const KOREAN_CHARS_PER_MINUTE = 300;
  const ENGLISH_WORDS_PER_MINUTE = 200;
  // Exclude code blocks from reading time calculation
  const cleanContent = content.replace(/```[\s\S]*?```/g, '');
  ...
}

// Domain-specific Korean comments
// API Property descriptions in Korean for Swagger
@ApiProperty({ description: '게시글 제목', example: '게시글 제목입니다' })
````

### Comments to Avoid

```typescript
// Bad: Describes a change or fix
// Fixed bug where title wasn't validated - 2024.01.15

// Bad: Temporary marker
// TODO: Remove after testing

// Bad: Commented-out code
// const oldLogic = await this.oldMethod();

// Bad: Obvious statement
// Return the article
return article;
```

### JSDoc for Public APIs

```typescript
/**
 * Creates a new article with the given data.
 * @param dto - The article creation data
 * @returns The created article domain object
 * @throws ExistArticleException if title already exists
 */
async execute(dto: CreateArticleDto): Promise<Article>
```

### Key Conventions

- Self-documenting code first, comments second
- Comments explain "why", not "what"
- No comments about changes, fixes, or temporary states
- Comments should be evergreen and future-relevant
- Use Korean for Swagger API descriptions
- Remove commented-out code blocks
