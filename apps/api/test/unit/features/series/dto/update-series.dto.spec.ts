import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { UpdateSeriesDto } from '@/features/series/dto/update-series.dto';
import { SERIES_MAX_TITLE_LENGTH } from '@imkdw-dev/consts';

describe('시리즈 수정 DTO', () => {
  describe('제목', () => {
    it('비어있다면 예외가 발생한다', async () => {
      const dto = plainToClass(UpdateSeriesDto, {
        title: '',
      });
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0]?.property).toBe('title');
    });

    it('최대 글자수를 초과하면 예외가 발생한다', async () => {
      const dto = plainToClass(UpdateSeriesDto, {
        title: 'a'.repeat(SERIES_MAX_TITLE_LENGTH + 1),
      });
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0]?.property).toBe('title');
    });
  });

});
