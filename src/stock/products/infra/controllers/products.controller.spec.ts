import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductRepository } from '../../domain/Repositories/product.repository';
import { CreateService } from '../../domain/services/create.service';
import { UpdateService } from '../../domain/services/update.service';
import { ProductMemoryRepository } from '../memory/product-memory.repository';

describe('ProductsController', () => {
    let controller: ProductsController;
    const productStoreGateway: ProductRepository =
        new ProductMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductsController],
            providers: [
                CreateService,
                UpdateService,
                {
                    provide: 'ProductRepository',
                    useValue: productStoreGateway,
                },
            ],
        }).compile();

        controller = module.get<ProductsController>(ProductsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
