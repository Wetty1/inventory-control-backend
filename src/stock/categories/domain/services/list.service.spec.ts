import { Test, TestingModule } from '@nestjs/testing';
import { ListService } from './list.service';
import { CategoryMemoryRepository } from '../../infra/memory/category-memory.repository';

describe('ListService', () => {
    let service: ListService;
    const categoryStoreMemory = new CategoryMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ListService,
                {
                    provide: 'CategoryRepository',
                    useValue: categoryStoreMemory,
                },
            ],
        }).compile();

        service = module.get<ListService>(ListService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should list all categories', async () => {
        categoryStoreMemory.create({ id: 1, name: 'test' });
        categoryStoreMemory.create({ id: 2, name: 'test2' });
        categoryStoreMemory.create({ id: 3, name: 'test3' });
        categoryStoreMemory.create({ id: 4, name: 'john doe' });
        const categories = await service.execute();
        expect(categories).toHaveLength(4);
        expect(categories[2].name).toEqual('test3');
    });
});
