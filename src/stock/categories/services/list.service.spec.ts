import { Test, TestingModule } from '@nestjs/testing';
import { ListService } from './list.service';
import { CategoryStoreMemory } from '../gateways/implementations/category-story-memory';

describe('ListService', () => {
  let service: ListService;
  const categoryStoreMemory = new CategoryStoreMemory();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListService,
        {
          provide: 'CategoryStoreGateway',
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
    const categories = await service.execute({
      page: 1,
      limit: 10,
      search: 'test',
    });
    expect(categories).toHaveLength(3);
    expect(categories[2].name).toEqual('test3');
  });
});
