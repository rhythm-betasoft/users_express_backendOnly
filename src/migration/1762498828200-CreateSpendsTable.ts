import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSpendsTable1762498828200 implements MigrationInterface {
    name = 'CreateSpendsTable1762498828200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`email\` ON \`users\``);
        await queryRunner.query(`CREATE TABLE \`spends\` (\`id\` int NOT NULL AUTO_INCREMENT, \`salary\` decimal(10,2) NOT NULL, \`expenses\` decimal(10,2) NOT NULL, \`saving\` decimal(10,2) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`gender\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`gender\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`blood_group\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`blood_group\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`religion\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`religion\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`age\` \`age\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`role\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`role\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`age\` \`age\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`religion\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`religion\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`blood_group\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`blood_group\` varchar(10) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`gender\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`gender\` varchar(50) NULL`);
        await queryRunner.query(`DROP TABLE \`spends\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`email\` ON \`users\` (\`email\`)`);
    }

}
