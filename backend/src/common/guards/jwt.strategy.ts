import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { UnauthorizedException } from '../exception/types/unauthorized.exception';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_ACCESS') || '',
    });
  }

  async validate(req: Request, payload: any) {
    const user = await this.userService.findOne({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    // TODO: Uncomment this code When want to use cache

    // const accessTokenKeyCache = `accessToken_${user?.id}`;
    // const getCache = await this.cacheManager.get(accessTokenKeyCache);

    payload = {
      ...payload,
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };

    return payload;
  }
}
