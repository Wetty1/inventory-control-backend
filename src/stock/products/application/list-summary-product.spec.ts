import { Test, TestingModule } from '@nestjs/testing';
import { ListSummaryProduct } from './list-summary-product';

describe('ListSummaryProductService', () => {
    let service: ListSummaryProduct;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ListSummaryProduct],
        }).compile();

        service = module.get<ListSummaryProduct>(
            ListSummaryProduct,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
