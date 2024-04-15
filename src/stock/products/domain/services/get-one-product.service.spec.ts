import { Test, TestingModule } from '@nestjs/testing';
import { GetOneProductService } from './get-one-product.service';

describe('GetOneProductService', () => {
  let service: GetOneProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetOneProductService],
    }).compile();

    service = module.get<GetOneProductService>(GetOneProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
