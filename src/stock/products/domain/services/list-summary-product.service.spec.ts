import { Test, TestingModule } from '@nestjs/testing';
import { ListSummaryProductService } from './list-summary-product.service';

describe('ListSummaryProductService', () => {
  let service: ListSummaryProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListSummaryProductService],
    }).compile();

    service = module.get<ListSummaryProductService>(ListSummaryProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
