"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLocationTable1741606455962 = void 0;
class CreateLocationTable1741606455962 {
    constructor() {
        this.name = 'CreateLocationTable1741606455962';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "location" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "createdBy" character varying, "updatedBy" character varying, "deletedBy" character varying, "name" character varying NOT NULL, "address" character varying NOT NULL, "latitude" integer NOT NULL, "longitude" integer NOT NULL, "villageCode" character varying, CONSTRAINT "REL_1e505b6bfa5a7d2b32bd26c54e" UNIQUE ("villageCode"), CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_1e505b6bfa5a7d2b32bd26c54e5" FOREIGN KEY ("villageCode") REFERENCES "village"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_1e505b6bfa5a7d2b32bd26c54e5"`);
        await queryRunner.query(`DROP TABLE "location"`);
    }
}
exports.CreateLocationTable1741606455962 = CreateLocationTable1741606455962;
//# sourceMappingURL=1741606455962-CreateLocationTable.js.map