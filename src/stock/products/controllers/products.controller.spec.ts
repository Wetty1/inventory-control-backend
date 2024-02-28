import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { CreateService } from '../services/create.service';
import { ProductStoreGateway } from '../gateways/interfaces/product-store-gateway.interface';
import { ProductStoreMemoryLocal } from '../gateways/implementations/product-store-memory-local';
import { UpdateService } from '../services/update.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  const productStoreGateway: ProductStoreGateway =
    new ProductStoreMemoryLocal();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        CreateService,
        UpdateService,
        {
          provide: 'ProductStoreGateway',
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
