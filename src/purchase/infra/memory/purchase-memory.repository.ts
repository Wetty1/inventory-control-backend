import { Purchase } from 'src/purchase/domain/entities/purchase';
import { PurchaseRepository } from 'src/purchase/domain/repositories/purchase.repository';

export class PurchaseMemoryRepository implements PurchaseRepository {
    purchases: Purchase[] = [];

    constructor() {}

    async create(newPurchase: Purchase): Promise<Purchase> {
        this.purchases.push(newPurchase);
        return newPurchase;
    }
}
