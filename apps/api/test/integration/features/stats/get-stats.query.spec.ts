import { GetStatsQuery } from '@/features/stats/query/get-stats.query';
import { createTestArticle } from '@test/integration/helpers/article.helper';
import { createTestSeries } from '@test/integration/helpers/series.helper';
import { createTestTag } from '@test/integration/helpers/tag.helper';
import { IntegrationTestHelper } from '@test/integration/helpers/integration-test.helper';
import { PrismaService } from '@/infra/database/prisma.service';

describe('GetStatsQuery', () => {
  let testHelper: IntegrationTestHelper;
  let sut: GetStatsQuery;
  let prisma: PrismaService;

  beforeAll(async () => {
    testHelper = new IntegrationTestHelper([GetStatsQuery]);
    await testHelper.setup();
  });

  beforeEach(async () => {
    sut = testHelper.getService(GetStatsQuery);
    await testHelper.startTransaction();
    prisma = testHelper.getPrisma();
  });

  afterEach(() => {
    testHelper.rollbackTransaction();
  });

  describe('데이터가 없을 때', () => {
    describe('통계를 조회하면', () => {
      it('모든 카운트가 0이어야 한다', async () => {
        const result = await sut.execute();

        expect(result.article.count).toBe(0);
        expect(result.article.viewCount).toBe(0);
        expect(result.series.count).toBe(0);
        expect(result.tag.count).toBe(0);
      });
    });
  });

  describe('정상 데이터가 있을 때', () => {
    beforeEach(async () => {
      const series = await createTestSeries(prisma, {
        title: '테스트 시리즈',
        slug: 'test-series',
      });

      await Promise.all([
        createTestArticle(prisma, { seriesId: series.id, title: '첫 번째 글', slug: 'first-article', viewCount: 100 }),
        createTestArticle(prisma, { seriesId: series.id, title: '두 번째 글', slug: 'second-article', viewCount: 200 }),
        createTestSeries(prisma, { title: '두 번째 시리즈', slug: 'second-series' }),
        createTestTag(prisma, { name: '태그1' }),
        createTestTag(prisma, { name: '태그2' }),
      ]);
    });

    describe('통계를 조회하면', () => {
      it('각 항목의 정확한 개수와 조회수 합계를 반환해야 한다', async () => {
        const result = await sut.execute();

        expect(result.article.count).toBe(2);
        expect(result.article.viewCount).toBe(300);
        expect(result.series.count).toBe(2);
        expect(result.tag.count).toBe(2);
      });
    });
  });

  describe('삭제된 데이터가 있을 때', () => {
    beforeEach(async () => {
      const series = await createTestSeries(prisma, {
        title: '정상 시리즈',
        slug: 'normal-series',
      });

      await Promise.all([
        createTestArticle(prisma, { seriesId: series.id, title: '정상 글', slug: 'normal-article', viewCount: 100 }),
        createTestSeries(prisma, { title: '삭제된 시리즈', slug: 'deleted-series', deletedAt: new Date() }),
        createTestTag(prisma, { name: '정상 태그' }),
        createTestTag(prisma, { name: '삭제된 태그', deletedAt: new Date() }),
      ]);

      await prisma.article.create({
        data: {
          id: 'deleted-article-id',
          title: '삭제된 글',
          slug: 'deleted-article',
          content: '삭제된 글 내용',
          viewCount: 999,
          readMinute: 1,
          seriesId: series.id,
          deletedAt: new Date(),
        },
      });
    });

    describe('통계를 조회하면', () => {
      it('삭제된 항목들은 카운트에서 제외되어야 한다', async () => {
        const result = await sut.execute();

        expect(result.article.count).toBe(1);
        expect(result.article.viewCount).toBe(100);
        expect(result.series.count).toBe(1);
        expect(result.tag.count).toBe(1);
      });
    });
  });

  describe('조회수가 null인 글이 있을 때', () => {
    beforeEach(async () => {
      const series = await createTestSeries(prisma, {
        title: '테스트 시리즈',
        slug: 'test-series',
      });

      await Promise.all([
        createTestArticle(prisma, {
          seriesId: series.id,
          title: '조회수 있는 글',
          slug: 'article-with-views',
          viewCount: 150,
        }),
        prisma.article.create({
          data: {
            id: 'article-no-views',
            title: '조회수 없는 글',
            slug: 'article-without-views',
            content: '조회수가 없는 글',
            viewCount: 0,
            readMinute: 1,
            seriesId: series.id,
          },
        }),
      ]);
    });

    describe('통계를 조회하면', () => {
      it('조회수가 올바르게 계산되어야 한다', async () => {
        const result = await sut.execute();

        expect(result.article.count).toBe(2);
        expect(result.article.viewCount).toBe(150);
      });
    });
  });

  describe('복합 시나리오', () => {
    beforeEach(async () => {
      const normalSeries = await createTestSeries(prisma, {
        title: '정상 시리즈',
        slug: 'normal-series',
      });

      await Promise.all([
        createTestArticle(prisma, {
          seriesId: normalSeries.id,
          title: '정상 글 1',
          slug: 'normal-article-1',
          viewCount: 50,
        }),
        createTestArticle(prisma, {
          seriesId: normalSeries.id,
          title: '정상 글 2',
          slug: 'normal-article-2',
          viewCount: 75,
        }),
        createTestSeries(prisma, {
          title: '삭제된 시리즈',
          slug: 'deleted-series',
          deletedAt: new Date(),
        }),
        createTestTag(prisma, { name: '태그1' }),
        createTestTag(prisma, { name: '태그2' }),
        createTestTag(prisma, { name: '태그3' }),
        createTestTag(prisma, {
          name: '삭제된 태그',
          deletedAt: new Date(),
        }),
      ]);
    });

    describe('통계를 조회하면', () => {
      it('정상 데이터만 집계되고 삭제된 데이터는 제외되어야 한다', async () => {
        const result = await sut.execute();

        expect(result.article.count).toBe(2);
        expect(result.article.viewCount).toBe(125);
        expect(result.series.count).toBe(1);
        expect(result.tag.count).toBe(3);
      });
    });
  });
});
