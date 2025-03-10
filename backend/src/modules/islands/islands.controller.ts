import { IslandsService } from './islands.service';
import { CreateIslandDto } from './dto/create-island.dto';
import { UpdateIslandDto } from './dto/update-island.dto';
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
import { FilteringIslandDto } from './dto/filtering-island.dto';
import { PathParameterIdDto } from '../../common/dto/path-parameter.dto';
import { NotFoundException } from '../../common/exception/types/not-found.exception';
import { ResponseIslandDto } from './dto/response-island.dto';

@Controller('islands')
@ApiTags('Islands')
export class IslandsController {
  constructor(private readonly islandsService: IslandsService) {}

  @Post()
  @CreateSwaggerExample(
    CreateIslandDto,
    ResponseIslandDto,
    false,
    'Create Island',
  )
  async create(
    @Body() createIslandDto: CreateIslandDto,
    @Req() req: any,
  ): Promise<BaseSuccessResponse<ResponseIslandDto>> {
    const result = await this.islandsService.create(createIslandDto, req.user);

    return {
      data: plainToInstance(ResponseIslandDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Get()
  @ListSwaggerExample(ResponseIslandDto, 'Menampilkan List Island', true)
  async findAll(
    @Query() query: FilteringIslandDto,
  ): Promise<BaseSuccessResponse<ResponseIslandDto>> {
    const { page = 1, limit = 10 } = query;

    const options = await this.islandsService.buildQuery(query);

    const [result, total] = await this.islandsService.findAndCount(options);

    return {
      data: plainToInstance(ResponseIslandDto, result, {
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
  @DetailSwaggerExample(ResponseIslandDto, 'Menampilkan Detail Island')
  async findOne(
    @Param() id: PathParameterIdDto,
  ): Promise<BaseSuccessResponse<ResponseIslandDto>> {
    const result = await this.islandsService.findOne({
      where: id,
      relations: this.islandsService.defaultRelation(),
    });

    if (!result) {
      throw new NotFoundException(`Island dengan id ${id.id} tidak ditemukan`);
    }

    return {
      data: plainToInstance(ResponseIslandDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Patch(':id')
  @CreateSwaggerExample(
    UpdateIslandDto,
    ResponseIslandDto,
    false,
    'Update Island',
  )
  async update(
    @Param('id') id: string,
    @Body() updateIslandDto: UpdateIslandDto,
    @Req() req: any,
  ): Promise<BaseSuccessResponse<ResponseIslandDto>> {
    const result = await this.islandsService.update(
      +id,
      updateIslandDto,
      req.user,
    );

    return {
      data: plainToInstance(ResponseIslandDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Delete(':id')
  @DeleteSwaggerExample('Delete Island')
  @HttpCode(204)
  async remove(
    @Param() id: PathParameterIdDto,
    @Req() req: any,
  ): Promise<void> {
    try {
      await this.islandsService.remove(id, req.user);
      return;
    } catch (error) {
      throw error;
    }
  }
}
