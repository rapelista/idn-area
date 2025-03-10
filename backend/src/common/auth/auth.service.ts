import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDefaultDto } from './dto/login-default.dto';
import { User } from '../user/entities/user.entity';
import { UnauthorizedException } from '../exception/types/unauthorized.exception';
import * as bcrypt from 'bcrypt';
import { TokenPayload } from './interfaces/token-payload.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginDefaultDto: LoginDefaultDto) {
    const currentUser = await this.userService.findOne({
      where: {
        username: loginDefaultDto.username,
      },
      relations: [],
    });

    if (!currentUser) {
      throw new UnauthorizedException(
        'invalidCredential',
        'Your credential is invalid.',
      );
    }
    const isMatch = await bcrypt.compare(
      loginDefaultDto.password,
      currentUser.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException(
        'invalidCredential',
        'Your credential is invalid.',
      );
    }
    return currentUser;
  }

  async generateRefreshToken(payload: any) {
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRED'),
      secret: this.configService.get('JWT_SECRET_REFRESH'),
    });
  }

  async login(user: Partial<User>) {
    const payload: TokenPayload = {
      id: user.id ? user.id : 0,
      username: user.username ? user.username : '',
      email: user.email ? user.email : '',
      role: user.role ? user.role : '',
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = await this.generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const refreshToken = refreshTokenDto.refreshToken;
    const payload: TokenPayload = this.jwtService.verify(refreshToken, {
      secret: this.configService.get('JWT_SECRET_REFRESH'),
    });

    const user = await this.userService.findOne({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        'invalidCredential',
        'Your credential is invalid.',
      );
    }

    return await this.login(user);
  }

  async validateToken(accessToken: string) {
    return this.jwtService.verify(accessToken, {
      secret: this.configService.get('JWT_SECRET_ACCESS'),
      ignoreExpiration: false,
    });
  }
}
