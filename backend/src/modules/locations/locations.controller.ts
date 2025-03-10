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
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { FilteringLocationDto } from './dto/filtering-location.dto';
import { ApiTags } from '@nestjs/swagger';
import { BaseSuccessResponse } from '../../common/response/base.response';
import { plainToInstance } from 'class-transformer';
import { PathParameterIdDto } from '../../common/dto/path-parameter.dto';
import { NotFoundException } from '../../common/exception/types/not-found.exception';
import { ResponseLocationDto } from './dto/response-location.dto';

@Controller('locations')
@ApiTags('Locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  async create(
    @Body() createLocationDto: CreateLocationDto,
    @Req() req: any,
  ): Promise<BaseSuccessResponse<ResponseLocationDto>> {
    const result = await this.locationsService.create(
      createLocationDto,
      req.user,
    );

    return {
      data: plainToInstance(ResponseLocationDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Get()
  async findAll(
    @Query() query: FilteringLocationDto,
  ): Promise<BaseSuccessResponse<ResponseLocationDto>> {
    const { page = 1, limit = 10 } = query;

    const options = await this.locationsService.queryBuilder(query);
    const [result, total] = await this.locationsService.findAndCount(options);

    return {
      data: plainToInstance(ResponseLocationDto, result, {
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
  ): Promise<BaseSuccessResponse<ResponseLocationDto>> {
    const result = await this.locationsService.findOne({
      where: id,
      relations: this.locationsService.defaultRelation(),
    });

    if (!result) {
      throw new NotFoundException(
        `Location dengan id ${id.id} tidak ditemukan`,
      );
    }

    return {
      data: plainToInstance(ResponseLocationDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
    @Req() req: any,
  ): Promise<BaseSuccessResponse<ResponseLocationDto>> {
    const result = await this.locationsService.update(
      +id,
      updateLocationDto,
      req.user,
    );

    return {
      data: plainToInstance(ResponseLocationDto, result, {
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
      await this.locationsService.remove(id, req.user);
      return;
    } catch (error) {
      throw error;
    }
  }
}
