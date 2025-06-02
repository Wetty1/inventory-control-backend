import { ItemPurchase } from 'src/purchase/domain/entity/item-purchase';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('items_purchases')
export class ItemPurchaseTypeorm {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    date: Date;
    @Column()
    purchaseId: number;
    @Column()
    productId: number;
    @Column()
    quantity: number;
    @Column({ type: 'numeric', precision: 2 })
    unitValue: number;
    @Column({ type: 'numeric', precision: 2 })
    totalValue: number;
    @Column()
    supplierId: number;
    @Column()
    stockEventId?: number;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    static from(itemPurchase: ItemPurchase): ItemPurchaseTypeorm {
        const itemPurchaseTypeorm = new ItemPurchaseTypeorm();
        itemPurchaseTypeorm.id = itemPurchase.getId();
        itemPurchaseTypeorm.purchaseId = itemPurchase.getPurchaseId();
        itemPurchaseTypeorm.date = itemPurchase.getDate();
        itemPurchaseTypeorm.productId = itemPurchase.getProductId();
        itemPurchaseTypeorm.quantity = itemPurchase.getQuantity();
        itemPurchaseTypeorm.unitValue = itemPurchase.getUnitValue();
        itemPurchaseTypeorm.totalValue = itemPurchase.getTotalValue();
        itemPurchaseTypeorm.supplierId = itemPurchase.getSupplierId();
        itemPurchaseTypeorm.stockEventId = itemPurchase.getStockEventId();
        return itemPurchaseTypeorm;
    }

    static to(itemPurchaseTypeorm: ItemPurchaseTypeorm): ItemPurchase {
        return ItemPurchase.restore(
            itemPurchaseTypeorm.id,
            itemPurchaseTypeorm.purchaseId,
            itemPurchaseTypeorm.date,
            itemPurchaseTypeorm.productId,
            itemPurchaseTypeorm.quantity,
            itemPurchaseTypeorm.unitValue,
            itemPurchaseTypeorm.totalValue,
            itemPurchaseTypeorm.supplierId,
            itemPurchaseTypeorm.stockEventId,
        );
    }
}
