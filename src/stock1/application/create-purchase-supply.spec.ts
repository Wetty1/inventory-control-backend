import { Test, TestingModule } from '@nestjs/testing';
import { CreatePurchaseSupply } from './create-purchase-supply';
import { SupplyInMemoryRepository } from '../infra/database/in-memory/supply.repository';
import { MovementInMemoryRepository } from '../infra/database/in-memory/movement.repository';
import { PurchaseInMemoryRepository } from '../infra/database/in-memory/purchase.repository';
import { Supply } from '../domain/supply';
import { SupplierInMemoryRepository } from '../infra/database/in-memory/supplier.repository';
import { Supplier } from '../domain/supplier';

describe('CreateBuySupply', () => {
    let service: CreatePurchaseSupply;
    const supplyRepository = new SupplyInMemoryRepository();
    const movementRepository = new MovementInMemoryRepository();
    const purchaseRepository = new PurchaseInMemoryRepository();
    const supplierRepository = new SupplierInMemoryRepository();

    const supplyCreated = Supply.create('arroz', 'id da categoria');
    supplyRepository.save(supplyCreated);

    const supplierCreated = Supplier.create('fornecedor 1');
    supplierRepository.save(supplierCreated);

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreatePurchaseSupply,
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
                {
                    provide: 'SupplierRepository',
                    useValue: supplierRepository,
                },
            ],
        }).compile();

        service = module.get<CreatePurchaseSupply>(CreatePurchaseSupply);
    });

    it('deve lançar uma exceção caso o insumo não exista', async () => {
        const input = {
            unitValue: 3.99,
            supplyId: 'id do arroz',
            quantity: 10,
            date: new Date(),
            supplierId: supplierCreated.id,
        };

        expect(service.execute(input)).rejects.toThrow(
            new Error('Supply not found'),
        );
    });

    it('deve criar uma entrada de estoque', async () => {
        const supply = await supplyRepository.save(
            Supply.create('arroz', 'id da categoria'),
        );
        const input = {
            unitValue: 3.99,
            supplyId: supply.id,
            quantity: 10,
            date: new Date(),
            supplierId: supplierCreated.id,
        };

        const output = await service.execute(input);

        const movementFound = movementRepository.get(output.movement.id);

        expect(movementFound).toBeTruthy();
    });

    it('deve criar uma compra de estoque', async () => {
        const supply = await supplyRepository.save(
            Supply.create('arroz branco', 'id da categoria'),
        );
        const input = {
            unitValue: 3.99,
            supplyId: supply.id,
            quantity: 10,
            date: new Date(),
            supplierId: supplierCreated.id,
        };

        const output = await service.execute(input);

        const purchaseFound = purchaseRepository.get(output.movement.id);

        expect(purchaseFound).toBeTruthy();
    });

    it('deve criar uma compra com um fornecedor definido', async () => {
        const supply = await supplyRepository.save(
            Supply.create('arroz branco', 'id da categoria'),
        );
        const input = {
            unitValue: 3.99,
            supplyId: supply.id,
            quantity: 10,
            date: new Date(),
            supplierId: supplierCreated.id,
        };

        const output = await service.execute(input);

        expect(output).toHaveProperty('supplier.id', supplierCreated.id);
    });
});
