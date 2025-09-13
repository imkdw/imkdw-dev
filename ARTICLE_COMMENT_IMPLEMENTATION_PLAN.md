# 게시글 댓글 기능 구현 계획

## 개요
ArticleComment 도메인을 구현하여 게시글에 대한 댓글 및 댓글의 답글 기능을 제공합니다.

## 계층 구조
- **게시글(Article)** → 댓글(ArticleComment) → 답글(ArticleComment with parentId)
- 댓글: parentId가 null인 ArticleComment
- 답글: parentId가 있는 ArticleComment (댓글의 답글)

---

## Phase 0: 데이터베이스 스키마 정의

### 구현 파일
- `/apps/api/prisma/schema/article-comment.prisma`

### 구현 내용
```prisma
model ArticleComment {
  id        String   @id @default(uuid())
  content   String
  articleId String   @map("article_id")
  authorId  String   @map("author_id")
  parentId  String?  @map("parent_id")  // null이면 댓글, 값이 있으면 답글
  
  createdAt DateTime  @default(now()) @map("created_at")
  updatedAt DateTime  @updatedAt @map("updated_at")
  deletedAt DateTime? @map("deleted_at")
  
  article Article              @relation(fields: [articleId], references: [id])
  author  Member               @relation(fields: [authorId], references: [id])
  parent  ArticleComment?      @relation("ArticleCommentReplies", fields: [parentId], references: [id])
  replies ArticleComment[]     @relation("ArticleCommentReplies")
  
  @@map("article_comment")
}
```

### 작업 목록
- [ ] article-comment.prisma 파일 생성
- [ ] schema.prisma에 import 추가
- [ ] prisma generate 실행

---

## Phase 1: 패키지 레벨 타입 및 예외 정의

### 구현 파일
**타입 정의**
- `/packages/shared/types/src/dto/article-comment/create-article-comment.dto.ts`
- `/packages/shared/types/src/dto/article-comment/update-article-comment.dto.ts`
- `/packages/shared/types/src/dto/article-comment/index.ts`

**예외 코드 정의**
- `/packages/shared/exception/src/article-comment/article-comment-exception-codes.ts`
- `/packages/shared/exception/src/article-comment/index.ts`

### 구현 내용
**create-article-comment.dto.ts**
```typescript
export interface ICreateArticleCommentDto {
  content: string;
  authorId: string;
}

export interface IResponseCreateArticleCommentDto {
  id: string;
  content: string;
  authorId: string;
  createdAt: Date;
}
```

**update-article-comment.dto.ts**
```typescript
export interface IUpdateArticleCommentDto {
  content: string;
}
```

**article-comment-exception-codes.ts**
```typescript
export const ARTICLE_COMMENT_EXCEPTION_CODES = {
  ARTICLE_COMMENT_NOT_FOUND: 'ARTICLE-COMMENT-0001',
  CANNOT_REPLY_TO_REPLY: 'ARTICLE-COMMENT-0002',
} as const;
```

### 작업 목록
- [ ] 타입 디렉토리 및 파일 생성
- [ ] 예외 코드 디렉토리 및 파일 생성
- [ ] 패키지 빌드 실행

---

## Phase 2: 도메인 및 인프라 계층 구현

### 구현 파일
- `/apps/api/src/shared/domain/article-comment/article-comment.ts`
- `/apps/api/src/shared/entity/article-comment/article-comment.entity.ts`
- `/apps/api/src/shared/mapper/article-comment/article-comment.mapper.ts`
- `/apps/api/src/shared/repository/article-comment/article-comment.repository.ts`
- `/apps/api/src/shared/validator/article-comment.validator.ts`

### 구현 내용
**article-comment.ts (도메인 객체)**
```typescript
export class ArticleComment {
  id: string;
  content: string;
  articleId: string;
  authorId: string;
  parentId: string | null;
  createdAt: Date;

  private constructor(props: ArticleComment) {
    this.id = props.id;
    this.content = props.content;
    this.articleId = props.articleId;
    this.authorId = props.authorId;
    this.parentId = props.parentId;
    this.createdAt = props.createdAt;
  }

  static create(props: ArticleComment): ArticleComment {
    return new ArticleComment(props);
  }
}
```

