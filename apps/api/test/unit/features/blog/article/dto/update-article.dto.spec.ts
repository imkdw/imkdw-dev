import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { UpdateArticleDto } from '@/features/article/dto/update-article.dto';
import { ARTICLE_MAX_CONTENT_LENGTH, ARTICLE_MAX_TITLE_LENGTH } from '@imkdw-dev/consts';

describe('게시글 수정 DTO', () => {
  describe('제목', () => {
    it('비어있다면 예외가 발생한다', async () => {
      const dto = plainToClass(UpdateArticleDto, {
        title: '',
        content: '내용',
      });
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0]?.property).toBe('title');
    });

    it('최대 글자수를 초과하면 예외가 발생한다', async () => {
      const dto = plainToClass(UpdateArticleDto, {
        title: 'a'.repeat(ARTICLE_MAX_TITLE_LENGTH + 1),
        content: '내용',
      });
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0]?.property).toBe('title');
    });
  });

  describe('내용', () => {
    it('비어있다면 예외가 발생한다', async () => {
      const dto = plainToClass(UpdateArticleDto, {
        title: '제목',
        content: '',
      });
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0]?.property).toBe('content');
    });

    it('최대 글자수를 초과하면 예외가 발생한다', async () => {
      const dto = plainToClass(UpdateArticleDto, {
        title: '제목',
        content: 'a'.repeat(ARTICLE_MAX_CONTENT_LENGTH + 1),
      });
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0]?.property).toBe('content');
    });
  });
});