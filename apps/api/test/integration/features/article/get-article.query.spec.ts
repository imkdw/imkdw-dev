import { GetArticleQuery } from '@/features/article/query/get-article.query';
import { ArticleNotFoundException } from '@/features/article/exception/article-not-found.exception';
import { createTestArticle } from '@test/integration/helpers/article.helper';
import { createTestSeries } from '@test/integration/helpers/series.helper';
import { createTestTag } from '@test/integration/helpers/tag.helper';
import { createTestMember } from '@test/integration/helpers/member.helper';
import { IntegrationTestHelper } from '@test/integration/helpers/integration-test.helper';
import { PrismaService } from '@/infra/database/prisma.service';
import { ARTICLE_STATE, MEMBER_ROLE } from '@imkdw-dev/consts';
import type { Article, Series, Tag, Member } from '@prisma/client';
import type { Requester } from '@/common/types/requester.type';

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
        plainContent: testArticle.plainContent,
        viewCount: testArticle.viewCount,
        readMinute: testArticle.readMinute,
        state: testArticle.state,
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

  describe('게시글 상태에 따른 권한 기반 필터링', () => {
    let adminMember: Member;
    let normalMember: Member;
    let adminRequester: Requester;
    let userRequester: Requester;
    let hiddenArticle: Article;

    beforeEach(async () => {
      [adminMember, normalMember] = await Promise.all([
        createTestMember(prisma, { role: MEMBER_ROLE.ADMIN }),
        createTestMember(prisma, { role: MEMBER_ROLE.USER }),
      ]);

      adminRequester = { id: adminMember.id, role: adminMember.role, isAdmin: true };
      userRequester = { id: normalMember.id, role: normalMember.role, isAdmin: false };

      hiddenArticle = await prisma.article.create({
        data: {
          id: '00000000-0000-0000-0000-000000000099',
          title: 'HIDDEN 게시글',
          slug: 'hidden-article-test',
          content: 'Hidden article content',
          plainContent: 'Hidden article content',
          state: ARTICLE_STATE.HIDDEN,
          viewCount: 0,
          readMinute: 1,
          seriesId: testSeries.id,
          createdAt: new Date(testArticle.createdAt.getTime() - 10000),
        },
      });
    });

    describe('NORMAL 상태 게시글 조회', () => {
      it('비로그인 사용자가 조회하면 성공한다', async () => {
        const result = await sut.execute(testArticle.slug);
        expect(result.article.state).toBe(ARTICLE_STATE.NORMAL);
      });

      it('일반 사용자가 조회하면 성공한다', async () => {
        const result = await sut.execute(testArticle.slug, userRequester);
        expect(result.article.state).toBe(ARTICLE_STATE.NORMAL);
      });

      it('관리자가 조회하면 성공한다', async () => {
        const result = await sut.execute(testArticle.slug, adminRequester);
        expect(result.article.state).toBe(ARTICLE_STATE.NORMAL);
      });
    });

    describe('HIDDEN 상태 게시글 조회', () => {
      it('비로그인 사용자가 조회하면 404 에러가 발생한다', async () => {
        await expect(sut.execute(hiddenArticle.slug)).rejects.toThrow(ArticleNotFoundException);
      });

      it('일반 사용자가 조회하면 404 에러가 발생한다', async () => {
        await expect(sut.execute(hiddenArticle.slug, userRequester)).rejects.toThrow(ArticleNotFoundException);
      });

      it('관리자가 조회하면 성공한다', async () => {
        const result = await sut.execute(hiddenArticle.slug, adminRequester);
        expect(result.article.id).toBe(hiddenArticle.id);
        expect(result.article.state).toBe(ARTICLE_STATE.HIDDEN);
      });
    });

    describe('이전/다음 게시글 네비게이션과 HIDDEN 상태', () => {
      let prevNormalArticle: Article;
      let prevHiddenArticle: Article;
      let nextNormalArticle: Article;
      let nextHiddenArticle: Article;

      beforeEach(async () => {
        prevNormalArticle = await createTestArticle(prisma, {
          seriesId: testSeries.id,
          title: '이전 NORMAL 게시글',
          slug: 'prev-normal-article',
        });
        await prisma.article.update({
          where: { id: prevNormalArticle.id },
          data: { createdAt: new Date(testArticle.createdAt.getTime() - 2000) },
        });

        prevHiddenArticle = await prisma.article.create({
          data: {
            id: '00000000-0000-0000-0000-000000000011',
            title: '이전 HIDDEN 게시글',
            slug: 'prev-hidden-article',
            content: 'Hidden content',
            plainContent: 'Hidden content',
            state: ARTICLE_STATE.HIDDEN,
            viewCount: 0,
            readMinute: 1,
            seriesId: testSeries.id,
            createdAt: new Date(testArticle.createdAt.getTime() - 1000),
          },
        });

        nextNormalArticle = await createTestArticle(prisma, {
          seriesId: testSeries.id,
          title: '다음 NORMAL 게시글',
          slug: 'next-normal-article',
        });
        await prisma.article.update({
          where: { id: nextNormalArticle.id },
          data: { createdAt: new Date(testArticle.createdAt.getTime() + 2000) },
        });

        nextHiddenArticle = await prisma.article.create({
          data: {
            id: '00000000-0000-0000-0000-000000000012',
            title: '다음 HIDDEN 게시글',
            slug: 'next-hidden-article',
            content: 'Hidden content',
            plainContent: 'Hidden content',
            state: ARTICLE_STATE.HIDDEN,
            viewCount: 0,
            readMinute: 1,
            seriesId: testSeries.id,
            createdAt: new Date(testArticle.createdAt.getTime() + 1000),
          },
        });
      });

      it('비로그인 사용자는 HIDDEN 상태 게시글이 네비게이션에서 제외된다', async () => {
        const result = await sut.execute(testArticle.slug);

        expect(result.prevArticle?.id).toBe(prevNormalArticle.id);
        expect(result.nextArticle?.id).toBe(nextNormalArticle.id);
      });

      it('일반 사용자는 HIDDEN 상태 게시글이 네비게이션에서 제외된다', async () => {
        const result = await sut.execute(testArticle.slug, userRequester);

        expect(result.prevArticle?.id).toBe(prevNormalArticle.id);
        expect(result.nextArticle?.id).toBe(nextNormalArticle.id);
      });

      it('관리자는 HIDDEN 상태 게시글이 네비게이션에 포함된다', async () => {
        const result = await sut.execute(testArticle.slug, adminRequester);

        expect(result.prevArticle?.id).toBe(prevHiddenArticle.id);
        expect(result.nextArticle?.id).toBe(nextHiddenArticle.id);
      });
    });
  });
});
