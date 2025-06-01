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
import { StockEventTypeormRepository } from 'src/stock/infra/typeorm/repository/event.repository';
import { CreateSupplier } from 'src/purchase/application/usecases/create-supplier';
import { SupplierTypeormRepository } from 'src/purchase/infra/typeorm/repository/supplier.entity';
import { PurchaseTypeormRepository } from 'src/purchase/infra/typeorm/repository/purchase.repository';
import { ProductTypeorm } from 'src/catalog/infra/typeorm/entities/product.entity';
import { ProductTypeormRepository } from 'src/catalog/infra/typeorm/repositories/product.repository';
import { CategoryTyperormRepository } from 'src/catalog/infra/typeorm/repositories/category.repository';
import { StockEventTypeorm } from 'src/stock/infra/typeorm/entities/event.entity';
import { SupplierTypeorm } from 'src/purchase/infra/typeorm/entities/supplier.entity';
import { CategoryTypeorm } from 'src/catalog/infra/typeorm/entities/category.entity';
import { ItemPurchaseTypeormRepository } from 'src/purchase/infra/typeorm/repository/item-purchase.repository';

describe('CreatePurchaseService', () => {
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
                    StockEventTypeorm,
                    SupplierTypeorm,
                    ItemPurchaseTypeorm,
                    ProductTypeorm,
                    CategoryTypeorm,
                ]),
            ],
            providers: [
                CreatePurchase,
                CreateSupplier,
                CreateProduct,
                CreateCategory,
                {
                    provide: 'PurchaseRepository',
                    useClass: PurchaseTypeormRepository,
                },
                {
                    provide: 'StockEventRepository',
                    useClass: StockEventTypeormRepository,
                },
                {
                    provide: 'SupplierRepository',
                    useClass: SupplierTypeormRepository,
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
            ],
        }).compile();

        createPurchase = module.get<CreatePurchase>(CreatePurchase);
        createSupplier = module.get<CreateSupplier>(CreateSupplier);
    });

    it('should be defined', () => {
        expect(createPurchase).toBeDefined();
    });

    it('should create a new purchase', async () => {
        const supplier = await createSupplier.execute({
            name: `Supplier ${Math.random()}`,
            address: `Address ${Math.random()}`,
            cnpj: `CNPJ ${Math.random()}`,
        });
        console.log(supplier);
        const input = {
            date: new Date(),
            supplierId: supplier.id,
            items: [],
        };
        const output = await createPurchase.execute(input);
        expect(output).toHaveProperty('id');
    });

    it('not should create a new purchase without supplier', async () => {
        const input = {
            date: new Date(),
            supplierId: null,
            items: [],
        };
        const output = createPurchase.execute(input);
        await expect(output).rejects.toThrow();
    });
});
