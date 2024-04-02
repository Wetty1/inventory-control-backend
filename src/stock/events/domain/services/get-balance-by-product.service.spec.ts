import { Test, TestingModule } from '@nestjs/testing';
import { GetBalanceByProductService } from './get-balance-by-product.service';
import { ProductRepository } from '../../../../stock/products/domain/Repositories/product.repository';
import { ProductMemoryRepository } from '../../../../stock/products/infra/memory/product-memory.repository';
import { EventMemoryRepository } from '../../infra/memory/event-memory.repository';
import { EventRepository } from '../repositories/event-store-gateway.interface';

describe('GetBalanceByProductService', () => {
    let service: GetBalanceByProductService;
    const productsStore: ProductRepository = new ProductMemoryRepository();
    const eventStore: EventRepository = new EventMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetBalanceByProductService,
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

        service = module.get<GetBalanceByProductService>(
            GetBalanceByProductService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
