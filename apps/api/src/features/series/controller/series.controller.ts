import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSeriesDto, ResponseCreateSeriesDto } from '@/features/series/dto/create-series.dto';
import { UpdateSeriesDto } from '@/features/series/dto/update-series.dto';
import { GetSeriesListDto, ResponseGetSeriesListDto } from '@/features/series/dto/get-series-list.dto';
import { CreateSeriesUseCase } from '@/features/series/use-case/create-series.use-case';
import { UpdateSeriesUseCase } from '@/features/series/use-case/update-series.use-case';
import { GetSeriesListQuery } from '@/features/series/query/get-series-list.query';
import * as Swagger from '@/features/series/swagger/series.swagger';
import { MemberRoles } from '@/common/decorator/member-role.decorator';
import { MEMBER_ROLE } from '@imkdw-dev/consts';
import { Public } from '@/common/decorator/public.decorator';

@ApiTags('시리즈')
@Controller('series')
@MemberRoles(MEMBER_ROLE.ADMIN)
export class SeriesController {
  constructor(
    private readonly createSeriesUseCase: CreateSeriesUseCase,
    private readonly updateSeriesUseCase: UpdateSeriesUseCase,
    private readonly getSeriesListQuery: GetSeriesListQuery
  ) {}

  @Swagger.getSeriesList('시리즈 목록 조회')
  @Public()
  @Get()
  async getSeriesList(@Query() query: GetSeriesListDto): Promise<ResponseGetSeriesListDto> {
    return this.getSeriesListQuery.execute(query);
  }

  @Swagger.createSeries('시리즈 생성')
  @Post()
  async create(@Body() dto: CreateSeriesDto): Promise<ResponseCreateSeriesDto> {
    const series = await this.createSeriesUseCase.execute(dto);
    return ResponseCreateSeriesDto.from(series);
  }

  @Swagger.updateSeries('시리즈 수정')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateSeriesDto): Promise<void> {
    await this.updateSeriesUseCase.execute(id, dto);
  }
}
