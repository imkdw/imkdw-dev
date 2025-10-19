import { UpdateSeriesUseCase } from '@/features/series/use-case/update-series.use-case';
import { SeriesValidator } from '@/shared/validator/series.validator';
import { SeriesRepository } from '@/shared/repository/series/series.repository';
import { UpdateSeriesDto } from '@/features/series/dto/update-series.dto';
import { SeriesNotFoundException } from '@/features/series/exception/series-not-found.exception';
import { ExistSeriesTitleException } from '@/features/series/exception/exist-series-title.exception';
import { createTestSeries } from '@test/integration/helpers/series.helper';
import { IntegrationTestHelper } from '@test/integration/helpers/integration-test.helper';
import { PrismaService } from '@/infra/database/prisma.service';
import { TagRepository } from '@/shared/repository/tag/tag.repository';

describe('시리즈 수정 유스케이스', () => {
  let testHelper: IntegrationTestHelper;
  let sut: UpdateSeriesUseCase;
  let prisma: PrismaService;

  beforeAll(async () => {
    testHelper = new IntegrationTestHelper([UpdateSeriesUseCase, SeriesValidator, SeriesRepository, TagRepository]);
    await testHelper.setup();
  });

  beforeEach(async () => {
    sut = testHelper.getService(UpdateSeriesUseCase);
    await testHelper.startTransaction();
    prisma = testHelper.getPrisma();
  });

  afterEach(() => {
    testHelper.rollbackTransaction();
  });

  describe('존재하지 않는 시리즈를 수정하면', () => {
    it('에러가 발생한다', async () => {
      const nonExistentSlug = 'non-existent-slug';
      const updateSeriesDto: UpdateSeriesDto = {
        title: '수정된 시리즈 제목',
        description: '수정된 시리즈 설명',
        tags: [],
      };

      await expect(sut.execute(nonExistentSlug, updateSeriesDto)).rejects.toThrow(SeriesNotFoundException);
    });
  });

  describe('다른 시리즈와 제목이 중복되면', () => {
    const duplicateTitle = '중복된 시리즈 제목';

    it('에러가 발생한다', async () => {
      const existingSeries = await createTestSeries(prisma, { title: '기존 시리즈 제목' });
      await createTestSeries(prisma, { title: duplicateTitle });

      const updateSeriesDto: UpdateSeriesDto = {
        title: duplicateTitle,
        description: '중복된 시리즈 설명',
        tags: [],
      };

      await expect(sut.execute(existingSeries.slug, updateSeriesDto)).rejects.toThrow(ExistSeriesTitleException);
    });
  });

  describe('정상적인 시리즈 수정하면', () => {
    it('같은 제목으로 수정하는 것은 허용된다', async () => {
      const existingSeries = await createTestSeries(prisma, {
        title: '기존 시리즈 제목',
        slug: 'existing-series-slug',
      });

      const updateSeriesDto: UpdateSeriesDto = {
        title: existingSeries.title,
        description: '동일한 제목 수정 테스트',
        tags: [],
      };

      await expect(sut.execute(existingSeries.slug, updateSeriesDto)).resolves.not.toThrow();

      const updatedSeries = await prisma.series.findUnique({ where: { id: existingSeries.id } });
      expect(updatedSeries?.slug).toBe(existingSeries.slug);
    });

    it('시리즈가 수정된다', async () => {
      const existingSeries = await createTestSeries(prisma, {
        title: '기존 시리즈 제목',
        slug: 'existing-series-slug',
      });

      const updateSeriesDto: UpdateSeriesDto = {
        title: '수정된 시리즈 제목',
        description: '수정된 시리즈 설명',
        tags: [],
      };

      await sut.execute(existingSeries.slug, updateSeriesDto);

      const updatedSeries = await prisma.series.findUnique({ where: { id: existingSeries.id } });
      expect(updatedSeries?.title).toBe(updateSeriesDto.title);
      expect(updatedSeries?.description).toBe(updateSeriesDto.description);
      expect(updatedSeries?.slug).toBe(existingSeries.slug);
    });
  });

  describe('시리즈의 태그를 완전히 교체하면', () => {
    it('기존 태그 관계는 soft delete되고 새 태그로 교체된다', async () => {
      await prisma.tag.createMany({
        data: [
          { id: 'old-tag-1', name: '기존태그1' },
          { id: 'old-tag-2', name: '기존태그2' },
        ],
      });

      const existingSeries = await createTestSeries(prisma);
      await prisma.seriesTag.createMany({
        data: [
          { seriesId: existingSeries.id, tagId: 'old-tag-1' },
          { seriesId: existingSeries.id, tagId: 'old-tag-2' },
        ],
      });

      const updateSeriesDto: UpdateSeriesDto = {
        title: existingSeries.title,
        description: existingSeries.description,
        tags: ['새태그1', '새태그2'],
      };

      await sut.execute(existingSeries.slug, updateSeriesDto);

      const oldSeriesTags = await prisma.seriesTag.findMany({
        where: { seriesId: existingSeries.id, deletedAt: null },
        include: { tag: true },
      });
      expect(oldSeriesTags).toHaveLength(2);
      expect(oldSeriesTags.map(st => st.tag.name)).toEqual(expect.arrayContaining(['새태그1', '새태그2']));

      const deletedSeriesTags = await prisma.seriesTag.findMany({
        where: { seriesId: existingSeries.id, deletedAt: { not: null } },
      });
      expect(deletedSeriesTags).toHaveLength(2);
    });
  });

  describe('시리즈의 모든 태그를 제거하면', () => {
    it('모든 태그 관계가 soft delete된다', async () => {
      await prisma.tag.createMany({
        data: [
          { id: 'tag-to-remove-1', name: '제거될태그1' },
          { id: 'tag-to-remove-2', name: '제거될태그2' },
        ],
      });

      const existingSeries = await createTestSeries(prisma);
      await prisma.seriesTag.createMany({
        data: [
          { seriesId: existingSeries.id, tagId: 'tag-to-remove-1' },
          { seriesId: existingSeries.id, tagId: 'tag-to-remove-2' },
        ],
      });

      const updateSeriesDto: UpdateSeriesDto = {
        title: existingSeries.title,
        description: existingSeries.description,
        tags: [],
      };

      await sut.execute(existingSeries.slug, updateSeriesDto);

      const activeSeriesTags = await prisma.seriesTag.findMany({
        where: { seriesId: existingSeries.id, deletedAt: null },
      });
      expect(activeSeriesTags).toHaveLength(0);

      const deletedSeriesTags = await prisma.seriesTag.findMany({
        where: { seriesId: existingSeries.id, deletedAt: { not: null } },
      });
      expect(deletedSeriesTags).toHaveLength(2);
    });
  });

  describe('다른 시리즈가 사용 중인 태그로 변경하면', () => {
    it('태그가 재사용되고 중복 생성되지 않는다', async () => {
      const sharedTag = await prisma.tag.create({
        data: {
          id: 'shared-tag-id',
          name: '공유태그',
        },
      });

      const otherSeries = await createTestSeries(prisma);
      await prisma.seriesTag.create({
        data: { seriesId: otherSeries.id, tagId: sharedTag.id },
      });

      const existingSeries = await createTestSeries(prisma);

      const updateSeriesDto: UpdateSeriesDto = {
        title: existingSeries.title,
        description: existingSeries.description,
        tags: [sharedTag.name],
      };

      await sut.execute(existingSeries.slug, updateSeriesDto);

      const allSharedTags = await prisma.tag.findMany({
        where: { name: sharedTag.name },
      });
      expect(allSharedTags).toHaveLength(1);

      const updatedSeriesTags = await prisma.seriesTag.findMany({
        where: { seriesId: existingSeries.id, deletedAt: null },
        include: { tag: true },
      });
      expect(updatedSeriesTags).toHaveLength(1);
      expect(updatedSeriesTags[0]?.tag.id).toBe(sharedTag.id);
    });
  });
});
