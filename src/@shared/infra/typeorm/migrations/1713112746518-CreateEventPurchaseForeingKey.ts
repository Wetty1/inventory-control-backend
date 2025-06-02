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
        await queryRunner.createForeignKey('stock_events', purchaseForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const eventsTable = await queryRunner.getTable('stock_events');
        const purchaseForeignKey = eventsTable.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('purchaseId') !== -1,
        );
        await queryRunner.dropForeignKey('stock_events', purchaseForeignKey);

        const purchasesTable = await queryRunner.getTable('purchases');
        const eventForeignKey = purchasesTable.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('eventId') !== -1,
        );
        await queryRunner.dropForeignKey('purchases', eventForeignKey);
    }
}
