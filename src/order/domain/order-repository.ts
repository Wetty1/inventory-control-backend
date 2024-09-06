import { Order } from './order';

export interface OrderRepository {
    saveOrder(order: Order): Promise<Order>;
    findById(id: string): Promise<Order>;
}
