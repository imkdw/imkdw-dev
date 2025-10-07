import { generateUUID } from '@imkdw-dev/utils';
import { ArticleValidator } from '@/shared/validator/article.validator';
import { ArticleCommentValidator } from '@/shared/validator/article-comment.validator';
import { ArticleCommentRepository } from '@/shared/repository/article-comment/article-comment.repository';
import { CreateArticleCommentDto } from '@/features/article/dto/create-article-comment.dto';
import { ArticleComment } from '@/shared/domain/article/article-comment';
import { PrismaService } from '@/infra/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateArticleReplyUseCase {
  constructor(
    private readonly articleValidator: ArticleValidator,
    private readonly articleCommentValidator: ArticleCommentValidator,
    private readonly articleCommentRepository: ArticleCommentRepository,
    private readonly prisma: PrismaService
  ) {}

  async execute(
    articleSlug: string,
    commentId: string,
    dto: CreateArticleCommentDto,
    authorId: string
  ): Promise<ArticleComment> {
    return this.prisma.$transaction(async tx => {
      const article = await this.articleValidator.checkExistBySlug(articleSlug, tx);
      const parentComment = await this.articleCommentValidator.checkExist(commentId, tx);

      await this.articleCommentValidator.checkCanHaveReply(parentComment);

      const reply = ArticleComment.create({
        id: generateUUID(),
        content: dto.content,
        articleId: article.id,
        authorId: authorId,
        parentId: commentId,
        createdAt: new Date(),
      });

      return this.articleCommentRepository.create(reply, tx);
    });
  }
}
