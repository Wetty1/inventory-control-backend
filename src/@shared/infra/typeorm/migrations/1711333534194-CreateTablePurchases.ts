import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class CreateTablePurchases1711333534194 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'purchases',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'date',
                        type: 'timestamp',
                        isNullable: false,
                    },
                    {
                        name: 'productId',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'eventId',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'quantity',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'unit_value',
                        type: 'decimal',
                        isNullable: false,
                    },
                    {
                        name: 'total_value',
                        type: 'decimal',
                        isNullable: false,
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

        const productForeignKey = new TableForeignKey({
            columnNames: ['productId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'products',
            onDelete: 'CASCADE',
        });
        await queryRunner.createForeignKey('purchases', productForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('purchases');

        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('productId') !== -1,
        );
        await queryRunner.dropForeignKey('purchases', foreignKey);

        await queryRunner.dropTable('purchases');
    }
}
