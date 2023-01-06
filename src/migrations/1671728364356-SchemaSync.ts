import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaSync1671728364356 implements MigrationInterface {
  name = 'SchemaSync1671728364356';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" ADD "description" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "coffee" ADD "recommendations" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" DROP COLUMN "recommendations"`,
    );
    await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "description"`);
  }
}
