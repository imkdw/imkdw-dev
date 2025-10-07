import { GetSeriesDetailQuery } from '@/features/series/query/get-series-detail.query';
import { SeriesNotFoundException } from '@/features/series/exception/series-not-found.exception';
import { createTestSeries } from '@test/integration/helpers/series.helper';
import { createTestTag } from '@test/integration/helpers/tag.helper';
import { IntegrationTestHelper } from '@test/integration/helpers/integration-test.helper';
import { PrismaService } from '@/infra/database/prisma.service';
import type { Series, Tag } from '@prisma/client';
import { generateUUID } from '@imkdw-dev/utils';

describe('GetSeriesDetailQuery', () => {
  let testHelper: IntegrationTestHelper;
  let sut: GetSeriesDetailQuery;
  let prisma: PrismaService;

  beforeAll(async () => {
    testHelper = new IntegrationTestHelper([GetSeriesDetailQuery]);
    await testHelper.setup();
  });

  beforeEach(async () => {
    sut = testHelper.getService(GetSeriesDetailQuery);
    await testHelper.startTransaction();
    prisma = testHelper.getPrisma();
  });

  afterEach(() => {
    testHelper.rollbackTransaction();
  });

  describe('존재하지 않는 slug로 조회하면', () => {
    it('SeriesNotFoundException이 발생해야 한다', async () => {
      await expect(sut.execute('non-existent-slug')).rejects.toThrow(SeriesNotFoundException);
    });
  });

  describe('삭제된 시리즈를 조회하면', () => {
    beforeEach(async () => {
      await createTestSeries(prisma, {
        slug: 'deleted-series',
        title: '삭제된 시리즈',
        deletedAt: new Date(),
      });
    });

    it('SeriesNotFoundException이 발생해야 한다', async () => {
      await expect(sut.execute('deleted-series')).rejects.toThrow(SeriesNotFoundException);
    });
  });

  describe('태그가 없는 정상 시리즈를 조회하면', () => {
    let series: Series;

    beforeEach(async () => {
      series = await createTestSeries(prisma, {
        slug: 'test-series',
        title: 'Test Series',
        description: 'Test Description',
        articleCount: 5,
        totalReadMinute: 25,
        lastArticleCreatedAt: new Date('2025-01-15T00:00:00Z'),
        createdAt: new Date('2025-01-01T00:00:00Z'),
      });
    });

    it('모든 필드가 올바르게 반환되어야 한다', async () => {
      const result = await sut.execute('test-series');

      expect(result.id).toBe(series.id);
      expect(result.slug).toBe('test-series');
      expect(result.title).toBe('Test Series');
      expect(result.description).toBe('Test Description');
      expect(result.articleCount).toBe(5);
      expect(result.totalReadMinute).toBe(25);
      expect(result.lastArticleCreatedAt).toEqual(new Date('2025-01-15T00:00:00Z'));
      expect(result.createdAt).toEqual(new Date('2025-01-01T00:00:00Z'));
    });

    it('태그는 빈 배열이어야 한다', async () => {
      const result = await sut.execute('test-series');

      expect(result.tags).toEqual([]);
    });
  });

  describe('태그가 있는 정상 시리즈를 조회하면', () => {
    let series: Series;
    let tag1: Tag;
    let tag2: Tag;

    beforeEach(async () => {
      [tag1, tag2] = await Promise.all([
        createTestTag(prisma, { id: generateUUID(), name: 'JavaScript' }),
        createTestTag(prisma, { id: generateUUID(), name: 'Node.js' }),
      ]);

      series = await createTestSeries(prisma, {
        slug: 'series-with-tags',
        title: 'Series with Tags',
        description: 'Series Description',
      });

      await Promise.all([
        prisma.seriesTag.create({ data: { seriesId: series.id, tagId: tag1.id } }),
        prisma.seriesTag.create({ data: { seriesId: series.id, tagId: tag2.id } }),
      ]);
    });

    it('모든 필드가 올바르게 반환되어야 한다', async () => {
      const result = await sut.execute('series-with-tags');

      expect(result.id).toBe(series.id);
      expect(result.slug).toBe('series-with-tags');
      expect(result.title).toBe('Series with Tags');
      expect(result.description).toBe('Series Description');
    });

    it('모든 태그 정보가 올바르게 반환되어야 한다', async () => {
      const result = await sut.execute('series-with-tags');

      expect(result.tags).toHaveLength(2);

      const tagIds = result.tags.map(tag => tag.id);
      const tagNames = result.tags.map(tag => tag.name);

      expect(tagIds).toContain(tag1.id);
      expect(tagIds).toContain(tag2.id);
      expect(tagNames).toContain('JavaScript');
      expect(tagNames).toContain('Node.js');
    });
  });
});
