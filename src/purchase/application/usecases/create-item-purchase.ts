import { Inject } from '@nestjs/common';
import { ItemPurchase } from 'src/purchase/domain/entity/item-purchase';
import { ItemPurchaseRepository } from 'src/purchase/domain/repository/item-purchase.repository';
import { PurchaseRepository } from 'src/purchase/domain/repository/purchase.repository';

export class CreateItemPurchase {
    constructor(
        @Inject('PurchaseRepository')
        private readonly purchaseRepository: PurchaseRepository,
        @Inject('ItemPurchaseRepository')
        private readonly itemPurchaseRepository: ItemPurchaseRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
        const items: ItemPurchase[] = [];
        const purchase = await this.purchaseRepository.get(input.purchaseId);

        const itemsPurchase =
            await this.itemPurchaseRepository.getAllByPurchaseId(
                input.purchaseId,
            );

        for (const item of input.items) {
            const itemPurchase = ItemPurchase.create(
                purchase.getId(),
                item.productId,
                purchase.getDate(),
                item.quantity,
                item.unitValue,
                purchase.getSupplierId(),
            );
            const createdItemPurchase =
                await this.itemPurchaseRepository.save(itemPurchase);
            items.push(createdItemPurchase);
        }

        if (itemsPurchase.length > 0) items.push(...itemsPurchase);

        purchase.setVolume(items.length);
        purchase.setTotalValue(
            items.reduce((acc: number, item) => {
                return acc + item.getTotalValue();
            }, 0),
        );

        await this.purchaseRepository.save(purchase);

        const totalValue = items.reduce((acc: number, item) => {
            return acc + item.getTotalValue();
        }, 0);

        return {
            id: purchase.getId(),
            date: purchase.getDate(),
            supplierId: purchase.getSupplierId(),
            totalValue,
            volume: items.length,
            items: items,
        };
    }
}

type Input = {
    purchaseId: number;
    items: ItemPurchaseInput[];
};

type ItemPurchaseInput = {
    purchaseId: number;
    productId: number;
    quantity: number;
    unitValue: number;
};

type Output = {
    id: number;
    date: Date;
    supplierId: number;
    volume: number;
    totalValue: number;
    items: ItemPurchase[];
};
