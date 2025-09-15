import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ArticleComment } from '@/shared/domain/article/article-comment';
import { ArticleCommentRepository } from '@/shared/repository/article-comment/article-comment.repository';
import { ArticleCommentNotFoundException } from '@/features/article/exception/article-comment-not-found.exception';
import { CannotReplyToReplyException } from '@/features/article/exception/cannot-reply-to-reply.exception';

@Injectable()
export class ArticleCommentValidator {
  constructor(private readonly articleCommentRepository: ArticleCommentRepository) {}

  async checkExist(id: string, tx?: Prisma.TransactionClient): Promise<ArticleComment> {
    const comment = await this.articleCommentRepository.findById(id, tx);

    if (!comment) {
      throw new ArticleCommentNotFoundException(`게시글 댓글을 찾을 수 없습니다`);
    }

    return comment;
  }

  async checkCanHaveReply(comment: ArticleComment): Promise<void> {
    if (!comment.canReceiveReply()) {
      throw new CannotReplyToReplyException(`답글에는 답글을 작성할 수 없습니다`);
    }
  }
}
