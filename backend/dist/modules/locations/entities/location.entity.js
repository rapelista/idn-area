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
exports.Location = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entity/base.entity");
const village_entity_1 = require("../../villages/entities/village.entity");
let Location = class Location extends base_entity_1.BaseEntity {
};
exports.Location = Location;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Location.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Location.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Location.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Location.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => village_entity_1.Village, (village) => village.location, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({
        referencedColumnName: 'code',
    }),
    __metadata("design:type", village_entity_1.Village)
], Location.prototype, "village", void 0);
exports.Location = Location = __decorate([
    (0, typeorm_1.Entity)()
], Location);
//# sourceMappingURL=location.entity.js.map