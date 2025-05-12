import { Test, TestingModule } from '@nestjs/testing';
import { RevenueController } from './revenue.controller';
import { CreateRevenueService } from '../domain/services/create-revenue.service';
import { RevenueMemoryRepository } from './memory/revenue-memory.repository';

describe('RevenueController', () => {
    let controller: RevenueController;
    const revenueRepository = new RevenueMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RevenueController],
            providers: [
                CreateRevenueService,
                {
                    provide: 'RevenueRepository',
                    useValue: revenueRepository,
                },
            ],
        }).compile();

        controller = module.get<RevenueController>(RevenueController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
