import { Test, TestingModule } from '@nestjs/testing';
import { CreateSeriesUseCase } from '@/features/series/use-case/create-series.use-case';
import { SeriesValidator } from '@/features/series/validator/series.validator';
import { SeriesRepository } from '@/shared/repository/series/series.repository';
import { PrismaService } from '@/infra/database/prisma.service';
import { CreateSeriesDto } from '@/features/series/dto/create-series.dto';
import { ExistSeriesSlugException } from '@/features/series/exception/exist-series-slug.exception';
import { ExistSeriesTitleException } from '@/features/series/exception/exist-series-title.exception';
import { createTestSeries } from '@test/integration/helpers/series.helper';
import { PrismaTestingHelper } from '@chax-at/transactional-prisma-testing';

describe('시리즈 생성 유스케이스', () => {
  let sut: CreateSeriesUseCase;
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
        CreateSeriesUseCase,
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
    sut = module.get<CreateSeriesUseCase>(CreateSeriesUseCase);
    await prismaTestingHelper?.startNewTransaction();
  });

  afterEach(() => {
    prismaTestingHelper?.rollbackCurrentTransaction();
  });

  describe('동일한 제목의 시리즈가 이미 존재하면', () => {
    const existingTitle = '이미 존재하는 시리즈 제목';

    it('에러가 발생한다', async () => {
      await createTestSeries(prisma, { title: existingTitle });
      const createSeriesDto: CreateSeriesDto = {
        title: existingTitle,
        slug: 'new-series-slug',
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
      };

      await expect(sut.execute(createSeriesDto)).rejects.toThrow(ExistSeriesSlugException);
    });
  });

  describe('새로운 시리즈를 생성하면', () => {
    it('시리즈가 생성된다', async () => {
      const createSeriesDto: CreateSeriesDto = {
        title: '새로운 시리즈 제목',
        slug: 'new-series-slug',
      };

      const result = await sut.execute(createSeriesDto);

      const savedSeries = await prisma.series.findUnique({ where: { id: result.id } });
      expect(savedSeries).not.toBeNull();
      expect(savedSeries?.title).toBe(createSeriesDto.title);
      expect(savedSeries?.slug).toBe(createSeriesDto.slug);
    });
  });
});
