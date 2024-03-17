import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1710640907870 implements MigrationInterface {
    name = 'Init1710640907870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permission" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "displayName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "displayName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "active" boolean DEFAULT false, "token" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "personId" integer, CONSTRAINT "REL_6aac19005cea8e2119cbe7759e" UNIQUE ("personId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "person" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "secondName" character varying NOT NULL, "lastName" character varying NOT NULL, "mothersLastName" character varying NOT NULL, "birthDate" TIMESTAMP NOT NULL, "direction" character varying NOT NULL, "identityCard" character varying NOT NULL, "gender" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "udpatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_permission_permission" ("roleId" integer NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "PK_601804d828ecf7c301022770fad" PRIMARY KEY ("roleId", "permissionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_be73ed38a02ea01cef07836835" ON "role_permission_permission" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1fff5824ba3354f53d4fae760c" ON "role_permission_permission" ("permissionId") `);
        await queryRunner.query(`CREATE TABLE "user_role_role" ("userId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_8f1a6e129f057889ccddcb4b533" PRIMARY KEY ("userId", "roleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_26736dfb41d6a47ce5d8365aad" ON "user_role_role" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8188039e9fdf7572245e2ed8a8" ON "user_role_role" ("roleId") `);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6aac19005cea8e2119cbe7759e8" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_permission_permission" ADD CONSTRAINT "FK_be73ed38a02ea01cef07836835e" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_permission_permission" ADD CONSTRAINT "FK_1fff5824ba3354f53d4fae760c3" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_role_role" ADD CONSTRAINT "FK_26736dfb41d6a47ce5d8365aad7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_role_role" ADD CONSTRAINT "FK_8188039e9fdf7572245e2ed8a83" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_role_role" DROP CONSTRAINT "FK_8188039e9fdf7572245e2ed8a83"`);
        await queryRunner.query(`ALTER TABLE "user_role_role" DROP CONSTRAINT "FK_26736dfb41d6a47ce5d8365aad7"`);
        await queryRunner.query(`ALTER TABLE "role_permission_permission" DROP CONSTRAINT "FK_1fff5824ba3354f53d4fae760c3"`);
        await queryRunner.query(`ALTER TABLE "role_permission_permission" DROP CONSTRAINT "FK_be73ed38a02ea01cef07836835e"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6aac19005cea8e2119cbe7759e8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8188039e9fdf7572245e2ed8a8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_26736dfb41d6a47ce5d8365aad"`);
        await queryRunner.query(`DROP TABLE "user_role_role"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1fff5824ba3354f53d4fae760c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_be73ed38a02ea01cef07836835"`);
        await queryRunner.query(`DROP TABLE "role_permission_permission"`);
        await queryRunner.query(`DROP TABLE "person"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "permission"`);
    }

}
