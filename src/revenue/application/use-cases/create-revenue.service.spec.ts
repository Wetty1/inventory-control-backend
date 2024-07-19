import { Test, TestingModule } from '@nestjs/testing';
import { CreateRevenueService } from './create-revenue.service';
import { Revenue } from '../entities/revenue';
import { RevenueMemoryRepository } from '../../../revenue/infra/memory/revenue-memory.repository';
import { RevenueRepository } from '../repositories/revenue.repository';

describe('CreateRevenueService', () => {
    let service: CreateRevenueService;
    const revenueRepository: RevenueRepository = new RevenueMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateRevenueService,
                {
                    provide: 'RevenueRepository',
                    useValue: revenueRepository,
                },
            ],
        }).compile();

        service = module.get<CreateRevenueService>(CreateRevenueService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a new revenue', async () => {
        const newRevenue: Revenue = {
            value: 100,
            date: new Date(),
        };
        const createdRevenue = await service.execute(newRevenue);
        expect(createdRevenue.value).toBe(newRevenue.value);
    });
});
