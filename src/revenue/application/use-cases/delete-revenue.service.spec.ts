import { Test, TestingModule } from '@nestjs/testing';
import { DeleteRevenueService } from './delete-revenue.service';

describe('DeleteRevenueService', () => {
  let service: DeleteRevenueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteRevenueService],
    }).compile();

    service = module.get<DeleteRevenueService>(DeleteRevenueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
