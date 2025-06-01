import { Inject } from '@nestjs/common';
import { ItemPurchase } from 'src/purchase/domain/entity/item-purchase';
import { Purchase } from 'src/purchase/domain/entity/purchase';
import { ItemPurchaseRepository } from 'src/purchase/domain/repository/item-purchase.repository';
import { PurchaseRepository } from 'src/purchase/domain/repository/purchase.repository';

export class CreatePurchase {
    constructor(
        @Inject('PurchaseRepository')
        private readonly purchaseRepository: PurchaseRepository,
        @Inject('ItemPurchaseRepository')
        private readonly itemPurchaseRepository: ItemPurchaseRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
        const purchase = Purchase.create(input.date, 0, input.supplierId);
        const createdPurchase = await this.purchaseRepository.save(purchase);

        const items = [];
        for (const item of input.items) {
            const itemPurchase = ItemPurchase.create(
                createdPurchase.getId(),
                item.productId,
                input.date,
                item.quantity,
                item.unitValue,
                input.supplierId,
            );
            const createdItemPurchase =
                await this.itemPurchaseRepository.save(itemPurchase);
            items.push(createdItemPurchase);
        }
        return {
            id: createdPurchase.getId(),
            date: createdPurchase.getDate(),
            supplierId: createdPurchase.getSupplierId(),
            items: input.items,
        };
    }
}

type Input = {
    items: ItemPurchaseInput[];
    date: Date;
    supplierId: number;
};

type ItemPurchaseInput = {
    purchaseId: number;
    productId: number;
    quantity: number;
    unitValue: number;
    totalValue: number;
};

type Output = {
    id: number;
    date: Date;
    supplierId: number;
    items: ItemPurchaseInput[];
};
