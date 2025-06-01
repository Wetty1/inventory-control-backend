import { ItemPurchase } from '../entity/item-purchase';

export interface ItemPurchaseRepository {
    save(item: ItemPurchase): Promise<ItemPurchase>;
    delete(id: number): Promise<void>;
    get(id: number): Promise<ItemPurchase>;
}
