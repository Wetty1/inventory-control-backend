import { Test, TestingModule } from '@nestjs/testing';
import { CreateCategory } from './create-category';
import { CategoryMemoryRepository } from '../infra/memory/category-memory.repository';

describe('CreateCategory', () => {
    let service: CreateCategory;
    const categoryStoreMemory = new CategoryMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateCategory,
                {
                    provide: 'CategoryRepository',
                    useValue: categoryStoreMemory,
                },
            ],
        }).compile();

        service = module.get<CreateCategory>(CreateCategory);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should create a new category', async () => {
        const category = await service.execute({ name: 'test' });
        expect(category.name).toEqual('test');
    });
});
