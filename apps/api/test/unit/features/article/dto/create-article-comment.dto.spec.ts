import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CreateArticleCommentDto } from '@/features/article/dto/create-article-comment.dto';

describe('댓글 생성 DTO', () => {
  describe('content', () => {
    it('비어있다면 예외가 발생한다', async () => {
      const dto = plainToClass(CreateArticleCommentDto, { content: '' });
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0]?.property).toBe('content');
    });

    it('null이면 예외가 발생한다', async () => {
      const dto = plainToClass(CreateArticleCommentDto, { content: null });
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0]?.property).toBe('content');
    });

    it('undefined면 예외가 발생한다', async () => {
      const dto = plainToClass(CreateArticleCommentDto, {});
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0]?.property).toBe('content');
    });

    it('정상적인 내용이면 통과한다', async () => {
      const dto = plainToClass(CreateArticleCommentDto, { content: '정상적인 댓글 내용입니다.' });
      const errors = await validate(dto);

      const contentErrors = errors.filter(error => error.property === 'content');
      expect(contentErrors).toHaveLength(0);
    });
  });
});
