"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const swagger_1 = require("@nestjs/swagger");
const throttler_1 = require("@nestjs/throttler");
const swagger_example_response_1 = require("../swagger/swagger-example.response");
const login_default_dto_1 = require("./dto/login-default.dto");
const login_response_dto_1 = require("./dto/login-response.dto");
const class_transformer_1 = require("class-transformer");
const refresh_token_dto_1 = require("./dto/refresh-token.dto");
const token_response_dto_1 = require("./dto/token-response.dto");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async loginDefault(loginDefaultDto) {
        const currentUser = await this.authService.validateUser(loginDefaultDto);
        const result = await this.authService.login(currentUser);
        return {
            data: (0, class_transformer_1.plainToInstance)(login_response_dto_1.LoginResponseDto, result, {
                excludeExtraneousValues: true,
            }),
        };
    }
    async refreshToken(refreshTokenDto) {
        const result = await this.authService.refreshToken(refreshTokenDto);
        return {
            data: (0, class_transformer_1.plainToInstance)(login_response_dto_1.LoginResponseDto, result, {
                excludeExtraneousValues: true,
            }),
        };
    }
    async validateToken(req) {
        const accessToken = req.headers.authorization;
        const result = await this.authService.validateToken(accessToken.split(' ')[1]);
        return {
            data: (0, class_transformer_1.plainToInstance)(token_response_dto_1.TokenResponseDto, result, {
                excludeExtraneousValues: true,
            }),
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, throttler_1.Throttle)({ default: { limit: 3, ttl: 60000 } }),
    (0, common_1.Post)('login'),
    (0, swagger_example_response_1.CreateSwaggerExample)(login_default_dto_1.LoginDefaultDto, login_response_dto_1.LoginResponseDto, false, 'Login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_default_dto_1.LoginDefaultDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginDefault", null);
__decorate([
    (0, throttler_1.Throttle)({ default: { limit: 3, ttl: 60000 } }),
    (0, common_1.Post)('refresh'),
    (0, swagger_example_response_1.CreateSwaggerExample)(refresh_token_dto_1.RefreshTokenDto, login_response_dto_1.LoginResponseDto, false, 'Refresh Token'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, throttler_1.Throttle)({ default: { limit: 3, ttl: 60000 } }),
    (0, common_1.Get)('validate'),
    (0, swagger_example_response_1.DetailSwaggerExample)(token_response_dto_1.TokenResponseDto),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "validateToken", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('Auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map