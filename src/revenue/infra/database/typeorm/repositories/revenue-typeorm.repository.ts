import { Revenue } from 'src/revenue/domain/entity/revenue';
import { Repository } from 'typeorm';
import { RevenueTypeorm } from '../entities/revenue.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { RevenueRepository } from 'src/revenue/domain/repository/revenue.repository';
@Injectable()
export class RevenueTypeormRepository implements RevenueRepository {
    constructor(
        @InjectRepository(RevenueTypeorm)
        private readonly revenueRepository: Repository<RevenueTypeorm>,
    ) {}
    async save(revenue: Revenue): Promise<Revenue> {
        const newRevenue = this.revenueRepository.create(
            RevenueTypeorm.from(revenue),
        );
        const createdRevenue = await this.revenueRepository.save(newRevenue);
        return RevenueTypeorm.to(createdRevenue);
    }
    async get(id: number): Promise<Revenue> {
        const revenues = await this.revenueRepository.findOne({
            where: { id },
        });
        return RevenueTypeorm.to(revenues);
    }

    async delete(id: any): Promise<void> {
        await this.revenueRepository.delete(id);
    }
}
