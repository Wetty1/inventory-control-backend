export class OrderItem {
    private constructor(
        public readonly id: string,
        public readonly orderId: string,
        public readonly quantity: number,
        public readonly description: string,
        public readonly unitValue: number = 0,
        public readonly totalValue: number = 0,
    ) {}

    static create(
        orderId: string,
        quantity: number,
        description: string,
        unitValue: number,
    ) {
        const id = crypto.randomUUID();
        const totalValue = unitValue * quantity;
        return new OrderItem(
            id,
            orderId,
            quantity,
            description,
            unitValue,
            totalValue,
        );
    }

    static restore(
        id: string,
        orderId: string,
        quantity: number,
        description: string,
        unitValue: number,
        totalValue: number,
    ) {
        return new OrderItem(
            id,
            orderId,
            quantity,
            description,
            unitValue,
            totalValue,
        );
    }
}
