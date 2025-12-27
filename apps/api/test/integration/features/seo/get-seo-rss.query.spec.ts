import { GetSeoRssQuery } from '@/features/seo/query/get-seo-rss.query';
import { createTestArticle } from '@test/integration/helpers/article.helper';
import { createTestSeries } from '@test/integration/helpers/series.helper';
import { createTestTag } from '@test/integration/helpers/tag.helper';
import { IntegrationTestHelper } from '@test/integration/helpers/integration-test.helper';
import { PrismaService } from '@/infra/database/prisma.service';
import { ARTICLE_STATE } from '@imkdw-dev/consts';

describe('GetSeoRssQuery', () => {
  let testHelper: IntegrationTestHelper;
  let sut: GetSeoRssQuery;
  let prisma: PrismaService;

  beforeAll(async () => {
    testHelper = new IntegrationTestHelper([GetSeoRssQuery]);
    await testHelper.setup();
  });

  beforeEach(async () => {
    sut = testHelper.getService(GetSeoRssQuery);
    await testHelper.startTransaction();
    prisma = testHelper.getPrisma();
  });

  afterEach(() => {
    testHelper.rollbackTransaction();
  });

  describe('NORMAL 상태의 게시글만 반환', () => {
    beforeEach(async () => {
      const series = await createTestSeries(prisma, {
        title: '테스트 시리즈',
        slug: 'test-series',
      });

      await Promise.all([
        createTestArticle(prisma, {
          seriesId: series.id,
          title: '정상 게시글',
          slug: 'normal-article',
          state: ARTICLE_STATE.NORMAL,
        }),
        createTestArticle(prisma, {
          seriesId: series.id,
          title: '숨겨진 게시글',
          slug: 'hidden-article',
          state: ARTICLE_STATE.HIDDEN,
        }),
      ]);
    });

    describe('RSS 데이터를 조회하면', () => {
      it('NORMAL 상태의 게시글만 반환해야 한다', async () => {
        const result = await sut.execute();

        expect(result).toHaveLength(1);
        expect(result[0]?.title).toBe('정상 게시글');
        expect(result[0]?.slug).toBe('normal-article');
      });
    });
  });

  describe('삭제되지 않은 게시글만 반환', () => {
    beforeEach(async () => {
      const series = await createTestSeries(prisma, {
        title: '테스트 시리즈',
        slug: 'test-series',
      });

      await Promise.all([
        createTestArticle(prisma, {
          seriesId: series.id,
          title: '정상 게시글',
          slug: 'normal-article',
          deletedAt: null,
        }),
        createTestArticle(prisma, {
          seriesId: series.id,
          title: '삭제된 게시글',
          slug: 'deleted-article',
          deletedAt: new Date(),
        }),
      ]);
    });

    describe('RSS 데이터를 조회하면', () => {
      it('삭제되지 않은 게시글만 반환해야 한다', async () => {
        const result = await sut.execute();

        expect(result).toHaveLength(1);
        expect(result[0]?.title).toBe('정상 게시글');
        expect(result[0]?.slug).toBe('normal-article');
      });
    });
  });

  describe('createdAt 내림차순 정렬', () => {
    beforeEach(async () => {
      const series = await createTestSeries(prisma, {
        title: '테스트 시리즈',
        slug: 'test-series',
      });

      const now = new Date();
      await Promise.all([
        createTestArticle(prisma, {
          seriesId: series.id,
          title: '오래된 게시글',
          slug: 'old-article',
          createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24),
        }),
        createTestArticle(prisma, {
          seriesId: series.id,
          title: '최신 게시글',
          slug: 'new-article',
          createdAt: now,
        }),
      ]);
    });

    describe('RSS 데이터를 조회하면', () => {
      it('createdAt 내림차순으로 정렬되어야 한다', async () => {
        const result = await sut.execute();

        expect(result).toHaveLength(2);
        expect(result[0]?.title).toBe('최신 게시글');
        expect(result[1]?.title).toBe('오래된 게시글');
      });
    });
  });

  describe('최대 50개 제한', () => {
    beforeEach(async () => {
      const series = await createTestSeries(prisma, {
        title: '테스트 시리즈',
        slug: 'test-series',
      });

      const articles = Array.from({ length: 60 }, (_, i) =>
        createTestArticle(prisma, {
          seriesId: series.id,
          title: `게시글 ${i + 1}`,
          slug: `article-${i + 1}`,
        })
      );

      await Promise.all(articles);
    });

    describe('RSS 데이터를 조회하면', () => {
      it('최대 50개의 게시글만 반환해야 한다', async () => {
        const result = await sut.execute();

        expect(result).toHaveLength(50);
      });
    });
  });

  describe('시리즈와 태그 데이터 포함', () => {
    beforeEach(async () => {
      const series = await createTestSeries(prisma, {
        title: '테스트 시리즈',
        slug: 'test-series',
      });

      const tag1 = await createTestTag(prisma, { name: '태그1' });
      const tag2 = await createTestTag(prisma, { name: '태그2' });

      const article = await createTestArticle(prisma, {
        seriesId: series.id,
        title: '테스트 게시글',
        slug: 'test-article',
      });

      await prisma.articleTag.createMany({
        data: [
          { articleId: article.id, tagId: tag1.id },
          { articleId: article.id, tagId: tag2.id },
        ],
      });
    });

    describe('RSS 데이터를 조회하면', () => {
      it('시리즈 제목이 포함되어야 한다', async () => {
        const result = await sut.execute();

        expect(result).toHaveLength(1);
        expect(result[0]?.seriesTitle).toBe('테스트 시리즈');
      });

      it('태그 이름 목록이 포함되어야 한다', async () => {
        const result = await sut.execute();

        expect(result).toHaveLength(1);
        expect(result[0]?.tagNames).toBeDefined();
        expect(result[0]?.tagNames).toHaveLength(2);
        expect(result[0]?.tagNames).toEqual(expect.arrayContaining(['태그1', '태그2']));
      });

      it('필수 필드들이 모두 포함되어야 한다', async () => {
        const result = await sut.execute();

        expect(result).toHaveLength(1);
        expect(result[0]).toHaveProperty('title');
        expect(result[0]).toHaveProperty('slug');
        expect(result[0]).toHaveProperty('plainContent');
        expect(result[0]).toHaveProperty('createdAt');
        expect(result[0]).toHaveProperty('seriesTitle');
        expect(result[0]).toHaveProperty('tagNames');
      });
    });
  });
});
