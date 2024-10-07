import { Test } from '@nestjs/testing';
import { CreateCategory } from './create-category';
import { CategoryInMemoryRepository } from '../infra/database/in-memory/category.repository';

describe('CreateCategory', () => {
    let service: CreateCategory;
    const categoryRepository = new CategoryInMemoryRepository();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                CreateCategory,
                {
                    provide: 'CategoryRepository',
                    useValue: categoryRepository,
                },
            ],
        }).compile();

        service = module.get<CreateCategory>(CreateCategory);
    });
    it('should create a category', () => {
        const input = {
            name: 'test',
        };

        const output = service.execute(input);
        expect(output).toHaveProperty('id');
        expect(output).toHaveProperty('name', 'test');
    });
});
