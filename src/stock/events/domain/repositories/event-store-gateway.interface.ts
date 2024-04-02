import { Event } from '../../domain/entities/event';

export interface EventRepository {
    create(event: Event): Promise<Event>;
    delete(id: number): Promise<void>;
    list(): Promise<Event[]>;
    listByProduct(productId: number): Promise<Event[]>;
    balanceByProduct(productId: number): Promise<number>;
}
