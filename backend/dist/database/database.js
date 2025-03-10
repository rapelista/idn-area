"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
exports.typeOrmConfig = typeOrmConfig;
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const config_module_1 = require("../config/config.module");
const typeorm_1 = require("typeorm");
async function getConfigService() {
    const app = await core_1.NestFactory.createApplicationContext(config_module_1.ConfigModule);
    return app.get(config_1.ConfigService);
}
async function typeOrmConfig() {
    const configService = await getConfigService();
    return {
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        synchronize: false,
        entities: ['dist/bases/**/*.entity{.ts,.js}', 'dist/**/*.entity{.ts,.js}'],
        migrations: ['dist/database/migrations/*{.ts,.js}'],
        poolSize: 10,
        maxQueryExecutionTime: 10000,
        connectTimeoutMS: 10000,
        extra: {
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        },
    };
}
async function getDataSource() {
    const dataSourceOption = await typeOrmConfig();
    return new typeorm_1.DataSource(dataSourceOption);
}
exports.dataSource = getDataSource().then();
//# sourceMappingURL=database.js.map