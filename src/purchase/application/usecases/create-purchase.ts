import { Inject } from '@nestjs/common';
import { Purchase } from 'src/purchase/domain/entity/purchase';
import { PurchaseRepository } from 'src/purchase/domain/repository/purchase.repository';

export class CreatePurchase {
    constructor(
        @Inject('PurchaseRepository')
        private readonly purchaseRepository: PurchaseRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
        const purchase = Purchase.create(input.date, 0, input.supplierId);
        const createdPurchase = await this.purchaseRepository.save(purchase);

        return {
            id: createdPurchase.getId(),
            date: createdPurchase.getDate(),
            supplierId: createdPurchase.getSupplierId(),
        };
    }
}

type Input = {
    date: Date;
    supplierId: number;
};

type Output = {
    id: number;
    date: Date;
    supplierId: number;
};
