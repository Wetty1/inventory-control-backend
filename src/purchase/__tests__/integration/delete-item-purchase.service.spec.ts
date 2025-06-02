import { Test, TestingModule } from '@nestjs/testing';
import { DeleteItemPurchaseService } from './delete-item-purchase.service';

describe('DeleteItemPurchaseService', () => {
  let service: DeleteItemPurchaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteItemPurchaseService],
    }).compile();

    service = module.get<DeleteItemPurchaseService>(DeleteItemPurchaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
