import { Test, TestingModule } from '@nestjs/testing';
import { ListService } from './list.service';
import { ProductStoreMemoryLocal } from '../../products/gateways/implementations/product-store-memory-local';
import { ProductStoreGateway } from 'src/stock/products/gateways/interfaces/product-store-gateway.interface';
import { EventStoreMemory } from '../gateways/implementations/event-store-memory';
import { EventStoreGatewayInterface } from '../gateways/interfaces/event-store-gateway.interface';

describe('ListService', () => {
  let service: ListService;
  const productsStore: ProductStoreGateway = new ProductStoreMemoryLocal();
  const eventStore: EventStoreGatewayInterface = new EventStoreMemory(
    productsStore,
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListService,
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

    service = module.get<ListService>(ListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
