import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { ListService } from '../services/list.service';
import { CreateService } from '../services/create.service';
import { EventStoreMemory } from '../gateways/implementations/event-store-memory';
import { EventStoreGatewayInterface } from '../gateways/interfaces/event-store-gateway.interface';
import { ExtractByProductService } from '../services/extract-by-product.service';
import { GetBalanceByProductService } from '../services/get-balance-by-product.service';

describe('EventsController', () => {
  let controller: EventsController;
  const eventStore: EventStoreGatewayInterface = new EventStoreMemory({});

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        ListService,
        CreateService,
        ExtractByProductService,
        GetBalanceByProductService,
        {
          provide: 'EventStoreGatewayInterface',
          useValue: eventStore,
        },
      ],
    }).compile();

    controller = module.get<EventsController>(EventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
