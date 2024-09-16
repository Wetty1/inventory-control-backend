import { Test, TestingModule } from '@nestjs/testing';
import { ListCategory } from './list';
import { CategoryMemoryRepository } from '../infra/memory/category-memory.repository';

describe('ListService', () => {
    let service: ListCategory;
    const categoryStoreMemory = new CategoryMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ListCategory,
                {
                    provide: 'CategoryRepository',
                    useValue: categoryStoreMemory,
                },
            ],
        }).compile();

        service = module.get<ListCategory>(ListCategory);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should list all categories', async () => {
        categoryStoreMemory.save({ id: '1', name: 'test' });
        categoryStoreMemory.save({ id: '2', name: 'test2' });
        categoryStoreMemory.save({ id: '3', name: 'test3' });
        categoryStoreMemory.save({ id: '4', name: 'john doe' });
        const categories = await service.execute();
        expect(categories).toHaveLength(4);
        expect(categories[2].name).toEqual('test3');
    });
});
