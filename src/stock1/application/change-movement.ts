import { Inject } from '@nestjs/common';
import { SupplyRepository } from '../domain/supply.repository';
import { MovementRepository } from '../domain/movement.repository';

interface Input {
    id: string;
    supplyId: string;
    quantity: number;
    date: Date;
    type: 'out' | 'in';
}

export class ChangeMovementSupply {
    constructor(
        @Inject('SupplyRepository')
        private readonly supplyRepository: SupplyRepository,
        @Inject('MovementRepository')
        private readonly movementRepository: MovementRepository,
    ) {}

    async execute(input: Input) {
        const movement = await this.movementRepository.get(input.id);
        if (!movement) {
            throw new Error('Movement not found');
        }
        if (movement.type !== 'out') {
            throw new Error('Movement is not an output');
        }

        movement.changeQuantity(input.quantity);

        const supply = await this.supplyRepository.get(input.supplyId);
        if (!supply) {
            throw new Error('Supply not found');
        }
        movement.change(input.type, supply, input.date);

        return movement;
    }
}
