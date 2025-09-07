import { Test, TestingModule } from '@nestjs/testing';
import { UpdateSeriesUseCase } from '@/features/series/use-case/update-series.use-case';
import { SeriesValidator } from '@/features/series/validator/series.validator';
import { SeriesRepository } from '@/shared/repository/series/series.repository';
import { PrismaService } from '@/infra/database/prisma.service';
import { UpdateSeriesDto } from '@/features/series/dto/update-series.dto';
import { SeriesNotFoundException } from '@/features/series/exception/series-not-found.exception';
import { ExistSeriesTitleException } from '@/features/series/exception/exist-series-title.exception';
import { createTestSeries } from '@test/integration/helpers/series.helper';
import { PrismaTestingHelper } from '@chax-at/transactional-prisma-testing';

describe('시리즈 수정 유스케이스', () => {
  let sut: UpdateSeriesUseCase;
  let prismaTestingHelper: PrismaTestingHelper<PrismaService> | undefined;
  let prisma: PrismaService;
  let module: TestingModule;

  beforeAll(async () => {
    if (!prismaTestingHelper) {
      const originalPrismaService = new PrismaService();
      prismaTestingHelper = new PrismaTestingHelper(originalPrismaService);
      prisma = prismaTestingHelper.getProxyClient();
    }

    module = await Test.createTestingModule({
      providers: [
        UpdateSeriesUseCase,
        SeriesValidator,
        SeriesRepository,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();
  });

  beforeEach(async () => {
    sut = module.get<UpdateSeriesUseCase>(UpdateSeriesUseCase);
    await prismaTestingHelper?.startNewTransaction();
  });

  afterEach(() => {
    prismaTestingHelper?.rollbackCurrentTransaction();
  });

  describe('존재하지 않는 시리즈를 수정하면', () => {
    it('에러가 발생한다', async () => {
      const nonExistentId = 'non-existent-id';
      const updateSeriesDto: UpdateSeriesDto = {
        title: '수정된 시리즈 제목',
      };

      await expect(sut.execute(nonExistentId, updateSeriesDto)).rejects.toThrow(SeriesNotFoundException);
    });
  });

  describe('다른 시리즈와 제목이 중복되면', () => {
    const duplicateTitle = '중복된 시리즈 제목';

    it('에러가 발생한다', async () => {
      const existingSeries = await createTestSeries(prisma, { title: '기존 시리즈 제목' });
      await createTestSeries(prisma, { title: duplicateTitle });

      const updateSeriesDto: UpdateSeriesDto = {
        title: duplicateTitle,
      };

      await expect(sut.execute(existingSeries.id, updateSeriesDto)).rejects.toThrow(ExistSeriesTitleException);
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
      };

      await expect(sut.execute(existingSeries.id, updateSeriesDto)).resolves.not.toThrow();

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
      };

      await sut.execute(existingSeries.id, updateSeriesDto);

      const updatedSeries = await prisma.series.findUnique({ where: { id: existingSeries.id } });
      expect(updatedSeries?.title).toBe(updateSeriesDto.title);
      expect(updatedSeries?.slug).toBe(existingSeries.slug);
    });
  });
});
