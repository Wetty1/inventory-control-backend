import { Inject, Injectable } from '@nestjs/common';
import { ItemPurchaseRepository } from 'src/purchase/domain/repository/item-purchase.repository';
import { PurchaseRepository } from 'src/purchase/domain/repository/purchase.repository';

@Injectable()
export class DeletePurchase {
    constructor(
        @Inject('PurchaseRepository')
        private readonly purchaseRepository: PurchaseRepository,
        @Inject('ItemPurchaseRepository')
        private readonly itemPurchaseRepository: ItemPurchaseRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
        const { id } = input;

        const purchase = await this.purchaseRepository.get(id);
        if (!purchase) {
            throw new Error('Purchase not found');
        }

        const items = await this.itemPurchaseRepository.getAllByPurchaseId(id);
        if (items.length > 0) {
            throw new Error('Cannot delete purchase with items');
        }

        await this.purchaseRepository.delete(id);
    }
}

type Input = {
    id: number;
};

type Output = void;
