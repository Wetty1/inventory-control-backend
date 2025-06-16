import { Inject, Injectable } from '@nestjs/common';
import { ItemPurchaseRepository } from 'src/purchase/domain/repository/item-purchase.repository';
import { PurchaseRepository } from 'src/purchase/domain/repository/purchase.repository';

@Injectable()
export class GetPurchase {
    constructor(
        @Inject('PurchaseRepository')
        private readonly purchaseRepository: PurchaseRepository,
        @Inject('ItemPurchaseRepository')
        private readonly itemsPurchaseRepository: ItemPurchaseRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
        const purchase = await this.purchaseRepository.get(input.id);
        if (!purchase) {
            throw new Error('Purchase not found');
        }
        const items = await this.itemsPurchaseRepository.getAllByPurchaseId(
            input.id,
        );
        return {
            id: purchase.getId(),
            date: purchase.getDate(),
            supplierId: purchase.getSupplierId(),
            items: items.map((item) => ({
                id: item.getId(),
                purchaseId: item.getPurchaseId(),
                date: item.getDate(),
                productId: item.getProductId(),
                quantity: item.getQuantity(),
                unitValue: item.getUnitValue(),
                totalValue: item.getTotalValue(),
                supplierId: item.getSupplierId(),
            })),
            volume: purchase.getVolume(),
            totalValue: purchase.getTotalValue(),
        };
    }
}

type Input = {
    id: number;
};

type Output = {
    id: number;
    date: Date;
    supplierId: number;
    items: {
        id: number;
        purchaseId: number;
        date: Date;
        productId: number;
        quantity: number;
        unitValue: number;
        totalValue: number;
        supplierId: number;
    }[];
    volume: number;
    totalValue: number;
};
