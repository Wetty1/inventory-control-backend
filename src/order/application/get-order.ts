import { Inject, Logger } from '@nestjs/common';
import { Order } from '../domain/order';
import { OrderRepository } from '../domain/order-repository';

export class GetOrderUseCase {
    logger = new Logger('GetOrderUseCase');
    constructor(
        @Inject('OrderRepository')
        private readonly orderRepository: OrderRepository,
    ) {}
    async execute(id: string): Promise<Order> {
        const order = await this.orderRepository.findById(id);
        if (!order) {
            throw new Error('Order not found');
        }
        this.logger.log(JSON.stringify(order));
        return order;
    }
}
