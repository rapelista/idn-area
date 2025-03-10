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
exports.LocationsController = void 0;
const common_1 = require("@nestjs/common");
const locations_service_1 = require("./locations.service");
const create_location_dto_1 = require("./dto/create-location.dto");
const update_location_dto_1 = require("./dto/update-location.dto");
const filtering_location_dto_1 = require("./dto/filtering-location.dto");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const path_parameter_dto_1 = require("../../common/dto/path-parameter.dto");
const not_found_exception_1 = require("../../common/exception/types/not-found.exception");
const response_location_dto_1 = require("./dto/response-location.dto");
let LocationsController = class LocationsController {
    constructor(locationsService) {
        this.locationsService = locationsService;
    }
    async create(createLocationDto, req) {
        const result = await this.locationsService.create(createLocationDto, req.user);
        return {
            data: (0, class_transformer_1.plainToInstance)(response_location_dto_1.ResponseLocationDto, result, {
                excludeExtraneousValues: true,
            }),
        };
    }
    async findAll(query) {
        const { page = 1, limit = 10 } = query;
        const options = await this.locationsService.queryBuilder(query);
        const [result, total] = await this.locationsService.findAndCount(options);
        return {
            data: (0, class_transformer_1.plainToInstance)(response_location_dto_1.ResponseLocationDto, result, {
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
        const result = await this.locationsService.findOne({
            where: id,
            relations: this.locationsService.defaultRelation(),
        });
        if (!result) {
            throw new not_found_exception_1.NotFoundException(`Location dengan id ${id.id} tidak ditemukan`);
        }
        return {
            data: (0, class_transformer_1.plainToInstance)(response_location_dto_1.ResponseLocationDto, result, {
                excludeExtraneousValues: true,
            }),
        };
    }
    async update(id, updateLocationDto, req) {
        const result = await this.locationsService.update(+id, updateLocationDto, req.user);
        return {
            data: (0, class_transformer_1.plainToInstance)(response_location_dto_1.ResponseLocationDto, result, {
                excludeExtraneousValues: true,
            }),
        };
    }
    async remove(id, req) {
        try {
            await this.locationsService.remove(id, req.user);
            return;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.LocationsController = LocationsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_location_dto_1.CreateLocationDto, Object]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filtering_location_dto_1.FilteringLocationDto]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [path_parameter_dto_1.PathParameterIdDto]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_location_dto_1.UpdateLocationDto, Object]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [path_parameter_dto_1.PathParameterIdDto, Object]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "remove", null);
exports.LocationsController = LocationsController = __decorate([
    (0, common_1.Controller)('locations'),
    (0, swagger_1.ApiTags)('Locations'),
    __metadata("design:paramtypes", [locations_service_1.LocationsService])
], LocationsController);
//# sourceMappingURL=locations.controller.js.map