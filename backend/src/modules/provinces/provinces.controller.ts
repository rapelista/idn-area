import { ProvincesService } from './provinces.service';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateSwaggerExample,
  DeleteSwaggerExample,
  DetailSwaggerExample,
  ListSwaggerExample,
} from '../../common/swagger/swagger-example.response';
import { BaseSuccessResponse } from '../../common/response/base.response';
import { plainToInstance } from 'class-transformer';
import { FilteringProvinceDto } from './dto/filtering-province.dto';
import { PathParameterIdDto } from '../../common/dto/path-parameter.dto';
import { NotFoundException } from '../../common/exception/types/not-found.exception';
import { ResponseProvinceDto } from './dto/response-province.dto';

@Controller('provinces')
@ApiTags('Provinces')
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {}

  @Post()
  @CreateSwaggerExample(
    CreateProvinceDto,
    ResponseProvinceDto,
    false,
    'Create Province',
  )
  async create(
    @Body() createProvinceDto: CreateProvinceDto,
    @Req() req: any,
  ): Promise<BaseSuccessResponse<ResponseProvinceDto>> {
    const result = await this.provincesService.create(
      createProvinceDto,
      req.user,
    );

    return {
      data: plainToInstance(ResponseProvinceDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Get()
  @ListSwaggerExample(ResponseProvinceDto, 'Menampilkan List Province', true)
  async findAll(
    @Query() query: FilteringProvinceDto,
  ): Promise<BaseSuccessResponse<ResponseProvinceDto>> {
    const { page = 1, limit = 10 } = query;

    const options = await this.provincesService.queryBuilder(query);

    const [result, total] = await this.provincesService.findAndCount(options);

    return {
      data: plainToInstance(ResponseProvinceDto, result, {
        excludeExtraneousValues: true,
      }),
      meta: {
        page,
        totalData: total,
        totalPage: Math.ceil(total / limit),
      },
    };
  }

  @Get(':id')
  @DetailSwaggerExample(ResponseProvinceDto, 'Menampilkan Detail Province')
  async findOne(
    @Param() id: PathParameterIdDto,
  ): Promise<BaseSuccessResponse<ResponseProvinceDto>> {
    const result = await this.provincesService.findOne({
      where: id,
      relations: this.provincesService.defaultRelation(),
    });

    if (!result) {
      throw new NotFoundException(
        `Province dengan id ${id.id} tidak ditemukan`,
      );
    }

    return {
      data: plainToInstance(ResponseProvinceDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Patch(':id')
  @CreateSwaggerExample(
    UpdateProvinceDto,
    ResponseProvinceDto,
    false,
    'Update Province',
  )
  async update(
    @Param('id') id: string,
    @Body() updateProvinceDto: UpdateProvinceDto,
    @Req() req: any,
  ): Promise<BaseSuccessResponse<ResponseProvinceDto>> {
    const result = await this.provincesService.update(
      +id,
      updateProvinceDto,
      req.user,
    );

    return {
      data: plainToInstance(ResponseProvinceDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Delete(':id')
  @DeleteSwaggerExample('Delete Province')
  @HttpCode(204)
  async remove(
    @Param() id: PathParameterIdDto,
    @Req() req: any,
  ): Promise<void> {
    try {
      await this.provincesService.remove(id, req.user);
      return;
    } catch (error) {
      throw error;
    }
  }
}
