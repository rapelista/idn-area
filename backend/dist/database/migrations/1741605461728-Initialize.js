"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Initialize1741605461728 = void 0;
class Initialize1741605461728 {
    constructor() {
        this.name = 'Initialize1741605461728';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "province" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "createdBy" character varying, "updatedBy" character varying, "deletedBy" character varying, "code" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_4f461cb46f57e806516b7073659" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_3288dfa18d390ed33b359fc041" ON "province" ("code") `);
        await queryRunner.query(`CREATE TABLE "island" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "createdBy" character varying, "updatedBy" character varying, "deletedBy" character varying, "code" character varying NOT NULL, "name" character varying NOT NULL, "coordinates" character varying NOT NULL, "regencyCode" character varying, CONSTRAINT "PK_b81bfcb70cf7d9d45a4dbdb606a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_13d8f16bb922e21f1ab1d28977" ON "island" ("code") `);
        await queryRunner.query(`CREATE TABLE "regency" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "createdBy" character varying, "updatedBy" character varying, "deletedBy" character varying, "code" character varying NOT NULL, "name" character varying NOT NULL, "provinceCode" character varying, CONSTRAINT "PK_c14feeffd190848a69b5ceb5193" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_14bc6d0de830068948e0e6e5ec" ON "regency" ("code") `);
        await queryRunner.query(`CREATE TABLE "district" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "createdBy" character varying, "updatedBy" character varying, "deletedBy" character varying, "code" character varying NOT NULL, "name" character varying NOT NULL, "regencyCode" character varying, CONSTRAINT "PK_ee5cb6fd5223164bb87ea693f1e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_fbfe5cb0d22c2be8c9a9fff5b6" ON "district" ("code") `);
        await queryRunner.query(`CREATE TABLE "village" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "createdBy" character varying, "updatedBy" character varying, "deletedBy" character varying, "code" character varying NOT NULL, "name" character varying NOT NULL, "districtCode" character varying, CONSTRAINT "PK_3ada8696ae059b2fcf82d5ab579" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_5cfe74f5bc17597affae5aab27" ON "village" ("code") `);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "createdBy" character varying, "updatedBy" character varying, "deletedBy" character varying, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'staff', "image" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_fe0bb3f6520ee0469504521e71" ON "users" ("username") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_cac403d64a7213535330318403" ON "users" ("id", "username", "email") WHERE "deletedAt" IS NULL AND "deletedBy" IS NULL`);
        await queryRunner.query(`ALTER TABLE "island" ADD CONSTRAINT "FK_857cf07b3820b7b35ade67a5b2d" FOREIGN KEY ("regencyCode") REFERENCES "regency"("code") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "regency" ADD CONSTRAINT "FK_2f7928d6520b4330df4acdfb6ab" FOREIGN KEY ("provinceCode") REFERENCES "province"("code") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "district" ADD CONSTRAINT "FK_7c863603e5e9cfeeaa18b1766d0" FOREIGN KEY ("regencyCode") REFERENCES "regency"("code") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "village" ADD CONSTRAINT "FK_d50be9d7092f76feee187003e85" FOREIGN KEY ("districtCode") REFERENCES "district"("code") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "village" DROP CONSTRAINT "FK_d50be9d7092f76feee187003e85"`);
        await queryRunner.query(`ALTER TABLE "district" DROP CONSTRAINT "FK_7c863603e5e9cfeeaa18b1766d0"`);
        await queryRunner.query(`ALTER TABLE "regency" DROP CONSTRAINT "FK_2f7928d6520b4330df4acdfb6ab"`);
        await queryRunner.query(`ALTER TABLE "island" DROP CONSTRAINT "FK_857cf07b3820b7b35ade67a5b2d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cac403d64a7213535330318403"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fe0bb3f6520ee0469504521e71"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5cfe74f5bc17597affae5aab27"`);
        await queryRunner.query(`DROP TABLE "village"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fbfe5cb0d22c2be8c9a9fff5b6"`);
        await queryRunner.query(`DROP TABLE "district"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_14bc6d0de830068948e0e6e5ec"`);
        await queryRunner.query(`DROP TABLE "regency"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_13d8f16bb922e21f1ab1d28977"`);
        await queryRunner.query(`DROP TABLE "island"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3288dfa18d390ed33b359fc041"`);
        await queryRunner.query(`DROP TABLE "province"`);
    }
}
exports.Initialize1741605461728 = Initialize1741605461728;
//# sourceMappingURL=1741605461728-Initialize.js.map