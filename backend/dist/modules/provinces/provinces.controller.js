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
exports.ProvincesController = void 0;
const provinces_service_1 = require("./provinces.service");
const create_province_dto_1 = require("./dto/create-province.dto");
const update_province_dto_1 = require("./dto/update-province.dto");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const swagger_example_response_1 = require("../../common/swagger/swagger-example.response");
const class_transformer_1 = require("class-transformer");
const filtering_province_dto_1 = require("./dto/filtering-province.dto");
const path_parameter_dto_1 = require("../../common/dto/path-parameter.dto");
const not_found_exception_1 = require("../../common/exception/types/not-found.exception");
const response_province_dto_1 = require("./dto/response-province.dto");
let ProvincesController = class ProvincesController {
    constructor(provincesService) {
        this.provincesService = provincesService;
    }
    async create(createProvinceDto, req) {
        const result = await this.provincesService.create(createProvinceDto, req.user);
        return {
            data: (0, class_transformer_1.plainToInstance)(response_province_dto_1.ResponseProvinceDto, result, {
                excludeExtraneousValues: true,
            }),
        };
    }
    async findAll(query) {
        const { page = 1, limit = 10 } = query;
        const options = await this.provincesService.queryBuilder(query);
        const [result, total] = await this.provincesService.findAndCount(options);
        return {
            data: (0, class_transformer_1.plainToInstance)(response_province_dto_1.ResponseProvinceDto, result, {
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
        const result = await this.provincesService.findOne({
            where: id,
            relations: this.provincesService.defaultRelation(),
        });
        if (!result) {
            throw new not_found_exception_1.NotFoundException(`Province dengan id ${id.id} tidak ditemukan`);
        }
        return {
            data: (0, class_transformer_1.plainToInstance)(response_province_dto_1.ResponseProvinceDto, result, {
                excludeExtraneousValues: true,
            }),
        };
    }
    async update(id, updateProvinceDto, req) {
        const result = await this.provincesService.update(+id, updateProvinceDto, req.user);
        return {
            data: (0, class_transformer_1.plainToInstance)(response_province_dto_1.ResponseProvinceDto, result, {
                excludeExtraneousValues: true,
            }),
        };
    }
    async remove(id, req) {
        try {
            await this.provincesService.remove(id, req.user);
            return;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.ProvincesController = ProvincesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_example_response_1.CreateSwaggerExample)(create_province_dto_1.CreateProvinceDto, response_province_dto_1.ResponseProvinceDto, false, 'Create Province'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_province_dto_1.CreateProvinceDto, Object]),
    __metadata("design:returntype", Promise)
], ProvincesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_example_response_1.ListSwaggerExample)(response_province_dto_1.ResponseProvinceDto, 'Menampilkan List Province', true),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filtering_province_dto_1.FilteringProvinceDto]),
    __metadata("design:returntype", Promise)
], ProvincesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_example_response_1.DetailSwaggerExample)(response_province_dto_1.ResponseProvinceDto, 'Menampilkan Detail Province'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [path_parameter_dto_1.PathParameterIdDto]),
    __metadata("design:returntype", Promise)
], ProvincesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_example_response_1.CreateSwaggerExample)(update_province_dto_1.UpdateProvinceDto, response_province_dto_1.ResponseProvinceDto, false, 'Update Province'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_province_dto_1.UpdateProvinceDto, Object]),
    __metadata("design:returntype", Promise)
], ProvincesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_example_response_1.DeleteSwaggerExample)('Delete Province'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [path_parameter_dto_1.PathParameterIdDto, Object]),
    __metadata("design:returntype", Promise)
], ProvincesController.prototype, "remove", null);
exports.ProvincesController = ProvincesController = __decorate([
    (0, common_1.Controller)('provinces'),
    (0, swagger_1.ApiTags)('Provinces'),
    __metadata("design:paramtypes", [provinces_service_1.ProvincesService])
], ProvincesController);
//# sourceMappingURL=provinces.controller.js.map