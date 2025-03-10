import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateLocationTable1741606455962 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
