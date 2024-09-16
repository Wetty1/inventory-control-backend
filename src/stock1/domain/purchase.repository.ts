import { Purchase } from './purchase';

export interface PurchaseRepository {
    save(newPurchase: Purchase): Promise<Purchase>;
    delete(id: string): Promise<void>;
    get(id: string): Promise<Purchase>;
    list(): Promise<Purchase[]>;
    listBySupply(supplyId: string): Promise<Purchase[]>;
}
