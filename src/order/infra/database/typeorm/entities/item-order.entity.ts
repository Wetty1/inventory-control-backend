import { OrderItem } from 'src/order/domain/order-item';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { OrderTypeorm } from './order.entity';

@Entity('item_order')
export class OrderItemTypeorm implements OrderItem {
    @PrimaryColumn()
    id: string;

    @Column()
    orderId: string;

    @Column()
    quantity: number;

    @Column()
    description: string;

    @Column()
    unitValue: number;

    @Column()
    totalValue: number;

    @ManyToOne(() => OrderTypeorm, (order) => order.items)
    order: OrderTypeorm;
}
