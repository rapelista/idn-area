import { DataSource, DataSourceOptions } from 'typeorm';
export declare function typeOrmConfig(): Promise<DataSourceOptions>;
export declare const dataSource: Promise<DataSource>;
