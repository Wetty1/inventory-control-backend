import { EventRepository } from '../../domain/repositories/event-store-gateway.interface';
import { Event } from '../../domain/entities/event';

export class EventMemoryRepository implements EventRepository {
    private events: Event[];

    constructor() {
        this.events = [];
    }

    async get(id: number): Promise<Event> {
        const event = this.events.find((event) => event.id === id);
        return Promise.resolve(event);
    }

    async update(event: Event): Promise<Event> {
        const index = this.events.findIndex((event) => event.id === event.id);
        this.events[index] = event;
        return Promise.resolve(event);
    }
    async delete(id: number): Promise<void> {
        this.events.splice(
            this.events.findIndex((event) => event.id === id),
            1,
        );
        return Promise.resolve();
    }
    async list(): Promise<Event[]> {
        const events = this.events;
        return Promise.resolve(events);
    }
    async listByProduct(productId: number): Promise<Event[]> {
        const eventFiltered = this.events.filter(
            (event) => event.productId === productId,
        );
        return Promise.resolve(eventFiltered);
    }
    async balanceByProduct(productId: number): Promise<number> {
        const events = this.events.filter(
            (event) => event.productId === productId,
        );
        const quantity = events.reduce((acc, event) => {
            return event.type === 'entrada'
                ? acc + event.quantity
                : acc - event.quantity;
        }, 0);

        return Promise.resolve(quantity);
    }

    async create(event: Event): Promise<Event> {
        this.events.push(event);
        return Promise.resolve(event);
    }
}
