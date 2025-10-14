import { GetMemberStatsQuery } from '@/features/member/query/get-member-stats.query';
import { MemberValidator } from '@/shared/validator/member.validator';
import { MemberRepository } from '@/shared/repository/member/member.repository';
import { MemberNotFoundException } from '@/features/member/exception/member-not-found.exception';
import { createTestMember } from '@test/integration/helpers/member.helper';
import { createTestComment } from '@test/integration/helpers/article-comment.helper';
import { createTestArticle } from '@test/integration/helpers/article.helper';
import { createTestSeries } from '@test/integration/helpers/series.helper';
import { IntegrationTestHelper } from '@test/integration/helpers/integration-test.helper';
import { PrismaService } from '@/infra/database/prisma.service';
import type { Member } from '@prisma/client';

describe('사용자 활동 통계 조회 쿼리', () => {
  let testHelper: IntegrationTestHelper;
  let sut: GetMemberStatsQuery;
  let prisma: PrismaService;
  let testMember: Member;

  beforeAll(async () => {
    testHelper = new IntegrationTestHelper([GetMemberStatsQuery, MemberValidator, MemberRepository]);
    await testHelper.setup();
  });

  beforeEach(async () => {
    sut = testHelper.getService(GetMemberStatsQuery);
    await testHelper.startTransaction();
    prisma = testHelper.getPrisma();
    testMember = await createTestMember(prisma);
  });

  afterEach(() => {
    testHelper.rollbackTransaction();
  });

  describe('존재하지 않는 사용자를 조회하면', () => {
    it('예외가 발생한다', async () => {
      const nonExistentId = 'non-existent-member-id';
      await expect(sut.execute(nonExistentId)).rejects.toThrow(MemberNotFoundException);
    });
  });

  describe('댓글이 없는 사용자를 조회하면', () => {
    it('작성한 댓글 개수가 0이다', async () => {
      const result = await sut.execute(testMember.id);

      expect(result.commentCount).toBe(0);
    });
  });

  describe('댓글이 있는 사용자를 조회하면', () => {
    beforeEach(async () => {
      const series = await createTestSeries(prisma);
      const article = await createTestArticle(prisma, { seriesId: series.id });

      // 댓글 3개 생성
      await Promise.all([
        createTestComment(prisma, { articleId: article.id, authorId: testMember.id, content: '첫 번째 댓글' }),
        createTestComment(prisma, { articleId: article.id, authorId: testMember.id, content: '두 번째 댓글' }),
        createTestComment(prisma, { articleId: article.id, authorId: testMember.id, content: '세 번째 댓글' }),
      ]);

      // 삭제된 댓글 1개 생성 (댓글 카운트에 포함되지 않음)
      const deletedComment = await createTestComment(prisma, {
        articleId: article.id,
        authorId: testMember.id,
        content: '삭제된 댓글',
        deletedAt: new Date(),
      });

      await prisma.articleComment.update({
        where: { id: deletedComment.id },
        data: { deletedAt: new Date() },
      });
    });

    it('작성한 댓글 개수가 3개이다', async () => {
      const result = await sut.execute(testMember.id);

      expect(result.commentCount).toBe(3);
    });
  });
});