**article-comment.repository.ts**
```typescript
class ArticleCommentRepository {
  async create(comment: ArticleComment, tx?: TransactionClient): Promise<ArticleComment>
  async save(comment: ArticleComment, tx?: TransactionClient): Promise<ArticleComment>
  async delete(id: string, tx?: TransactionClient): Promise<void>
  async findById(id: string, tx?: TransactionClient): Promise<ArticleComment | null>
  async findByArticleId(articleId: string): Promise<ArticleComment[]>
  async findByParentId(parentId: string): Promise<ArticleComment[]>
}
```

**article-comment.validator.ts**
```typescript
class ArticleCommentValidator {
  async checkExist(id: string, tx?: TransactionClient): Promise<ArticleComment>
  async checkIsNotReply(comment: ArticleComment): void
}
```

### 작업 목록
- [ ] 도메인 객체 생성
- [ ] 엔티티 타입 정의
- [ ] Mapper 구현
- [ ] Repository 구현
- [ ] Validator 구현
- [ ] ValidatorModule에 ArticleCommentValidator 등록

---

## Phase 3: 댓글 작성 기능 구현

### API 엔드포인트
`POST /articles/:articleId/comments`

### 구현 파일
- `/apps/api/src/features/article/comment/dto/create-article-comment.dto.ts`
- `/apps/api/src/features/article/comment/use-case/create-article-comment.use-case.ts`
- `/apps/api/src/features/article/comment/exception/article-comment-not-found.exception.ts`

### 구현 내용
**create-article-comment.dto.ts**
```typescript
class CreateArticleCommentDto implements ICreateArticleCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;
  
  @IsString()
  @IsNotEmpty()
  authorId: string;
}

class ResponseCreateArticleCommentDto implements IResponseCreateArticleCommentDto {
  id: string;
  content: string;
  authorId: string;
  createdAt: Date;
  
  static from(comment: ArticleComment): ResponseCreateArticleCommentDto {
    return {
      id: comment.id,
      content: comment.content,
      authorId: comment.authorId,
      createdAt: comment.createdAt,
    };
  }
}
```

**create-article-comment.use-case.ts**
```typescript
async execute(articleId: string, dto: CreateArticleCommentDto): Promise<ArticleComment> {
  return this.prisma.$transaction(async tx => {
    await this.articleValidator.checkExist(articleId, tx);
    
    const comment = ArticleComment.create({
      id: generateUUID(),
      content: dto.content,
      articleId: articleId,
      authorId: dto.authorId,
      parentId: null,
      createdAt: new Date()
    });
    
    return this.articleCommentRepository.create(comment, tx);
  });
}
```

### 작업 목록
- [ ] DTO 클래스 구현
- [ ] Use Case 구현
- [ ] Exception 클래스 구현
- [ ] Swagger 데코레이터 추가

---

## Phase 4: 댓글 수정 기능 구현

### API 엔드포인트
`PUT /articles/:articleId/comments/:commentId`

### 구현 파일
- `/apps/api/src/features/article/comment/dto/update-article-comment.dto.ts`
- `/apps/api/src/features/article/comment/use-case/update-article-comment.use-case.ts`

### 구현 내용
**update-article-comment.dto.ts**
```typescript
class UpdateArticleCommentDto implements IUpdateArticleCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}
```

**update-article-comment.use-case.ts**
```typescript
async execute(commentId: string, dto: UpdateArticleCommentDto): Promise<void> {
  return this.prisma.$transaction(async tx => {
    const existingComment = await this.articleCommentValidator.checkExist(commentId, tx);
    
    const updatedComment = ArticleComment.create({
      ...existingComment,
      content: dto.content
    });
    
    await this.articleCommentRepository.save(updatedComment, tx);
  });
}
```

### 작업 목록
- [ ] DTO 클래스 구현
- [ ] Use Case 구현
- [ ] HTTP 204 응답 설정

---

## Phase 5: 댓글 삭제 기능 구현

### API 엔드포인트
`DELETE /articles/:articleId/comments/:commentId`

### 구현 파일
- `/apps/api/src/features/article/comment/use-case/delete-article-comment.use-case.ts`

### 구현 내용
**delete-article-comment.use-case.ts**
```typescript
async execute(commentId: string): Promise<void> {
  return this.prisma.$transaction(async tx => {
    await this.articleCommentValidator.checkExist(commentId, tx);
    await this.articleCommentRepository.delete(commentId, tx);
  });
}
```

### 작업 목록
- [ ] Use Case 구현
- [ ] HTTP 204 응답 설정
- [ ] Soft Delete 로직 구현

---

## Phase 6: 댓글의 답글 작성 기능 구현

