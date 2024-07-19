import { Test, TestingModule } from '@nestjs/testing';
import { ListRevenueService } from './list-revenue.service';

describe('ListRevenueService', () => {
  let service: ListRevenueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListRevenueService],
    }).compile();

    service = module.get<ListRevenueService>(ListRevenueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
