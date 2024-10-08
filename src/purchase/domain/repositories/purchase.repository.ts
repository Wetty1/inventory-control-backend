import { Purchase } from '../entities/purchase';

export interface PurchaseRepository {
    create(newPurchase: Purchase): Promise<Purchase>;
    update(purchase: Purchase): Promise<Purchase>;
}
