import { Inject, Injectable } from '@nestjs/common';
import { SupplyRepository } from '../domain/supply.repository';
import { MovementRepository } from '../domain/movement.repository';
import { PurchaseRepository } from '../domain/purchase.repository';

interface Input {
    id: string;
    supplyId: string;
    quantity: number;
    unitValue: number;
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

@Injectable()
export class ChangeBuySupply {
    constructor(
        @Inject('SupplyRepository')
        private readonly supplyRepository: SupplyRepository,
        @Inject('PurchaseRepository')
        private readonly purchaseRepository: PurchaseRepository,
        @Inject('MovementRepository')
        private readonly movementRepository: MovementRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
        const purchase = await this.purchaseRepository.get(input.id);
        if (!purchase) {
            throw new Error('Purchase not found');
        }

        const movement = purchase.movement;
        if (!movement) {
            throw new Error('Movement not found');
        }
        if (movement.type !== 'in') {
            throw new Error('Movement is not an input');
        }

        if (input.supplyId !== purchase.supply.id) {
            const supply = await this.supplyRepository.get(input.supplyId);
            purchase.changeSupply(supply);
        }

        purchase.change(input.quantity, input.unitValue, input.date);
        purchase.movement.changeQuantity(input.quantity);
        purchase.movement.change('in', purchase.supply, input.date);

        await this.purchaseRepository.save(purchase);
        await this.movementRepository.save(purchase.movement);
        return { ...purchase };
    }
}
