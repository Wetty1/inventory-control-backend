export class ItemPurchase {
    constructor(
        private id: number | undefined,
        private purchaseId: number,
        private date: Date,
        private productId: number,
        private quantity: number,
        private unitValue: number,
        private totalValue: number,
        private supplierId: number,
        private stockEventId?: number,
    ) {
        this.id = id;
        this.purchaseId = purchaseId;
        this.date = date;
        this.productId = productId;
        this.quantity = quantity;
        this.unitValue = unitValue;
        this.totalValue = totalValue;
        this.supplierId = supplierId;
        this.stockEventId = stockEventId;
    }

    static create(
        purchaseId: number,
        productId: number,
        date: Date,
        quantity: number,
        unitValue: number,
        supplierId: number,
    ) {
        return new ItemPurchase(
            null,
            purchaseId,
            date,
            productId,
            quantity,
            unitValue,
            quantity * unitValue,
            supplierId,
        );
    }

    static restore(
        id: number,
        purchaseId: number,
        date: Date,
        productId: number,
        quantity: number,
        unitValue: number,
        totalValue: number,
        supplierId: number,
        stockEventId?: number,
    ) {
        return new ItemPurchase(
            id,
            purchaseId,
            date,
            productId,
            quantity,
            unitValue,
            totalValue,
            supplierId,
            stockEventId,
        );
    }

    getId() {
        return this.id;
    }

    getPurchaseId() {
        return this.purchaseId;
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

    getTotalValue() {
        return this.totalValue;
    }

    getUnitValue() {
        return this.unitValue;
    }

    getSupplierId() {
        return this.supplierId;
    }

    getStockEventId() {
        return this.stockEventId;
    }

    setStockEventId(stockEventId: number) {
        this.stockEventId = stockEventId;
    }
}
