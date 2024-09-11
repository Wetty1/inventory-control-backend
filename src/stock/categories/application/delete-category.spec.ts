import { Test, TestingModule } from '@nestjs/testing';
import { DeleteCategory } from './delete-category';
import { CategoryMemoryRepository } from '../infra/memory/category-memory.repository';

describe('DeleteCategoryService', () => {
    let service: DeleteCategory;
    const categoryStoreMemory = new CategoryMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteCategory,
                {
                    provide: 'CategoryRepository',
                    useValue: categoryStoreMemory,
                },
            ],
        }).compile();

        service = module.get<DeleteCategory>(DeleteCategory);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should delete a category', async () => {
        const input = {
            id: 'id',
        };

        categoryStoreMemory.createOrUpdate({ id: input.id, name: 'test' });

        await service.execute(input.id);

        const category = await categoryStoreMemory.getById(input.id);
        expect(category).toBeUndefined();
    });
});
