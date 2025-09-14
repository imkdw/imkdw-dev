import { createTestComment, createTestReply } from '@test/fixtures/article-comment.fixture';

describe('ArticleComment', () => {
  describe('답글 작성 가능여부 확인', () => {
    describe('만약 댓글인 경우', () => {
      it('답글 작성이 가능하다', () => {
        const comment = createTestComment();

        const result = comment.canReceiveReply();

        expect(result).toBe(true);
      });
    });

    describe('만약 답글인 경우', () => {
      it('답글 작성이 불가능하다', () => {
        const parentComment = createTestComment();
        const reply = createTestReply(parentComment.id);

        const result = reply.canReceiveReply();

        expect(result).toBe(false);
      });
    });
  });
});
