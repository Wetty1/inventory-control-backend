export class Order {
    private constructor(
        readonly id: string,
        readonly total: number,
        readonly numberPhone: string,
        readonly address: string,
        readonly date: Date,
        readonly items: string[],
    ) {}

    static create(
        total: number,
        numberPhone: string,
        address: string,
        date: Date,
        items: string[],
    ) {
        const orderId =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
        return new Order(orderId, total, numberPhone, address, date, items);
    }

    static restore(
        id: string,
        total: number,
        numberPhone: string,
        address: string,
        date: Date,
        items: string[],
    ) {
        return new Order(id, total, numberPhone, address, date, items);
    }
}
