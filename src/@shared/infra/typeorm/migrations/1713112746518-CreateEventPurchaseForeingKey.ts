/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CreateEventPurchaseForeingKey1713112746518
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const purchaseForeignKey = new TableForeignKey({
            columnNames: ['purchaseId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'purchases',
            onDelete: 'CASCADE',
        });
        await queryRunner.createForeignKey('events', purchaseForeignKey);

        const eventForeignKey = new TableForeignKey({
            columnNames: ['eventId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'events',
            onDelete: 'CASCADE',
        });
        await queryRunner.createForeignKey('purchases', eventForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const eventsTable = await queryRunner.getTable('events');
        const purchaseForeignKey = eventsTable.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('purchaseId') !== -1,
        );
        await queryRunner.dropForeignKey('events', purchaseForeignKey);

        const purchasesTable = await queryRunner.getTable('purchases');
        const eventForeignKey = purchasesTable.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('eventId') !== -1,
        );
        await queryRunner.dropForeignKey('purchases', eventForeignKey);
    }
}
