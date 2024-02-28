import { EventStoreGatewayInterface } from '../interfaces/event-store-gateway.interface';
import { Event } from '../../entities/event';
import { ProductStoreGateway } from 'src/stock/products/gateways/interfaces/product-store-gateway.interface';

export class EventStoreMemory implements EventStoreGatewayInterface {
    private events: Event[];
    private productsGateway: ProductStoreGateway;

    constructor(productGateway) {
        this.events = [];
        this.productsGateway = productGateway;
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
        const events = this.events.filter((event) => event.productId === productId);
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
