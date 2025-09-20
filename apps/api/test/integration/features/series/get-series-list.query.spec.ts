import { GetSeriesListQuery } from '@/features/series/query/get-series-list.query';
import { createTestSeries } from '@test/integration/helpers/series.helper';
import { IntegrationTestHelper } from '@test/integration/helpers/integration-test.helper';
import { PrismaService } from '@/infra/database/prisma.service';

describe('GetSeriesListQuery', () => {
  let testHelper: IntegrationTestHelper;
  let sut: GetSeriesListQuery;
  let prisma: PrismaService;

  beforeAll(async () => {
    testHelper = new IntegrationTestHelper([GetSeriesListQuery]);
    await testHelper.setup();
  });

  beforeEach(async () => {
    sut = testHelper.getService(GetSeriesListQuery);
    await testHelper.startTransaction();
    prisma = testHelper.getPrisma();
  });

  afterEach(() => {
    testHelper.rollbackTransaction();
  });

  describe('시리즈가 10개 있을 때', () => {
    beforeEach(async () => {
      const seriesPromises = Array.from({ length: 10 }, (_, i) => {
        const index = i + 1;
        return createTestSeries(prisma, {
          title: `시리즈 ${index}`,
          slug: `series-${index}`,
          createdAt: new Date(`2025-01-${index.toString().padStart(2, '0')}T00:00:00Z`),
        });
      });

      await Promise.all(seriesPromises);
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

  describe('시리즈가 없을 때', () => {
    describe('조회하면', () => {
      it('아무것도 없는 빈 목록을 반환해야 한다', async () => {
        const result = await sut.execute({ limit: 10, page: 1 });

        expect(result.items).toEqual([]);
        expect(result.totalCount).toBe(0);
        expect(result.totalPage).toBe(0);
      });
    });
  });

  describe('정상 시리즈와 삭제된 시리즈가 섞여 있을 때', () => {
    beforeEach(async () => {
      await Promise.all([
        createTestSeries(prisma, {
          title: '정상 시리즈',
          slug: 'normal-series',
        }),
        createTestSeries(prisma, {
          title: '삭제된 시리즈',
          slug: 'deleted-series',
          deletedAt: new Date(),
        }),
      ]);
    });

    describe('조회하면', () => {
      it('삭제된 시리즈는 보이지 않고 정상 시리즈만 나와야 한다', async () => {
        const result = await sut.execute({ limit: 10, page: 1 });

        expect(result.items).toHaveLength(1);
        expect(result.items[0]?.title).toBe('정상 시리즈');
        expect(result.totalCount).toBe(1);
      });
    });
  });

  describe('서로 다른 날짜에 만든 시리즈들이 있을 때', () => {
    beforeEach(async () => {
      await Promise.all([
        createTestSeries(prisma, {
          title: '첫 번째',
          createdAt: new Date('2025-01-01T00:00:00Z'),
        }),
        createTestSeries(prisma, {
          title: '세 번째',
          createdAt: new Date('2025-01-03T00:00:00Z'),
        }),
        createTestSeries(prisma, {
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
});
