import { Test, TestingModule } from '@nestjs/testing';
import { GetByIdService } from './get-by-id.service';
import { CategoryMemoryRepository } from '../../infra/memory/category-memory.repository';

describe('GetByIdService', () => {
    let service: GetByIdService;
    const categoryStoreMemory = new CategoryMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetByIdService,
                {
                    provide: 'CategoryRepository',
                    useValue: categoryStoreMemory,
                },
            ],
        }).compile();

        service = module.get<GetByIdService>(GetByIdService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should get a category by id', async () => {
        categoryStoreMemory.create({ id: 1, name: 'test' });
        const category = await service.execute(1);
        expect(category.name).toEqual('test');
    });
});
