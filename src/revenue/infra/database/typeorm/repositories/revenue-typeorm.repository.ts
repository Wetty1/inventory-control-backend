import { Revenue } from 'src/revenue/domain/entities/revenue';
import { RevenueRepository } from 'src/revenue/domain/repositories/revenue.repository';
import { Repository } from 'typeorm';
import { RevenueTypeorm } from '../entities/revenue.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class RevenueTypeormRepository implements RevenueRepository {
    constructor(
        @InjectRepository(RevenueTypeorm)
        private readonly revenueRepository: Repository<RevenueTypeorm>,
    ) {}
    async create(newRevenue: Revenue): Promise<Revenue> {
        newRevenue = this.revenueRepository.create(newRevenue);
        const createdRevenue = await this.revenueRepository.save(newRevenue);
        return createdRevenue;
    }
}
