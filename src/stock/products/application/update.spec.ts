import { Test, TestingModule } from '@nestjs/testing';
import { UpdateProduct } from './update';

describe('UpdateService', () => {
    let service: UpdateProduct;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UpdateProduct],
        }).compile();

        service = module.get<UpdateProduct>(UpdateProduct);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
