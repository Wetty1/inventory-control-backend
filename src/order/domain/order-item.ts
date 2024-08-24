import crypto from 'crypto';

export class OrderItem {
    private constructor(
        public readonly orderItemId: string,
        public readonly productId: string,
        public readonly quantity: number,
        public readonly description: number,
        public readonly unitValue: number = 0,
        public readonly totalValue: number = 0,
    ) {}

    static create(
        productId: string,
        quantity: number,
        description: number,
        unitValue: number,
        totalValue: number,
    ) {
        const orderItemId = crypto.randomUUID();
        totalValue = unitValue * quantity;
        return new OrderItem(
            orderItemId,
            productId,
            quantity,
            description,
            unitValue,
            totalValue,
        );
    }

    static restore(
        orderItemId: string,
        productId: string,
        quantity: number,
        description: number,
        unitValue: number,
        totalValue: number,
    ) {
        return new OrderItem(
            orderItemId,
            productId,
            quantity,
            description,
            unitValue,
            totalValue,
        );
    }
}
