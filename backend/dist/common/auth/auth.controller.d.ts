import { AuthService } from './auth.service';
import { LoginDefaultDto } from './dto/login-default.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { BaseSuccessResponse } from '../response/base.response';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { TokenResponseDto } from './dto/token-response.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    loginDefault(loginDefaultDto: LoginDefaultDto): Promise<BaseSuccessResponse<LoginResponseDto>>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<BaseSuccessResponse<LoginResponseDto>>;
    validateToken(req: any): Promise<BaseSuccessResponse<TokenResponseDto>>;
}
