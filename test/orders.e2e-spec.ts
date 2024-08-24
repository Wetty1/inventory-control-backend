import axios from 'axios';
import { OrderItem } from 'src/order/domain/order-item';

test('shoudld create a new order', async () => {
    const inputCheckout = {
        total: 100,
        numberPhone: '123456789',
        address: 'Rua Teste, 123',
        date: new Date(),
        items: [
            {
                productId: '123',
                quantity: 1,
                description:
                    'arroz branco, salada de maionese, carne de porco, batata palha',
                unitValue: 9,
                totalValue: 9,
            },
        ],
    };

    const responseCheckout = await axios.post(
        'http://localhost:3000/order',
        inputCheckout,
    );

    const outputCheckout = responseCheckout.data;

    expect(outputCheckout.id).toBeDefined();

    const responseGetOrder = await axios.get(
        `http://localhost:3000/order/${outputCheckout.id}`,
    );
    const outputGetOrder = responseGetOrder.data;

    expect(outputGetOrder.id).toEqual(outputCheckout.id);
});
