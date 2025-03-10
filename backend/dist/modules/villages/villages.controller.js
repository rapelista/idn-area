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
exports.VillagesController = void 0;
const common_1 = require("@nestjs/common");
const villages_service_1 = require("./villages.service");
const create_village_dto_1 = require("./dto/create-village.dto");
const update_village_dto_1 = require("./dto/update-village.dto");
const filtering_village_dto_1 = require("./dto/filtering-village.dto");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const path_parameter_dto_1 = require("../../common/dto/path-parameter.dto");
const not_found_exception_1 = require("../../common/exception/types/not-found.exception");
const response_village_dto_1 = require("./dto/response-village.dto");
let VillagesController = class VillagesController {
    constructor(villagesService) {
        this.villagesService = villagesService;
    }
    async create(createVillageDto, req) {
        const result = await this.villagesService.create(createVillageDto, req.user);
        return {
            data: (0, class_transformer_1.plainToInstance)(response_village_dto_1.ResponseVillageDto, result, {
                excludeExtraneousValues: true,
            }),
        };
    }
    async findAll(query) {
        const { page = 1, limit = 10 } = query;
        const options = await this.villagesService.queryBuilder(query);
        const [result, total] = await this.villagesService.findAndCount(options);
        return {
            data: (0, class_transformer_1.plainToInstance)(response_village_dto_1.ResponseVillageDto, result, {
                excludeExtraneousValues: true,
            }),
            meta: {
                page,
                totalData: total,
                totalPage: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const result = await this.villagesService.findOne({
            where: id,
            relations: this.villagesService.defaultRelation(),
        });
        if (!result) {
            throw new not_found_exception_1.NotFoundException(`Village dengan id ${id.id} tidak ditemukan`);
        }
        return {
            data: (0, class_transformer_1.plainToInstance)(response_village_dto_1.ResponseVillageDto, result, {
                excludeExtraneousValues: true,
            }),
        };
    }
    async update(id, updateVillageDto, req) {
        const result = await this.villagesService.update(+id, updateVillageDto, req.user);
        return {
            data: (0, class_transformer_1.plainToInstance)(response_village_dto_1.ResponseVillageDto, result, {
                excludeExtraneousValues: true,
            }),
        };
    }
    async remove(id, req) {
        try {
            await this.villagesService.remove(id, req.user);
            return;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.VillagesController = VillagesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_village_dto_1.CreateVillageDto, Object]),
    __metadata("design:returntype", Promise)
], VillagesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filtering_village_dto_1.FilteringVillageDto]),
    __metadata("design:returntype", Promise)
], VillagesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [path_parameter_dto_1.PathParameterIdDto]),
    __metadata("design:returntype", Promise)
], VillagesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_village_dto_1.UpdateVillageDto, Object]),
    __metadata("design:returntype", Promise)
], VillagesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [path_parameter_dto_1.PathParameterIdDto, Object]),
    __metadata("design:returntype", Promise)
], VillagesController.prototype, "remove", null);
exports.VillagesController = VillagesController = __decorate([
    (0, common_1.Controller)('villages'),
    (0, swagger_1.ApiTags)('Villages'),
    __metadata("design:paramtypes", [villages_service_1.VillagesService])
], VillagesController);
//# sourceMappingURL=villages.controller.js.map