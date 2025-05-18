import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { StockEvent } from 'src/stock/domain/entity/event';

@Entity('events')
export class StockEventTypeorm {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    date: Date;
    @Column()
    productId: number;
    @Column()
    purchaseId?: number;
    @Column()
    quantity: number;
    @Column()
    type: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    static from(stockEvent: StockEvent): StockEventTypeorm {
        const stockEventTypeorm = new StockEventTypeorm();
        stockEventTypeorm.id = stockEvent.getId();
        stockEventTypeorm.date = stockEvent.getDate();
        stockEventTypeorm.productId = stockEvent.getProductId();
        stockEventTypeorm.quantity = stockEvent.getQuantity();
        stockEventTypeorm.type = stockEvent.getType();
        return stockEventTypeorm;
    }

    static to(stockEventTypeorm: StockEventTypeorm): StockEvent {
        return StockEvent.restore(
            stockEventTypeorm.id,
            stockEventTypeorm.date,
            stockEventTypeorm.productId,
            stockEventTypeorm.quantity,
            stockEventTypeorm.type,
        );
    }
}
