import { Order } from '../domain/order';
import { OrderRepository } from '../domain/order-repoository';

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

export class CreateProduct {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(input: Input): Promise<Output> {
        const output = await this.orderRepository.saveOrder(
            Order.create(
                input.total,
                input.numberPhone,
                input.address,
                input.date,
                input.items,
            ),
        );

        return {
            id: output.id,
        };
    }
}
