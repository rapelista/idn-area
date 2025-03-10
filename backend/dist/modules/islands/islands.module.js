"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IslandsModule = void 0;
const common_1 = require("@nestjs/common");
const islands_service_1 = require("./islands.service");
const islands_controller_1 = require("./islands.controller");
const typeorm_1 = require("@nestjs/typeorm");
const island_entity_1 = require("./entities/island.entity");
let IslandsModule = class IslandsModule {
};
exports.IslandsModule = IslandsModule;
exports.IslandsModule = IslandsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([island_entity_1.Island])],
        controllers: [islands_controller_1.IslandsController],
        providers: [islands_service_1.IslandsService],
        exports: [islands_service_1.IslandsService],
    })
], IslandsModule);
//# sourceMappingURL=islands.module.js.map