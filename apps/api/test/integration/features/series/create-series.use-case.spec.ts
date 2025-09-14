import { CreateSeriesUseCase } from '@/features/series/use-case/create-series.use-case';
import { SeriesValidator } from '@/shared/validator/series.validator';
import { SeriesRepository } from '@/shared/repository/series/series.repository';
import { CreateSeriesDto } from '@/features/series/dto/create-series.dto';
import { ExistSeriesSlugException } from '@/features/series/exception/exist-series-slug.exception';
import { ExistSeriesTitleException } from '@/features/series/exception/exist-series-title.exception';
import { createTestSeries } from '@test/integration/helpers/series.helper';
import { IntegrationTestHelper } from '@test/integration/helpers/integration-test.helper';
import { PrismaService } from '@/infra/database/prisma.service';
import { TagRepository } from '@/shared/repository/tag/tag.repository';

describe('시리즈 생성 유스케이스', () => {
  let testHelper: IntegrationTestHelper;
  let sut: CreateSeriesUseCase;
  let prisma: PrismaService;

  beforeAll(async () => {
    testHelper = new IntegrationTestHelper([CreateSeriesUseCase, SeriesValidator, SeriesRepository, TagRepository]);
    await testHelper.setup();
  });

  beforeEach(async () => {
    sut = testHelper.getService(CreateSeriesUseCase);
    await testHelper.startTransaction();
    prisma = testHelper.getPrisma();
  });

  afterEach(() => {
    testHelper.rollbackTransaction();
  });

  describe('동일한 제목의 시리즈가 이미 존재하면', () => {
    const existingTitle = '이미 존재하는 시리즈 제목';

    it('에러가 발생한다', async () => {
      await createTestSeries(prisma, { title: existingTitle });
      const createSeriesDto: CreateSeriesDto = {
        title: existingTitle,
        slug: 'new-series-slug',
        description: 'new-series-description',
        tags: [],
      };

      await expect(sut.execute(createSeriesDto)).rejects.toThrow(ExistSeriesTitleException);
    });
  });

  describe('동일한 슬러그의 시리즈가 이미 존재하면', () => {
    const existingSlug = 'existing-series-slug';

    it('에러가 발생한다', async () => {
      await createTestSeries(prisma, { slug: existingSlug });
      const createSeriesDto: CreateSeriesDto = {
        title: '새로운 시리즈 제목',
        slug: existingSlug,
        description: 'new-series-description',
        tags: [],
      };

      await expect(sut.execute(createSeriesDto)).rejects.toThrow(ExistSeriesSlugException);
    });
  });

  describe('새로운 시리즈를 생성하면', () => {
    it('시리즈가 생성된다', async () => {
      const createSeriesDto: CreateSeriesDto = {
        title: '새로운 시리즈 제목',
        slug: 'new-series-slug',
        description: '새로운 시리즈 설명',
        tags: [],
      };

      const result = await sut.execute(createSeriesDto);

      const savedSeries = await prisma.series.findUnique({ where: { id: result.id } });
      expect(savedSeries).not.toBeNull();
      expect(savedSeries?.title).toBe(createSeriesDto.title);
      expect(savedSeries?.slug).toBe(createSeriesDto.slug);
      expect(savedSeries?.description).toBe(createSeriesDto.description);
    });
  });

  describe('새로운 태그들과 함께 시리즈를 생성하면', () => {
    it('새로운 태그들이 생성되고 시리즈와 연결된다', async () => {
      const createSeriesDto: CreateSeriesDto = {
        title: '태그와 함께 생성되는 시리즈',
        slug: 'series-with-tags',
        description: '태그 테스트용 시리즈',
        tags: ['JavaScript', 'TypeScript', 'Node.js'],
      };

      const result = await sut.execute(createSeriesDto);

      const createdTags = await prisma.tag.findMany({
        where: { name: { in: createSeriesDto.tags } },
      });
      expect(createdTags).toHaveLength(3);

      const seriesTags = await prisma.seriesTag.findMany({
        where: { seriesId: result.id },
        include: { tag: true },
      });
      expect(seriesTags).toHaveLength(3);
      expect(seriesTags.map(st => st.tag.name)).toEqual(
        expect.arrayContaining(['JavaScript', 'TypeScript', 'Node.js'])
      );
    });
  });

  describe('기존 태그를 재사용하여 시리즈를 생성하면', () => {
    it('기존 태그가 재사용되고 중복 생성되지 않는다', async () => {
      const existingTag = await prisma.tag.create({
        data: {
          id: 'existing-tag-id',
          name: '기존태그',
        },
      });

      const createSeriesDto: CreateSeriesDto = {
        title: '기존 태그 재사용 시리즈',
        slug: 'series-with-existing-tag',
        description: '기존 태그 재사용 테스트',
        tags: [existingTag.name],
      };

      const result = await sut.execute(createSeriesDto);

      const allTagsWithSameName = await prisma.tag.findMany({
        where: { name: existingTag.name },
      });
      expect(allTagsWithSameName).toHaveLength(1);

      const seriesTags = await prisma.seriesTag.findMany({
        where: { seriesId: result.id },
        include: { tag: true },
      });
      expect(seriesTags).toHaveLength(1);
      expect(seriesTags[0]?.tag.id).toBe(existingTag.id);
    });
  });

  describe('새로운 태그와 기존 태그를 혼합하여 시리즈를 생성하면', () => {
    it('새 태그는 생성되고 기존 태그는 재사용된다', async () => {
      const existingTag = await prisma.tag.create({
        data: {
          id: 'existing-tag-for-mix',
          name: '기존혼합태그',
        },
      });

      const createSeriesDto: CreateSeriesDto = {
        title: '혼합 태그 시리즈',
        slug: 'series-with-mixed-tags',
        description: '새로운 태그와 기존 태그 혼합',
        tags: [existingTag.name, '새로운태그1', '새로운태그2'],
      };

      const result = await sut.execute(createSeriesDto);

      const existingTagCount = await prisma.tag.count({
        where: { name: existingTag.name },
      });
      expect(existingTagCount).toBe(1);

      const newTags = await prisma.tag.findMany({
        where: { name: { in: ['새로운태그1', '새로운태그2'] } },
      });
      expect(newTags).toHaveLength(2);

      const seriesTags = await prisma.seriesTag.findMany({
        where: { seriesId: result.id },
        include: { tag: true },
      });
      expect(seriesTags).toHaveLength(3);
      expect(seriesTags.map(st => st.tag.name)).toEqual(
        expect.arrayContaining([existingTag.name, '새로운태그1', '새로운태그2'])
      );
    });
  });
});
