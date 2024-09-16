import { Test, TestingModule } from '@nestjs/testing';
import { GetOneProduct } from './get-one-product';

describe('GetOneProductService', () => {
    let service: GetOneProduct;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GetOneProduct],
        }).compile();

        service = module.get<GetOneProduct>(GetOneProduct);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
