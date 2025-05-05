import { Test, TestingModule } from '@nestjs/testing';
import { CreateProduct } from 'src/catalog/application/usecases/create-product';
import { ProductInMemoryRepository } from 'src/catalog/infra/database/in-memory/product.repository';

describe('CreateProduct', () => {
    let service: CreateProduct;
    const productRepository = new ProductInMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateProduct,
                {
                    provide: 'ProductRepository',
                    useValue: productRepository,
                },
            ],
        }).compile();

        service = module.get<CreateProduct>(CreateProduct);
    });
    it('should create a product', async () => {
        const input = {
            name: 'arroz',
            categoryId: 1,
        };
        const output = await service.execute(input);
        expect(output).toHaveProperty('id');
        expect(output).toHaveProperty('name', 'arroz');
    });
});
