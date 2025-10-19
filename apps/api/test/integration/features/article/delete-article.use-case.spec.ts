import { DeleteArticleUseCase } from '@/features/article/use-case/delete-article.use-case';
import { ArticleValidator } from '@/shared/validator/article.validator';
import { ArticleRepository } from '@/shared/repository/article/article.repository';
import { SeriesRepository } from '@/shared/repository/series/series.repository';
import { SeriesValidator } from '@/shared/validator/series.validator';
import { SeriesStatsService } from '@/shared/services/series/series-stats.service';
import { ArticleNotFoundException } from '@/features/article/exception/article-not-found.exception';
import { createTestArticle } from '@test/integration/helpers/article.helper';
import { createTestSeries } from '@test/integration/helpers/series.helper';
import { IntegrationTestHelper } from '@test/integration/helpers/integration-test.helper';
import { PrismaService } from '@/infra/database/prisma.service';
import type { Series, Article } from '@prisma/client';

describe('게시글 삭제 유스케이스', () => {
  let testHelper: IntegrationTestHelper;
  let sut: DeleteArticleUseCase;
  let prisma: PrismaService;
  let testSeries: Series;

  beforeAll(async () => {
    testHelper = new IntegrationTestHelper([
      DeleteArticleUseCase,
      ArticleValidator,
      ArticleRepository,
      SeriesRepository,
      SeriesValidator,
      SeriesStatsService,
    ]);
    await testHelper.setup();
  });

  beforeEach(async () => {
    sut = testHelper.getService(DeleteArticleUseCase);
    await testHelper.startTransaction();
    prisma = testHelper.getPrisma();
    testSeries = await createTestSeries(prisma);
  });

  afterEach(() => {
    testHelper.rollbackTransaction();
  });

  describe('존재하지 않는 게시글을 삭제하면', () => {
    it('에러가 발생한다', async () => {
      const nonExistentSlug = 'non-existent-slug';

      await expect(sut.execute(nonExistentSlug)).rejects.toThrow(ArticleNotFoundException);
    });
  });

  describe('정상적인 게시글을 삭제하면', () => {
    let existingArticle: Article;

    beforeEach(async () => {
      existingArticle = await createTestArticle(prisma, {
        title: '삭제할 게시글',
        content: '삭제할 게시글 내용입니다.',
        seriesId: testSeries.id,
      });
    });

    it('게시글이 삭제된다', async () => {
      await sut.execute(existingArticle.slug);

      const deletedArticle = await prisma.article.findUnique({
        where: { id: existingArticle.id },
      });

      expect(deletedArticle).not.toBeNull();
      expect(deletedArticle?.deletedAt).not.toBeNull();
      expect(deletedArticle?.deletedAt).toBeInstanceOf(Date);
    });
  });

  describe('이미 삭제된 게시글을 재삭제하면', () => {
    it('에러가 발생한다', async () => {
      const existingArticle = await createTestArticle(prisma, {
        title: '이미 삭제된 게시글',
        content: '이미 삭제된 게시글 내용',
        seriesId: testSeries.id,
      });

      await prisma.article.update({
        where: { id: existingArticle.id },
        data: { deletedAt: new Date() },
      });

      await expect(sut.execute(existingArticle.slug)).rejects.toThrow(ArticleNotFoundException);
    });
  });
});
