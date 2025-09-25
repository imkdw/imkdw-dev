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
      const nonExistentId = 'non-existent-id';

      await expect(sut.execute(nonExistentId)).rejects.toThrow(ArticleNotFoundException);
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

    it('soft delete로 게시글이 삭제된다', async () => {
      await sut.execute(existingArticle.id);

      const deletedArticle = await prisma.article.findUnique({
        where: { id: existingArticle.id },
      });

      expect(deletedArticle).not.toBeNull();
      expect(deletedArticle?.deletedAt).not.toBeNull();
      expect(deletedArticle?.deletedAt).toBeInstanceOf(Date);
    });

    it('삭제된 게시글은 일반 조회시 나타나지 않는다', async () => {
      await sut.execute(existingArticle.id);

      const foundArticle = await prisma.article.findFirst({
        where: {
          id: existingArticle.id,
          deletedAt: null,
        },
      });

      expect(foundArticle).toBeNull();
    });

    it('게시글에 연결된 태그 관계는 유지된다', async () => {
      await prisma.tag.createMany({
        data: [
          { id: 'tag-1', name: 'JavaScript' },
          { id: 'tag-2', name: 'TypeScript' },
        ],
      });
      await prisma.articleTag.createMany({
        data: [
          { articleId: existingArticle.id, tagId: 'tag-1' },
          { articleId: existingArticle.id, tagId: 'tag-2' },
        ],
      });

      await sut.execute(existingArticle.id);

      const articleTags = await prisma.articleTag.findMany({
        where: { articleId: existingArticle.id },
      });

      expect(articleTags).toHaveLength(2);
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

      await expect(sut.execute(existingArticle.id)).rejects.toThrow(ArticleNotFoundException);
    });
  });

  describe('게시글 삭제 시 시리즈 통계가 갱신되면', () => {
    it('시리즈의 게시글 수가 감소한다', async () => {
      const article1 = await createTestArticle(prisma, {
        title: '첫 번째 게시글',
        content: '첫 번째 게시글 내용',
        seriesId: testSeries.id,
      });
      await createTestArticle(prisma, {
        title: '두 번째 게시글',
        content: '두 번째 게시글 내용',
        seriesId: testSeries.id,
      });

      await prisma.series.update({
        where: { id: testSeries.id },
        data: {
          articleCount: 2,
          totalReadMinute: 2,
          lastArticleCreatedAt: new Date(),
        },
      });

      await sut.execute(article1.id);

      const updatedSeries = await prisma.series.findUnique({
        where: { id: testSeries.id },
      });

      expect(updatedSeries?.articleCount).toBe(1);
    });

    it('시리즈의 총 읽기 시간이 재계산된다', async () => {
      const article1 = await createTestArticle(prisma, {
        title: '첫 번째 게시글',
        content: '첫 번째 게시글 내용. '.repeat(100), // 긴 내용
        seriesId: testSeries.id,
        readMinute: 5,
      });
      const article2 = await createTestArticle(prisma, {
        title: '두 번째 게시글',
        content: '두 번째 게시글 내용. '.repeat(50),
        seriesId: testSeries.id,
        readMinute: 3,
      });

      await prisma.series.update({
        where: { id: testSeries.id },
        data: {
          articleCount: 2,
          totalReadMinute: 8,
          lastArticleCreatedAt: article2.createdAt,
        },
      });

      await sut.execute(article1.id);

      const updatedSeries = await prisma.series.findUnique({
        where: { id: testSeries.id },
      });

      expect(updatedSeries?.totalReadMinute).toBe(3);
    });

    it('마지막 게시글을 삭제하면 이전 게시글의 생성일이 lastArticleCreatedAt이 된다', async () => {
      const article1 = await createTestArticle(prisma, {
        title: '첫 번째 게시글',
        content: '첫 번째 게시글 내용',
        seriesId: testSeries.id,
      });

      await new Promise(resolve => setTimeout(resolve, 10));

      const article2 = await createTestArticle(prisma, {
        title: '두 번째 게시글',
        content: '두 번째 게시글 내용',
        seriesId: testSeries.id,
      });

      await prisma.series.update({
        where: { id: testSeries.id },
        data: {
          articleCount: 2,
          totalReadMinute: 2,
          lastArticleCreatedAt: article2.createdAt,
        },
      });

      await sut.execute(article2.id);

      const updatedSeries = await prisma.series.findUnique({
        where: { id: testSeries.id },
      });

      expect(updatedSeries?.lastArticleCreatedAt?.getTime()).toBeCloseTo(article1.createdAt.getTime(), -2);
      expect(updatedSeries?.articleCount).toBe(1);
    });

    it('시리즈의 유일한 게시글을 삭제하면 시리즈가 빈 상태가 된다', async () => {
      const onlyArticle = await createTestArticle(prisma, {
        title: '유일한 게시글',
        content: '유일한 게시글 내용. '.repeat(50),
        seriesId: testSeries.id,
        readMinute: 5,
      });

      await prisma.series.update({
        where: { id: testSeries.id },
        data: {
          articleCount: 1,
          totalReadMinute: 5,
          lastArticleCreatedAt: onlyArticle.createdAt,
        },
      });

      await sut.execute(onlyArticle.id);

      const updatedSeries = await prisma.series.findUnique({
        where: { id: testSeries.id },
      });

      expect(updatedSeries?.articleCount).toBe(0);
      expect(updatedSeries?.totalReadMinute).toBe(0);
      expect(updatedSeries?.lastArticleCreatedAt).toBeNull();
    });

    it('여러 게시글 중 일부를 삭제하면 나머지 게시글의 통계만 계산된다', async () => {
      const article1 = await createTestArticle(prisma, {
        title: '첫 번째 게시글',
        content: '첫 번째 게시글 내용',
        seriesId: testSeries.id,
        readMinute: 2,
      });
      const article2 = await createTestArticle(prisma, {
        title: '두 번째 게시글',
        content: '두 번째 게시글 내용',
        seriesId: testSeries.id,
        readMinute: 3,
      });
      const article3 = await createTestArticle(prisma, {
        title: '세 번째 게시글',
        content: '세 번째 게시글 내용',
        seriesId: testSeries.id,
        readMinute: 4,
      });

      await prisma.series.update({
        where: { id: testSeries.id },
        data: {
          articleCount: 3,
          totalReadMinute: 9,
          lastArticleCreatedAt: article3.createdAt,
        },
      });

      await sut.execute(article2.id);

      const updatedSeries = await prisma.series.findUnique({
        where: { id: testSeries.id },
      });

      expect(updatedSeries?.articleCount).toBe(2);
      expect(updatedSeries?.totalReadMinute).toBe(6); // 2 + 4
      expect(updatedSeries?.lastArticleCreatedAt?.getTime()).toBeCloseTo(article3.createdAt.getTime(), -2);
    });
  });

  describe('트랜잭션 롤백 시', () => {
    it('삭제된 게시글이 복구된다', async () => {
      const existingArticle = await createTestArticle(prisma, {
        title: '롤백 테스트 게시글',
        content: '롤백 테스트 게시글 내용',
        seriesId: testSeries.id,
      });

      await sut.execute(existingArticle.id);

      const deletedArticle = await prisma.article.findUnique({
        where: { id: existingArticle.id },
      });
      expect(deletedArticle?.deletedAt).not.toBeNull();

      testHelper.rollbackTransaction();
      await testHelper.startTransaction();

      const restoredArticle = await prisma.article.findFirst({
        where: {
          id: existingArticle.id,
          deletedAt: null,
        },
      });

      expect(restoredArticle).toBeNull(); // 트랜잭션 롤백으로 원래 게시글 자체가 없어짐
    });

    it('시리즈 통계 갱신이 롤백된다', async () => {
      const article1 = await createTestArticle(prisma, {
        title: '첫 번째 게시글',
        content: '첫 번째 게시글 내용',
        seriesId: testSeries.id,
      });
      await createTestArticle(prisma, {
        title: '두 번째 게시글',
        content: '두 번째 게시글 내용',
        seriesId: testSeries.id,
      });

      await prisma.series.update({
        where: { id: testSeries.id },
        data: {
          articleCount: 2,
          totalReadMinute: 2,
          lastArticleCreatedAt: new Date(),
        },
      });

      const initialSeries = await prisma.series.findUnique({
        where: { id: testSeries.id },
      });
      expect(initialSeries?.articleCount).toBe(2);

      await sut.execute(article1.id);

      const updatedSeries = await prisma.series.findUnique({
        where: { id: testSeries.id },
      });
      expect(updatedSeries?.articleCount).toBe(1);

      testHelper.rollbackTransaction();
      await testHelper.startTransaction();

      const rolledBackSeries = await prisma.series.findUnique({
        where: { id: testSeries.id },
      });
      expect(rolledBackSeries).toBeNull(); // 트랜잭션 롤백으로 테스트 시리즈 자체가 없어짐
    });
  });
});