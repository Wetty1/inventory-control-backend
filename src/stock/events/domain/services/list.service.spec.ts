import { Test, TestingModule } from '@nestjs/testing';
import { ListService } from './list.service';
import { ProductRepository } from '../../../../stock/products/domain/Repositories/product.repository';
import { ProductMemoryRepository } from '../../../../stock/products/infra/memory/product-memory.repository';
import { EventMemoryRepository } from '../../infra/memory/event-memory.repository';
import { EventRepository } from '../repositories/event-store-gateway.interface';

describe('ListService', () => {
    let service: ListService;
    const productsStore: ProductRepository = new ProductMemoryRepository();
    const eventStore: EventRepository = new EventMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ListService,
                {
                    provide: 'EventRepository',
                    useValue: eventStore,
                },
                {
                    provide: 'ProductRepository',
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
