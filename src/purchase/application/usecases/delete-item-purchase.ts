import { Inject, Injectable } from '@nestjs/common';
import { ItemPurchaseRepository } from 'src/purchase/domain/repository/item-purchase.repository';

@Injectable()
export class DeleteItemPurchase {
    constructor(
        @Inject('ItemPurchaseRepository')
        private readonly itemPurchaseRepository: ItemPurchaseRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
        const { id } = input;

        await this.itemPurchaseRepository.delete(id);
    }
}

type Input = {
    id: number;
};

type Output = void;
