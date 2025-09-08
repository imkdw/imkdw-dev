import { UpdateArticleUseCase } from '@/features/article/use-case/update-article.use-case';
import { ArticleValidator } from '@/shared/validator/article.validator';
import { SeriesValidator } from '@/shared/validator/series.validator';
import { ArticleRepository } from '@/shared/repository/article/article.repository';
import { SeriesRepository } from '@/shared/repository/series/series.repository';
import { UpdateArticleDto } from '@/features/article/dto/update-article.dto';
import { ArticleNotFoundException } from '@/features/article/exception/article-not-found.exception';
import { ExistArticleException } from '@/features/article/exception/exist-article.exception';
import { SeriesNotFoundException } from '@/features/series/exception/series-not-found.exception';
import { createTestArticle } from '@test/integration/helpers/article.helper';
import { createTestSeries } from '@test/integration/helpers/series.helper';
import { IntegrationTestHelper } from '@test/integration/helpers/integration-test.helper';
import { PrismaService } from '@/infra/database/prisma.service';
import type { Series } from '@prisma/client';

describe('게시글 수정 유스케이스', () => {
  let testHelper: IntegrationTestHelper;
  let sut: UpdateArticleUseCase;
  let prisma: PrismaService;
  let testSeries: Series;
  let anotherSeries: Series;

  beforeAll(async () => {
    testHelper = new IntegrationTestHelper([
      UpdateArticleUseCase,
      ArticleValidator,
      SeriesValidator,
      ArticleRepository,
      SeriesRepository,
    ]);
    await testHelper.setup();
  });

  beforeEach(async () => {
    sut = testHelper.getService(UpdateArticleUseCase);
    await testHelper.startTransaction();
    prisma = testHelper.getPrisma();
    testSeries = await createTestSeries(prisma);
    anotherSeries = await createTestSeries(prisma);
  });

  afterEach(() => {
    testHelper.rollbackTransaction();
  });

  describe('존재하지 않는 게시글을 수정하면', () => {
    it('에러가 발생한다', async () => {
      const nonExistentId = 'non-existent-id';
      const updateArticleDto: UpdateArticleDto = {
        title: '수정된 게시글 제목',
        content: '수정된 게시글 내용입니다.',
        seriesId: testSeries.id,
      };

      await expect(sut.execute(nonExistentId, updateArticleDto)).rejects.toThrow(ArticleNotFoundException);
    });
  });

  describe('존재하지 않는 시리즈 ID로 수정하면', () => {
    it('에러가 발생한다', async () => {
      const existingArticle = await createTestArticle(prisma, { 
        title: '기존 게시글 제목',
        seriesId: testSeries.id 
      });

      const updateArticleDto: UpdateArticleDto = {
        title: '수정된 게시글 제목',
        content: '수정된 게시글 내용입니다.',
        seriesId: '123e4567-e89b-12d3-a456-426614174000', // 존재하지 않는 ID
      };

      await expect(sut.execute(existingArticle.id, updateArticleDto)).rejects.toThrow(SeriesNotFoundException);
    });
  });

  describe('다른 게시글과 제목이 중복되면', () => {
    const duplicateTitle = '중복된 게시글 제목';

    it('에러가 발생한다', async () => {
      const existingArticle = await createTestArticle(prisma, { 
        title: '기존 게시글 제목',
        seriesId: testSeries.id 
      });
      await createTestArticle(prisma, { 
        title: duplicateTitle,
        seriesId: anotherSeries.id 
      });

      const updateArticleDto: UpdateArticleDto = {
        title: duplicateTitle,
        content: '수정된 게시글 내용입니다.',
        seriesId: testSeries.id,
      };

      await expect(sut.execute(existingArticle.id, updateArticleDto)).rejects.toThrow(ExistArticleException);
    });
  });

  describe('정상적인 게시글 수정하면', () => {
    it('같은 제목으로 수정하는 것은 허용된다', async () => {
      const existingArticle = await createTestArticle(prisma, {
        title: '기존 게시글 제목',
        content: '기존 게시글 내용',
        seriesId: testSeries.id,
      });

      const updateArticleDto: UpdateArticleDto = {
        title: existingArticle.title,
        content: '수정된 게시글 내용입니다.',
        seriesId: testSeries.id,
      };

      await expect(sut.execute(existingArticle.id, updateArticleDto)).resolves.not.toThrow();

      const updatedArticle = await prisma.article.findUnique({ where: { id: existingArticle.id } });
      expect(updatedArticle?.content).toBe(updateArticleDto.content);
      expect(updatedArticle?.seriesId).toBe(testSeries.id);
    });

    it('게시글이 수정된다', async () => {
      const existingArticle = await createTestArticle(prisma, {
        title: '기존 게시글 제목',
        content: '기존 게시글 내용',
        seriesId: testSeries.id,
      });

      const updateArticleDto: UpdateArticleDto = {
        title: '수정된 게시글 제목',
        content: '수정된 게시글 내용입니다.',
        seriesId: anotherSeries.id,
      };

      await sut.execute(existingArticle.id, updateArticleDto);

      const updatedArticle = await prisma.article.findUnique({ where: { id: existingArticle.id } });
      expect(updatedArticle?.title).toBe(updateArticleDto.title);
      expect(updatedArticle?.content).toBe(updateArticleDto.content);
      expect(updatedArticle?.seriesId).toBe(anotherSeries.id);
    });
  });
});