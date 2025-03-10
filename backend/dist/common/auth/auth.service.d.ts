import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDefaultDto } from './dto/login-default.dto';
import { User } from '../user/entities/user.entity';
import { RefreshTokenDto } from './dto/refresh-token.dto';
export declare class AuthService {
    private userService;
    private configService;
    private jwtService;
    constructor(userService: UserService, configService: ConfigService, jwtService: JwtService);
    validateUser(loginDefaultDto: LoginDefaultDto): Promise<User>;
    generateRefreshToken(payload: any): Promise<string>;
    login(user: Partial<User>): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    validateToken(accessToken: string): Promise<any>;
}
