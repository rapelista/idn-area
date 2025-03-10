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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const base_service_1 = require("../../common/service/base.service");
const user_entity_1 = require("./entities/user.entity");
let UserService = class UserService extends base_service_1.BaseService {
    constructor(dataSource, repository) {
        super(dataSource, repository);
        this.dataSource = dataSource;
        this.repository = repository;
    }
    defaultRelation() {
        return {};
    }
    async queryBuilder(query) {
        const { page, limit, orderBy = ['id:DESC'], search, ...filters } = query;
        const where = {
            ...(search && { username: (0, typeorm_2.ILike)(`%${search}%`) }),
            ...(filters.role && { role: filters.role }),
        };
        const queryOptions = await super.buildQuery(where, this.defaultRelation(), {
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
                    id: (0, typeorm_2.In)(savedEntities.map((entity) => entity.id)),
                },
                relations: this.defaultRelation(),
            });
            return Array.isArray(result) ? result[0] : result;
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map