import { Event } from '../../domain/entities/event';

export interface EventRepository {
    create(event: Event): Promise<Event>;
    delete(id: number): Promise<void>;
    get(id: number): Promise<Event>;
    list(): Promise<Event[]>;
    listByProduct(productId: number): Promise<Event[]>;
    balanceByProduct(productId: number): Promise<number>;
    update(event: Event): Promise<Event>;
}
