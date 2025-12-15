import { UpdateArticleCommentUseCase } from '@/features/article/use-case/update-article-comment.use-case';
import { ArticleCommentValidator } from '@/shared/validator/article-comment.validator';
import { ArticleCommentRepository } from '@/shared/repository/article-comment/article-comment.repository';
import { UpdateArticleCommentDto } from '@/features/article/dto/update-article-comment.dto';
import { ArticleCommentNotFoundException } from '@/features/article/exception/article-comment-not-found.exception';
import { CannotUpdateArticleCommentException } from '@/features/article/exception/cannot-update-article-comment.exception';
import { createTestArticle } from '@test/integration/helpers/article.helper';
import { createTestMember } from '@test/integration/helpers/member.helper';
import { createTestSeries } from '@test/integration/helpers/series.helper';
import { createTestComment } from '@test/integration/helpers/article-comment.helper';
import { IntegrationTestHelper } from '@test/integration/helpers/integration-test.helper';
import { PrismaService } from '@/infra/database/prisma.service';
import { MEMBER_ROLE } from '@imkdw-dev/consts';
import type { Article, Member, Series, ArticleComment } from '@prisma/client';

describe('게시글 댓글 수정 유스케이스', () => {
  let testHelper: IntegrationTestHelper;
  let sut: UpdateArticleCommentUseCase;
  let prisma: PrismaService;
  let testSeries: Series;
  let testArticle: Article;
  let testMember: Member;
  let otherMember: Member;
  let adminMember: Member;
  let testComment: ArticleComment;

  beforeAll(async () => {
    testHelper = new IntegrationTestHelper([
      UpdateArticleCommentUseCase,
      ArticleCommentValidator,
      ArticleCommentRepository,
    ]);
    await testHelper.setup();
  });

  beforeEach(async () => {
    sut = testHelper.getService(UpdateArticleCommentUseCase);
    await testHelper.startTransaction();
    prisma = testHelper.getPrisma();

    testSeries = await createTestSeries(prisma);
    testArticle = await createTestArticle(prisma, { seriesId: testSeries.id });
    testMember = await createTestMember(prisma);
    otherMember = await createTestMember(prisma);
    adminMember = await createTestMember(prisma, { role: MEMBER_ROLE.ADMIN });
    testComment = await createTestComment(prisma, {
      articleId: testArticle.id,
      authorId: testMember.id,
    });
  });

  afterEach(() => {
    testHelper.rollbackTransaction();
  });

  describe('존재하지 않는 댓글을 수정하면', () => {
    it('에러가 발생한다', async () => {
      const updateDto: UpdateArticleCommentDto = {
        content: '수정된 댓글 내용',
      };

      await expect(
        sut.execute('123e4567-e89b-12d3-a456-426614174000', updateDto, {
          id: testMember.id,
          role: testMember.role,
          isAdmin: false,
        })
      ).rejects.toThrow(ArticleCommentNotFoundException);
    });
  });

  describe('다른 사용자(USER)가 댓글을 수정하면', () => {
    it('에러가 발생한다', async () => {
      const updateDto: UpdateArticleCommentDto = {
        content: '수정된 댓글 내용',
      };

      await expect(
        sut.execute(testComment.id, updateDto, {
          id: otherMember.id,
          role: otherMember.role,
          isAdmin: false,
        })
      ).rejects.toThrow(CannotUpdateArticleCommentException);
    });
  });

  describe('ADMIN이 다른 사용자의 댓글을 수정하면', () => {
    it('수정 불가능 에러가 발생한다', async () => {
      const updateDto: UpdateArticleCommentDto = {
        content: 'ADMIN이 수정한 댓글 내용',
      };

      await expect(
        sut.execute(testComment.id, updateDto, {
          id: adminMember.id,
          role: adminMember.role,
          isAdmin: true,
        })
      ).rejects.toThrow(CannotUpdateArticleCommentException);
    });
  });

  describe('댓글 작성자가 자신의 댓글을 수정하면', () => {
    it('댓글이 수정된다', async () => {
      const updateDto: UpdateArticleCommentDto = {
        content: '작성자가 수정한 댓글 내용',
      };

      await sut.execute(testComment.id, updateDto, {
        id: testMember.id,
        role: testMember.role,
        isAdmin: false,
      });

      const updatedComment = await prisma.articleComment.findUnique({
        where: { id: testComment.id },
      });
      expect(updatedComment?.content).toBe(updateDto.content);
      expect(updatedComment?.authorId).toBe(testMember.id);
      expect(updatedComment?.articleId).toBe(testArticle.id);
    });
  });
});
