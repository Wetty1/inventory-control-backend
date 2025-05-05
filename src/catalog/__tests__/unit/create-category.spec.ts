import { Test } from '@nestjs/testing';
import { CreateCategory } from '../../application/usecases/create-category';
import { CategoryRepository } from 'src/catalog/domain/repository/category.repository';
import { CategoryInMemoryRepository } from 'src/catalog/infra/database/in-memory/category.repository';

describe('CreateCategory', () => {
    let service: CreateCategory;
    const repository: CategoryRepository = new CategoryInMemoryRepository();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                CreateCategory,
                {
                    provide: 'CategoryRepository',
                    useValue: repository,
                },
            ],
        }).compile();

        service = module.get<CreateCategory>(CreateCategory);
    });
    it('should create a category', async () => {
        const input = {
            name: `test${Math.random()}`,
        };

        const output = await service.execute(input);
        const getCategory = await repository.get(output.getId());

        expect(output).toHaveProperty('id');
        expect(output).toHaveProperty('name', input.name);
        expect(getCategory).toHaveProperty('id', output.getId());
    });
});
