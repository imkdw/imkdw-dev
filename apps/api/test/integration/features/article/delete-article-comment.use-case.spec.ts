import { DeleteArticleCommentUseCase } from '@/features/article/use-case/delete-article-comment.use-case';
import { ArticleCommentValidator } from '@/shared/validator/article-comment.validator';
import { ArticleCommentRepository } from '@/shared/repository/article-comment/article-comment.repository';
import { ArticleCommentNotFoundException } from '@/features/article/exception/article-comment-not-found.exception';
import { CannotDeleteArticleCommentException } from '@/features/article/exception/cannot-delete-article-comment.exception';
import { createTestArticle } from '@test/integration/helpers/article.helper';
import { createTestMember } from '@test/integration/helpers/member.helper';
import { createTestSeries } from '@test/integration/helpers/series.helper';
import { createTestComment, createTestReply } from '@test/integration/helpers/article-comment.helper';
import { IntegrationTestHelper } from '@test/integration/helpers/integration-test.helper';
import { PrismaService } from '@/infra/database/prisma.service';
import { MEMBER_ROLE } from '@imkdw-dev/consts';
import type { Article, Member, Series, ArticleComment } from '@prisma/client';

describe('게시글 댓글 삭제 유스케이스', () => {
  let testHelper: IntegrationTestHelper;
  let sut: DeleteArticleCommentUseCase;
  let prisma: PrismaService;
  let testSeries: Series;
  let testArticle: Article;
  let testMember: Member;
  let otherMember: Member;
  let adminMember: Member;
  let testComment: ArticleComment;

  beforeAll(async () => {
    testHelper = new IntegrationTestHelper([
      DeleteArticleCommentUseCase,
      ArticleCommentValidator,
      ArticleCommentRepository,
    ]);
    await testHelper.setup();
  });

  beforeEach(async () => {
    sut = testHelper.getService(DeleteArticleCommentUseCase);
    await testHelper.startTransaction();
    prisma = testHelper.getPrisma();

    testSeries = await createTestSeries(prisma);
    testArticle = await createTestArticle(prisma, { seriesId: testSeries.id });
    testMember = await createTestMember(prisma);
    otherMember = await createTestMember(prisma, { email: 'other@test.com' });
    adminMember = await createTestMember(prisma, {
      email: 'admin@test.com',
      role: MEMBER_ROLE.ADMIN,
    });
    testComment = await createTestComment(prisma, {
      articleId: testArticle.id,
      authorId: testMember.id,
    });
  });

  afterEach(() => {
    testHelper.rollbackTransaction();
  });

  describe('존재하지 않는 댓글을 삭제하면', () => {
    it('에러가 발생한다', async () => {
      await expect(
        sut.execute('123e4567-e89b-12d3-a456-426614174000', {
          id: testMember.id,
          role: testMember.role,
          isAdmin: false,
        })
      ).rejects.toThrow(ArticleCommentNotFoundException);
    });
  });

  describe('다른 사용자(USER)가 댓글을 삭제하면', () => {
    it('에러가 발생한다', async () => {
      await expect(
        sut.execute(testComment.id, {
          id: otherMember.id,
          role: otherMember.role,
          isAdmin: false,
        })
      ).rejects.toThrow(CannotDeleteArticleCommentException);
    });
  });

  describe('ADMIN이 다른 사용자의 댓글을 삭제하면', () => {
    it('댓글이 삭제된다', async () => {
      await sut.execute(testComment.id, {
        id: adminMember.id,
        role: adminMember.role,
        isAdmin: true,
      });

      const deletedComment = await prisma.articleComment.findUnique({
        where: { id: testComment.id },
      });
      expect(deletedComment).not.toBeNull();
    });
  });

  describe('답글이 있는 댓글을 삭제하면', () => {
    it('댓글만 삭제된다 (답글은 삭제되지 않는다)', async () => {
      const reply = await createTestReply(prisma, {
        articleId: testArticle.id,
        authorId: otherMember.id,
        parentId: testComment.id,
      });

      await sut.execute(testComment.id, {
        id: testMember.id,
        role: testMember.role,
        isAdmin: false,
      });

      const deletedComment = await prisma.articleComment.findUnique({
        where: { id: testComment.id },
      });
      const deletedReply = await prisma.articleComment.findUnique({
        where: { id: reply.id },
      });

      expect(deletedComment).not.toBeNull();
      expect(deletedReply).not.toBeNull();
    });
  });

  describe('댓글 작성자가 자신의 댓글을 삭제하면', () => {
    it('댓글이 삭제된다', async () => {
      const commentId = testComment.id;

      await sut.execute(commentId, {
        id: testMember.id,
        role: testMember.role,
        isAdmin: false,
      });

      const deletedComment = await prisma.articleComment.findUnique({
        where: { id: commentId },
      });
      expect(deletedComment).not.toBeNull();
    });
  });
});
