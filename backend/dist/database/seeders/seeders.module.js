"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedersModule = void 0;
const common_1 = require("@nestjs/common");
const seeders_service_1 = require("./seeders.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../common/user/entities/user.entity");
const province_entity_1 = require("../../modules/provinces/entities/province.entity");
const regency_entity_1 = require("../../modules/regencies/entities/regency.entity");
const district_entity_1 = require("../../modules/districts/entities/district.entity");
const village_entity_1 = require("../../modules/villages/entities/village.entity");
const island_entity_1 = require("../../modules/islands/entities/island.entity");
let SeedersModule = class SeedersModule {
};
exports.SeedersModule = SeedersModule;
exports.SeedersModule = SeedersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                province_entity_1.Province,
                regency_entity_1.Regency,
                district_entity_1.District,
                village_entity_1.Village,
                island_entity_1.Island,
            ]),
        ],
        providers: [seeders_service_1.SeedersService],
        exports: [seeders_service_1.SeedersService],
    })
], SeedersModule);
//# sourceMappingURL=seeders.module.js.map