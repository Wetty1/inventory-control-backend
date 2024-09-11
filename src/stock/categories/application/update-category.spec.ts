import { Test, TestingModule } from '@nestjs/testing';
import { UpdateCategory } from './update-category';
import { CategoryMemoryRepository } from '../infra/memory/category-memory.repository';

describe('UpdateCategoryService', () => {
    let service: UpdateCategory;
    const categoryStoreMemory = new CategoryMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateCategory,
                {
                    provide: 'CategoryRepository',
                    useValue: categoryStoreMemory,
                },
            ],
        }).compile();

        service = module.get<UpdateCategory>(UpdateCategory);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should update a category', async () => {
        const input = {
            id: 'id',
            name: 'test1',
        };

        categoryStoreMemory.createOrUpdate({ id: input.id, name: 'test' });

        await service.execute(input.id, input);

        const response = await categoryStoreMemory.getById(input.id);
        expect(response).toHaveProperty('name', 'test1');
    });
});
