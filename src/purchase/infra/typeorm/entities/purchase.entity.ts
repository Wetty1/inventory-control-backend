import { Purchase } from 'src/purchase/domain/entity/purchase';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('purchases')
export class PurchaseTypeorm {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    date: Date;
    @Column()
    volume: number;
    @Column({ type: 'numeric', precision: 2 })
    totalValue: number;
    @Column()
    supplierId: number;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    static from(purchase: Purchase): PurchaseTypeorm {
        const purchaseEventTypeorm = new PurchaseTypeorm();
        purchaseEventTypeorm.id = purchase.getId();
        purchaseEventTypeorm.date = purchase.getDate();
        purchaseEventTypeorm.volume = purchase.getVolume();
        purchaseEventTypeorm.totalValue = purchase.getTotalValue();
        purchaseEventTypeorm.supplierId = purchase.getSupplierId();
        return purchaseEventTypeorm;
    }

    static to(purchase: PurchaseTypeorm): Purchase {
        return Purchase.restore(
            purchase.id,
            purchase.date,
            purchase.volume,
            purchase.totalValue,
            purchase.supplierId,
        );
    }
}
