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
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilteringUserDto } from './dto/filtering-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { BaseSuccessResponse } from '../../common/response/base.response';
import { plainToInstance } from 'class-transformer';
import { PathParameterIdDto } from '../../common/dto/path-parameter.dto';
import { NotFoundException } from '../../common/exception/types/not-found.exception';
import { ResponseUserDto } from './dto/response-user.dto';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Req() req: any,
  ): Promise<BaseSuccessResponse<ResponseUserDto>> {
    const result = await this.userService.create(createUserDto, req.user);

    return {
      data: plainToInstance(ResponseUserDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Get()
  async findAll(
    @Query() query: FilteringUserDto,
  ): Promise<BaseSuccessResponse<ResponseUserDto>> {
    const { page = 1, limit = 10 } = query;

    const options = await this.userService.queryBuilder(query);
    const [result, total] = await this.userService.findAndCount(options);

    return {
      data: plainToInstance(ResponseUserDto, result, {
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
  ): Promise<BaseSuccessResponse<ResponseUserDto>> {
    const result = await this.userService.findOne({
      where: id,
    });

    if (!result) {
      throw new NotFoundException(`User dengan id ${id.id} tidak ditemukan`);
    }

    return {
      data: plainToInstance(ResponseUserDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: any,
  ): Promise<BaseSuccessResponse<ResponseUserDto>> {
    const result = await this.userService.update(+id, updateUserDto, req.user);

    return {
      data: plainToInstance(ResponseUserDto, result, {
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
      await this.userService.remove(id, req.user);
      return;
    } catch (error) {
      throw error;
    }
  }
}
