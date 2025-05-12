import { StockEvent } from '../entity/event';

export interface StockEventRepository {
    get(id: number): Promise<StockEvent>;
    save(event: any): Promise<void>;
    delete(id: string): Promise<void>;
}
