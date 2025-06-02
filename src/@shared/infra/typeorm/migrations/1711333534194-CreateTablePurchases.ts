import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTablePurchases1711333534194 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'purchases',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isGenerated: true,
                        generationStrategy: 'increment',
                        isPrimary: true,
                    },
                    {
                        name: 'date',
                        type: 'timestamp',
                        isNullable: false,
                    },
                    {
                        name: 'volume',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'totalValue',
                        type: 'decimal',
                        isNullable: false,
                    },
                    {
                        name: 'supplierId',
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
