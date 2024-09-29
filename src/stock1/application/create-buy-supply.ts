import { Inject } from '@nestjs/common';
import { MovementRepository } from '../domain/movement.repository';
import { Purchase } from '../domain/purchase';
import { PurchaseRepository } from '../domain/purchase.repository';
import { SupplyRepository } from '../domain/supply.repository';

interface Input {
    unitValue: number;
    supplyId: string;
    quantity: number;
    date: Date;
}

interface Output {
    id: string;
    date: Date;
    supply: {
        id: string;
        name: string;
        categoryId: string;
    };
    quantity: number;
    movement: {
        id: string;
        date: Date;
        quantity: number;
        type: 'out' | 'in';
    };
    unitValue: number;
    totalValue: number;
}

export class CreateBuySupply {
    constructor(
        @Inject('SupplyRepository')
        private readonly supplyRepository: SupplyRepository,
        @Inject('PurchaseRepository')
        private readonly purchaseRepository: PurchaseRepository,
        @Inject('MovementRepository')
        private readonly movementRepository: MovementRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
        const supply = await this.supplyRepository.get(input.supplyId);

        if (!supply) {
            throw new Error('Supply not found');
        }

        supply.incrementQuantity(input.quantity);
        await this.supplyRepository.save(supply);

        const purchase: Purchase = Purchase.create(
            input.date,
            supply,
            input.quantity,
            input.unitValue,
        );

        const output = this.purchaseRepository.save(purchase);

        return output;
    }
}
