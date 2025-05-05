import { Test, TestingModule } from '@nestjs/testing';
import { SupplyInMemoryRepository } from '../infra/database/in-memory/supply.repository';

describe('CreateSupply', () => {
    let service: CreateProduct;
    const supplyRepository = new SupplyInMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateProduct,
                {
                    provide: 'SupplyRepository',
                    useValue: supplyRepository,
                },
            ],
        }).compile();

        service = module.get<CreateProduct>(CreateProduct);
    });
    it('should create a supply', async () => {
        const input = {
            name: 'arroz',
            categoryId: 'id da categoria',
        };
        const output = await service.execute(input);
        expect(output).toHaveProperty('id');
        expect(output).toHaveProperty('name', 'arroz');
    });
});
