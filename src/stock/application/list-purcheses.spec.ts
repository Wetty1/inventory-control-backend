import { TestingModule, Test } from '@nestjs/testing';
import { ListPurchaseService } from 'src/purchase/domain/services/list-purchase.service';
import { CategoryInMemoryRepository } from '../infra/database/in-memory/category.repository';
import { MovementInMemoryRepository } from '../infra/database/in-memory/movement.repository';
import { PurchaseInMemoryRepository } from '../infra/database/in-memory/purchase.repository';
import { SupplierInMemoryRepository } from '../infra/database/in-memory/supplier.repository';
import { SupplyInMemoryRepository } from '../infra/database/in-memory/supply.repository';
import { Purchase } from '../domain/purchase';
import { Supply } from '../domain/supply';
import { Supplier } from '../domain/supplier';

describe('ListPurchaseService', () => {
    let service: ListPurchaseService;

    beforeEach(async () => {
        const purchaseRepository = new PurchaseInMemoryRepository();
        const movementRepository = new MovementInMemoryRepository();
        const supplyRepository = new SupplyInMemoryRepository();
        const categoryRepository = new CategoryInMemoryRepository();
        const supplierRepository = new SupplierInMemoryRepository();

        await purchaseRepository.save(
            Purchase.create(
                new Date(),
                Supply.create('Leite', 'id da categoria'),
                10,
                4.99,
                Supplier.create('Centerbox'),
            ),
        );
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ListPurchaseService,
                {
                    provide: 'PurchaseRepository',
                    useValue: purchaseRepository,
                },
                {
                    provide: 'MovementRepository',
                    useValue: movementRepository,
                },
                {
                    provide: 'SupplyRepository',
                    useValue: supplyRepository,
                },
                {
                    provide: 'CategoryRepository',
                    useValue: categoryRepository,
                },
                {
                    provide: 'SupplierRepository',
                    useValue: supplierRepository,
                },
            ],
        }).compile();

        service = module.get<ListPurchaseService>(ListPurchaseService);
    });

    it('deve listar as compras', async () => {
        const output = await service.execute();
        expect(output).toHaveLength(1);
        expect(output[0]).toHaveProperty('id');
    });
});
