import { GetSeriesListQuery } from '@/features/series/query/get-series-list.query';
import { createTestSeries } from '@test/integration/helpers/series.helper';
import { createTestTag } from '@test/integration/helpers/tag.helper';
import { IntegrationTestHelper } from '@test/integration/helpers/integration-test.helper';
import { PrismaService } from '@/infra/database/prisma.service';
import { generateUUID } from '@/common/utils/string.util';
import type { Series, Tag } from '@prisma/client';

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

  describe('시리즈에 태그가 연결된 경우', () => {
    let series1: Series;
    let series2: Series;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let series3: Series;
    let tag1: Tag;
    let tag2: Tag;
    let tag3: Tag;

    beforeEach(async () => {
      [tag1, tag2, tag3] = await Promise.all([
        createTestTag(prisma, { id: generateUUID(), name: 'JavaScript' }),
        createTestTag(prisma, { id: generateUUID(), name: 'Node.js' }),
        createTestTag(prisma, { id: generateUUID(), name: 'React' }),
      ]);

      [series1, series2, series3] = await Promise.all([
        createTestSeries(prisma, {
          title: '시리즈 1',
          slug: 'series-1',
          createdAt: new Date('2025-01-01T00:00:00Z'),
        }),
        createTestSeries(prisma, {
          title: '시리즈 2',
          slug: 'series-2',
          createdAt: new Date('2025-01-02T00:00:00Z'),
        }),
        createTestSeries(prisma, {
          title: '시리즈 3',
          slug: 'series-3',
          createdAt: new Date('2025-01-03T00:00:00Z'),
        }),
      ]);

      await Promise.all([
        prisma.seriesTag.create({ data: { seriesId: series1.id, tagId: tag1.id } }),
        prisma.seriesTag.create({ data: { seriesId: series1.id, tagId: tag2.id } }),
        prisma.seriesTag.create({ data: { seriesId: series2.id, tagId: tag3.id } }),
      ]);
    });

    describe('여러 태그가 연결된 시리즈를 조회하면', () => {
      it('모든 태그 정보가 올바르게 반환되어야 한다', async () => {
        const result = await sut.execute({ limit: 10, page: 1 });

        const seriesWithTags = result.items.find(item => item.title === '시리즈 1');
        expect(seriesWithTags).toBeDefined();
        expect(seriesWithTags?.tags).toHaveLength(2);

        const tagIds = seriesWithTags?.tags.map(tag => tag.id);
        const tagNames = seriesWithTags?.tags.map(tag => tag.name);

        expect(tagIds).toContain(tag1.id);
        expect(tagIds).toContain(tag2.id);
        expect(tagNames).toContain('JavaScript');
        expect(tagNames).toContain('Node.js');
      });
    });

    describe('하나의 태그만 연결된 시리즈를 조회하면', () => {
      it('해당 태그 정보가 올바르게 반환되어야 한다', async () => {
        const result = await sut.execute({ limit: 10, page: 1 });

        const seriesWithOneTag = result.items.find(item => item.title === '시리즈 2');
        expect(seriesWithOneTag).toBeDefined();
        expect(seriesWithOneTag?.tags).toHaveLength(1);
        expect(seriesWithOneTag?.tags[0]?.id).toBe(tag3.id);
        expect(seriesWithOneTag?.tags[0]?.name).toBe('React');
      });
    });

    describe('태그가 없는 시리즈를 조회하면', () => {
      it('빈 태그 배열이 반환되어야 한다', async () => {
        const result = await sut.execute({ limit: 10, page: 1 });

        const seriesWithoutTags = result.items.find(item => item.title === '시리즈 3');
        expect(seriesWithoutTags).toBeDefined();
        expect(seriesWithoutTags?.tags).toEqual([]);
      });
    });

    describe('모든 시리즈의 태그 정보를 확인하면', () => {
      it('각 시리즈마다 올바른 태그가 매핑되어야 한다', async () => {
        const result = await sut.execute({ limit: 10, page: 1 });

        expect(result.items).toHaveLength(3);

        expect(result.items[0]?.title).toBe('시리즈 3');
        expect(result.items[0]?.tags).toHaveLength(0);

        expect(result.items[1]?.title).toBe('시리즈 2');
        expect(result.items[1]?.tags).toHaveLength(1);

        expect(result.items[2]?.title).toBe('시리즈 1');
        expect(result.items[2]?.tags).toHaveLength(2);
      });
    });
  });

  describe('동일한 태그가 여러 시리즈에 연결된 경우', () => {
    let commonTag: Tag;

    beforeEach(async () => {
      commonTag = await createTestTag(prisma, { id: generateUUID(), name: 'JavaScript' });

      const [seriesA, seriesB] = await Promise.all([
        createTestSeries(prisma, { title: '시리즈 A', slug: 'series-a' }),
        createTestSeries(prisma, { title: '시리즈 B', slug: 'series-b' }),
      ]);

      await Promise.all([
        prisma.seriesTag.create({ data: { seriesId: seriesA.id, tagId: commonTag.id } }),
        prisma.seriesTag.create({ data: { seriesId: seriesB.id, tagId: commonTag.id } }),
      ]);
    });

    describe('조회하면', () => {
      it('각 시리즈마다 동일한 태그가 올바르게 반환되어야 한다', async () => {
        const result = await sut.execute({ limit: 10, page: 1 });

        expect(result.items).toHaveLength(2);

        result.items.forEach(series => {
          expect(series.tags).toHaveLength(1);
          expect(series.tags[0]?.id).toBe(commonTag.id);
          expect(series.tags[0]?.name).toBe('JavaScript');
        });
      });
    });
  });
});
