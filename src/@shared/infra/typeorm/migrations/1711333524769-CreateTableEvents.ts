import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class CreateTableEvents1711333524769 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'events',
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
                    },
                    {
                        name: 'purchaseId',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'quantity',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                        length: '20',
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
        await queryRunner.createForeignKey('events', productForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('events');
        const productForeignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('productId') !== -1,
        );
        await queryRunner.dropForeignKey('events', productForeignKey);

        await queryRunner.dropTable('events');
    }
}
