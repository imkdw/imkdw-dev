import { CreateArticleReplyUseCase } from '@/features/article/use-case/create-article-reply.use-case';
import { ArticleValidator } from '@/shared/validator/article.validator';
import { ArticleCommentValidator } from '@/shared/validator/article-comment.validator';
import { ArticleCommentRepository } from '@/shared/repository/article-comment/article-comment.repository';
import { CreateArticleCommentDto } from '@/features/article/dto/create-article-comment.dto';
import { ArticleNotFoundException } from '@/features/article/exception/article-not-found.exception';
import { ArticleCommentNotFoundException } from '@/features/article/exception/article-comment-not-found.exception';
import { createTestArticle } from '@test/integration/helpers/article.helper';
import { createTestMember } from '@test/integration/helpers/member.helper';
import { createTestSeries } from '@test/integration/helpers/series.helper';
import { createTestComment, createTestReply } from '@test/integration/helpers/article-comment.helper';
import { IntegrationTestHelper } from '@test/integration/helpers/integration-test.helper';
import { PrismaService } from '@/infra/database/prisma.service';
import type { Article, Member, Series, ArticleComment } from '@prisma/client';
import { ArticleRepository } from '@/shared/repository/article/article.repository';

describe('게시글 답글 생성 유스케이스', () => {
  let testHelper: IntegrationTestHelper;
  let sut: CreateArticleReplyUseCase;
  let prisma: PrismaService;
  let testSeries: Series;
  let testArticle: Article;
  let testMember: Member;
  let otherMember: Member;
  let testComment: ArticleComment;

  beforeAll(async () => {
    testHelper = new IntegrationTestHelper([
      CreateArticleReplyUseCase,
      ArticleValidator,
      ArticleCommentValidator,
      ArticleCommentRepository,
      ArticleRepository,
    ]);
    await testHelper.setup();
  });

  beforeEach(async () => {
    sut = testHelper.getService(CreateArticleReplyUseCase);
    await testHelper.startTransaction();
    prisma = testHelper.getPrisma();

    testSeries = await createTestSeries(prisma);
    testArticle = await createTestArticle(prisma, { seriesId: testSeries.id });
    testMember = await createTestMember(prisma);
    otherMember = await createTestMember(prisma, { email: 'other@test.com' });
    testComment = await createTestComment(prisma, {
      articleId: testArticle.id,
      authorId: testMember.id,
    });
  });

  afterEach(() => {
    testHelper.rollbackTransaction();
  });

  describe('존재하지 않는 게시글에 답글을 생성하면', () => {
    it('에러가 발생한다', async () => {
      const createReplyDto: CreateArticleCommentDto = {
        content: '테스트 답글 내용입니다.',
      };

      await expect(
        sut.execute('123e4567-e89b-12d3-a456-426614174000', testComment.id, createReplyDto, otherMember.id)
      ).rejects.toThrow(ArticleNotFoundException);
    });
  });

  describe('존재하지 않는 댓글에 답글을 생성하면', () => {
    it('에러가 발생한다', async () => {
      const createReplyDto: CreateArticleCommentDto = {
        content: '테스트 답글 내용입니다.',
      };

      await expect(
        sut.execute(testArticle.id, '123e4567-e89b-12d3-a456-426614174000', createReplyDto, otherMember.id)
      ).rejects.toThrow(ArticleCommentNotFoundException);
    });
  });

  describe('답글에 또 다른 답글을 생성하면', () => {
    it('에러가 발생한다', async () => {
      const firstReply = await createTestReply(prisma, {
        articleId: testArticle.id,
        authorId: otherMember.id,
        parentId: testComment.id,
      });

      const createReplyDto: CreateArticleCommentDto = {
        content: '답글의 답글 내용입니다.',
      };

      await expect(sut.execute(testArticle.id, firstReply.id, createReplyDto, testMember.id)).rejects.toThrow();
    });
  });

  describe('댓글에 답글을 생성하면', () => {
    it('답글이 생성된다', async () => {
      const createReplyDto: CreateArticleCommentDto = {
        content: '테스트 답글 내용입니다.',
      };

      const result = await sut.execute(testArticle.id, testComment.id, createReplyDto, otherMember.id);

      const savedReply = await prisma.articleComment.findUnique({ where: { id: result.id } });
      expect(savedReply).not.toBeNull();
      expect(savedReply?.content).toBe(createReplyDto.content);
      expect(savedReply?.articleId).toBe(testArticle.id);
      expect(savedReply?.authorId).toBe(otherMember.id);
      expect(savedReply?.parentId).toBe(testComment.id);
    });
  });
});
