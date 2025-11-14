import { MigrationInterface, QueryRunner } from "typeorm";

export class Announcements1763029433575 implements MigrationInterface {
    name = 'Announcements1763029433575'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`announcements\` ADD \`authorId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`blood_group\` \`blood_group\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`religion\` \`religion\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`age\` \`age\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`spends\` ADD CONSTRAINT \`FK_6518db631ca878f98cc354603fc\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`announcements\` ADD CONSTRAINT \`FK_92d72877cc8c092c83f37c62752\` FOREIGN KEY (\`authorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`announcements\` DROP FOREIGN KEY \`FK_92d72877cc8c092c83f37c62752\``);
        await queryRunner.query(`ALTER TABLE \`spends\` DROP FOREIGN KEY \`FK_6518db631ca878f98cc354603fc\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` varchar(255) NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`age\` \`age\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`religion\` \`religion\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`blood_group\` \`blood_group\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` varchar(255) NULL DEFAULT 'unknown'`);
        await queryRunner.query(`ALTER TABLE \`announcements\` DROP COLUMN \`authorId\``);
    }

}
