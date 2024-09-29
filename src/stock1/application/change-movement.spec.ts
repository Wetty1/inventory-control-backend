import { Test } from '@nestjs/testing';
import { ChangeMovementSupply } from './change-movement';
import { MovementInMemoryRepository } from '../infra/database/in-memory/moviment.repository';
import { Movement } from '../domain/movement';
import { Supply } from '../domain/supply';
import { SupplyInMemoryRepository } from '../infra/database/in-memory/supply.repository';

interface Input {
    id: string;
    supplyId: string;
    quantity: number;
    type: 'out' | 'in';
    date: Date;
}

describe('ChangeMovementSupply', () => {
    let service: ChangeMovementSupply;
    const movementRepository = new MovementInMemoryRepository();
    const supplyRepository = new SupplyInMemoryRepository();

    let supplyCreatedId: string;
    let movementCreatedId: string;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                ChangeMovementSupply,
                {
                    provide: 'SupplyRepository',
                    useValue: supplyRepository,
                },
                {
                    provide: 'MovementRepository',
                    useValue: movementRepository,
                },
            ],
        }).compile();

        service = module.get<ChangeMovementSupply>(ChangeMovementSupply);
        const supply = Supply.create('arroz', 'id da categoria');
        supply.incrementQuantity(10);
        supplyRepository.save(supply);
        const movement = Movement.create(new Date(), supply, 20, 'out');
        movementRepository.save(movement);

        supplyCreatedId = supply.id;
        movementCreatedId = movement.id;
    });

    it('deve alterar uma saida de estoque', async () => {
        const input: Input = {
            id: movementCreatedId,
            supplyId: supplyCreatedId,
            quantity: 10,
            type: 'out',
            date: new Date(),
        };

        console.log(input);

        const output = await service.execute(input);

        expect(output).toHaveProperty('id');
    });

    it('deve lançar uma exceção caso o estoque seja insuficiente', async () => {
        const input: Input = {
            id: movementCreatedId,
            supplyId: supplyCreatedId,
            quantity: 100,
            type: 'out',
            date: new Date(),
        };

        await expect(() => service.execute(input)).rejects.toThrow(
            new Error('Insuficent quantity'),
        );
    });

    it.todo('deve lançar uma exceção caso o insumo não exista');
});
