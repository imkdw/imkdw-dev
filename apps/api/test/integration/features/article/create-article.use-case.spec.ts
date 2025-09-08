import { CreateArticleUseCase } from '@/features/article/use-case/create-article.use-case';
import { ArticleValidator } from '@/shared/validator/article.validator';
import { SeriesValidator } from '@/shared/validator/series.validator';
import { ArticleRepository } from '@/shared/repository/article/article.repository';
import { SeriesRepository } from '@/shared/repository/series/series.repository';
import { CreateArticleDto } from '@/features/article/dto/create-article.dto';
import { ExistArticleException } from '@/features/article/exception/exist-article.exception';
import { SeriesNotFoundException } from '@/features/series/exception/series-not-found.exception';
import { createTestArticle } from '@test/integration/helpers/article.helper';
import { createTestSeries } from '@test/integration/helpers/series.helper';
import { IntegrationTestHelper } from '@test/integration/helpers/integration-test.helper';
import { PrismaService } from '@/infra/database/prisma.service';
import type { Series } from '@prisma/client';

describe('게시글 생성 유스케이스', () => {
  let testHelper: IntegrationTestHelper;
  let sut: CreateArticleUseCase;
  let prisma: PrismaService;
  let testSeries: Series;

  beforeAll(async () => {
    testHelper = new IntegrationTestHelper([
      CreateArticleUseCase,
      ArticleValidator,
      SeriesValidator,
      ArticleRepository,
      SeriesRepository,
    ]);
    await testHelper.setup();
  });

  beforeEach(async () => {
    sut = testHelper.getService(CreateArticleUseCase);
    await testHelper.startTransaction();
    prisma = testHelper.getPrisma();
    testSeries = await createTestSeries(prisma);
  });

  afterEach(() => {
    testHelper.rollbackTransaction();
  });

  describe('동일한 제목의 게시글이 이미 존재하면', () => {
    const existingTitle = '이미 존재하는 게시글 제목';

    it('에러가 발생한다', async () => {
      await createTestArticle(prisma, { title: existingTitle, seriesId: testSeries.id });
      const createArticleDto: CreateArticleDto = {
        title: existingTitle,
        slug: 'existing-article-slug',
        content: '새로운 게시글 내용입니다.',
        seriesId: testSeries.id,
      };

      await expect(sut.execute(createArticleDto)).rejects.toThrow(ExistArticleException);
    });
  });

  describe('존재하지 않는 시리즈 ID로 게시글을 생성하면', () => {
    it('에러가 발생한다', async () => {
      const createArticleDto: CreateArticleDto = {
        title: '새로운 게시글 제목',
        slug: 'new-article-slug',
        content: '테스트 게시글 내용입니다.',
        seriesId: '123e4567-e89b-12d3-a456-426614174000', // 존재하지 않는 ID
      };

      await expect(sut.execute(createArticleDto)).rejects.toThrow(SeriesNotFoundException);
    });
  });

  describe('새로운 게시글을 생성하면', () => {
    it('게시글이 생성된다', async () => {
      const createArticleDto: CreateArticleDto = {
        title: '새로운 게시글 제목',
        slug: 'new-article-slug',
        content: '테스트 게시글 내용입니다.',
        seriesId: testSeries.id,
      };

      const result = await sut.execute(createArticleDto);

      const savedArticle = await prisma.article.findUnique({ where: { id: result.id } });
      expect(savedArticle).not.toBeNull();
      expect(savedArticle?.title).toBe(createArticleDto.title);
      expect(savedArticle?.content).toBe(createArticleDto.content);
      expect(savedArticle?.seriesId).toBe(testSeries.id);
    });
  });
});
