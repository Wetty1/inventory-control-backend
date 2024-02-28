import { Test, TestingModule } from '@nestjs/testing';
import { CreateService } from './create.service';
import { CategoryStoreMemory } from '../gateways/implementations/category-story-memory';

describe('CreateService', () => {
  let service: CreateService;
  const categoryStoreMemory = new CategoryStoreMemory();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateService,
        {
          provide: 'CategoryStoreGateway',
          useValue: categoryStoreMemory,
        },
      ],
    }).compile();

    service = module.get<CreateService>(CreateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create a new category', async () => {
    const category = await service.execute({ name: 'test' });
    expect(category.name).toEqual('test');
  });
});
