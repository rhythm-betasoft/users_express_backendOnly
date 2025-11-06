import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1762405246431 implements MigrationInterface {
    name = 'InitialMigration1762405246431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`email\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`id\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`gender\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`gender\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`blood_group\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`blood_group\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`religion\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`religion\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`role\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`dob\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`dob\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`state\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`state\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`state\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`state\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`dob\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`dob\` date NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`role\` varchar(50) NOT NULL DEFAULT ''user''`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`religion\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`religion\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`blood_group\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`blood_group\` varchar(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`gender\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`gender\` varchar(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`name\` varchar(100) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`id\` ON \`users\` (\`id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`email\` ON \`users\` (\`email\`)`);
    }

}
