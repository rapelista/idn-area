import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AllExceptionFilter } from './common/exception/base.exception';
import { BaseValidationPipe } from './common/pipe/base-validation.pipes';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/database';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './config/winston.config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthsModule } from './common/auth/auth.module';
import { SeedersModule } from './database/seeders/seeders.module';
import { UserModule } from './common/user/user.module';
import { ProvincesModule } from './modules/provinces/provinces.module';
import { RegenciesModule } from './modules/regencies/regencies.module';
import { DistrictsModule } from './modules/districts/districts.module';
import { VillagesModule } from './modules/villages/villages.module';
import { IslandsModule } from './modules/islands/islands.module';
import { LocationsModule } from './modules/locations/locations.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () => await typeOrmConfig(),
      inject: [],
    }),
    WinstonModule.forRoot(winstonConfig),
    ThrottlerModule.forRoot([]),
    SeedersModule,
    AuthsModule,
    UserModule,
    ProvincesModule,
    RegenciesModule,
    DistrictsModule,
    VillagesModule,
    IslandsModule,
    LocationsModule,
  ],
  providers: [
    {
      provide: 'APP_NAME',
      useValue: 'IDN Area BE V1.0',
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    { provide: APP_PIPE, useClass: BaseValidationPipe },
  ],
})
export class AppModule {}
