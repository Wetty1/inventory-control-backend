import { Test, TestingModule } from '@nestjs/testing';
import { CreateService } from './create';
import { EventRepository } from '../repositories/event-store-gateway.interface';
import { ProductRepository } from '../../../products/domain/Repositories/product.repository';
import { ProductMemoryRepository } from '../../../products/infra/memory/product-memory.repository';
import { EventMemoryRepository } from '../../infra/memory/event-memory.repository';

describe('CreateService', () => {
    let service: CreateService;
    const productRepository: ProductRepository = new ProductMemoryRepository();
    const eventRepository: EventRepository = new EventMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateService,
                {
                    provide: 'EventRepository',
                    useValue: eventRepository,
                },
                {
                    provide: 'ProductRepository',
                    useValue: productRepository,
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
