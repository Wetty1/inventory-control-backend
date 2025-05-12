import { Test } from '@nestjs/testing';
import { CreateCategory } from '../../application/usecases/create-category';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionFactory } from 'src/@shared/infra/typeorm/connection.factory';
import { SharedModule } from 'src/@shared/shared.module';
import { CategoryTypeorm } from 'src/catalog/infra/typeorm/entities/category.entity';
import { ProductTypeorm } from 'src/catalog/infra/typeorm/entities/product.entity';
import { CategoryTyperormRepository } from 'src/catalog/infra/typeorm/repositories/category.repository';
import { CategoryRepository } from 'src/catalog/domain/repository/category.repository';

describe('CreateCategory', () => {
    let service: CreateCategory;
    let repository: CategoryRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(),
                TypeOrmModule.forRootAsync({
                    imports: [SharedModule],
                    useFactory: async (dbProvider: ConnectionFactory) =>
                        dbProvider.createTypeOrmOptions(),
                    inject: [ConnectionFactory],
                }),
                TypeOrmModule.forFeature([ProductTypeorm, CategoryTypeorm]),
            ],
            providers: [
                CreateCategory,
                {
                    provide: 'CategoryRepository',
                    useClass: CategoryTyperormRepository,
                },
            ],
        }).compile();

        service = module.get<CreateCategory>(CreateCategory);
        repository = module.get('CategoryRepository');
    });
    it('should create a category', async () => {
        const input = {
            name: `test${Math.random()}`,
        };

        const output = await service.execute(input);
        console.log({ id: output.getId() });
        const getCategory = await repository.get(output.getId());

        expect(output).toHaveProperty('id');
        expect(output).toHaveProperty('name', input.name);
        expect(getCategory).toHaveProperty('id', output.getId());
    });
});
