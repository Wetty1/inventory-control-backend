import { Test, TestingModule } from '@nestjs/testing';
import { ListExtractProduct } from './list-extract-product';

describe('ListExtractProductService', () => {
    let service: ListExtractProduct;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ListExtractProduct],
        }).compile();

        service = module.get<ListExtractProduct>(
            ListExtractProduct,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
