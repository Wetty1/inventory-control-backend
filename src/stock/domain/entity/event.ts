export class StockEvent {
    private constructor(
        private readonly id: number | undefined,
        private date: Date,
        private productId: number,
        private quantity: number,
        private type: 'out' | 'in',
        private unitMeasurement: string,
    ) {}

    static create(
        date: Date,
        productId: number,
        quantity: number,
        type: 'out' | 'in',
        unitMeasurement: string,
    ) {
        return new StockEvent(
            null,
            date,
            productId,
            quantity,
            type,
            unitMeasurement,
        );
    }

    static restore(
        id: number,
        date: Date,
        productId: number,
        quantity: number,
        type: 'out' | 'in',
        unitMeasurement: string,
    ) {
        return new StockEvent(
            id,
            date,
            productId,
            quantity,
            type,
            unitMeasurement,
        );
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

    getUnitMeasurement() {
        return this.unitMeasurement;
    }

    setQuantity(quantity: number) {
        this.quantity = quantity;
    }

    setType(type: 'out' | 'in') {
        this.type = type;
    }

    setUnitMeasurement(unitMeasurement: string) {
        this.unitMeasurement = unitMeasurement;
    }

    setDate(date: Date) {
        this.date = date;
    }

    setProductId(productId: number) {
        this.productId = productId;
    }
}
