import { Test, TestingModule } from '@nestjs/testing';
import { CreateBuySupply } from './create-buy-supply';
import { SupplyInMemoryRepository } from '../infra/database/in-memory/supply.repository';
import { MovimentInMemoryRepository } from '../infra/database/in-memory/moviment.repository';
import { PurchaseInMemoryRepository } from '../infra/database/in-memory/purchase.repository';
import { Supply } from '../domain/supply';

describe('CreateBuySupply', () => {
    let service: CreateBuySupply;
    const supplyRepository = new SupplyInMemoryRepository();
    const movimentRepository = new MovimentInMemoryRepository();
    const purchaseRepository = new PurchaseInMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateBuySupply,
                {
                    provide: 'SupplyRepository',
                    useValue: supplyRepository,
                },
                {
                    provide: 'PurchaseRepository',
                    useValue: purchaseRepository,
                },
                {
                    provide: 'MovimentRepository',
                    useValue: movimentRepository,
                },
            ],
        }).compile();

        service = module.get<CreateBuySupply>(CreateBuySupply);
    });

    it('deve lançar uma exceção caso o insumo não exista', async () => {
        const input = {
            unitValue: 3.99,
            supplyId: 'id do arroz',
            quantity: 10,
            date: new Date(),
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
        };

        const output = await service.execute(input);

        const movimentFound = movimentRepository.get(output.moviment.id);

        expect(movimentFound).toBeTruthy();
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
        };

        const output = await service.execute(input);

        const purchaseFound = purchaseRepository.get(output.moviment.id);

        expect(purchaseFound).toBeTruthy();
    });
});
