import { GetArticleCommentsQuery } from '@/features/article/query/get-article-comments.query';
import { ArticleValidator } from '@/shared/validator/article.validator';
import { ArticleNotFoundException } from '@/features/article/exception/article-not-found.exception';
import { createTestArticle } from '@test/integration/helpers/article.helper';
import { createTestMember } from '@test/integration/helpers/member.helper';
import { createTestSeries } from '@test/integration/helpers/series.helper';
import { createTestComment } from '@test/integration/helpers/article-comment.helper';
import { IntegrationTestHelper } from '@test/integration/helpers/integration-test.helper';
import { PrismaService } from '@/infra/database/prisma.service';
import type { Article, ArticleComment, Member, Series } from '@prisma/client';
import { ArticleRepository } from '@/shared/repository/article/article.repository';

describe('게시글 댓글 목록 조회 쿼리', () => {
  let testHelper: IntegrationTestHelper;
  let sut: GetArticleCommentsQuery;
  let prisma: PrismaService;
  let testSeries: Series;
  let testArticle: Article;
  let testMember: Member;

  beforeAll(async () => {
    testHelper = new IntegrationTestHelper([GetArticleCommentsQuery, ArticleValidator, ArticleRepository]);
    await testHelper.setup();
  });

  beforeEach(async () => {
    sut = testHelper.getService(GetArticleCommentsQuery);
    await testHelper.startTransaction();
    prisma = testHelper.getPrisma();

    testSeries = await createTestSeries(prisma);
    testArticle = await createTestArticle(prisma, { seriesId: testSeries.id });
    testMember = await createTestMember(prisma);
  });

  afterEach(() => {
    testHelper.rollbackTransaction();
  });

  describe('존재하지 않는 게시글 slug로 조회하면', () => {
    it('에러가 발생한다', async () => {
      const nonExistentSlug = 'non-existent-slug';
      await expect(sut.execute(nonExistentSlug)).rejects.toThrow(ArticleNotFoundException);
    });
  });

  describe('댓글이 없는 게시글을 조회하면', () => {
    it('빈 배열을 반환한다', async () => {
      const result = await sut.execute(testArticle.slug);

      expect(result.comments).toEqual([]);
    });
  });

  describe('댓글이 있는 게시글을 조회하면', () => {
    let testComment: ArticleComment;

    beforeEach(async () => {
      testComment = await createTestComment(prisma, {
        articleId: testArticle.id,
        authorId: testMember.id,
        content: '테스트 댓글 내용입니다.',
      });
    });

    it('댓글 목록을 반환한다', async () => {
      const result = await sut.execute(testArticle.slug);

      expect(result.comments).toHaveLength(1);
      expect(result.comments[0]).toEqual({
        id: testComment.id,
        content: testComment.content,
        createdAt: testComment.createdAt,
        hasReplies: false,
        author: {
          nickname: testMember.nickname,
          profileImage: testMember.profileImage,
        },
      });
    });
  });

  describe('여러 댓글이 있을 때', () => {
    let firstComment: ArticleComment;
    let secondComment: ArticleComment;
    let thirdComment: ArticleComment;

    beforeEach(async () => {
      firstComment = await createTestComment(prisma, {
        articleId: testArticle.id,
        authorId: testMember.id,
        content: '첫 번째 댓글',
        createdAt: new Date('2025-01-01T00:00:00Z'),
      });

      secondComment = await createTestComment(prisma, {
        articleId: testArticle.id,
        authorId: testMember.id,
        content: '두 번째 댓글',
        createdAt: new Date('2025-01-02T00:00:00Z'),
      });

      thirdComment = await createTestComment(prisma, {
        articleId: testArticle.id,
        authorId: testMember.id,
        content: '세 번째 댓글',
        createdAt: new Date('2025-01-03T00:00:00Z'),
      });
    });

    it('작성일 기준 최신순으로 정렬된다', async () => {
      const result = await sut.execute(testArticle.slug);

      expect(result.comments).toHaveLength(3);
      expect(result.comments[0]?.id).toBe(thirdComment.id);
      expect(result.comments[1]?.id).toBe(secondComment.id);
      expect(result.comments[2]?.id).toBe(firstComment.id);
    });
  });

  describe('삭제된 댓글이 있을 때', () => {
    let normalComment: ArticleComment;
    let deletedComment: ArticleComment;

    beforeEach(async () => {
      normalComment = await createTestComment(prisma, {
        articleId: testArticle.id,
        authorId: testMember.id,
        content: '일반 댓글',
      });

      deletedComment = await createTestComment(prisma, {
        articleId: testArticle.id,
        authorId: testMember.id,
        content: '삭제된 댓글',
      });

      await prisma.articleComment.update({
        where: { id: deletedComment.id },
        data: { deletedAt: new Date() },
      });
    });

    it('삭제된 댓글은 조회되지 않는다', async () => {
      const result = await sut.execute(testArticle.slug);

      expect(result.comments).toHaveLength(1);
      expect(result.comments[0]?.id).toBe(normalComment.id);
    });
  });
});
