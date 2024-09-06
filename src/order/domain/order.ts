import { OrderItem } from './order-item';

export class Order {
    // private total: number;

    private constructor(
        public readonly id: string,
        public total: number = 0,
        public numberPhone: string,
        public address: string,
        public date: Date,
        public items: OrderItem[],
    ) {}

    static create(
        total: number,
        numberPhone: string,
        address: string,
        date: Date,
    ) {
        const id = crypto.randomUUID();
        const items: OrderItem[] = [];
        return new Order(id, total, numberPhone, address, date, items);
    }

    static restore(
        id: string,
        total: number,
        numberPhone: string,
        address: string,
        date: Date,
        items: OrderItem[],
    ) {
        return new Order(id, total, numberPhone, address, date, items);
    }

    addItem(item: {
        orderId: string;
        quantity: number;
        description: string;
        unitValue: number;
    }) {
        this.items.push(
            OrderItem.create(
                item.orderId,
                item.quantity,
                item.description,
                item.unitValue,
            ),
        );
    }

    calculateTotal() {
        let total = 0;
        this.items.forEach((item) => {
            total += item.totalValue;
        });
        this.total = total;
    }
}
