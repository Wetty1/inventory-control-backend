import { TestingModule, Test } from '@nestjs/testing';
import { MovementInMemoryRepository } from '../infra/database/in-memory/movement.repository';
import { PurchaseInMemoryRepository } from '../infra/database/in-memory/purchase.repository';
import { SupplyInMemoryRepository } from '../infra/database/in-memory/supply.repository';
import { ListCategories } from './list-categories';
import { CategoryInMemoryRepository } from '../infra/database/in-memory/category.repository';
import { Category } from '../domain/category';

describe('ListCategories', () => {
    let service: ListCategories;
    const categoryRepository = new CategoryInMemoryRepository();
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ListCategories,
                {
                    provide: 'CategoryRepository',
                    useValue: categoryRepository,
                },
            ],
        }).compile();

        service = module.get<ListCategories>(ListCategories);
    });

    it('deve listar as categorias', async () => {
        await categoryRepository.save(Category.create('test'));
        await categoryRepository.save(Category.create('test2'));
        const output = await service.execute();
        expect(output).toHaveLength(2);
    });
});
