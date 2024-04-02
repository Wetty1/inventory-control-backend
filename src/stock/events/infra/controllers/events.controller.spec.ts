import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventRepository } from '../../domain/repositories/event-store-gateway.interface';
import { CreateService } from '../../domain/services/create.service';
import { ExtractByProductService } from '../../domain/services/extract-by-product.service';
import { GetBalanceByProductService } from '../../domain/services/get-balance-by-product.service';
import { ListService } from '../../domain/services/list.service';
import { EventMemoryRepository } from '../memory/event-memory.repository';

describe('EventsController', () => {
    let controller: EventsController;
    const eventStore: EventRepository = new EventMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EventsController],
            providers: [
                ListService,
                CreateService,
                ExtractByProductService,
                GetBalanceByProductService,
                {
                    provide: 'EventRepository',
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
