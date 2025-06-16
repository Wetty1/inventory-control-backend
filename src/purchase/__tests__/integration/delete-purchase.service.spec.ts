import { Test, TestingModule } from '@nestjs/testing';
import { DeletePurchase } from 'src/purchase/application/usecases/delete-purchase';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionFactory } from 'src/@shared/infra/typeorm/connection.factory';
import { SharedModule } from 'src/@shared/shared.module';
import { CreateCategory } from 'src/catalog/application/usecases/create-category';
import { CreateProduct } from 'src/catalog/application/usecases/create-product';
import { CategoryTypeorm } from 'src/catalog/infra/typeorm/entities/category.entity';
import { ProductTypeorm } from 'src/catalog/infra/typeorm/entities/product.entity';
import { CategoryTyperormRepository } from 'src/catalog/infra/typeorm/repositories/category.repository';
import { ProductTypeormRepository } from 'src/catalog/infra/typeorm/repositories/product.repository';
import { CreateItemPurchase } from 'src/purchase/application/usecases/create-item-purchase';
import { CreatePurchase } from 'src/purchase/application/usecases/create-purchase';
import { CreateSupplier } from 'src/purchase/application/usecases/create-supplier';
import { ItemPurchaseTypeorm } from 'src/purchase/infra/typeorm/entities/item-purchase.entity';
import { PurchaseTypeorm } from 'src/purchase/infra/typeorm/entities/purchase.entity';
import { SupplierTypeorm } from 'src/purchase/infra/typeorm/entities/supplier.entity';
import { ItemPurchaseTypeormRepository } from 'src/purchase/infra/typeorm/repository/item-purchase.repository';
import { PurchaseTypeormRepository } from 'src/purchase/infra/typeorm/repository/purchase.repository';
import { SupplierTypeormRepository } from 'src/purchase/infra/typeorm/repository/supplier.entity';
import { StockEventTypeorm } from 'src/stock/infra/typeorm/entities/event.entity';
import { StockEventTypeormRepository } from 'src/stock/infra/typeorm/repository/event.repository';
import { GetPurchase } from 'src/purchase/application/usecases/get-purchase';

describe('DeletePurchase', () => {
    let deletePurchase: DeletePurchase;
    let createPurchase: CreatePurchase;
    let createSupplier: CreateSupplier;
    let createItemsPurchase: CreateItemPurchase;
    let createProduct: CreateProduct;
    let createCategory: CreateCategory;
    let getPurchase: GetPurchase;

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
                    ItemPurchaseTypeorm,
                    StockEventTypeorm,
                    SupplierTypeorm,
                    ProductTypeorm,
                    CategoryTypeorm,
                ]),
            ],
            providers: [
                DeletePurchase,
                CreatePurchase,
                CreateSupplier,
                CreateProduct,
                CreateCategory,
                CreateItemPurchase,
                GetPurchase,
                {
                    provide: 'PurchaseRepository',
                    useClass: PurchaseTypeormRepository,
                },
                {
                    provide: 'ItemPurchaseRepository',
                    useClass: ItemPurchaseTypeormRepository,
                },
                {
                    provide: 'ProductRepository',
                    useClass: ProductTypeormRepository,
                },
                {
                    provide: 'CategoryRepository',
                    useClass: CategoryTyperormRepository,
                },
                {
                    provide: 'StockEventRepository',
                    useClass: StockEventTypeormRepository,
                },
                {
                    provide: 'SupplierRepository',
                    useClass: SupplierTypeormRepository,
                },
            ],
        }).compile();

        deletePurchase = module.get<DeletePurchase>(DeletePurchase);
        createPurchase = module.get<CreatePurchase>(CreatePurchase);
        createSupplier = module.get<CreateSupplier>(CreateSupplier);
        createItemsPurchase =
            module.get<CreateItemPurchase>(CreateItemPurchase);
        createProduct = module.get<CreateProduct>(CreateProduct);
        createCategory = module.get<CreateCategory>(CreateCategory);
        getPurchase = module.get<GetPurchase>(GetPurchase);
    });

    it('should be defined', () => {
        expect(deletePurchase).toBeDefined();
    });

    it('should delete a purchase', async () => {
        const supplier = await createSupplier.execute({
            name: `Supplier ${Math.random()}`,
            address: `Address ${Math.random()}`,
            cnpj: `CNPJ ${Math.random()}`,
        });

        const input = {
            date: new Date(),
            supplierId: supplier.id,
        };
        const purchaseOutput = await createPurchase.execute(input);
        expect(purchaseOutput).toHaveProperty('id');

        await deletePurchase.execute({ id: purchaseOutput.id });

        await expect(
            getPurchase.execute({ id: purchaseOutput.id }),
        ).rejects.toThrow();
    });

    it('should not delete a purchase with items', async () => {
        const supplier = await createSupplier.execute({
            name: `Supplier ${Math.random()}`,
            address: `Address ${Math.random()}`,
            cnpj: `CNPJ ${Math.random()}`,
        });
        const category = await createCategory.execute({
            name: `Category ${Math.random()}`,
        });

        const product = await createProduct.execute({
            name: `Product ${Math.random()}`,
            categoryId: category.getId(),
        });

        const product2 = await createProduct.execute({
            name: `Product ${Math.random()}`,
            categoryId: category.getId(),
        });

        const input = {
            date: new Date(),
            supplierId: supplier.id,
        };
        const purchaseOutput = await createPurchase.execute(input);
        expect(purchaseOutput).toHaveProperty('id');

        const itemsInput = [
            {
                productId: product.id,
                quantity: 10,
                unitValue: 1.99,
                purchaseId: purchaseOutput.id,
            },
            {
                productId: product2.id,
                quantity: 1,
                unitValue: 39.99,
                purchaseId: purchaseOutput.id,
            },
        ];

        await createItemsPurchase.execute({
            purchaseId: purchaseOutput.id,
            items: itemsInput,
        });

        await expect(
            deletePurchase.execute({ id: purchaseOutput.id }),
        ).rejects.toThrow('Cannot delete purchase with items');
    });
});
