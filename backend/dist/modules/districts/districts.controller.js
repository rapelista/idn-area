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
exports.DistrictsController = void 0;
const common_1 = require("@nestjs/common");
const districts_service_1 = require("./districts.service");
const create_district_dto_1 = require("./dto/create-district.dto");
const update_district_dto_1 = require("./dto/update-district.dto");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const filtering_district_dto_1 = require("./dto/filtering-district.dto");
const path_parameter_dto_1 = require("../../common/dto/path-parameter.dto");
const not_found_exception_1 = require("../../common/exception/types/not-found.exception");
const response_district_dto_1 = require("./dto/response-district.dto");
let DistrictsController = class DistrictsController {
    constructor(districtsService) {
        this.districtsService = districtsService;
    }
    async create(createDistrictDto, req) {
        const result = await this.districtsService.create(createDistrictDto, req.user);
        return {
            data: (0, class_transformer_1.plainToInstance)(response_district_dto_1.ResponseDistrictDto, result, {
                excludeExtraneousValues: true,
            }),
        };
    }
    async findAll(query) {
        const { page = 1, limit = 10 } = query;
        const options = await this.districtsService.buildQuery(query);
        const [result, total] = await this.districtsService.findAndCount(options);
        return {
            data: (0, class_transformer_1.plainToInstance)(response_district_dto_1.ResponseDistrictDto, result, {
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
        const result = await this.districtsService.findOne({
            where: id,
            relations: this.districtsService.defaultRelation(),
        });
        if (!result) {
            throw new not_found_exception_1.NotFoundException(`District dengan id ${id.id} tidak ditemukan`);
        }
        return {
            data: (0, class_transformer_1.plainToInstance)(response_district_dto_1.ResponseDistrictDto, result, {
                excludeExtraneousValues: true,
            }),
        };
    }
    async update(id, updateDistrictDto, req) {
        const result = await this.districtsService.update(+id, updateDistrictDto, req.user);
        return {
            data: (0, class_transformer_1.plainToInstance)(response_district_dto_1.ResponseDistrictDto, result, {
                excludeExtraneousValues: true,
            }),
        };
    }
    async remove(id, req) {
        await this.districtsService.remove(id, req.user);
        return;
    }
};
exports.DistrictsController = DistrictsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_district_dto_1.CreateDistrictDto, Object]),
    __metadata("design:returntype", Promise)
], DistrictsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filtering_district_dto_1.FilteringDistrictDto]),
    __metadata("design:returntype", Promise)
], DistrictsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [path_parameter_dto_1.PathParameterIdDto]),
    __metadata("design:returntype", Promise)
], DistrictsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_district_dto_1.UpdateDistrictDto, Object]),
    __metadata("design:returntype", Promise)
], DistrictsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [path_parameter_dto_1.PathParameterIdDto, Object]),
    __metadata("design:returntype", Promise)
], DistrictsController.prototype, "remove", null);
exports.DistrictsController = DistrictsController = __decorate([
    (0, common_1.Controller)('districts'),
    (0, swagger_1.ApiTags)('Districts'),
    __metadata("design:paramtypes", [districts_service_1.DistrictsService])
], DistrictsController);
//# sourceMappingURL=districts.controller.js.map