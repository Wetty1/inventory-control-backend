import { Test, TestingModule } from '@nestjs/testing';
import { ExtractByProductService } from './extract-by-product.service';
import { ProductStoreMemoryLocal } from '../../../stock/products/gateways/implementations/product-store-memory-local';
import { ProductStoreGateway } from '../../../stock/products/gateways/interfaces/product-store-gateway.interface';
import { EventStoreMemory } from '../gateways/implementations/event-store-memory';
import { EventStoreGatewayInterface } from '../gateways/interfaces/event-store-gateway.interface';

describe('ExtractByProductService', () => {
  let service: ExtractByProductService;
  const productsStore: ProductStoreGateway = new ProductStoreMemoryLocal();
  const eventStore: EventStoreGatewayInterface = new EventStoreMemory(
    productsStore,
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExtractByProductService,
        {
          provide: 'EventStoreGatewayInterface',
          useValue: eventStore,
        },
        {
          provide: 'ProductStoreGateway',
          useValue: productsStore,
        },
      ],
    }).compile();

    service = module.get<ExtractByProductService>(ExtractByProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
