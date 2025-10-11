import { ArticleCommentValidator } from '@/shared/validator/article-comment.validator';
import { ArticleCommentRepository } from '@/shared/repository/article-comment/article-comment.repository';
import { CannotDeleteArticleCommentException } from '@/features/article/exception/cannot-delete-article-comment.exception';
import { PrismaService } from '@/infra/database/prisma.service';
import { Requester } from '@/common/types/requester.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteArticleCommentUseCase {
  constructor(
    private readonly articleCommentValidator: ArticleCommentValidator,
    private readonly articleCommentRepository: ArticleCommentRepository,
    private readonly prisma: PrismaService
  ) {}

  async execute(commentId: string, requester: Requester): Promise<void> {
    await this.prisma.$transaction(async tx => {
      const existingComment = await this.articleCommentValidator.checkExist(commentId, tx);

      if (!existingComment.canDelete(requester)) {
        throw new CannotDeleteArticleCommentException('댓글을 삭제할 권한이 없습니다.');
      }

      await this.articleCommentRepository.delete(commentId, tx);
    });
  }
}
