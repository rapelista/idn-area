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
exports.ResponseDistrictDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const response_regency_dto_1 = require("../../regencies/dto/response-regency.dto");
const response_province_dto_1 = require("../../provinces/dto/response-province.dto");
class ResponseDistrictDto {
}
exports.ResponseDistrictDto = ResponseDistrictDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ResponseDistrictDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ResponseDistrictDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ResponseDistrictDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => response_regency_dto_1.ResponseRegencyDto,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => response_regency_dto_1.ResponseRegencyDto),
    __metadata("design:type", response_province_dto_1.ResponseProvinceDto)
], ResponseDistrictDto.prototype, "province", void 0);
//# sourceMappingURL=response-district.dto.js.map