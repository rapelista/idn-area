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
exports.SeedersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../common/user/entities/user.entity");
const bcrypt = require("bcrypt");
const role_enum_1 = require("../../common/user/enum/role.enum");
const province_entity_1 = require("../../modules/provinces/entities/province.entity");
const regency_entity_1 = require("../../modules/regencies/entities/regency.entity");
const district_entity_1 = require("../../modules/districts/entities/district.entity");
const village_entity_1 = require("../../modules/villages/entities/village.entity");
const island_entity_1 = require("../../modules/islands/entities/island.entity");
const fs = require("fs");
const path = require("path");
const csvParser = require("csv-parser");
let SeedersService = class SeedersService {
    constructor(userRepository, provinceRepository, regencyRepository, districtRepository, villageRepository, islandRepository) {
        this.userRepository = userRepository;
        this.provinceRepository = provinceRepository;
        this.regencyRepository = regencyRepository;
        this.districtRepository = districtRepository;
        this.villageRepository = villageRepository;
        this.islandRepository = islandRepository;
    }
    async seedBaseData() {
        await this.seedUsers();
        await this.seedProvinces();
        await this.seedRegencies();
        await this.seedDistricts();
        await this.seedVillages();
        await this.seedIslands();
    }
    async seedUsers() {
        const users = [
            {
                username: 'superadmin',
                role: role_enum_1.Role.ADMIN,
                password: await bcrypt.hash('superadmin@123', 10),
                email: 'superadmin@gmail.com',
            },
            {
                username: 'johnDoe',
                role: role_enum_1.Role.STAFF,
                password: await bcrypt.hash('123456', 10),
                email: 'johnDoe@gmail.com',
            },
        ];
        await this.userRepository.upsert(users, ['username']);
    }
    async seedProvinces() {
        const provinces = [];
        fs.createReadStream(path.join(__dirname, '../../../data/provinces.csv'))
            .pipe(csvParser())
            .on('data', (row) => {
            provinces.push({
                code: row.code,
                name: row.name,
            });
        })
            .on('end', async () => {
            await this.provinceRepository.upsert(provinces, ['code']);
        });
    }
    async seedRegencies() {
        const regencies = [];
        fs.createReadStream(path.join(__dirname, '../../../data/regencies.csv'))
            .pipe(csvParser())
            .on('data', (row) => {
            regencies.push({
                code: row.code,
                name: row.name,
                province: { code: row.province_code },
            });
        })
            .on('end', async () => {
            await this.regencyRepository.upsert(regencies, ['code']);
        });
    }
    async seedDistricts() {
        const districts = [];
        return new Promise((resolve, reject) => {
            fs.createReadStream(path.join(__dirname, '../../../data/districts.csv'))
                .pipe(csvParser())
                .on('data', (row) => {
                if (!row.code || !row.name || !row.regency_code) {
                    console.warn(`Skipping invalid row:`, row);
                    return;
                }
                districts.push({
                    code: row.code.trim(),
                    name: row.name.trim(),
                    regency: { code: row.regency_code.trim() },
                });
            })
                .on('end', async () => {
                try {
                    const batchSize = 5000;
                    for (let i = 0; i < districts.length; i += batchSize) {
                        const batch = districts.slice(i, i + batchSize);
                        await this.districtRepository.upsert(batch, ['code']);
                    }
                    console.log(`Seeded ${districts.length} districts successfully`);
                    resolve();
                }
                catch (error) {
                    console.error('Error seeding districts:', error);
                    reject(error);
                }
            })
                .on('error', (error) => {
                console.error('CSV read error:', error);
                reject(error);
            });
        });
    }
    async seedVillages() {
        const villages = [];
        return new Promise((resolve, reject) => {
            fs.createReadStream(path.join(__dirname, '../../../data/villages.csv'))
                .pipe(csvParser())
                .on('data', (row) => {
                if (!row.code || !row.name || !row.district_code) {
                    console.warn(`Skipping invalid row:`, row);
                    return;
                }
                villages.push({
                    code: row.code.trim(),
                    name: row.name.trim(),
                    district: { code: row.district_code.trim() },
                });
            })
                .on('end', async () => {
                try {
                    const batchSize = 5000;
                    for (let i = 0; i < villages.length; i += batchSize) {
                        const batch = villages.slice(i, i + batchSize);
                        await this.villageRepository.upsert(batch, ['code']);
                    }
                    console.log(`Seeded ${villages.length} villages successfully`);
                    resolve();
                }
                catch (error) {
                    console.error('Error seeding villages:', error);
                    reject(error);
                }
            })
                .on('error', (error) => {
                console.error('CSV read error:', error);
                reject(error);
            });
        });
    }
    async seedIslands() {
        const islands = [];
        return new Promise((resolve, reject) => {
            fs.createReadStream(path.join(__dirname, '../../../data/islands.csv'))
                .pipe(csvParser())
                .on('data', (row) => {
                if (!row.code || !row.coordinate || !row.regency_code) {
                    console.warn(`Skipping invalid row:`, row);
                    return;
                }
                const coordinateParts = row.coordinate.split(',');
                if (coordinateParts.length < 4) {
                    console.warn(`Skipping invalid coordinate:`, row.coordinate);
                    return;
                }
                const [latLong] = coordinateParts;
                const payload = {
                    code: row.code.trim(),
                    coordinates: latLong.trim(),
                    name: coordinateParts[3].trim(),
                    regency: { code: row.regency_code.trim() },
                };
                islands.push(payload);
            })
                .on('end', async () => {
                try {
                    const batchSize = 5000;
                    for (let i = 0; i < islands.length; i += batchSize) {
                        const batch = islands.slice(i, i + batchSize);
                        await this.islandRepository.upsert(batch, ['code']);
                    }
                    console.log(`Seeded ${islands.length} islands successfully`);
                    resolve();
                }
                catch (error) {
                    console.error('Error seeding islands:', error);
                    reject(error);
                }
            })
                .on('error', (error) => {
                console.error('CSV read error:', error);
                reject(error);
            });
        });
    }
};
exports.SeedersService = SeedersService;
exports.SeedersService = SeedersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(province_entity_1.Province)),
    __param(2, (0, typeorm_1.InjectRepository)(regency_entity_1.Regency)),
    __param(3, (0, typeorm_1.InjectRepository)(district_entity_1.District)),
    __param(4, (0, typeorm_1.InjectRepository)(village_entity_1.Village)),
    __param(5, (0, typeorm_1.InjectRepository)(island_entity_1.Island)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SeedersService);
//# sourceMappingURL=seeders.service.js.map