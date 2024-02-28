import { Test, TestingModule } from '@nestjs/testing';
import { CreateService } from './create.service';
import { Product } from '../entities/product';
import { ProductStoreMemoryLocal } from '../gateways/implementations/product-store-memory-local';

describe('CreateService', () => {
    let service: CreateService;
    const productStoreGateway: ProductStoreMemoryLocal =
        new ProductStoreMemoryLocal();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateService,
                {
                    provide: 'ProductStoreGateway',
                    useValue: productStoreGateway,
                },
            ],
        }).compile();

        service = module.get<CreateService>(CreateService);
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
