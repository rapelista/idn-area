import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  HttpCode,
} from '@nestjs/common';
import { VillagesService } from './villages.service';
import { CreateVillageDto } from './dto/create-village.dto';
import { UpdateVillageDto } from './dto/update-village.dto';
import { FilteringVillageDto } from './dto/filtering-village.dto';
import { ApiTags } from '@nestjs/swagger';
import { BaseSuccessResponse } from '../../common/response/base.response';
import { plainToInstance } from 'class-transformer';
import { PathParameterIdDto } from '../../common/dto/path-parameter.dto';
import { NotFoundException } from '../../common/exception/types/not-found.exception';
import { ResponseVillageDto } from './dto/response-village.dto';

@Controller('villages')
@ApiTags('Villages')
export class VillagesController {
  constructor(private readonly villagesService: VillagesService) {}

  @Post()
  async create(
    @Body() createVillageDto: CreateVillageDto,
    @Req() req: any,
  ): Promise<BaseSuccessResponse<ResponseVillageDto>> {
    const result = await this.villagesService.create(
      createVillageDto,
      req.user,
    );

    return {
      data: plainToInstance(ResponseVillageDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Get()
  async findAll(
    @Query() query: FilteringVillageDto,
  ): Promise<BaseSuccessResponse<ResponseVillageDto>> {
    const { page = 1, limit = 10 } = query;

    const options = await this.villagesService.queryBuilder(query);
    const [result, total] = await this.villagesService.findAndCount(options);

    return {
      data: plainToInstance(ResponseVillageDto, result, {
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
  async findOne(
    @Param() id: PathParameterIdDto,
  ): Promise<BaseSuccessResponse<ResponseVillageDto>> {
    const result = await this.villagesService.findOne({
      where: id,
      relations: this.villagesService.defaultRelation(),
    });

    if (!result) {
      throw new NotFoundException(`Village dengan id ${id.id} tidak ditemukan`);
    }

    return {
      data: plainToInstance(ResponseVillageDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVillageDto: UpdateVillageDto,
    @Req() req: any,
  ): Promise<BaseSuccessResponse<ResponseVillageDto>> {
    const result = await this.villagesService.update(
      +id,
      updateVillageDto,
      req.user,
    );

    return {
      data: plainToInstance(ResponseVillageDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Param() id: PathParameterIdDto,
    @Req() req: any,
  ): Promise<void> {
    try {
      await this.villagesService.remove(id, req.user);
      return;
    } catch (error) {
      throw error;
    }
  }
}
