import { Category } from 'src/stock/categories/domain/category';
import { Product } from './product';

describe('Product', () => {
    it('Deve criar um produto', async () => {
        const category = Category.create('Grãos');

        const input = {
            name: 'Arroz Alteza tipo 1 1kg',
            category,
            date: new Date(),
        };

        const product = Product.create(input.name, input.category);

        expect(product.id).toBeDefined();
    });
});
