import { Purchase } from 'src/stock1/domain/purchase';
import { PurchaseRepository } from 'src/stock1/domain/purchase.repository';

export class PurchaseInMemoryRepository implements PurchaseRepository {
    purchases: Purchase[] = [];

    constructor() {}

    async save(newPurchase: Purchase): Promise<Purchase> {
        this.purchases.push(newPurchase);
        return newPurchase;
    }

    delete(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    get(id: string): Promise<Purchase> {
        const purchase = this.purchases.find((purchase) => purchase.id === id);
        return Promise.resolve(purchase);
    }
    list(): Promise<Purchase[]> {
        throw new Error('Method not implemented.');
    }
    listBySupply(supplyId: string): Promise<Purchase[]> {
        throw new Error('Method not implemented.');
    }
}
