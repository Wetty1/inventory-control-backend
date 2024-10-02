import { Test, TestingModule } from '@nestjs/testing';
import { ChangePurchaseSupply } from './change-purchase-supply';
import { SupplyInMemoryRepository } from '../infra/database/in-memory/supply.repository';
import { PurchaseInMemoryRepository } from '../infra/database/in-memory/purchase.repository';
import { MovementInMemoryRepository } from '../infra/database/in-memory/movement.repository';
import { Supply } from '../domain/supply';
import { Movement } from '../domain/movement';
import { Purchase } from '../domain/purchase';
import { Supplier } from '../domain/supplier';
import { SupplierInMemoryRepository } from '../infra/database/in-memory/supplier.repository';

interface Input {
    id: string;
    supplyId: string;
    quantity: number;
    unitValue: number;
    date: Date;
}

describe('ChangeBuySupply', () => {
    let service: ChangePurchaseSupply;
    const supplyRepository = new SupplyInMemoryRepository();
    const purchaseRepository = new PurchaseInMemoryRepository();
    const movementRepository = new MovementInMemoryRepository();
    const supplierRepository = new SupplierInMemoryRepository();

    let purchaseIdCreated: string;
    let supplyIdCreated: string;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ChangePurchaseSupply,
                {
                    provide: 'SupplyRepository',
                    useValue: supplyRepository,
                },
                {
                    provide: 'PurchaseRepository',
                    useValue: purchaseRepository,
                },
                {
                    provide: 'MovementRepository',
                    useValue: movementRepository,
                },
            ],
        }).compile();

        service = module.get<ChangePurchaseSupply>(ChangePurchaseSupply);

        const supply = Supply.create('arroz', 'id da categoria');
        supply.incrementQuantity(10);
        supplyRepository.save(supply);
        const movement = Movement.create(new Date(), supply, 20, 'out');
        movementRepository.save(movement);
        const supplier = Supplier.create('Fornecedor 1');
        supplierRepository.save(supplier);
        const purchase = Purchase.create(
            new Date(),
            supply,
            10,
            3.99,
            supplier,
        );
        purchaseRepository.save(purchase);

        purchaseIdCreated = purchase.id;
        supplyIdCreated = supply.id;
    });

    it('deve alterar o valor da compra', async () => {
        const input: Input = {
            id: purchaseIdCreated,
            supplyId: supplyIdCreated,
            quantity: 10,
            unitValue: 4.99,
            date: new Date(),
        };

        const output = await service.execute(input);
        expect(output).toHaveProperty('id');
        expect(output).toHaveProperty('quantity', input.quantity);
        expect(output).toHaveProperty('unitValue', input.unitValue);
        expect(output).toHaveProperty(
            'totalValue',
            input.quantity * input.unitValue,
        );
    });

    it('deve alterar a movimentação de entrada de estoque', async () => {
        const input: Input = {
            id: purchaseIdCreated,
            supplyId: supplyIdCreated,
            quantity: 20,
            unitValue: 4.99,
            date: new Date(),
        };
        const output = await service.execute(input);

        expect(output).toHaveProperty('id');
        expect(output).toHaveProperty('quantity', input.quantity);
        expect(output).toHaveProperty('movement.quantity', input.quantity);
        expect(output).toHaveProperty('unitValue', input.unitValue);
        expect(output).toHaveProperty(
            'totalValue',
            input.quantity * input.unitValue,
        );
    });
});
