import { Inject } from '@nestjs/common';
import { Order } from '../domain/order';
import { OrderRepository } from '../domain/order-repository';

type Input = {
    total: number;
    numberPhone: string;
    address: string;
    date: Date;
    items: any[];
};

type Output = {
    id: string;
};

export class CreateOrderUseCase {
    constructor(
        @Inject('OrderRepository')
        private readonly orderRepository: OrderRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
        const order = Order.create(
            input.total,
            input.numberPhone,
            input.address,
            input.date,
        );

        for (const item of input.items) {
            order.addItem(item);
        }

        const output = await this.orderRepository.saveOrder(order);

        return {
            id: output.id,
        };
    }
}
