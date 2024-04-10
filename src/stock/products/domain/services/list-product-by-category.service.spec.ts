import { Test, TestingModule } from '@nestjs/testing';
import { ListProductByCategoryService } from './list-product-by-category.service';

describe('ListProductByCategoryService', () => {
  let service: ListProductByCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListProductByCategoryService],
    }).compile();

    service = module.get<ListProductByCategoryService>(ListProductByCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
