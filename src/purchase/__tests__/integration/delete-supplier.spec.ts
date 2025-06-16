import { Test, TestingModule } from '@nestjs/testing';
import { DeleteSupplier } from 'src/purchase/application/usecases/delete-supplier';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionFactory } from 'src/@shared/infra/typeorm/connection.factory';
import { SharedModule } from 'src/@shared/shared.module';
import { SupplierTypeorm } from 'src/purchase/infra/typeorm/entities/supplier.entity';
import { SupplierTypeormRepository } from 'src/purchase/infra/typeorm/repository/supplier.entity';
import { CreateSupplier } from 'src/purchase/application/usecases/create-supplier';
import { CreatePurchase } from 'src/purchase/application/usecases/create-purchase';
import { PurchaseTypeorm } from 'src/purchase/infra/typeorm/entities/purchase.entity';
import { ItemPurchaseTypeorm } from 'src/purchase/infra/typeorm/entities/item-purchase.entity';
import { CategoryTypeorm } from 'src/catalog/infra/typeorm/entities/category.entity';
import { ProductTypeorm } from 'src/catalog/infra/typeorm/entities/product.entity';
import { GetSupplier } from 'src/purchase/application/usecases/get-supplier';
import { PurchaseTypeormRepository } from 'src/purchase/infra/typeorm/repository/purchase.repository';

describe('DeleteSupplier', () => {
    let deleteSupplier: DeleteSupplier;
    let getSupplier: GetSupplier;
    let createPurchase: CreatePurchase;
    let createSupplier: CreateSupplier;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(),
                TypeOrmModule.forRootAsync({
                    imports: [SharedModule],
                    useFactory: async (dbProvider: ConnectionFactory) =>
                        dbProvider.createTypeOrmOptions(),
                    inject: [ConnectionFactory],
                }),
                TypeOrmModule.forFeature([
                    PurchaseTypeorm,
                    SupplierTypeorm,
                    ItemPurchaseTypeorm,
                    ProductTypeorm,
                    CategoryTypeorm,
                ]),
            ],
            providers: [
                CreatePurchase,
                CreateSupplier,
                GetSupplier,
                DeleteSupplier,
                {
                    provide: 'PurchaseRepository',
                    useClass: PurchaseTypeormRepository,
                },
                {
                    provide: 'SupplierRepository',
                    useClass: SupplierTypeormRepository,
                },
            ],
        }).compile();

        deleteSupplier = module.get<DeleteSupplier>(DeleteSupplier);
        getSupplier = module.get<GetSupplier>(GetSupplier);
        createSupplier = module.get<CreateSupplier>(CreateSupplier);
        createPurchase = module.get<CreatePurchase>(CreatePurchase);
    });

    it('should be defined', () => {
        expect(deleteSupplier).toBeDefined();
    });

    it('should delete a supplier', async () => {
        const supplier = await createSupplier.execute({
            name: `Supplier ${Math.random()}`,
            address: `Address ${Math.random()}`,
            cnpj: `CNPJ ${Math.random()}`,
        });

        await deleteSupplier.execute({
            id: supplier.id,
        });

        await expect(getSupplier.execute({ id: supplier.id })).rejects.toThrow(
            'Supplier not found',
        );
    });

    it('should not delete a supplier with purchases', async () => {
        const supplier = await createSupplier.execute({
            name: `Supplier ${Math.random()}`,
            address: `Address ${Math.random()}`,
            cnpj: `CNPJ ${Math.random()}`,
        });

        const inputPurchase = {
            date: new Date(),
            supplierId: supplier.id,
        };
        await createPurchase.execute(inputPurchase);

        await expect(
            deleteSupplier.execute({
                id: supplier.id,
            }),
        ).rejects.toThrow('Cannot delete supplier with purchases');
    });
});
