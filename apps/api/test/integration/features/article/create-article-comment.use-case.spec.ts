import { CreateArticleCommentUseCase } from '@/features/article/use-case/create-article-comment.use-case';
import { ArticleValidator } from '@/shared/validator/article.validator';
import { ArticleCommentRepository } from '@/shared/repository/article-comment/article-comment.repository';
import { CreateArticleCommentDto } from '@/features/article/dto/create-article-comment.dto';
import { ArticleNotFoundException } from '@/features/article/exception/article-not-found.exception';
import { createTestArticle } from '@test/integration/helpers/article.helper';
import { createTestMember } from '@test/integration/helpers/member.helper';
import { createTestSeries } from '@test/integration/helpers/series.helper';
import { IntegrationTestHelper } from '@test/integration/helpers/integration-test.helper';
import { PrismaService } from '@/infra/database/prisma.service';
import type { Article, Member, Series } from '@prisma/client';
import { ArticleRepository } from '@/shared/repository/article/article.repository';

describe('게시글 댓글 생성 유스케이스', () => {
  let testHelper: IntegrationTestHelper;
  let sut: CreateArticleCommentUseCase;
  let prisma: PrismaService;
  let testSeries: Series;
  let testArticle: Article;
  let testMember: Member;

  beforeAll(async () => {
    testHelper = new IntegrationTestHelper([
      CreateArticleCommentUseCase,
      ArticleValidator,
      ArticleCommentRepository,
      ArticleRepository,
    ]);
    await testHelper.setup();
  });

  beforeEach(async () => {
    sut = testHelper.getService(CreateArticleCommentUseCase);
    await testHelper.startTransaction();
    prisma = testHelper.getPrisma();

    testSeries = await createTestSeries(prisma);
    testArticle = await createTestArticle(prisma, { seriesId: testSeries.id });
    testMember = await createTestMember(prisma);
  });

  afterEach(() => {
    testHelper.rollbackTransaction();
  });

  describe('존재하지 않는 게시글에 댓글을 생성하면', () => {
    it('에러가 발생한다', async () => {
      const createArticleCommentDto: CreateArticleCommentDto = {
        content: '테스트 댓글 내용입니다.',
      };

      await expect(
        sut.execute('123e4567-e89b-12d3-a456-426614174000', createArticleCommentDto, testMember.id)
      ).rejects.toThrow(ArticleNotFoundException);
    });
  });

  describe('새로운 댓글을 생성하면', () => {
    it('댓글이 생성된다', async () => {
      const createArticleCommentDto: CreateArticleCommentDto = {
        content: '테스트 댓글 내용입니다.',
      };

      const result = await sut.execute(testArticle.slug, createArticleCommentDto, testMember.id);

      const savedComment = await prisma.articleComment.findUnique({ where: { id: result.id } });
      expect(savedComment).not.toBeNull();
      expect(savedComment?.content).toBe(createArticleCommentDto.content);
      expect(savedComment?.articleId).toBe(testArticle.id);
      expect(savedComment?.authorId).toBe(testMember.id);
      expect(savedComment?.parentId).toBeNull();
    });
  });
});
