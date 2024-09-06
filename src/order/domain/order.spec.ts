import { Order } from './order';

describe('Order', () => {
    it('should create a order', () => {
        const order = Order.create(1, '2', 'a', new Date());
        expect(order).toBeTruthy();
    });

    it('should restore a order', () => {
        const order = Order.restore('id', 1, '2', 'a', new Date(), []);
        expect(order).toBeTruthy();
    });

    it('should add items to order', () => {
        const order = Order.restore('id', 1, '2', 'a', new Date(), []);
        const newItem = {
            orderId: order.id,
            quantity: 1,
            description: 'teste',
            unitValue: 1,
        };
        order.addItem(newItem);
        expect(order.items).toHaveLength(1);
    });

    it('should calculate total value', () => {
        const order = Order.restore('id', 1, '2', 'a', new Date(), []);
        const newItem1 = {
            orderId: order.id,
            quantity: 1,
            description: 'teste',
            unitValue: 1,
        };
        const newItem2 = {
            orderId: order.id,
            quantity: 2,
            description: 'teste',
            unitValue: 2,
        };
        order.addItem(newItem1);
        order.addItem(newItem2);
        order.calculateTotal();
        expect(order.total).toBe(5);
    });
});
