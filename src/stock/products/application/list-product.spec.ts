import { Test, TestingModule } from '@nestjs/testing';
import { ListProduct } from './list-product';

describe('ListProductService', () => {
    let service: ListProduct;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ListProduct],
        }).compile();

        service = module.get<ListProduct>(ListProduct);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
