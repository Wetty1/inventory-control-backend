import { Purchase } from 'src/purchase/domain/entity/purchase';
import { PurchaseRepository } from 'src/purchase/domain/repository/purchase.repository';

export class PurchaseInMemoryRepository implements PurchaseRepository {
    purchases: Purchase[] = [];

    constructor() {}

    async save(newPurchase: Purchase): Promise<Purchase> {
        this.purchases.push(newPurchase);
        return newPurchase;
    }

    delete(id: number): Promise<void> {
        const purchase = this.purchases.find((purchase) => purchase.id === id);
        this.purchases.splice(this.purchases.indexOf(purchase), 1);
        return Promise.resolve();
    }
    get(id: number): Promise<Purchase> {
        const purchase = this.purchases.find((purchase) => purchase.id === id);
        return Promise.resolve(purchase);
    }
    // list(): Promise<Purchase[]> {
    //     throw new Error('Method not implemented.');
    // }
    // listBySupply(supplyId: number): Promise<Purchase[]> {
    //     const purchases = this.purchases.filter(
    //         (purchase) => purchase.getSupplierId() === supplyId,
    //     );

    //     return Promise.resolve(purchases);
    // }
}
