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
exports.IslandsController = void 0;
const islands_service_1 = require("./islands.service");
const create_island_dto_1 = require("./dto/create-island.dto");
const update_island_dto_1 = require("./dto/update-island.dto");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const swagger_example_response_1 = require("../../common/swagger/swagger-example.response");
const class_transformer_1 = require("class-transformer");
const filtering_island_dto_1 = require("./dto/filtering-island.dto");
const path_parameter_dto_1 = require("../../common/dto/path-parameter.dto");
const not_found_exception_1 = require("../../common/exception/types/not-found.exception");
const response_island_dto_1 = require("./dto/response-island.dto");
let IslandsController = class IslandsController {
    constructor(islandsService) {
        this.islandsService = islandsService;
    }
    async create(createIslandDto, req) {
        const result = await this.islandsService.create(createIslandDto, req.user);
        return {
            data: (0, class_transformer_1.plainToInstance)(response_island_dto_1.ResponseIslandDto, result, {
                excludeExtraneousValues: true,
            }),
        };
    }
    async findAll(query) {
        const { page = 1, limit = 10 } = query;
        const options = await this.islandsService.buildQuery(query);
        const [result, total] = await this.islandsService.findAndCount(options);
        return {
            data: (0, class_transformer_1.plainToInstance)(response_island_dto_1.ResponseIslandDto, result, {
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
        const result = await this.islandsService.findOne({
            where: id,
            relations: this.islandsService.defaultRelation(),
        });
        if (!result) {
            throw new not_found_exception_1.NotFoundException(`Island dengan id ${id.id} tidak ditemukan`);
        }
        return {
            data: (0, class_transformer_1.plainToInstance)(response_island_dto_1.ResponseIslandDto, result, {
                excludeExtraneousValues: true,
            }),
        };
    }
    async update(id, updateIslandDto, req) {
        const result = await this.islandsService.update(+id, updateIslandDto, req.user);
        return {
            data: (0, class_transformer_1.plainToInstance)(response_island_dto_1.ResponseIslandDto, result, {
                excludeExtraneousValues: true,
            }),
        };
    }
    async remove(id, req) {
        try {
            await this.islandsService.remove(id, req.user);
            return;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.IslandsController = IslandsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_example_response_1.CreateSwaggerExample)(create_island_dto_1.CreateIslandDto, response_island_dto_1.ResponseIslandDto, false, 'Create Island'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_island_dto_1.CreateIslandDto, Object]),
    __metadata("design:returntype", Promise)
], IslandsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_example_response_1.ListSwaggerExample)(response_island_dto_1.ResponseIslandDto, 'Menampilkan List Island', true),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filtering_island_dto_1.FilteringIslandDto]),
    __metadata("design:returntype", Promise)
], IslandsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_example_response_1.DetailSwaggerExample)(response_island_dto_1.ResponseIslandDto, 'Menampilkan Detail Island'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [path_parameter_dto_1.PathParameterIdDto]),
    __metadata("design:returntype", Promise)
], IslandsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_example_response_1.CreateSwaggerExample)(update_island_dto_1.UpdateIslandDto, response_island_dto_1.ResponseIslandDto, false, 'Update Island'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_island_dto_1.UpdateIslandDto, Object]),
    __metadata("design:returntype", Promise)
], IslandsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_example_response_1.DeleteSwaggerExample)('Delete Island'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [path_parameter_dto_1.PathParameterIdDto, Object]),
    __metadata("design:returntype", Promise)
], IslandsController.prototype, "remove", null);
exports.IslandsController = IslandsController = __decorate([
    (0, common_1.Controller)('islands'),
    (0, swagger_1.ApiTags)('Islands'),
    __metadata("design:paramtypes", [islands_service_1.IslandsService])
], IslandsController);
//# sourceMappingURL=islands.controller.js.map