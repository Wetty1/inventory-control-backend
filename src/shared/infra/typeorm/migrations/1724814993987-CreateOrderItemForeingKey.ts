import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CreateOrderItemForeingKey1724814993987
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        const orderForeigKey = new TableForeignKey({
            name: 'item_order_order_id_fkey',
            columnNames: ['orderId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'orders',
            onDelete: 'CASCADE',
        });

        await queryRunner.createForeignKey('item_order', orderForeigKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            'item_order',
            'item_order_order_id_fkey',
        );
    }
}
