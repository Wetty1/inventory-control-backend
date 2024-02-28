import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { ListService } from '../services/list.service';
import { GetByIdService } from '../services/get-by-id.service';
import { CreateService } from '../services/create.service';
import { CategoryStoreMemory } from '../gateways/implementations/category-story-memory';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  const categoryStoreMemory = new CategoryStoreMemory();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        ListService,
        GetByIdService,
        CreateService,
        {
          provide: 'CategoryStoreGateway',
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
