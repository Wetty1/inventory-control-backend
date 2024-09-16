import { Test, TestingModule } from '@nestjs/testing';
import { DeleteProduct } from './delete';

describe('DeleteService', () => {
    let service: DeleteProduct;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DeleteProduct],
        }).compile();

        service = module.get<DeleteProduct>(DeleteProduct);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
