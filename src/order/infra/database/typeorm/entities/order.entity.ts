import { OrderItem } from 'src/order/domain/order-item';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { OrderItemTypeorm } from './item-order.entity';
import { Order } from 'src/order/domain/order';

@Entity('orders')
export class OrderTypeorm {
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    total: number;

    @Column()
    numberPhone: string;

    @Column()
    address: string;

    @Column()
    date: Date;

    @OneToMany(
        () => OrderItemTypeorm,
        (orderItemTypeorm) => orderItemTypeorm.order,
    )
    items: OrderItem[];

    toOrderDomain(): Order {
        return Order.restore(
            this.id,
            this.total,
            this.numberPhone,
            this.address,
            this.date,
            this.items.map((item) => {
                return OrderItem.restore(
                    item.id,
                    item.orderId,
                    item.quantity,
                    item.description,
                    item.unitValue,
                    item.totalValue,
                );
            }),
        );
    }
}
