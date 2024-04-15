import { Purchase } from 'src/purchase/domain/entities/purchase';
import { PurchaseRepository } from 'src/purchase/domain/repositories/purchase.repository';

export class PurchaseMemoryRepository implements PurchaseRepository {
    purchases: Purchase[] = [];

    constructor() {}
    update(purchase: Purchase): Promise<Purchase> {
        throw new Error('Method not implemented.');
    }

    async create(newPurchase: Purchase): Promise<Purchase> {
        this.purchases.push(newPurchase);
        return newPurchase;
    }
}
