import { Test, TestingModule } from '@nestjs/testing';
import { CreateStockEvent } from '../../application/usecases/create-stock-event';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionFactory } from 'src/@shared/infra/typeorm/connection.factory';
import { SharedModule } from 'src/@shared/shared.module';
import { ProductTypeorm } from 'src/catalog/infra/typeorm/entities/product.entity';
import { StockEventTypeorm } from 'src/stock/infra/typeorm/entities/event.entity';
import { ProductTypeormRepository } from 'src/catalog/infra/typeorm/repositories/product.repository';
import { StockEventTypeormRepository } from 'src/stock/infra/typeorm/repository/event.repository';
import { CreateProduct } from 'src/catalog/application/usecases/create-product';
import { CreateCategory } from 'src/catalog/application/usecases/create-category';
import { CategoryTypeorm } from 'src/catalog/infra/typeorm/entities/category.entity';
import { CategoryTyperormRepository } from 'src/catalog/infra/typeorm/repositories/category.repository';

describe('CreateStockEvent', () => {
    let service: CreateStockEvent;
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
                    ProductTypeorm,
                    CategoryTypeorm,
                    StockEventTypeorm,
                ]),
            ],
            providers: [
                CreateStockEvent,
                CreateProduct,
                CreateCategory,
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
            ],
        }).compile();

        service = module.get<CreateStockEvent>(CreateStockEvent);
        createProduct = module.get<CreateProduct>(CreateProduct);
        createCategory = module.get<CreateCategory>(CreateCategory);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a new stock event', async () => {
        const category = await createCategory.execute({
            name: `product${Math.random()}`,
        });
        const product = await createProduct.execute({
            name: `category${Math.random()}`,
            categoryId: category.getId(),
        });
        const input = {
            date: new Date(),
            productId: product.id,
            purchaseId: null,
            quantity: 10,
            type: 'in',
            unitMeasurement: 'kg',
        };
        const output = await service.execute(input);
        expect(output).toHaveProperty('id');
    });
});
