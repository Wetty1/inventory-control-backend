import { Test, TestingModule } from '@nestjs/testing';
import { ListExtractProductService } from './list-extract-product.service';

describe('ListExtractProductService', () => {
  let service: ListExtractProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListExtractProductService],
    }).compile();

    service = module.get<ListExtractProductService>(ListExtractProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
