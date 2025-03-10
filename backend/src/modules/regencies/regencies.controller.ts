import { RegenciesService } from './regencies.service';
import { CreateRegencyDto } from './dto/create-regency.dto';
import { UpdateRegencyDto } from './dto/update-regency.dto';
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
import { FilteringRegencyDto } from './dto/filtering-regency.dto';
import { PathParameterIdDto } from '../../common/dto/path-parameter.dto';
import { NotFoundException } from '../../common/exception/types/not-found.exception';
import { ResponseRegencyDto } from './dto/response-regency.dto';

@Controller('regencies')
@ApiTags('Regencies')
export class RegenciesController {
  constructor(private readonly regenciesService: RegenciesService) {}

  @Post()
  @CreateSwaggerExample(
    CreateRegencyDto,
    ResponseRegencyDto,
    false,
    'Create Regency',
  )
  async create(
    @Body() createRegencyDto: CreateRegencyDto,
    @Req() req: any,
  ): Promise<BaseSuccessResponse<ResponseRegencyDto>> {
    const result = await this.regenciesService.create(
      createRegencyDto,
      req.user,
    );

    return {
      data: plainToInstance(ResponseRegencyDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Get()
  @ListSwaggerExample(ResponseRegencyDto, 'Menampilkan List Regency', true)
  async findAll(
    @Query() query: FilteringRegencyDto,
  ): Promise<BaseSuccessResponse<ResponseRegencyDto>> {
    const { page = 1, limit = 10 } = query;

    const options = await this.regenciesService.buildQuery(query);

    const [result, total] = await this.regenciesService.findAndCount(options);

    return {
      data: plainToInstance(ResponseRegencyDto, result, {
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
  @DetailSwaggerExample(ResponseRegencyDto, 'Menampilkan Detail Regency')
  async findOne(
    @Param() id: PathParameterIdDto,
  ): Promise<BaseSuccessResponse<ResponseRegencyDto>> {
    const result = await this.regenciesService.findOne({
      where: id,
      relations: this.regenciesService.defaultRelation(),
    });

    if (!result) {
      throw new NotFoundException(`Regency dengan id ${id.id} tidak ditemukan`);
    }

    return {
      data: plainToInstance(ResponseRegencyDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Patch(':id')
  @CreateSwaggerExample(
    UpdateRegencyDto,
    ResponseRegencyDto,
    false,
    'Update Regency',
  )
  async update(
    @Param('id') id: string,
    @Body() updateRegencyDto: UpdateRegencyDto,
    @Req() req: any,
  ): Promise<BaseSuccessResponse<ResponseRegencyDto>> {
    const result = await this.regenciesService.update(
      +id,
      updateRegencyDto,
      req.user,
    );

    return {
      data: plainToInstance(ResponseRegencyDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Delete(':id')
  @DeleteSwaggerExample('Delete Regency')
  @HttpCode(204)
  async remove(
    @Param() id: PathParameterIdDto,
    @Req() req: any,
  ): Promise<void> {
    try {
      await this.regenciesService.remove(id, req.user);
      return;
    } catch (error) {
      throw error;
    }
  }
}
