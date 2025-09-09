import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { UpdateArticleDto } from '@/features/article/dto/update-article.dto';
import { ARTICLE_MAX_CONTENT_LENGTH, ARTICLE_MAX_TITLE_LENGTH, ARTICLE_MAX_TAGS } from '@imkdw-dev/consts';

describe('게시글 수정 DTO', () => {
  describe('제목', () => {
    it('비어있다면 예외가 발생한다', async () => {
      const dto = plainToClass(UpdateArticleDto, {
        title: '',
        content: '내용',
        seriesId: '123e4567-e89b-12d3-a456-426614174000',
        tags: ['JavaScript'],
      });
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0]?.property).toBe('title');
    });

    it('최대 글자수를 초과하면 예외가 발생한다', async () => {
      const dto = plainToClass(UpdateArticleDto, {
        title: 'a'.repeat(ARTICLE_MAX_TITLE_LENGTH + 1),
        content: '내용',
        seriesId: '123e4567-e89b-12d3-a456-426614174000',
        tags: ['JavaScript'],
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
        seriesId: '123e4567-e89b-12d3-a456-426614174000',
        tags: ['JavaScript'],
      });
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0]?.property).toBe('content');
    });

    it('최대 글자수를 초과하면 예외가 발생한다', async () => {
      const dto = plainToClass(UpdateArticleDto, {
        title: '제목',
        content: 'a'.repeat(ARTICLE_MAX_CONTENT_LENGTH + 1),
        seriesId: '123e4567-e89b-12d3-a456-426614174000',
        tags: ['JavaScript'],
      });
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0]?.property).toBe('content');
    });
  });

  describe('시리즈 ID', () => {
    it('비어있다면 예외가 발생한다', async () => {
      const dto = plainToClass(UpdateArticleDto, {
        title: '제목',
        content: '내용',
        seriesId: '',
        tags: ['JavaScript'],
      });
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(error => error.property === 'seriesId')).toBe(true);
    });

    it('null이면 예외가 발생한다', async () => {
      const dto = plainToClass(UpdateArticleDto, {
        title: '제목',
        content: '내용',
        seriesId: null,
        tags: ['JavaScript'],
      });
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(error => error.property === 'seriesId')).toBe(true);
    });
  });

  describe('태그', () => {
    it('배열이 아니면 예외가 발생한다', async () => {
      const dto = plainToClass(UpdateArticleDto, {
        title: '제목',
        content: '내용',
        seriesId: '123e4567-e89b-12d3-a456-426614174000',
        tags: 'not-an-array',
      });
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(error => error.property === 'tags')).toBe(true);
    });

    it('최대 개수를 초과하면 예외가 발생한다', async () => {
      const dto = plainToClass(UpdateArticleDto, {
        title: '제목',
        content: '내용',
        seriesId: '123e4567-e89b-12d3-a456-426614174000',
        tags: Array.from({ length: ARTICLE_MAX_TAGS + 1 }, (_, i) => `Tag${i + 1}`),
      });
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(error => error.property === 'tags')).toBe(true);
    });

    it('빈 배열이면 유효하다', async () => {
      const dto = plainToClass(UpdateArticleDto, {
        title: '제목',
        content: '내용',
        seriesId: '123e4567-e89b-12d3-a456-426614174000',
        tags: [],
      });
      const errors = await validate(dto);

      expect(errors.some(error => error.property === 'tags')).toBe(false);
    });

    it('정확한 개수의 태그면 유효하다', async () => {
      const dto = plainToClass(UpdateArticleDto, {
        title: '제목',
        content: '내용',
        seriesId: '123e4567-e89b-12d3-a456-426614174000',
        tags: ['JavaScript', 'React', 'TypeScript', 'NestJS'],
      });
      const errors = await validate(dto);

      expect(errors.some(error => error.property === 'tags')).toBe(false);
    });
  });
});
