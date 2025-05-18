export class StockEvent {
    private constructor(
        private readonly id: number | undefined,
        private date: Date,
        private productId: number,
        private quantity: number,
        private type: string,
    ) {}

    static create(
        date: Date,
        productId: number,
        quantity: number,
        type: string,
    ) {
        return new StockEvent(null, date, productId, quantity, type);
    }

    static restore(
        id: number,
        date: Date,
        productId: number,
        quantity: number,
        type: string,
    ) {
        return new StockEvent(id, date, productId, quantity, type);
    }

    getId() {
        return this.id;
    }

    getDate() {
        return this.date;
    }

    getProductId() {
        return this.productId;
    }

    getQuantity() {
        return this.quantity;
    }

    getType() {
        return this.type;
    }

    setQuantity(quantity: number) {
        this.quantity = quantity;
    }

    setType(type: string) {
        this.type = type;
    }

    setDate(date: Date) {
        this.date = date;
    }

    setProductId(productId: number) {
        this.productId = productId;
    }
}
