import { IncrementViewCountUseCase } from '@/features/article/use-case/increment-view-count.use-case';
import { ArticleValidator } from '@/shared/validator/article.validator';
import { ArticleRepository } from '@/shared/repository/article/article.repository';
import { SeriesRepository } from '@/shared/repository/series/series.repository';
import { ArticleNotFoundException } from '@/features/article/exception/article-not-found.exception';
import { createTestArticle } from '@test/integration/helpers/article.helper';
import { createTestSeries } from '@test/integration/helpers/series.helper';
import { IntegrationTestHelper } from '@test/integration/helpers/integration-test.helper';
import { PrismaService } from '@/infra/database/prisma.service';
import type { Article, Series } from '@prisma/client';

describe('게시글 조회수 증가 유스케이스', () => {
  let testHelper: IntegrationTestHelper;
  let sut: IncrementViewCountUseCase;
  let prisma: PrismaService;
  let testSeries: Series;
  let testArticle: Article;

  beforeAll(async () => {
    testHelper = new IntegrationTestHelper([
      IncrementViewCountUseCase,
      ArticleValidator,
      ArticleRepository,
      SeriesRepository,
    ]);
    await testHelper.setup();
  });

  beforeEach(async () => {
    sut = testHelper.getService(IncrementViewCountUseCase);
    await testHelper.startTransaction();
    prisma = testHelper.getPrisma();
    testSeries = await createTestSeries(prisma);
    testArticle = await createTestArticle(prisma, { seriesId: testSeries.id });
  });

  afterEach(() => {
    testHelper.rollbackTransaction();
  });

  describe('존재하지 않는 게시글 ID로 조회수를 증가시키면', () => {
    it('에러가 발생한다', async () => {
      const nonExistentId = 'nonExistentId';
      await expect(sut.execute(nonExistentId)).rejects.toThrow(ArticleNotFoundException);
    });
  });

  describe('존재하는 게시글의 조회수를 증가시키면', () => {
    it('조회수가 1 증가한다', async () => {
      const initialViewCount = testArticle.viewCount;

      await sut.execute(testArticle.id);

      const updatedArticle = await prisma.article.findUnique({
        where: { id: testArticle.id },
      });

      expect(updatedArticle?.viewCount).toBe(initialViewCount + 1);
    });

    it('여러 번 호출하면 조회수가 누적 증가한다', async () => {
      const initialViewCount = testArticle.viewCount;
      const incrementCount = 3;

      for (let i = 0; i < incrementCount; i++) {
        await sut.execute(testArticle.id);
      }

      const updatedArticle = await prisma.article.findUnique({
        where: { id: testArticle.id },
      });

      expect(updatedArticle?.viewCount).toBe(initialViewCount + incrementCount);
    });
  });

  describe('게시글 생성 후 조회수 증가 시나리오', () => {
    it('새로 생성된 게시글의 조회수를 증가시킬 수 있다', async () => {
      const newArticle = await createTestArticle(prisma, {
        seriesId: testSeries.id,
        title: '새로운 테스트 게시글',
        slug: 'new-test-article',
      });

      await sut.execute(newArticle.id);

      const updatedArticle = await prisma.article.findUnique({
        where: { id: newArticle.id },
      });
      expect(updatedArticle?.viewCount).toBe(1);
    });
  });
});
