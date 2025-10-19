import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSeriesDto, ResponseCreateSeriesDto } from '@/features/series/dto/create-series.dto';
import { UpdateSeriesDto } from '@/features/series/dto/update-series.dto';
import { GetSeriesListDto, ResponseGetSeriesListDto } from '@/features/series/dto/get-series-list.dto';
import { CreateSeriesUseCase } from '@/features/series/use-case/create-series.use-case';
import { UpdateSeriesUseCase } from '@/features/series/use-case/update-series.use-case';
import { DeleteSeriesUseCase } from '@/features/series/use-case/delete-series.use-case';
import { GetSeriesListQuery } from '@/features/series/query/get-series-list.query';
import { GetSeriesDetailQuery } from '@/features/series/query/get-series-detail.query';
import * as Swagger from '@/features/series/swagger/series.swagger';
import { MemberRoles } from '@/common/decorator/member-role.decorator';
import { MEMBER_ROLE, API_ENDPOINTS } from '@imkdw-dev/consts';
import { Public } from '@/common/decorator/public.decorator';
import { SeriesDetailDto } from '@/features/series/dto/get-series-detail.dto';

const { GET_SERIES_LIST, GET_SERIES_DETAIL, CREATE_SERIES, UPDATE_SERIES, DELETE_SERIES } = API_ENDPOINTS;

@ApiTags('시리즈')
@Controller()
@MemberRoles(MEMBER_ROLE.ADMIN)
export class SeriesController {
  constructor(
    private readonly createSeriesUseCase: CreateSeriesUseCase,
    private readonly updateSeriesUseCase: UpdateSeriesUseCase,
    private readonly deleteSeriesUseCase: DeleteSeriesUseCase,
    private readonly getSeriesListQuery: GetSeriesListQuery,
    private readonly getSeriesDetailQuery: GetSeriesDetailQuery
  ) {}

  @Swagger.getSeriesList('시리즈 목록 조회')
  @Public()
  @Get(GET_SERIES_LIST)
  async getSeriesList(@Query() query: GetSeriesListDto): Promise<ResponseGetSeriesListDto> {
    return this.getSeriesListQuery.execute(query);
  }

  @Swagger.getSeriesDetail('시리즈 상세 조회')
  @Public()
  @Get(GET_SERIES_DETAIL)
  async getSeriesDetail(@Param('slug') slug: string): Promise<SeriesDetailDto> {
    return this.getSeriesDetailQuery.execute(slug);
  }

  @Swagger.createSeries('시리즈 생성')
  @Post(CREATE_SERIES)
  async create(@Body() dto: CreateSeriesDto): Promise<ResponseCreateSeriesDto> {
    const series = await this.createSeriesUseCase.execute(dto);
    return ResponseCreateSeriesDto.from(series);
  }

  @Swagger.updateSeries('시리즈 수정')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(UPDATE_SERIES)
  async update(@Param('slug') slug: string, @Body() dto: UpdateSeriesDto): Promise<void> {
    await this.updateSeriesUseCase.execute(slug, dto);
  }

  @Swagger.deleteSeries('시리즈 삭제')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(DELETE_SERIES)
  async delete(@Param('slug') slug: string): Promise<void> {
    await this.deleteSeriesUseCase.execute(slug);
  }
}
