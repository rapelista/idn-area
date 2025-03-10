import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Initialize1741605461728 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
