import { generateUUID } from '@/common/utils/string.util';
import { ArticleValidator } from '@/shared/validator/article.validator';
import { ArticleCommentRepository } from '@/shared/repository/article-comment/article-comment.repository';
import { CreateArticleCommentDto } from '@/features/article/dto/create-article-comment.dto';
import { ArticleComment } from '@/shared/domain/article-comment/article-comment';
import { PrismaService } from '@/infra/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateArticleCommentUseCase {
  constructor(
    private readonly articleValidator: ArticleValidator,
    private readonly articleCommentRepository: ArticleCommentRepository,
    private readonly prisma: PrismaService
  ) {}

  async execute(articleId: string, dto: CreateArticleCommentDto, authorId: string): Promise<ArticleComment> {
    return this.prisma.$transaction(async tx => {
      await this.articleValidator.checkExist(articleId, tx);

      const comment = ArticleComment.create({
        id: generateUUID(),
        content: dto.content,
        articleId: articleId,
        parentId: null,
        authorId: authorId,
        createdAt: new Date(),
      });

      return this.articleCommentRepository.create(comment, tx);
    });
  }
}
