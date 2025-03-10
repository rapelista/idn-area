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
import { DistrictsService } from './districts.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { ApiTags } from '@nestjs/swagger';
import { BaseSuccessResponse } from '../../common/response/base.response';
import { plainToInstance } from 'class-transformer';
import { FilteringDistrictDto } from './dto/filtering-district.dto';
import { PathParameterIdDto } from '../../common/dto/path-parameter.dto';
import { NotFoundException } from '../../common/exception/types/not-found.exception';
import { ResponseDistrictDto } from './dto/response-district.dto';

@Controller('districts')
@ApiTags('Districts')
export class DistrictsController {
  constructor(private readonly districtsService: DistrictsService) {}

  @Post()
  async create(
    @Body() createDistrictDto: CreateDistrictDto,
    @Req() req: any,
  ): Promise<BaseSuccessResponse<ResponseDistrictDto>> {
    const result = await this.districtsService.create(
      createDistrictDto,
      req.user,
    );

    return {
      data: plainToInstance(ResponseDistrictDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Get()
  async findAll(
    @Query() query: FilteringDistrictDto,
  ): Promise<BaseSuccessResponse<ResponseDistrictDto>> {
    const { page = 1, limit = 10 } = query;
    const options = await this.districtsService.buildQuery(query);
    const [result, total] = await this.districtsService.findAndCount(options);

    return {
      data: plainToInstance(ResponseDistrictDto, result, {
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
  ): Promise<BaseSuccessResponse<ResponseDistrictDto>> {
    const result = await this.districtsService.findOne({
      where: id,
      relations: this.districtsService.defaultRelation(),
    });

    if (!result) {
      throw new NotFoundException(
        `District dengan id ${id.id} tidak ditemukan`,
      );
    }

    return {
      data: plainToInstance(ResponseDistrictDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDistrictDto: UpdateDistrictDto,
    @Req() req: any,
  ): Promise<BaseSuccessResponse<ResponseDistrictDto>> {
    const result = await this.districtsService.update(
      +id,
      updateDistrictDto,
      req.user,
    );

    return {
      data: plainToInstance(ResponseDistrictDto, result, {
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
    await this.districtsService.remove(id, req.user);
    return;
  }
}
