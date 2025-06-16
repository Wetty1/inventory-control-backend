import { Test, TestingModule } from '@nestjs/testing';
import { DeleteItemPurchase } from '../../application/usecases/delete-item-purchase';
import { ItemPurchaseTypeormRepository } from 'src/purchase/infra/typeorm/repository/item-purchase.repository';
import { CreateCategory } from 'src/catalog/application/usecases/create-category';
import { CreateProduct } from 'src/catalog/application/usecases/create-product';
import { CategoryTyperormRepository } from 'src/catalog/infra/typeorm/repositories/category.repository';
import { ProductTypeormRepository } from 'src/catalog/infra/typeorm/repositories/product.repository';
import { CreateItemPurchase } from 'src/purchase/application/usecases/create-item-purchase';
import { CreatePurchase } from 'src/purchase/application/usecases/create-purchase';
import { CreateSupplier } from 'src/purchase/application/usecases/create-supplier';
import { PurchaseTypeormRepository } from 'src/purchase/infra/typeorm/repository/purchase.repository';
import { SupplierTypeormRepository } from 'src/purchase/infra/typeorm/repository/supplier.entity';
import { StockEventTypeormRepository } from 'src/stock/infra/typeorm/repository/event.repository';
import { GetItemPurchase } from 'src/purchase/application/usecases/get-item-purchase';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionFactory } from 'src/@shared/infra/typeorm/connection.factory';
import { SharedModule } from 'src/@shared/shared.module';
import { CategoryTypeorm } from 'src/catalog/infra/typeorm/entities/category.entity';
import { ProductTypeorm } from 'src/catalog/infra/typeorm/entities/product.entity';
import { ItemPurchaseTypeorm } from 'src/purchase/infra/typeorm/entities/item-purchase.entity';
import { PurchaseTypeorm } from 'src/purchase/infra/typeorm/entities/purchase.entity';
import { SupplierTypeorm } from 'src/purchase/infra/typeorm/entities/supplier.entity';
import { StockEventTypeorm } from 'src/stock/infra/typeorm/entities/event.entity';

describe('DeleteItemPurchase', () => {
    let deleteItemPurchase: DeleteItemPurchase;
    let createPurchase: CreatePurchase;
    let createSupplier: CreateSupplier;
    let createItemsPurchase: CreateItemPurchase;
    let createProduct: CreateProduct;
    let createCategory: CreateCategory;
    let getItemPurchase: GetItemPurchase;

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
                CreatePurchase,
                CreateSupplier,
                CreateProduct,
                CreateCategory,
                CreateItemPurchase,
                DeleteItemPurchase,
                GetItemPurchase,
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

        deleteItemPurchase = module.get<DeleteItemPurchase>(DeleteItemPurchase);
        createPurchase = module.get<CreatePurchase>(CreatePurchase);
        createSupplier = module.get<CreateSupplier>(CreateSupplier);
        createItemsPurchase =
            module.get<CreateItemPurchase>(CreateItemPurchase);
        createProduct = module.get<CreateProduct>(CreateProduct);
        createCategory = module.get<CreateCategory>(CreateCategory);
        getItemPurchase = module.get<GetItemPurchase>(GetItemPurchase);
    });

    it('should be defined', () => {
        expect(deleteItemPurchase).toBeDefined();
    });

    it('should delete a item purchase', async () => {
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

        const itemsPurchaseOutput = await createItemsPurchase.execute({
            purchaseId: purchaseOutput.id,
            items: itemsInput,
        });

        await deleteItemPurchase.execute({
            id: itemsPurchaseOutput.id,
        });

        const itemPurchase = getItemPurchase.execute({
            id: itemsPurchaseOutput.id,
        });

        await expect(itemPurchase).rejects.toThrow('Item purchase not found');
    });
});
