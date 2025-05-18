import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionFactory } from 'src/@shared/infra/typeorm/connection.factory';
import { SharedModule } from 'src/@shared/shared.module';
import { CreateCategory } from 'src/catalog/application/usecases/create-category';
import { CreateProduct } from 'src/catalog/application/usecases/create-product';
import { CategoryTypeorm } from 'src/catalog/infra/typeorm/entities/category.entity';
import { ProductTypeorm } from 'src/catalog/infra/typeorm/entities/product.entity';
import { CategoryTyperormRepository } from 'src/catalog/infra/typeorm/repositories/category.repository';
import { ProductTypeormRepository } from 'src/catalog/infra/typeorm/repositories/product.repository';

describe('CreateProduct', () => {
    let service: CreateProduct;
    let categoryService: CreateCategory;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(),
                TypeOrmModule.forRootAsync({
                    imports: [SharedModule],
                    useFactory: async (dbProvider: ConnectionFactory) => {
                        return dbProvider.createTypeOrmOptions();
                    },
                    inject: [ConnectionFactory],
                }),
                TypeOrmModule.forFeature([ProductTypeorm, CategoryTypeorm]),
            ],
            providers: [
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
            ],
        }).compile();

        service = module.get<CreateProduct>(CreateProduct);
        categoryService = module.get<CreateCategory>(CreateCategory);
    });
    it('should create a supply', async () => {
        const categoryCreated = await categoryService.execute({
            name: `category test${Math.random()}`,
        });
        const input = {
            name: categoryCreated.getName(),
            categoryId: categoryCreated.getId(),
        };
        const output = await service.execute(input);
        expect(output).toHaveProperty('id');
        expect(output).toHaveProperty('name', categoryCreated.getName());
    });
});
