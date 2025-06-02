import { Purchase } from '../entity/purchase';

export interface PurchaseRepository {
    save(newPurchase: Purchase): Promise<Purchase>;
    delete(id: number): Promise<void>;
    get(id: number): Promise<Purchase>;
}
