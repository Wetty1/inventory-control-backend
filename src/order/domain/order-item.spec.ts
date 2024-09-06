import { OrderItem } from './order-item';

describe('OrderItem', () => {
    it('should create a order item', () => {
        const orderItem = OrderItem.create('id', 1, 'teste', 3);
        expect(orderItem).toBeTruthy();
    });

    it('should restore a order item', () => {
        const orderItem = OrderItem.restore('id', 'id', 1, 'teste', 3, 3);
        expect(orderItem).toBeTruthy();
    });

    it('should calculate total value', () => {
        const orderItem = OrderItem.create('id', 2, 'teste', 3);
        expect(orderItem.totalValue).toBe(6);
    });
});
