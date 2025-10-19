import { DeleteSeriesUseCase } from '@/features/series/use-case/delete-series.use-case';
import { SeriesValidator } from '@/shared/validator/series.validator';
import { SeriesRepository } from '@/shared/repository/series/series.repository';
import { SeriesNotFoundException } from '@/features/series/exception/series-not-found.exception';
import { createTestSeries } from '@test/integration/helpers/series.helper';
import { IntegrationTestHelper } from '@test/integration/helpers/integration-test.helper';
import { PrismaService } from '@/infra/database/prisma.service';
import type { Series } from '@prisma/client';

describe('시리즈 삭제 유스케이스', () => {
  let testHelper: IntegrationTestHelper;
  let sut: DeleteSeriesUseCase;
  let prisma: PrismaService;

  beforeAll(async () => {
    testHelper = new IntegrationTestHelper([DeleteSeriesUseCase, SeriesValidator, SeriesRepository]);
    await testHelper.setup();
  });

  beforeEach(async () => {
    sut = testHelper.getService(DeleteSeriesUseCase);
    await testHelper.startTransaction();
    prisma = testHelper.getPrisma();
  });

  afterEach(() => {
    testHelper.rollbackTransaction();
  });

  describe('존재하지 않는 시리즈를 삭제하면', () => {
    it('에러가 발생한다', async () => {
      const nonExistentSlug = 'non-existent-slug';
      await expect(sut.execute(nonExistentSlug)).rejects.toThrow(SeriesNotFoundException);
    });
  });

  describe('정상적인 시리즈를 삭제하면', () => {
    let existingSeries: Series;

    beforeEach(async () => {
      existingSeries = await createTestSeries(prisma, {
        title: '삭제할 시리즈',
        description: '삭제할 시리즈 설명입니다.',
      });
    });

    it('시리즈가 삭제된다', async () => {
      await sut.execute(existingSeries.slug);

      const deletedSeries = await prisma.series.findUnique({
        where: { id: existingSeries.id },
      });

      expect(deletedSeries).not.toBeNull();
      expect(deletedSeries?.deletedAt).not.toBeNull();
      expect(deletedSeries?.deletedAt).toBeInstanceOf(Date);
    });
  });

  describe('이미 삭제된 시리즈를 재삭제하면', () => {
    it('에러가 발생한다', async () => {
      const existingSeries = await createTestSeries(prisma, {
        title: '이미 삭제된 시리즈',
        description: '이미 삭제된 시리즈 설명',
      });

      await prisma.series.update({
        where: { id: existingSeries.id },
        data: { deletedAt: new Date() },
      });

      await expect(sut.execute(existingSeries.slug)).rejects.toThrow(SeriesNotFoundException);
    });
  });
});
