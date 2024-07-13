import { Test, TestingModule } from '@nestjs/testing';
import { UpdateRevenueService } from './update-revenue.service';

describe('UpdateRevenueService', () => {
  let service: UpdateRevenueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateRevenueService],
    }).compile();

    service = module.get<UpdateRevenueService>(UpdateRevenueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
