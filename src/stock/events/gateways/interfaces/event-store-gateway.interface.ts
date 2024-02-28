import { Event } from '../../entities/event';

export interface EventStoreGatewayInterface {
    create(event: Event): Promise<Event>;
    delete(id: number): Promise<void>;
    list(): Promise<Event[]>;
    listByProduct(productId: number): Promise<Event[]>;
    balanceByProduct(productId: number): Promise<number>;
}
