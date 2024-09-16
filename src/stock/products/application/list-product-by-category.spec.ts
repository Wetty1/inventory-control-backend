import { Test, TestingModule } from '@nestjs/testing';
import { ListProductByCategory } from './list-product-by-category';

describe('ListProductByCategoryService', () => {
    let service: ListProductByCategory;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ListProductByCategory],
        }).compile();

        service = module.get<ListProductByCategory>(
            ListProductByCategory,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
