"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const typeorm_1 = require("typeorm");
const conflict_exception_1 = require("../exception/types/conflict.exception");
const not_found_exception_1 = require("../exception/types/not-found.exception");
class BaseService {
    constructor(dataSource, entitiesRepository) {
        this.dataSource = dataSource;
        this.entitiesRepository = entitiesRepository;
    }
    async getQueryRunner() {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        return queryRunner;
    }
    async transactions(callback) {
        const queryRunner = await this.getQueryRunner();
        try {
            const result = await callback(queryRunner.manager);
            await queryRunner.commitTransaction();
            return result;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async create(data, user) {
        return this.transactions(async (manager) => {
            const entities = Array.isArray(data) ? data : [data];
            const isExist = await Promise.all(entities.map((entity) => {
                return this.exist({
                    where: {
                        ...entity,
                    },
                });
            }));
            if (isExist.some((exist) => exist)) {
                throw new conflict_exception_1.ConflictException(`${this.entitiesRepository.metadata.name} Telah ada`);
            }
            const repository = manager.getRepository(this.entitiesRepository.target);
            const createdEntities = entities.map((entity) => {
                return repository.create({
                    ...entity,
                    createdBy: user?.username,
                });
            });
            const savedEntities = await manager.save(createdEntities);
            return Array.isArray(data) ? savedEntities : savedEntities[0];
        }).catch((error) => {
            throw error;
        });
    }
    async update(id, data, user) {
        return this.transactions(async (manager) => {
            const repository = manager.getRepository(this.entitiesRepository.target);
            const query = {
                where: {
                    id: id,
                },
            };
            const entity = await repository.findOne(query);
            if (!entity) {
                throw new not_found_exception_1.NotFoundException(`${this.entitiesRepository.metadata.name} Tidak Ditemukan`);
            }
            const updatedEntity = repository.create({
                ...entity,
                ...data,
                updatedBy: user?.username,
            });
            await manager.save(updatedEntity);
            return updatedEntity;
        }).catch((error) => {
            throw error;
        });
    }
    async buildQuery(whereQuery, relationsQuery, paginationQuery) {
        const { limit = 10, page = 1, orderBy = ['id:DESC'], } = paginationQuery || {};
        const order = {};
        orderBy.forEach((item) => {
            const [field, direction] = item.split(':');
            if (field && direction) {
                order[field] = direction.toUpperCase();
            }
            else {
                order[field] = 'DESC';
            }
        });
        return {
            where: whereQuery,
            relations: relationsQuery,
            take: limit,
            skip: (page - 1) * limit,
            order: order,
        };
    }
    async findAndCount(options = {}) {
        return this.entitiesRepository.findAndCount(options);
    }
    async findBy(options) {
        const queryBuilder = await this.buildQuery(options.where || {}, options.relations);
        return this.entitiesRepository.find(queryBuilder);
    }
    async findOne(options) {
        return await this.entitiesRepository.findOne(options);
    }
    async exist(options) {
        return !!(await this.entitiesRepository.findOne(options));
    }
    async count(options) {
        return this.entitiesRepository.count(options);
    }
    async remove(option, user) {
        try {
            const metadata = this.entitiesRepository.metadata;
            const relations = metadata.relations.map((relation) => relation.propertyName);
            if (option) {
                const entity = await this.entitiesRepository.findOneOrFail({
                    where: option,
                    relations: relations,
                });
                entity.deletedBy = user?.username;
                await this.entitiesRepository.save(entity);
                return await this.entitiesRepository.softRemove(entity);
            }
            const entities = await this.entitiesRepository.find({ relations });
            for (const entity of entities) {
                entity.deletedBy = user?.username;
                entity.deletedAt = new Date();
                await this.entitiesRepository.save(entity);
            }
            return await this.entitiesRepository.softRemove(entities);
        }
        catch (error) {
            if (error instanceof typeorm_1.EntityNotFoundError) {
                throw new not_found_exception_1.NotFoundException(`${this.entitiesRepository.metadata.name} Tidak Ditemukan`);
            }
            throw error;
        }
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map