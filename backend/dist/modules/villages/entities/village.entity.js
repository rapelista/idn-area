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
exports.Village = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entity/base.entity");
const district_entity_1 = require("../../districts/entities/district.entity");
const location_entity_1 = require("../../locations/entities/location.entity");
let Village = class Village extends base_entity_1.BaseEntity {
};
exports.Village = Village;
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)({ unique: true }),
    __metadata("design:type", String)
], Village.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Village.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => location_entity_1.Location, (location) => location.village, {
        nullable: true,
    }),
    __metadata("design:type", location_entity_1.Location)
], Village.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => district_entity_1.District, (district) => district.villages, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({
        referencedColumnName: 'code',
    }),
    __metadata("design:type", district_entity_1.District)
], Village.prototype, "district", void 0);
exports.Village = Village = __decorate([
    (0, typeorm_1.Entity)()
], Village);
//# sourceMappingURL=village.entity.js.map