import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSeriesDto, ResponseCreateSeriesDto } from '@/features/series/dto/create-series.dto';
import { UpdateSeriesDto } from '@/features/series/dto/update-series.dto';
import { SeriesDto } from '@/features/series/dto/series.dto';
import { CreateSeriesUseCase } from '@/features/series/use-case/create-series.use-case';
import { UpdateSeriesUseCase } from '@/features/series/use-case/update-series.use-case';
import { GetSeriesUseCase } from '@/features/series/use-case/get-series.use-case';
import * as Swagger from '@/features/series/swagger/series.swagger';

@ApiTags('Series')
@Controller('series')
export class SeriesController {
  constructor(
    private readonly createSeriesUseCase: CreateSeriesUseCase,
    private readonly updateSeriesUseCase: UpdateSeriesUseCase,
    private readonly getSeriesUseCase: GetSeriesUseCase
  ) {}

  @Swagger.getSeries('시리즈 목록 조회')
  @Get()
  async getAll(): Promise<SeriesDto[]> {
    const seriesList = await this.getSeriesUseCase.execute();
    return SeriesDto.fromArray(seriesList);
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