### API 엔드포인트
`POST /articles/:articleId/comments/:commentId/replies`

### 구현 파일
- `/apps/api/src/features/article/comment/use-case/create-article-reply.use-case.ts`
- `/apps/api/src/features/article/comment/exception/cannot-reply-to-reply.exception.ts`

### 구현 내용
**create-article-reply.use-case.ts**
```typescript
async execute(articleId: string, commentId: string, dto: CreateArticleCommentDto): Promise<ArticleComment> {
  return this.prisma.$transaction(async tx => {
    await this.articleValidator.checkExist(articleId, tx);
    const parentComment = await this.articleCommentValidator.checkExist(commentId, tx);
    
    if (parentComment.parentId !== null) {
      throw new CannotReplyToReplyException();
    }
    
    const reply = ArticleComment.create({
      id: generateUUID(),
      content: dto.content,
      articleId: articleId,
      authorId: dto.authorId,
      parentId: commentId,
      createdAt: new Date()
    });
    
    return this.articleCommentRepository.create(reply, tx);
  });
}
```

**cannot-reply-to-reply.exception.ts**
```typescript
export class CannotReplyToReplyException extends BadRequestException {
  constructor() {
    super('답글에는 답글을 작성할 수 없습니다');
  }
}
```

### 작업 목록
- [ ] Use Case 구현
- [ ] Exception 클래스 구현
- [ ] 답글의 답글 방지 로직 구현

---

## Phase 7: 특정 댓글의 답글 목록 조회 기능 구현

### API 엔드포인트
`GET /articles/:articleId/comments/:commentId/replies`

### 구현 파일
- `/apps/api/src/features/article/comment/use-case/get-article-replies.use-case.ts`

### 구현 내용
**get-article-replies.use-case.ts**
```typescript
async execute(commentId: string): Promise<ArticleComment[]> {
  await this.articleCommentValidator.checkExist(commentId);
  return this.articleCommentRepository.findByParentId(commentId);
}
```

### 작업 목록
- [ ] Use Case 구현
- [ ] 정렬 및 필터링 로직 구현

---

## Phase 8: Controller 구현 및 모듈 통합

### 구현 파일
- `/apps/api/src/features/article/comment/controller/article-comment.controller.ts`
- `/apps/api/src/features/article/comment/swagger/article-comment.swagger.ts`
- `/apps/api/src/features/article/article.module.ts` (수정)

### 구현 내용
**article-comment.controller.ts**
```typescript
@ApiTags('게시글 댓글')
@Controller('articles/:articleId/comments')
export class ArticleCommentController {
  constructor(
    private readonly createArticleCommentUseCase: CreateArticleCommentUseCase,
    private readonly updateArticleCommentUseCase: UpdateArticleCommentUseCase,
    private readonly deleteArticleCommentUseCase: DeleteArticleCommentUseCase,
    private readonly createArticleReplyUseCase: CreateArticleReplyUseCase,
    private readonly getArticleRepliesUseCase: GetArticleRepliesUseCase
  ) {}
  
  @Post()
  async createComment(
    @Param('articleId') articleId: string,
    @Body() dto: CreateArticleCommentDto
  ) {
    const comment = await this.createArticleCommentUseCase.execute(articleId, dto);
    return ResponseCreateArticleCommentDto.from(comment);
  }
  
  @Put(':commentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateComment(
    @Param('commentId') commentId: string,
    @Body() dto: UpdateArticleCommentDto
  ): Promise<void> {
    await this.updateArticleCommentUseCase.execute(commentId, dto);
  }
  
  @Delete(':commentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteComment(
    @Param('commentId') commentId: string
  ): Promise<void> {
    await this.deleteArticleCommentUseCase.execute(commentId);
  }
  
  @Post(':commentId/replies')
  async createReply(
    @Param('articleId') articleId: string,
    @Param('commentId') commentId: string,
    @Body() dto: CreateArticleCommentDto
  ) {
    const reply = await this.createArticleReplyUseCase.execute(articleId, commentId, dto);
    return ResponseCreateArticleCommentDto.from(reply);
  }
  
  @Get(':commentId/replies')
  async getReplies(
    @Param('commentId') commentId: string
  ) {
    return this.getArticleRepliesUseCase.execute(commentId);
  }
}
```

### 작업 목록
- [ ] Controller 클래스 구현
- [ ] Swagger 데코레이터 구현
- [ ] ArticleModule에 Controller 및 Provider 등록
- [ ] API 테스트 실행