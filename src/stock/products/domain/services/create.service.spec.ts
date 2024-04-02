import { Test, TestingModule } from '@nestjs/testing';
import { CreateService } from './create.service';
import { Product } from '../entities/product';
import { ProductMemoryRepository } from '../../infra/memory/product-memory.repository';

describe('CreateService', () => {
    let service: CreateService;
    const productStoreGateway: ProductMemoryRepository =
        new ProductMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateService,
                {
                    provide: 'ProductRepository',
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
