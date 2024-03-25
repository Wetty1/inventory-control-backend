import { Test, TestingModule } from '@nestjs/testing';
import { CreateRevenueService } from './create-revenue.service';

describe('CreateRevenueService', () => {
  let service: CreateRevenueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateRevenueService],
    }).compile();

    service = module.get<CreateRevenueService>(CreateRevenueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
