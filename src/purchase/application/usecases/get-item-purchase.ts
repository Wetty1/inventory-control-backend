import { Inject, Injectable } from '@nestjs/common';
import { ItemPurchaseRepository } from 'src/purchase/domain/repository/item-purchase.repository';

@Injectable()
export class GetItemPurchase {
    constructor(
        @Inject('ItemPurchaseRepository')
        private readonly itemPurchaseRepository: ItemPurchaseRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
        const itemFounded = await this.itemPurchaseRepository.get(input.id);

        if (!itemFounded) {
            throw new Error('Item purchase not found');
        }

        return {
            id: itemFounded.getId(),
            purchaseId: itemFounded.getPurchaseId(),
            date: itemFounded.getDate(),
            productId: itemFounded.getProductId(),
            quantity: itemFounded.getQuantity(),
            supplierId: itemFounded.getSupplierId(),
            unitValue: itemFounded.getUnitValue(),
            totalValue: itemFounded.getTotalValue(),
        };
    }
}

type Input = {
    id: number;
};

type Output = {
    id: number;
    purchaseId: number;
    date: Date;
    productId: number;
    quantity: number;
    supplierId: number;
    unitValue: number;
    totalValue: number;
};
