import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import {
  CreateSwaggerExample,
  DetailSwaggerExample,
} from '../swagger/swagger-example.response';
import { LoginDefaultDto } from './dto/login-default.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { BaseSuccessResponse } from '../response/base.response';
import { plainToInstance } from 'class-transformer';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { TokenResponseDto } from './dto/token-response.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('login')
  @CreateSwaggerExample(LoginDefaultDto, LoginResponseDto, false, 'Login')
  async loginDefault(
    @Body() loginDefaultDto: LoginDefaultDto,
  ): Promise<BaseSuccessResponse<LoginResponseDto>> {
    const currentUser = await this.authService.validateUser(loginDefaultDto);
    const result = await this.authService.login(currentUser);
    return {
      data: plainToInstance(LoginResponseDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('refresh')
  @CreateSwaggerExample(
    RefreshTokenDto,
    LoginResponseDto,
    false,
    'Refresh Token',
  )
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<BaseSuccessResponse<LoginResponseDto>> {
    const result = await this.authService.refreshToken(refreshTokenDto);
    return {
      data: plainToInstance(LoginResponseDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Get('validate')
  @DetailSwaggerExample(TokenResponseDto)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async validateToken(
    @Request() req: any,
  ): Promise<BaseSuccessResponse<TokenResponseDto>> {
    const accessToken = req.headers.authorization;
    const result = await this.authService.validateToken(
      accessToken.split(' ')[1],
    );
    return {
      data: plainToInstance(TokenResponseDto, result, {
        excludeExtraneousValues: true,
      }),
    };
  }
}
