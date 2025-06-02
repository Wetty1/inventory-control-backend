import { Test, TestingModule } from '@nestjs/testing';
import { CreatePurchase } from '../../application/usecases/create-purchase';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionFactory } from 'src/@shared/infra/typeorm/connection.factory';
import { SharedModule } from 'src/@shared/shared.module';
import { PurchaseTypeorm } from 'src/purchase/infra/typeorm/entities/purchase.entity';
import { ItemPurchaseTypeorm } from 'src/purchase/infra/typeorm/entities/item-purchase.entity';
import { CreateCategory } from 'src/catalog/application/usecases/create-category';
import { CreateProduct } from 'src/catalog/application/usecases/create-product';
import { CategoryTyperormRepository } from 'src/catalog/infra/typeorm/repositories/category.repository';
import { ProductTypeormRepository } from 'src/catalog/infra/typeorm/repositories/product.repository';
import { StockEventTypeormRepository } from 'src/stock/infra/typeorm/repository/event.repository';
import { CreateSupplier } from 'src/purchase/application/usecases/create-supplier';
import { SupplierTypeormRepository } from 'src/purchase/infra/typeorm/repository/supplier.entity';
import { PurchaseTypeormRepository } from 'src/purchase/infra/typeorm/repository/purchase.repository';
import { CreateItemPurchase } from 'src/purchase/application/usecases/create-item-purchase';
import { ItemPurchaseTypeormRepository } from 'src/purchase/infra/typeorm/repository/item-purchase.repository';
import { CategoryTypeorm } from 'src/catalog/infra/typeorm/entities/category.entity';
import { ProductTypeorm } from 'src/catalog/infra/typeorm/entities/product.entity';
import { SupplierTypeorm } from 'src/purchase/infra/typeorm/entities/supplier.entity';
import { StockEventTypeorm } from 'src/stock/infra/typeorm/entities/event.entity';

describe('CreateItemPurchaseService', () => {
    let createPurchase: CreatePurchase;
    let createSupplier: CreateSupplier;
    let createItemsPurchase: CreateItemPurchase;
    let createProduct: CreateProduct;
    let createCategory: CreateCategory;

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

        createPurchase = module.get<CreatePurchase>(CreatePurchase);
        createSupplier = module.get<CreateSupplier>(CreateSupplier);
        createItemsPurchase =
            module.get<CreateItemPurchase>(CreateItemPurchase);
        createProduct = module.get<CreateProduct>(CreateProduct);
        createCategory = module.get<CreateCategory>(CreateCategory);
    });

    it('should be defined', () => {
        expect(createPurchase).toBeDefined();
    });

    it('should create a new item purchase when purchase not have items', async () => {
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

        expect(itemsPurchaseOutput.volume).toBe(2);
        expect(itemsPurchaseOutput.items.length).toBe(2);
        expect(itemsPurchaseOutput.totalValue).toBe(39.99 + 10 * 1.99);

        expect(itemsPurchaseOutput.items[0].getTotalValue()).toBe(10 * 1.99);
        expect(itemsPurchaseOutput.items[1].getTotalValue()).toBe(39.99);
    });

    it.only('should create a new item purchase when purchase already have items', async () => {
        const supplier = await createSupplier.execute({
            name: `Supplier ${Math.random()}`,
            address: `Address ${Math.random()}`,
            cnpj: `CNPJ ${Math.random()}`,
        });
        const input = {
            date: new Date(),
            supplierId: supplier.id,
            items: [],
        };
        const purchaseOutput = await createPurchase.execute(input);
        expect(purchaseOutput).toHaveProperty('id');

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

        const itemsInput = [
            {
                productId: product.id,
                quantity: 10,
                unitValue: 1.99,
                purchaseId: purchaseOutput.id,
            },
        ];

        const itemsInput2 = [
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

        const itemsPurchaseOutput = await createItemsPurchase.execute({
            purchaseId: purchaseOutput.id,
            items: itemsInput2,
        });

        console.log(itemsPurchaseOutput.items);

        expect(itemsPurchaseOutput.volume).toBe(2);
        expect(itemsPurchaseOutput.items.length).toBe(2);
        expect(itemsPurchaseOutput.totalValue).toBe(39.99 + 10 * 1.99);

        expect(itemsPurchaseOutput.items[0].getTotalValue()).toBe(10 * 1.99);
        expect(itemsPurchaseOutput.items[1].getTotalValue()).toBe(39.99);
    });
});
