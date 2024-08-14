import { CreateProduct } from 'src/@refactory/create-product';
import { ProductInMemoryRepository } from 'src/@refactory/product-in-memory-repository';

it('Deve criar um produto', async () => {
    const input = {
        name: 'Arroz Alteza tipo 1 1kg',
        price: 4.85,
        category: 'Grãos',
        quantity: 10,
        date: new Date(),
    };
    const productRepository = new ProductInMemoryRepository();
    const createProduct = new CreateProduct(productRepository);
    const output = await createProduct.execute(input);
    expect(output.id).toBeDefined();
});

it('Deve retornar um erro se o nome já existir na base', async () => {
    const productRepository = new ProductInMemoryRepository();
    const createProduct = new CreateProduct(productRepository);

    const input = {
        name: 'Arroz Alteza tipo 1 1kg',
        price: 4.85,
        category: 'Grãos',
        quantity: 10,
        date: new Date(),
    };

    await createProduct.execute(input);
    await expect(() => createProduct.execute(input)).rejects.toThrow(
        'Product already exists',
    );
});
