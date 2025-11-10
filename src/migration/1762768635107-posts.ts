import { MigrationInterface, QueryRunner } from "typeorm";

export class Posts1762768635107 implements MigrationInterface {
    name = 'Posts1762768635107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`email\` ON \`users\``);
        await queryRunner.query(`CREATE TABLE \`posts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`n\` varchar(255) NOT NULL, \`e\` varchar(255) NOT NULL, \`s\` decimal(10,2) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`spends\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`spends\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`gender\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`gender\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`blood_group\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`blood_group\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`religion\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`religion\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`age\` \`age\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`role\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`spends\` ADD CONSTRAINT \`FK_6518db631ca878f98cc354603fc\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`spends\` DROP FOREIGN KEY \`FK_6518db631ca878f98cc354603fc\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`role\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`age\` \`age\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`religion\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`religion\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`blood_group\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`blood_group\` varchar(10) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`gender\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`gender\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`spends\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`spends\` ADD \`id\` int NOT NULL`);
        await queryRunner.query(`DROP TABLE \`posts\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`email\` ON \`users\` (\`email\`)`);
    }

}
