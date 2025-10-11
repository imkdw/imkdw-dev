import { ArticleCommentValidator } from '@/shared/validator/article-comment.validator';
import { ArticleCommentRepository } from '@/shared/repository/article-comment/article-comment.repository';
import { CannotUpdateArticleCommentException } from '@/features/article/exception/cannot-update-article-comment.exception';
import { UpdateArticleCommentDto } from '@/features/article/dto/update-article-comment.dto';
import { ArticleComment } from '@/shared/domain/article/article-comment';
import { PrismaService } from '@/infra/database/prisma.service';
import { Requester } from '@/common/types/requester.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateArticleCommentUseCase {
  constructor(
    private readonly articleCommentValidator: ArticleCommentValidator,
    private readonly articleCommentRepository: ArticleCommentRepository,
    private readonly prisma: PrismaService
  ) {}

  async execute(commentId: string, dto: UpdateArticleCommentDto, requester: Requester): Promise<void> {
    return this.prisma.$transaction(async tx => {
      const existingComment = await this.articleCommentValidator.checkExist(commentId, tx);
      if (!existingComment.canUpdate(requester)) {
        throw new CannotUpdateArticleCommentException('댓글을 수정할 권한이 없습니다.');
      }

      const updatedComment = ArticleComment.create({
        ...existingComment,
        content: dto.content,
      });

      await this.articleCommentRepository.save(updatedComment, tx);
    });
  }
}
