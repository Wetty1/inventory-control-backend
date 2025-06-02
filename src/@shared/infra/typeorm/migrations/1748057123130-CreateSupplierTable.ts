import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class CreateSupplierTable1748057123130 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'suppliers',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'cnpj',
                        type: 'varchar',
                        isUnique: true,
                        isNullable: true,
                    },
                    {
                        name: 'address',
                        type: 'varchar',
                        isUnique: true,
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
        await queryRunner.createForeignKey('purchases', supplierForeingKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('purchases');

        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('supplierId') !== -1,
        );
        await queryRunner.dropForeignKey('purchases', foreignKey);

        await queryRunner.dropTable('suppliers');
    }
}
