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
exports.BaseEntityResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class BaseEntityResponse {
}
exports.BaseEntityResponse = BaseEntityResponse;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Id dari data',
        type: Number,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], BaseEntityResponse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2023-08-10T09:15:00.000Z',
        description: 'Tanggal pembuatan',
        required: false,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], BaseEntityResponse.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2023-08-11T14:30:00.000Z',
        description: 'Tanggal terakhir diupdate',
        required: false,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], BaseEntityResponse.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2023-08-12T10:00:00.000Z',
        description: 'Tanggal soft delete (jika ada)',
        required: false,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], BaseEntityResponse.prototype, "deletedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '64d5a8f1e48dfb0a5c9b82b0',
        description: 'ID user yang membuat',
        required: false,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BaseEntityResponse.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '64d5a8f1e48dfb0a5c9b82b1',
        description: 'ID user yang terakhir mengupdate',
        required: false,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BaseEntityResponse.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '64d5a8f1e48dfb0a5c9b82b2',
        description: 'ID user yang menghapus (jika ada)',
        required: false,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BaseEntityResponse.prototype, "deletedBy", void 0);
//# sourceMappingURL=base-entity.response.js.map