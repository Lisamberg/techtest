const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class AddUserEntity1729982365317 {
    name = "AddUserEntity1729982365317";

    async up(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS "user"`); //S'assurer de la bonne construction peu importe l'état de l'hote
        await queryRunner.query(
            `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(150) NOT NULL, "lastName" character varying(150) NOT NULL, CONSTRAINT "UQ_c322cd2084cd4b1b2813a900320" UNIQUE ("firstName", "lastName"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
        );
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "user"`);
    }
};
