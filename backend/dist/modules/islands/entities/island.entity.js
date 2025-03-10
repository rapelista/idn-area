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
exports.Island = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entity/base.entity");
const regency_entity_1 = require("../../regencies/entities/regency.entity");
let Island = class Island extends base_entity_1.BaseEntity {
};
exports.Island = Island;
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, typeorm_1.Index)({ unique: true }),
    __metadata("design:type", String)
], Island.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Island.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Island.prototype, "coordinates", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => regency_entity_1.Regency, (regency) => regency.islands, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({
        referencedColumnName: 'code',
    }),
    __metadata("design:type", regency_entity_1.Regency)
], Island.prototype, "regency", void 0);
exports.Island = Island = __decorate([
    (0, typeorm_1.Entity)()
], Island);
//# sourceMappingURL=island.entity.js.map