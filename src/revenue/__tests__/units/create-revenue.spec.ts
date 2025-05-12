import { Test, TestingModule } from '@nestjs/testing';
import { CreateRevenue } from '../../application/usecases/create-revenue';
import { Revenue } from '../../domain/entity/revenue';
import { RevenueMemoryRepository } from '../../../revenue/infra/memory/revenue-memory.repository';
import { RevenueRepository } from '../../domain/repository/revenue.repository';

describe('CreateRevenueService', () => {
    let service: CreateRevenue;
    const revenueRepository: RevenueRepository = new RevenueMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateRevenue,
                {
                    provide: 'RevenueRepository',
                    useValue: revenueRepository,
                },
            ],
        }).compile();

        service = module.get<CreateRevenue>(CreateRevenue);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a new revenue', async () => {
        const newRevenue: Revenue = Revenue.create(100, new Date());
        const createdRevenue = await service.execute({
            value: newRevenue.getValue(),
            date: newRevenue.getDate(),
        });
        expect(createdRevenue.getValue()).toBe(newRevenue.getValue());
    });

    it('should throw an error when create a new revenue', async () => {
        await expect(
            service.execute({ value: 0, date: new Date() }),
        ).rejects.toThrowError('Value must be greater than zero');
    });
});
