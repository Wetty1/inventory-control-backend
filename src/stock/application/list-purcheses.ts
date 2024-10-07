import { Inject } from '@nestjs/common';
import { PurchaseRepository } from '../domain/purchase.repository';

export class ListPurchases {
    constructor(
        @Inject('PurchaseRepository')
        private readonly purchaseRepository: PurchaseRepository,
    ) {}

    async execute() {
        return this.purchaseRepository.list();
    }
}
