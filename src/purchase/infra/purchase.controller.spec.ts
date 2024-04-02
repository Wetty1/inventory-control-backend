import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseController } from './purchase.controller';
import { CreatePurchaseService } from '../domain/services/create-purchase.service';
import { PurchaseMemoryRepository } from './memory/purchase-memory.repository';

describe('PurchaseController', () => {
    let controller: PurchaseController;
    const purchaseRepository = new PurchaseMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PurchaseController],
            providers: [
                CreatePurchaseService,
                {
                    provide: 'PurchaseRepository',
                    useValue: purchaseRepository,
                },
            ],
        }).compile();

        controller = module.get<PurchaseController>(PurchaseController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
