import { Test, TestingModule } from '@nestjs/testing';
import { UpdateCategoryService } from './update-category.service';

describe('UpdateCategoryService', () => {
  let service: UpdateCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateCategoryService],
    }).compile();

    service = module.get<UpdateCategoryService>(UpdateCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
