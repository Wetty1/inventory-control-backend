import { Test, TestingModule } from '@nestjs/testing';
import { ListProductService } from './list-product.service';

describe('ListProductService', () => {
  let service: ListProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListProductService],
    }).compile();

    service = module.get<ListProductService>(ListProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
