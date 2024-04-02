import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { ListService } from '../domain/services/list.service';
import { GetByIdService } from '../domain/services/get-by-id.service';
import { CreateService } from '../domain/services/create.service';
import { CategoryMemoryRepository } from './memory/category-memory.repository';

describe('CategoriesController', () => {
    let controller: CategoriesController;
    const categoryStoreMemory = new CategoryMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CategoriesController],
            providers: [
                ListService,
                GetByIdService,
                CreateService,
                {
                    provide: 'CategoryRepository',
                    useValue: categoryStoreMemory,
                },
            ],
        }).compile();

        controller = module.get<CategoriesController>(CategoriesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
