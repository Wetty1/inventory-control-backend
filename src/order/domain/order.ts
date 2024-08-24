import crypto from 'crypto';
import { OrderItem } from './order-item';

export class Order {
    private constructor(
        readonly id: string,
        readonly total: number,
        readonly numberPhone: string,
        readonly address: string,
        readonly date: Date,
        readonly items: OrderItem[],
    ) {}

    static create(
        total: number,
        numberPhone: string,
        address: string,
        date: Date,
        items: OrderItem[],
    ) {
        const orderId = crypto.randomUUID();
        return new Order(orderId, total, numberPhone, address, date, items);
    }

    static restore(
        id: string,
        total: number,
        numberPhone: string,
        address: string,
        date: Date,
        items: OrderItem[],
    ) {
        return new Order(id, total, numberPhone, address, date, items);
    }
}
