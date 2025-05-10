import { Test, TestingModule } from '@nestjs/testing';
import { DeleteRevenue } from '../../application/usecases/delete-revenue';
import { RevenueRepository } from 'src/revenue/domain/repository/revenue.repository';
import { RevenueMemoryRepository } from 'src/revenue/infra/memory/revenue-memory.repository';
import { Revenue } from 'src/revenue/domain/entity/revenue';

describe('DeleteRevenueService', () => {
    let service: DeleteRevenue;
    const repository: RevenueRepository = new RevenueMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteRevenue,
                {
                    provide: 'RevenueRepository',
                    useValue: repository,
                },
            ],
        }).compile();

        service = module.get<DeleteRevenue>(DeleteRevenue);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should delete a revenue', async () => {
        const revenueCreated = await repository.save(
            Revenue.create(100, new Date()),
        );
        await service.execute(revenueCreated.getId());

        expect(repository.get(revenueCreated.getId())).toBeUndefined();
    });

    it('should not delete a revenue', async () => {
        await expect(() => service.execute(999)).rejects.toThrow();
    });
});
