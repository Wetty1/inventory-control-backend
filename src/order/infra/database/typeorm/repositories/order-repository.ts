import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/order/domain/order';
import { Repository } from 'typeorm';
import { OrderTypeorm } from '../entities/order.entity';
import { OrderRepository } from 'src/order/domain/order-repository';
import { Injectable } from '@nestjs/common';
import { OrderItemTypeorm } from '../entities/item-order.entity';

@Injectable()
export class OrderTypeormRepository implements OrderRepository {
    constructor(
        @InjectRepository(OrderTypeorm)
        private readonly repository: Repository<OrderTypeorm>,
        @InjectRepository(OrderItemTypeorm)
        private readonly orderItemRepository: Repository<OrderItemTypeorm>,
    ) {}
    async findById(id: string): Promise<Order> {
        const orderTypeorm = await this.repository.findOne({
            where: { id },
            relations: ['items'],
        });
        if (!orderTypeorm) {
            throw new Error('Order not found');
        } else {
            return orderTypeorm.toOrderDomain();
        }
    }

    async saveOrder(order: Order): Promise<Order> {
        const orderTypeorm = this.repository.create(order);
        const orderCreated = await this.repository.save(orderTypeorm);

        const itemsOrderCreated: OrderItemTypeorm[] = [];
        for (const item of order.items) {
            itemsOrderCreated.push(
                this.orderItemRepository.create({
                    ...item,
                    orderId: orderCreated.id,
                }),
            );
        }
        await this.orderItemRepository.save(itemsOrderCreated);
        return order;
    }
}
