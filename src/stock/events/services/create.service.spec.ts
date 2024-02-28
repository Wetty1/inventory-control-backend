import { Test, TestingModule } from '@nestjs/testing';
import { CreateService } from './create.service';
import { EventStoreGatewayInterface } from '../gateways/interfaces/event-store-gateway.interface';
import { ProductStoreGateway } from 'src/stock/products/gateways/interfaces/product-store-gateway.interface';
import { EventStoreMemory } from '../gateways/implementations/event-store-memory';
import { ProductStoreMemoryLocal } from '../../products/gateways/implementations/product-store-memory-local';

describe('CreateService', () => {
  let service: CreateService;
  const productsStore: ProductStoreGateway = new ProductStoreMemoryLocal();
  const eventStore: EventStoreGatewayInterface = new EventStoreMemory(
    productsStore,
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateService,
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

    service = module.get<CreateService>(CreateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new event', async () => {
    const event = await service.execute({
      id: 1,
      productId: 1,
      type: 'entrada',
      quantity: 10,
      date: new Date(),
    });
    expect(event.productId).toEqual(1);
  });
});
