import { Test, TestingModule } from '@nestjs/testing';
import { CreateProduct } from './create';
import { Product } from '../domain/product';
import { ProductMemoryRepository } from '../infra/memory/product-memory.repository';

describe('CreateService', () => {
    let service: CreateProduct;
    const productStoreGateway: ProductMemoryRepository =
        new ProductMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateProduct,
                {
                    provide: 'ProductRepository',
                    useValue: productStoreGateway,
                },
            ],
        }).compile();

        service = module.get<CreateProduct>(CreateProduct);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a new product', async () => {
        const product: Product = {
            name: 'Bebida',
            categoryId: 1,
        };

        const createdProduct = await service.execute(product);
        expect(createdProduct).toEqual(product);
    });
});
