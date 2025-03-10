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
exports.RegenciesController = void 0;
const regencies_service_1 = require("./regencies.service");
const create_regency_dto_1 = require("./dto/create-regency.dto");
const update_regency_dto_1 = require("./dto/update-regency.dto");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const swagger_example_response_1 = require("../../common/swagger/swagger-example.response");
const class_transformer_1 = require("class-transformer");
const filtering_regency_dto_1 = require("./dto/filtering-regency.dto");
const path_parameter_dto_1 = require("../../common/dto/path-parameter.dto");
const not_found_exception_1 = require("../../common/exception/types/not-found.exception");
const response_regency_dto_1 = require("./dto/response-regency.dto");
let RegenciesController = class RegenciesController {
    constructor(regenciesService) {
        this.regenciesService = regenciesService;
    }
    async create(createRegencyDto, req) {
        const result = await this.regenciesService.create(createRegencyDto, req.user);
        return {
            data: (0, class_transformer_1.plainToInstance)(response_regency_dto_1.ResponseRegencyDto, result, {
                excludeExtraneousValues: true,
            }),
        };
    }
    async findAll(query) {
        const { page = 1, limit = 10 } = query;
        const options = await this.regenciesService.buildQuery(query);
        const [result, total] = await this.regenciesService.findAndCount(options);
        return {
            data: (0, class_transformer_1.plainToInstance)(response_regency_dto_1.ResponseRegencyDto, result, {
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
        const result = await this.regenciesService.findOne({
            where: id,
            relations: this.regenciesService.defaultRelation(),
        });
        if (!result) {
            throw new not_found_exception_1.NotFoundException(`Regency dengan id ${id.id} tidak ditemukan`);
        }
        return {
            data: (0, class_transformer_1.plainToInstance)(response_regency_dto_1.ResponseRegencyDto, result, {
                excludeExtraneousValues: true,
            }),
        };
    }
    async update(id, updateRegencyDto, req) {
        const result = await this.regenciesService.update(+id, updateRegencyDto, req.user);
        return {
            data: (0, class_transformer_1.plainToInstance)(response_regency_dto_1.ResponseRegencyDto, result, {
                excludeExtraneousValues: true,
            }),
        };
    }
    async remove(id, req) {
        try {
            await this.regenciesService.remove(id, req.user);
            return;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.RegenciesController = RegenciesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_example_response_1.CreateSwaggerExample)(create_regency_dto_1.CreateRegencyDto, response_regency_dto_1.ResponseRegencyDto, false, 'Create Regency'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_regency_dto_1.CreateRegencyDto, Object]),
    __metadata("design:returntype", Promise)
], RegenciesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_example_response_1.ListSwaggerExample)(response_regency_dto_1.ResponseRegencyDto, 'Menampilkan List Regency', true),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filtering_regency_dto_1.FilteringRegencyDto]),
    __metadata("design:returntype", Promise)
], RegenciesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_example_response_1.DetailSwaggerExample)(response_regency_dto_1.ResponseRegencyDto, 'Menampilkan Detail Regency'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [path_parameter_dto_1.PathParameterIdDto]),
    __metadata("design:returntype", Promise)
], RegenciesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_example_response_1.CreateSwaggerExample)(update_regency_dto_1.UpdateRegencyDto, response_regency_dto_1.ResponseRegencyDto, false, 'Update Regency'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_regency_dto_1.UpdateRegencyDto, Object]),
    __metadata("design:returntype", Promise)
], RegenciesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_example_response_1.DeleteSwaggerExample)('Delete Regency'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [path_parameter_dto_1.PathParameterIdDto, Object]),
    __metadata("design:returntype", Promise)
], RegenciesController.prototype, "remove", null);
exports.RegenciesController = RegenciesController = __decorate([
    (0, common_1.Controller)('regencies'),
    (0, swagger_1.ApiTags)('Regencies'),
    __metadata("design:paramtypes", [regencies_service_1.RegenciesService])
], RegenciesController);
//# sourceMappingURL=regencies.controller.js.map