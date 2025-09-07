import { GetSeriesUseCase } from '@/features/series/use-case/get-series.use-case';
import { SeriesRepository } from '@/shared/repository/series/series.repository';
import { createTestSeries } from '@test/integration/helpers/series.helper';
import { IntegrationTestHelper } from '@test/integration/helpers/integration-test.helper';

describe('시리즈 목록 조회 유스케이스', () => {
  let testHelper: IntegrationTestHelper;
  let sut: GetSeriesUseCase;

  beforeAll(async () => {
    testHelper = new IntegrationTestHelper([GetSeriesUseCase, SeriesRepository]);
    await testHelper.setup();
  });

  beforeEach(async () => {
    sut = testHelper.getService(GetSeriesUseCase);
    await testHelper.startTransaction();
  });

  afterEach(() => {
    testHelper.rollbackTransaction();
  });

  describe('시리즈가 없을 때', () => {
    it('빈 배열을 반환한다', async () => {
      const result = await sut.execute();

      expect(result).toEqual([]);
    });
  });

  describe('시리즈가 있을 때', () => {
    it('생성일 기준 내림차순으로 정렬된 목록을 반환한다', async () => {
      const firstTime = new Date('2024-01-01T00:00:00Z');
      const secondTime = new Date('2024-01-02T00:00:00Z');
      const thirdTime = new Date('2024-01-03T00:00:00Z');

      const series1 = await createTestSeries(testHelper.getPrisma(), {
        title: '첫 번째 시리즈',
        slug: 'first-series',
        createdAt: firstTime,
      });
      const series3 = await createTestSeries(testHelper.getPrisma(), {
        title: '세 번째 시리즈',
        slug: 'third-series',
        createdAt: thirdTime,
      });
      const series2 = await createTestSeries(testHelper.getPrisma(), {
        title: '두 번째 시리즈',
        slug: 'second-series',
        createdAt: secondTime,
      });

      const result = await sut.execute();

      expect(result).toHaveLength(3);
      expect(result[0]?.id).toBe(series3.id);
      expect(result[1]?.id).toBe(series2.id);
      expect(result[2]?.id).toBe(series1.id);
    });
  });

  describe('삭제된 시리즈가 있을 때', () => {
    it('삭제된 시리즈는 조회되지 않는다', async () => {
      const normalSeries = await createTestSeries(testHelper.getPrisma(), {
        title: '정상 시리즈',
        slug: 'normal-series',
      });
      await createTestSeries(testHelper.getPrisma(), {
        title: '삭제된 시리즈',
        slug: 'deleted-series',
        deletedAt: new Date(),
      });

      const result = await sut.execute();

      expect(result).toHaveLength(1);
      expect(result[0]?.id).toBe(normalSeries.id);
      expect(result[0]?.title).toBe('정상 시리즈');
    });
  });
});
