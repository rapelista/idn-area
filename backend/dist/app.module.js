"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_module_1 = require("./config/config.module");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
const core_1 = require("@nestjs/core");
const base_exception_1 = require("./common/exception/base.exception");
const base_validation_pipes_1 = require("./common/pipe/base-validation.pipes");
const typeorm_1 = require("@nestjs/typeorm");
const database_1 = require("./database/database");
const nest_winston_1 = require("nest-winston");
const winston_config_1 = require("./config/winston.config");
const throttler_1 = require("@nestjs/throttler");
const auth_module_1 = require("./common/auth/auth.module");
const seeders_module_1 = require("./database/seeders/seeders.module");
const user_module_1 = require("./common/user/user.module");
const provinces_module_1 = require("./modules/provinces/provinces.module");
const regencies_module_1 = require("./modules/regencies/regencies.module");
const districts_module_1 = require("./modules/districts/districts.module");
const villages_module_1 = require("./modules/villages/villages.module");
const islands_module_1 = require("./modules/islands/islands.module");
const locations_module_1 = require("./modules/locations/locations.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.ConfigModule,
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: async () => await (0, database_1.typeOrmConfig)(),
                inject: [],
            }),
            nest_winston_1.WinstonModule.forRoot(winston_config_1.winstonConfig),
            throttler_1.ThrottlerModule.forRoot([]),
            seeders_module_1.SeedersModule,
            auth_module_1.AuthsModule,
            user_module_1.UserModule,
            provinces_module_1.ProvincesModule,
            regencies_module_1.RegenciesModule,
            districts_module_1.DistrictsModule,
            villages_module_1.VillagesModule,
            islands_module_1.IslandsModule,
            locations_module_1.LocationsModule,
        ],
        providers: [
            {
                provide: 'APP_NAME',
                useValue: 'IDN Area BE V1.0',
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: logging_interceptor_1.LoggingInterceptor,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: base_exception_1.AllExceptionFilter,
            },
            { provide: core_1.APP_PIPE, useClass: base_validation_pipes_1.BaseValidationPipe },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map