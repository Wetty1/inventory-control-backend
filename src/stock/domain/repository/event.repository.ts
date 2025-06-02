import { StockEvent } from '../entity/event';

export interface StockEventRepository {
    get(id: number): Promise<StockEvent>;
    save(event: StockEvent): Promise<StockEvent>;
    delete(id: number): Promise<void>;
}
