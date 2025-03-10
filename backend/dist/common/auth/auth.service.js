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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const unauthorized_exception_1 = require("../exception/types/unauthorized.exception");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(userService, configService, jwtService) {
        this.userService = userService;
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async validateUser(loginDefaultDto) {
        const currentUser = await this.userService.findOne({
            where: {
                username: loginDefaultDto.username,
            },
            relations: [],
        });
        if (!currentUser) {
            throw new unauthorized_exception_1.UnauthorizedException('invalidCredential', 'Your credential is invalid.');
        }
        const isMatch = await bcrypt.compare(loginDefaultDto.password, currentUser.password);
        if (!isMatch) {
            throw new unauthorized_exception_1.UnauthorizedException('invalidCredential', 'Your credential is invalid.');
        }
        return currentUser;
    }
    async generateRefreshToken(payload) {
        return this.jwtService.sign(payload, {
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRED'),
            secret: this.configService.get('JWT_SECRET_REFRESH'),
        });
    }
    async login(user) {
        const payload = {
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
    async refreshToken(refreshTokenDto) {
        const refreshToken = refreshTokenDto.refreshToken;
        const payload = this.jwtService.verify(refreshToken, {
            secret: this.configService.get('JWT_SECRET_REFRESH'),
        });
        const user = await this.userService.findOne({
            where: {
                id: payload.id,
            },
        });
        if (!user) {
            throw new unauthorized_exception_1.UnauthorizedException('invalidCredential', 'Your credential is invalid.');
        }
        return await this.login(user);
    }
    async validateToken(accessToken) {
        return this.jwtService.verify(accessToken, {
            secret: this.configService.get('JWT_SECRET_ACCESS'),
            ignoreExpiration: false,
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        config_1.ConfigService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map