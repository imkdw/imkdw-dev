import { CreateSeriesDto, ResponseCreateSeriesDto } from '@/features/series/dto/create-series.dto';
import { UpdateSeriesDto } from '@/features/series/dto/update-series.dto';
import { SeriesDto } from '@/features/series/dto/series.dto';
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function getSeries(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiOkResponse({ type: [SeriesDto], description: '시리즈 목록이 성공적으로 조회되었습니다' })
  );
}

export function createSeries(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: CreateSeriesDto }),
    ApiCreatedResponse({ type: ResponseCreateSeriesDto })
  );
}

export function updateSeries(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: UpdateSeriesDto }),
    ApiNoContentResponse({ description: '시리즈가 성공적으로 수정되었습니다' })
  );
}
