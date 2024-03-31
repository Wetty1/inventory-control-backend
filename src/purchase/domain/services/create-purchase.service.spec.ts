import { Test, TestingModule } from '@nestjs/testing';
import { CreatePurchaseService } from './create-purchase.service';
import { PurchaseMemoryRepository } from '../../infra/memory/purchase-memory.repository';
import { PurchaseRepository } from '../repositories/purchase.repository';
import { Purchase } from '../entities/purchase';

describe('CreatePurchaseService', () => {
    let service: CreatePurchaseService;
    const purchaseRepository: PurchaseRepository =
        new PurchaseMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreatePurchaseService,
                {
                    provide: 'PurchaseRepository',
                    useValue: purchaseRepository,
                },
            ],
        }).compile();

        service = module.get<CreatePurchaseService>(CreatePurchaseService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a new purchase', async () => {
        const purchase: Purchase = {
            date: new Date(),
            productId: 1,
            quantity: 1,
            total_value: 100,
            unit_value: 100,
        };
        const result = await service.execute(purchase);
        expect(result).toEqual(purchase);
    });
});
