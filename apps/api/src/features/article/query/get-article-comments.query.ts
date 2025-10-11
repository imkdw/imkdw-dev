import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma.service';
import { ArticleValidator } from '@/shared/validator/article.validator';
import { ArticleCommentDto, ResponseGetArticleCommentsDto } from '@/features/article/dto/get-article-comments.dto';

@Injectable()
export class GetArticleCommentsQuery {
  constructor(
    private readonly prisma: PrismaService,
    private readonly articleValidator: ArticleValidator
  ) {}

  async execute(articleSlug: string): Promise<ResponseGetArticleCommentsDto> {
    const article = await this.articleValidator.checkExistBySlug(articleSlug);

    const comments = await this.prisma.articleComment.findMany({
      where: {
        articleId: article.id,
        parentId: null,
        deletedAt: null,
      },
      include: {
        author: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    const commentList: ArticleCommentDto[] = comments.map(comment => ({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      author: {
        nickname: comment.author.nickname,
        profileImage: comment.author.profileImage,
      },
    }));

    return { comments: commentList };
  }
}
