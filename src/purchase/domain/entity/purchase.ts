export class Purchase {
    private constructor(
        private id: number | undefined,
        private date: Date,
        private volume: number,
        private totalValue: number,
        private supplierId: number,
    ) {
        this.id = id;
        this.date = date;
        this.volume = volume;
        this.totalValue = totalValue;
        this.supplierId = supplierId;
    }

    static create(date: Date, volume: number, supplierId: number) {
        if (!date) {
            throw new Error('Date is required');
        }
        if (!supplierId) {
            throw new Error('Supplier is required');
        }
        return new Purchase(null, date, volume, 0, supplierId);
    }

    static restore(
        id: number,
        date: Date,
        volume: number,
        totalValue: number,
        supplierId: number,
    ) {
        return new Purchase(id, date, volume, totalValue, supplierId);
    }

    getId() {
        return this.id;
    }

    getDate() {
        return this.date;
    }

    getVolume() {
        return this.volume;
    }

    getTotalValue() {
        return this.totalValue;
    }

    getSupplierId() {
        return this.supplierId;
    }

    setDate(date: Date) {
        this.date = date;
    }

    setVolume(volume: number) {
        this.volume = volume;
    }

    setTotalValue(totalValue: number) {
        this.totalValue = totalValue;
    }

    setSupplierId(supplierId: number) {
        this.supplierId = supplierId;
    }
}
