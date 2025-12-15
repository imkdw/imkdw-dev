import { GetArticlesQuery } from '@/features/article/query/get-articles.query';
import { createTestArticle } from '@test/integration/helpers/article.helper';
import { createTestSeries } from '@test/integration/helpers/series.helper';
import { createTestMember } from '@test/integration/helpers/member.helper';
import { IntegrationTestHelper } from '@test/integration/helpers/integration-test.helper';
import { PrismaService } from '@/infra/database/prisma.service';
import { ARTICLE_STATE, MEMBER_ROLE } from '@imkdw-dev/consts';
import type { Series, Member } from '@prisma/client';
import type { Requester } from '@/common/types/requester.type';

describe('GetArticlesQuery', () => {
  let testHelper: IntegrationTestHelper;
  let sut: GetArticlesQuery;
  let prisma: PrismaService;

  beforeAll(async () => {
    testHelper = new IntegrationTestHelper([GetArticlesQuery]);
    await testHelper.setup();
  });

  beforeEach(async () => {
    sut = testHelper.getService(GetArticlesQuery);
    await testHelper.startTransaction();
    prisma = testHelper.getPrisma();
  });

  afterEach(() => {
    testHelper.rollbackTransaction();
  });

  describe('게시글이 10개 있을 때', () => {
    let testSeries: Series;

    beforeEach(async () => {
      testSeries = await createTestSeries(prisma, { title: 'Test Series' });

      const articlePromises = Array.from({ length: 10 }, (_, i) => {
        const index = i + 1;
        return createTestArticle(prisma, {
          seriesId: testSeries.id,
          title: `게시글 ${index}`,
          slug: `article-${index}`,
          createdAt: new Date(`2025-01-${index.toString().padStart(2, '0')}T00:00:00Z`),
        });
      });

      await Promise.all(articlePromises);
    });

    describe('첫 페이지에서 3개씩 조회하면', () => {
      it('3개 항목과 다음 페이지가 있고, 이전 페이지는 없어야 한다', async () => {
        const result = await sut.execute({ limit: 3, page: 1 });

        expect(result.items).toHaveLength(3);
        expect(result.havePrev).toBe(false);
        expect(result.haveNext).toBe(true);
        expect(result.totalCount).toBe(10);
        expect(result.totalPage).toBe(4);
      });
    });

    describe('두 번째 페이지에서 3개씩 조회하면', () => {
      it('이전 페이지와 다음 페이지가 모두 있어야 한다', async () => {
        const result = await sut.execute({ limit: 3, page: 2 });

        expect(result.havePrev).toBe(true);
        expect(result.haveNext).toBe(true);
      });
    });

    describe('마지막 페이지에서 3개씩 조회하면', () => {
      it('1개 항목과 이전 페이지가 있고, 다음 페이지는 없어야 한다', async () => {
        const result = await sut.execute({ limit: 3, page: 4 });

        expect(result.items).toHaveLength(1);
        expect(result.haveNext).toBe(false);
      });
    });
  });

  describe('게시글이 없을 때', () => {
    describe('조회하면', () => {
      it('아무것도 없는 빈 목록을 반환해야 한다', async () => {
        const result = await sut.execute({ limit: 10, page: 1 });

        expect(result.items).toEqual([]);
        expect(result.totalCount).toBe(0);
        expect(result.totalPage).toBe(0);
      });
    });
  });

  describe('정상 게시글과 삭제된 게시글이 섞여 있을 때', () => {
    let testSeries: Series;

    beforeEach(async () => {
      testSeries = await createTestSeries(prisma, { title: 'Test Series' });

      await Promise.all([
        createTestArticle(prisma, {
          seriesId: testSeries.id,
          title: '정상 게시글',
          slug: 'normal-article',
        }),
        createTestArticle(prisma, {
          seriesId: testSeries.id,
          title: '삭제된 게시글',
          slug: 'deleted-article',
          deletedAt: new Date(),
        }),
      ]);
    });

    describe('조회하면', () => {
      it('삭제된 게시글은 보이지 않고 정상 게시글만 나와야 한다', async () => {
        const result = await sut.execute({ limit: 10, page: 1 });

        expect(result.items).toHaveLength(1);
        expect(result.items[0]?.title).toBe('정상 게시글');
        expect(result.totalCount).toBe(1);
      });
    });
  });

  describe('서로 다른 날짜에 만든 게시글들이 있을 때', () => {
    let testSeries: Series;

    beforeEach(async () => {
      testSeries = await createTestSeries(prisma, { title: 'Test Series' });

      await Promise.all([
        createTestArticle(prisma, {
          seriesId: testSeries.id,
          title: '첫 번째',
          createdAt: new Date('2025-01-01T00:00:00Z'),
        }),
        createTestArticle(prisma, {
          seriesId: testSeries.id,
          title: '세 번째',
          createdAt: new Date('2025-01-03T00:00:00Z'),
        }),
        createTestArticle(prisma, {
          seriesId: testSeries.id,
          title: '두 번째',
          createdAt: new Date('2025-01-02T00:00:00Z'),
        }),
      ]);
    });

    describe('조회하면', () => {
      it('최신에 만든 것부터 순서대로 나와야 한다', async () => {
        const result = await sut.execute({ limit: 10, page: 1 });

        expect(result.items[0]?.title).toBe('세 번째');
        expect(result.items[1]?.title).toBe('두 번째');
        expect(result.items[2]?.title).toBe('첫 번째');
      });
    });
  });

  describe('게시글이 시리즈에 속해 있을 때', () => {
    let series1: Series;
    let series2: Series;

    beforeEach(async () => {
      [series1, series2] = await Promise.all([
        createTestSeries(prisma, {
          title: '시리즈 A',
          slug: 'series-a',
        }),
        createTestSeries(prisma, {
          title: '시리즈 B',
          slug: 'series-b',
        }),
      ]);

      await Promise.all([
        createTestArticle(prisma, {
          seriesId: series1.id,
          title: '게시글 1',
          slug: 'article-1',
          createdAt: new Date('2025-01-01T00:00:00Z'),
        }),
        createTestArticle(prisma, {
          seriesId: series1.id,
          title: '게시글 2',
          slug: 'article-2',
          createdAt: new Date('2025-01-02T00:00:00Z'),
        }),
        createTestArticle(prisma, {
          seriesId: series2.id,
          title: '게시글 3',
          slug: 'article-3',
          createdAt: new Date('2025-01-03T00:00:00Z'),
        }),
      ]);
    });

    describe('게시글을 조회하면', () => {
      it('각 게시글에 올바른 시리즈 정보가 포함되어야 한다', async () => {
        const result = await sut.execute({ limit: 10, page: 1 });

        expect(result.items).toHaveLength(3);

        const articleFromSeriesA1 = result.items.find(item => item.title === '게시글 1');
        expect(articleFromSeriesA1).toBeDefined();
        expect(articleFromSeriesA1?.series.id).toBe(series1.id);
        expect(articleFromSeriesA1?.series.title).toBe('시리즈 A');
        expect(articleFromSeriesA1?.series.slug).toBe('series-a');

        const articleFromSeriesA2 = result.items.find(item => item.title === '게시글 2');
        expect(articleFromSeriesA2).toBeDefined();
        expect(articleFromSeriesA2?.series.id).toBe(series1.id);
        expect(articleFromSeriesA2?.series.title).toBe('시리즈 A');
        expect(articleFromSeriesA2?.series.slug).toBe('series-a');

        const articleFromSeriesB = result.items.find(item => item.title === '게시글 3');
        expect(articleFromSeriesB).toBeDefined();
        expect(articleFromSeriesB?.series.id).toBe(series2.id);
        expect(articleFromSeriesB?.series.title).toBe('시리즈 B');
        expect(articleFromSeriesB?.series.slug).toBe('series-b');
      });
    });

    describe('게시글 기본 속성을 확인하면', () => {
      it('모든 필수 속성이 올바르게 반환되어야 한다', async () => {
        const result = await sut.execute({ limit: 10, page: 1 });

        const firstArticle = result.items[0];
        expect(firstArticle).toBeDefined();
        expect(typeof firstArticle?.id).toBe('string');
        expect(typeof firstArticle?.title).toBe('string');
        expect(typeof firstArticle?.slug).toBe('string');
        expect(typeof firstArticle?.viewCount).toBe('number');
        expect(typeof firstArticle?.readMinute).toBe('number');
        expect(firstArticle?.createdAt).toBeInstanceOf(Date);
        expect(firstArticle?.series).toBeDefined();
      });
    });

    describe('같은 시리즈에 속한 여러 게시글이 있을 때', () => {
      it('각 게시글마다 동일한 시리즈 정보가 반환되어야 한다', async () => {
        const result = await sut.execute({ limit: 10, page: 1 });

        const articlesFromSeriesA = result.items.filter(item => ['게시글 1', '게시글 2'].includes(item.title));

        expect(articlesFromSeriesA).toHaveLength(2);

        articlesFromSeriesA.forEach(article => {
          expect(article.series.id).toBe(series1.id);
          expect(article.series.title).toBe('시리즈 A');
          expect(article.series.slug).toBe('series-a');
        });
      });
    });
  });

  describe('조회수와 읽기시간 정보가 있을 때', () => {
    let testSeries: Series;

    beforeEach(async () => {
      testSeries = await createTestSeries(prisma, { title: 'Test Series' });

      await Promise.all([
        createTestArticle(prisma, {
          seriesId: testSeries.id,
          title: '인기 게시글',
          viewCount: 1500,
          readMinute: 10,
        }),
        createTestArticle(prisma, {
          seriesId: testSeries.id,
          title: '짧은 게시글',
          viewCount: 50,
          readMinute: 2,
        }),
      ]);
    });

    describe('조회하면', () => {
      it('조회수와 읽기시간이 올바르게 반환되어야 한다', async () => {
        const result = await sut.execute({ limit: 10, page: 1 });

        const popularArticle = result.items.find(item => item.title === '인기 게시글');
        expect(popularArticle?.viewCount).toBe(1500);
        expect(popularArticle?.readMinute).toBe(10);

        const shortArticle = result.items.find(item => item.title === '짧은 게시글');
        expect(shortArticle?.viewCount).toBe(50);
        expect(shortArticle?.readMinute).toBe(2);
      });
    });
  });

  describe('특정 시리즈의 게시글만 조회할 때', () => {
    let series1: Series;
    let series2: Series;

    beforeEach(async () => {
      [series1, series2] = await Promise.all([
        createTestSeries(prisma, {
          title: '시리즈 A',
          slug: 'series-a',
        }),
        createTestSeries(prisma, {
          title: '시리즈 B',
          slug: 'series-b',
        }),
      ]);

      await Promise.all([
        createTestArticle(prisma, {
          seriesId: series1.id,
          title: 'A 시리즈 게시글 1',
          slug: 'series-a-article-1',
          createdAt: new Date('2025-01-01T00:00:00Z'),
        }),
        createTestArticle(prisma, {
          seriesId: series1.id,
          title: 'A 시리즈 게시글 2',
          slug: 'series-a-article-2',
          createdAt: new Date('2025-01-02T00:00:00Z'),
        }),
        createTestArticle(prisma, {
          seriesId: series1.id,
          title: 'A 시리즈 게시글 3',
          slug: 'series-a-article-3',
          createdAt: new Date('2025-01-03T00:00:00Z'),
        }),
        createTestArticle(prisma, {
          seriesId: series2.id,
          title: 'B 시리즈 게시글 1',
          slug: 'series-b-article-1',
          createdAt: new Date('2025-01-04T00:00:00Z'),
        }),
        createTestArticle(prisma, {
          seriesId: series2.id,
          title: 'B 시리즈 게시글 2',
          slug: 'series-b-article-2',
          createdAt: new Date('2025-01-05T00:00:00Z'),
        }),
      ]);
    });

    describe('시리즈 A의 게시글만 조회하면', () => {
      it('시리즈 A에 속한 게시글만 반환되어야 한다', async () => {
        const result = await sut.execute({ limit: 10, page: 1, seriesId: series1.id });

        expect(result.items).toHaveLength(3);
        expect(result.totalCount).toBe(3);
        expect(result.totalPage).toBe(1);

        result.items.forEach(item => {
          expect(item.series.id).toBe(series1.id);
          expect(item.series.title).toBe('시리즈 A');
        });

        const titles = result.items.map(item => item.title);
        expect(titles).toContain('A 시리즈 게시글 1');
        expect(titles).toContain('A 시리즈 게시글 2');
        expect(titles).toContain('A 시리즈 게시글 3');
      });
    });

    describe('시리즈 B의 게시글만 조회하면', () => {
      it('시리즈 B에 속한 게시글만 반환되어야 한다', async () => {
        const result = await sut.execute({ limit: 10, page: 1, seriesId: series2.id });

        expect(result.items).toHaveLength(2);
        expect(result.totalCount).toBe(2);
        expect(result.totalPage).toBe(1);

        result.items.forEach(item => {
          expect(item.series.id).toBe(series2.id);
          expect(item.series.title).toBe('시리즈 B');
        });

        const titles = result.items.map(item => item.title);
        expect(titles).toContain('B 시리즈 게시글 1');
        expect(titles).toContain('B 시리즈 게시글 2');
      });
    });

    describe('시리즈 필터링과 페이지네이션을 함께 사용하면', () => {
      it('필터링된 결과에서 페이지네이션이 올바르게 작동해야 한다', async () => {
        const result = await sut.execute({ limit: 2, page: 1, seriesId: series1.id });

        expect(result.items).toHaveLength(2);
        expect(result.totalCount).toBe(3);
        expect(result.totalPage).toBe(2);
        expect(result.havePrev).toBe(false);
        expect(result.haveNext).toBe(true);

        const secondPage = await sut.execute({ limit: 2, page: 2, seriesId: series1.id });

        expect(secondPage.items).toHaveLength(1);
        expect(secondPage.havePrev).toBe(true);
        expect(secondPage.haveNext).toBe(false);
      });
    });

    describe('존재하지 않는 시리즈 ID로 조회하면', () => {
      it('빈 배열을 반환해야 한다', async () => {
        const nonExistentSeriesId = '00000000-0000-0000-0000-000000000000';
        const result = await sut.execute({ limit: 10, page: 1, seriesId: nonExistentSeriesId });

        expect(result.items).toEqual([]);
        expect(result.totalCount).toBe(0);
        expect(result.totalPage).toBe(0);
      });
    });
  });

  describe('게시글 상태에 따른 권한 기반 필터링', () => {
    let testSeries: Series;
    let adminMember: Member;
    let normalMember: Member;
    let adminRequester: Requester;
    let userRequester: Requester;

    beforeEach(async () => {
      testSeries = await createTestSeries(prisma, { title: 'Test Series' });

      [adminMember, normalMember] = await Promise.all([
        createTestMember(prisma, { role: MEMBER_ROLE.ADMIN }),
        createTestMember(prisma, { role: MEMBER_ROLE.USER }),
      ]);

      adminRequester = { id: adminMember.id, role: adminMember.role, isAdmin: true };
      userRequester = { id: normalMember.id, role: normalMember.role, isAdmin: false };

      await Promise.all([
        createTestArticle(prisma, {
          seriesId: testSeries.id,
          title: 'NORMAL 게시글 1',
          slug: 'normal-article-1',
        }),
        createTestArticle(prisma, {
          seriesId: testSeries.id,
          title: 'NORMAL 게시글 2',
          slug: 'normal-article-2',
        }),
        prisma.article.create({
          data: {
            id: '00000000-0000-0000-0000-000000000001',
            title: 'HIDDEN 게시글 1',
            slug: 'hidden-article-1',
            content: 'Hidden content',
            plainContent: 'Hidden content',
            state: ARTICLE_STATE.HIDDEN,
            viewCount: 0,
            readMinute: 1,
            seriesId: testSeries.id,
          },
        }),
        prisma.article.create({
          data: {
            id: '00000000-0000-0000-0000-000000000002',
            title: 'HIDDEN 게시글 2',
            slug: 'hidden-article-2',
            content: 'Hidden content',
            plainContent: 'Hidden content',
            state: ARTICLE_STATE.HIDDEN,
            viewCount: 0,
            readMinute: 1,
            seriesId: testSeries.id,
          },
        }),
      ]);
    });

    describe('비로그인 사용자가 조회하면', () => {
      it('NORMAL 상태의 게시글만 반환되어야 한다', async () => {
        const result = await sut.execute({ limit: 10, page: 1 });

        expect(result.items).toHaveLength(2);
        expect(result.totalCount).toBe(2);
        result.items.forEach(item => {
          expect(item.state).toBe(ARTICLE_STATE.NORMAL);
        });
      });
    });

    describe('일반 사용자가 조회하면', () => {
      it('NORMAL 상태의 게시글만 반환되어야 한다', async () => {
        const result = await sut.execute({ limit: 10, page: 1 }, userRequester);

        expect(result.items).toHaveLength(2);
        expect(result.totalCount).toBe(2);
        result.items.forEach(item => {
          expect(item.state).toBe(ARTICLE_STATE.NORMAL);
        });
      });
    });

    describe('관리자가 조회하면', () => {
      it('모든 상태의 게시글이 반환되어야 한다', async () => {
        const result = await sut.execute({ limit: 10, page: 1 }, adminRequester);

        expect(result.items).toHaveLength(4);
        expect(result.totalCount).toBe(4);

        const normalArticles = result.items.filter(item => item.state === ARTICLE_STATE.NORMAL);
        const hiddenArticles = result.items.filter(item => item.state === ARTICLE_STATE.HIDDEN);

        expect(normalArticles).toHaveLength(2);
        expect(hiddenArticles).toHaveLength(2);
      });
    });
  });
});
