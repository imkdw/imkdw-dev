import { GetArticleQuery } from '@/features/article/query/get-article.query';
import { ArticleNotFoundException } from '@/features/article/exception/article-not-found.exception';
import { createTestArticle } from '@test/integration/helpers/article.helper';
import { createTestSeries } from '@test/integration/helpers/series.helper';
import { createTestTag } from '@test/integration/helpers/tag.helper';
import { IntegrationTestHelper } from '@test/integration/helpers/integration-test.helper';
import { PrismaService } from '@/infra/database/prisma.service';
import type { Article, Series, Tag } from '@prisma/client';

describe('게시글 상세조회 쿼리', () => {
  let testHelper: IntegrationTestHelper;
  let sut: GetArticleQuery;
  let prisma: PrismaService;
  let testSeries: Series;
  let testArticle: Article;
  let testTag: Tag;

  beforeAll(async () => {
    testHelper = new IntegrationTestHelper([GetArticleQuery]);
    await testHelper.setup();
  });

  beforeEach(async () => {
    sut = testHelper.getService(GetArticleQuery);
    await testHelper.startTransaction();
    prisma = testHelper.getPrisma();
    testSeries = await createTestSeries(prisma);
    testTag = await createTestTag(prisma);
    testArticle = await createTestArticle(prisma, {
      seriesId: testSeries.id,
      title: '테스트 게시글',
      slug: 'test-article',
      content: '테스트 게시글 내용입니다.',
    });

    await prisma.articleTag.create({
      data: {
        articleId: testArticle.id,
        tagId: testTag.id,
      },
    });
  });

  afterEach(() => {
    testHelper.rollbackTransaction();
  });

  describe('존재하지 않는 게시글 ID로 조회하면', () => {
    it('에러가 발생한다', async () => {
      const nonExistentId = 'nonExistentId';
      await expect(sut.execute(nonExistentId)).rejects.toThrow(ArticleNotFoundException);
    });
  });

  describe('존재하는 게시글을 조회하면', () => {
    it('게시글 상세 정보를 반환한다', async () => {
      const result = await sut.execute(testArticle.slug);

      expect(result.article).toEqual({
        id: testArticle.id,
        title: testArticle.title,
        slug: testArticle.slug,
        content: testArticle.content,
        viewCount: testArticle.viewCount,
        readMinute: testArticle.readMinute,
        createdAt: testArticle.createdAt,
        series: {
          id: testSeries.id,
          title: testSeries.title,
          slug: testSeries.slug,
        },
        tags: [
          {
            id: testTag.id,
            name: testTag.name,
          },
        ],
      });
    });
  });

  describe('이전/다음 게시글 조회', () => {
    let prevArticle: Article;
    let nextArticle: Article;

    beforeEach(async () => {
      prevArticle = await createTestArticle(prisma, {
        seriesId: testSeries.id,
        title: '이전 게시글',
        slug: 'prev-article',
        content: '이전 게시글 내용',
      });

      await prisma.article.update({
        where: { id: prevArticle.id },
        data: { createdAt: new Date(testArticle.createdAt.getTime() - 1000) },
      });

      nextArticle = await createTestArticle(prisma, {
        seriesId: testSeries.id,
        title: '다음 게시글',
        slug: 'next-article',
        content: '다음 게시글 내용',
      });

      await prisma.article.update({
        where: { id: nextArticle.id },
        data: { createdAt: new Date(testArticle.createdAt.getTime() + 1000) },
      });
    });

    it('같은 시리즈의 이전/다음 게시글을 반환한다', async () => {
      const result = await sut.execute(testArticle.slug);

      expect(result.prevArticle).toEqual({
        id: prevArticle.id,
        title: prevArticle.title,
        slug: prevArticle.slug,
      });

      expect(result.nextArticle).toEqual({
        id: nextArticle.id,
        title: nextArticle.title,
        slug: nextArticle.slug,
      });
    });

    it('첫 번째 게시글의 경우 이전 게시글이 null이다', async () => {
      const result = await sut.execute(prevArticle.slug);

      expect(result.prevArticle).toBeNull();
      expect(result.nextArticle).not.toBeNull();
    });

    it('마지막 게시글의 경우 다음 게시글이 null이다', async () => {
      const result = await sut.execute(nextArticle.slug);

      expect(result.prevArticle).not.toBeNull();
      expect(result.nextArticle).toBeNull();
    });
  });

  describe('다른 시리즈의 게시글이 있을 때', () => {
    let otherSeries: Series;
    let otherArticle: Article;

    beforeEach(async () => {
      otherSeries = await createTestSeries(prisma, {
        title: '다른 시리즈',
        slug: 'other-series',
      });

      otherArticle = await createTestArticle(prisma, {
        seriesId: otherSeries.id,
        title: '다른 시리즈 게시글',
        slug: 'other-series-article',
        content: '다른 시리즈 게시글 내용',
      });

      await prisma.article.update({
        where: { id: otherArticle.id },
        data: { createdAt: new Date(testArticle.createdAt.getTime() - 1000) },
      });
    });

    it('다른 시리즈의 게시글은 이전/다음 게시글에 포함되지 않는다', async () => {
      const result = await sut.execute(testArticle.slug);

      expect(result.prevArticle).toBeNull();
      expect(result.nextArticle).toBeNull();
    });
  });
});
