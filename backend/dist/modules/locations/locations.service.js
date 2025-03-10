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
exports.LocationsService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../../common/service/base.service");
const location_entity_1 = require("./entities/location.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let LocationsService = class LocationsService extends base_service_1.BaseService {
    constructor(dataSource, repository) {
        super(dataSource, repository);
        this.dataSource = dataSource;
        this.repository = repository;
    }
    defaultRelation() {
        return {
            village: true,
        };
    }
    async queryBuilder(query) {
        const { page, limit, orderBy = ['id:DESC'], search, ...filters } = query;
        const where = {
            ...(search && {
                name: (0, typeorm_1.ILike)(`%${search}%`),
            }),
            ...(filters.villageCode && { village: { code: filters.villageCode } }),
        };
        const relations = {
            ...this.defaultRelation(),
        };
        const queryOptions = await super.buildQuery(where, relations, {
            limit,
            page,
            orderBy: Array.isArray(orderBy) ? orderBy : [orderBy],
        });
        return queryOptions;
    }
    async create(data, user) {
        return this.transactions(async (manager) => {
            const entities = Array.isArray(data) ? data : [data];
            const transformedEntities = entities.map((entity) => ({
                ...entity,
                village: {
                    code: entity.villageCode,
                },
            }));
            const repository = manager.getRepository(this.repository.target);
            const createdEntities = transformedEntities.map((entity) => {
                return repository.create({
                    ...entity,
                    createdBy: user?.username,
                });
            });
            const savedEntities = await manager.save(createdEntities);
            const result = await manager.getRepository(this.repository.target).find({
                where: {
                    id: (0, typeorm_1.In)(savedEntities.map((entity) => entity.id)),
                },
                relations: this.defaultRelation(),
            });
            return Array.isArray(result) ? result[0] : result;
        });
    }
};
exports.LocationsService = LocationsService;
exports.LocationsService = LocationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(location_entity_1.Location)),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        typeorm_1.Repository])
], LocationsService);
//# sourceMappingURL=locations.service.js.map