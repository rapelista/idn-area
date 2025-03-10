"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const unauthorized_exception_1 = require("../exception/types/unauthorized.exception");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    async canActivate(context) {
        const canActivate = await super.canActivate(context);
        if (!canActivate) {
            throw new unauthorized_exception_1.UnauthorizedException();
        }
        return true;
    }
    handleRequest(err, user, info) {
        if (info instanceof jwt_1.TokenExpiredError) {
            throw new unauthorized_exception_1.UnauthorizedException('expiredCredential', 'Your credentials have expired.');
        }
        else if (info instanceof jwt_1.JsonWebTokenError) {
            throw new unauthorized_exception_1.UnauthorizedException('invalidCredential', 'Your credentials is invalid.');
        }
        else if (err || !user) {
            throw new unauthorized_exception_1.UnauthorizedException();
        }
        return user;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map