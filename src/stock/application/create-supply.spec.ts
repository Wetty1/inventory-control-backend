import { Test, TestingModule } from '@nestjs/testing';
import { CreateSupply } from './create-supply';
import { SupplyInMemoryRepository } from '../infra/database/in-memory/supply.repository';

describe('CreateSupply', () => {
    let service: CreateSupply;
    const supplyRepository = new SupplyInMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateSupply,
                {
                    provide: 'SupplyRepository',
                    useValue: supplyRepository,
                },
            ],
        }).compile();

        service = module.get<CreateSupply>(CreateSupply);
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
