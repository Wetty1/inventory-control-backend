import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class CreateItemPurchase1748523762699 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'items_purchases',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'purchaseId',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'date',
                        type: 'timestamp',
                    },
                    {
                        name: 'productId',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'quantity',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'unitValue',
                        type: 'decimal',
                        isUnique: false,
                    },
                    {
                        name: 'totalValue',
                        type: 'decimal',
                        isNullable: false,
                    },
                    {
                        name: 'supplierId',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'stockEventId',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );
        const supplierForeingKey = new TableForeignKey({
            columnNames: ['supplierId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'suppliers',
            onDelete: 'CASCADE',
        });
        await queryRunner.createForeignKey(
            'items_purchases',
            supplierForeingKey,
        );
        const productForeingKey = new TableForeignKey({
            columnNames: ['productId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'products',
            onDelete: 'CASCADE',
        });
        await queryRunner.createForeignKey(
            'items_purchases',
            productForeingKey,
        );
        const purchaseForeingKey = new TableForeignKey({
            columnNames: ['purchaseId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'purchases',
            onDelete: 'CASCADE',
        });
        await queryRunner.createForeignKey(
            'items_purchases',
            purchaseForeingKey,
        );
        const stockEventForeingKey = new TableForeignKey({
            columnNames: ['stockEventId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'stock_events',
            onDelete: 'CASCADE',
        });
        await queryRunner.createForeignKey(
            'items_purchases',
            stockEventForeingKey,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('items_purchases');
    }
}
