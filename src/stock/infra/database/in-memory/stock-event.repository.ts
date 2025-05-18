import { StockEvent } from 'src/stock/domain/entity/event';
import { StockEventRepository } from 'src/stock/domain/repository/event.repository';

export class StockEventInMemoryRepository implements StockEventRepository {
    private stockEvents: StockEvent[];

    constructor() {
        this.stockEvents = [];
    }

    async save(stockEvent: StockEvent): Promise<StockEvent> {
        return new Promise((resolve) => {
            const index = this.stockEvents.findIndex(
                (stockEvent) => stockEvent.getId() === stockEvent.getId(),
            );
            if (index > -1) {
                this.stockEvents[index] = stockEvent;
            } else {
                this.stockEvents.push(stockEvent);
            }

            return resolve(stockEvent);
        });
    }

    async get(id: number): Promise<StockEvent> {
        const stockEvent = this.stockEvents.find(
            (value) => value.getId() === id,
        );
        return Promise.resolve(stockEvent);
    }

    async delete(id: number): Promise<void> {
        new Promise((resolve) => {
            this.stockEvents.splice(
                this.stockEvents.findIndex(
                    (stockEvent) => stockEvent.getId() === id,
                ),
                1,
            );
            resolve(null);
        });
    }
    async list(): Promise<StockEvent[]> {
        const stockEvents = this.stockEvents;
        return Promise.resolve(stockEvents);
    }
    async listBySupply(productId: number): Promise<StockEvent[]> {
        const stockEventFiltered = this.stockEvents.filter(
            (stockEvent) => stockEvent.getProductId() === productId,
        );
        return Promise.resolve(stockEventFiltered);
    }
}
