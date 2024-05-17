import { Test, TestingModule } from '@nestjs/testing';
import { ListPurchaseService } from './list-purchase.service';

describe('ListPurchaseService', () => {
  let service: ListPurchaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListPurchaseService],
    }).compile();

    service = module.get<ListPurchaseService>(ListPurchaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
