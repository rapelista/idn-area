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
exports.Regency = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entity/base.entity");
const province_entity_1 = require("../../provinces/entities/province.entity");
const island_entity_1 = require("../../islands/entities/island.entity");
const district_entity_1 = require("../../districts/entities/district.entity");
let Regency = class Regency extends base_entity_1.BaseEntity {
};
exports.Regency = Regency;
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, typeorm_1.Index)({ unique: true }),
    __metadata("design:type", String)
], Regency.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Regency.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => island_entity_1.Island, (island) => island.regency),
    __metadata("design:type", Array)
], Regency.prototype, "islands", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => district_entity_1.District, (district) => district.regency),
    __metadata("design:type", Array)
], Regency.prototype, "districts", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => province_entity_1.Province, (province) => province.regencies, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({
        referencedColumnName: 'code',
    }),
    __metadata("design:type", province_entity_1.Province)
], Regency.prototype, "province", void 0);
exports.Regency = Regency = __decorate([
    (0, typeorm_1.Entity)()
], Regency);
//# sourceMappingURL=regency.entity.js.map