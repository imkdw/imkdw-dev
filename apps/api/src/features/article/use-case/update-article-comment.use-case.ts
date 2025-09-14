import { ArticleCommentValidator } from '@/shared/validator/article-comment.validator';
import { ArticleCommentRepository } from '@/shared/repository/article-comment/article-comment.repository';
import { UpdateArticleCommentDto } from '@/features/article/dto/update-article-comment.dto';
import { ArticleComment } from '@/shared/domain/article-comment/article-comment';
import { PrismaService } from '@/infra/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateArticleCommentUseCase {
  constructor(
    private readonly articleCommentValidator: ArticleCommentValidator,
    private readonly articleCommentRepository: ArticleCommentRepository,
    private readonly prisma: PrismaService
  ) {}

  async execute(commentId: string, dto: UpdateArticleCommentDto, authorId: string): Promise<void> {
    return this.prisma.$transaction(async tx => {
      const existingComment = await this.articleCommentValidator.checkExist(commentId, tx);

      // 작성자 권한 검증
      if (existingComment.authorId !== authorId) {
        throw new Error('댓글 수정 권한이 없습니다.');
      }

      const updatedComment = ArticleComment.create({
        ...existingComment,
        content: dto.content,
      });

      await this.articleCommentRepository.save(updatedComment, tx);
    });
  }
}
