import { Test, TestingModule } from '@nestjs/testing';
import { GetByIdCategory } from './get-by-id';
import { CategoryMemoryRepository } from '../infra/memory/category-memory.repository';

describe('GetByIdService', () => {
    let service: GetByIdCategory;
    const categoryStoreMemory = new CategoryMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetByIdCategory,
                {
                    provide: 'CategoryRepository',
                    useValue: categoryStoreMemory,
                },
            ],
        }).compile();

        service = module.get<GetByIdCategory>(GetByIdCategory);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should get a category by id', async () => {
        categoryStoreMemory.save({ id: '1', name: 'test' });
        const category = await service.execute('1');
        expect(category.name).toEqual('test');
    });
});
