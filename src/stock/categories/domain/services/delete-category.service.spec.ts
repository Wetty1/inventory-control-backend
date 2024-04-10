import { Test, TestingModule } from '@nestjs/testing';
import { DeleteCategoryService } from './delete-category.service';

describe('DeleteCategoryService', () => {
  let service: DeleteCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteCategoryService],
    }).compile();

    service = module.get<DeleteCategoryService>(DeleteCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
