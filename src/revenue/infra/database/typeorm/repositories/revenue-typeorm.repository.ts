import { Revenue } from 'src/revenue/domain/entities/revenue';
import { RevenueRepository } from 'src/revenue/domain/repositories/revenue.repository';
import { Repository, And, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { RevenueTypeorm } from '../entities/revenue.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
@Injectable()
export class RevenueTypeormRepository implements RevenueRepository {
    constructor(
        @InjectRepository(RevenueTypeorm)
        private readonly revenueRepository: Repository<RevenueTypeorm>,
    ) {}

    async list(startDate: string, endDate: string): Promise<Revenue[]> {
        const revenues = await this.revenueRepository.find({
            where: {
                date: And(
                    MoreThanOrEqual(new Date(startDate)),
                    LessThanOrEqual(new Date(endDate)),
                ),
            },
            order: { date: 'DESC' },
        });
        return revenues;
    }
    async edit(revenue: Revenue): Promise<Revenue> {
        this.revenueRepository.merge(revenue);
        return this.revenueRepository.save(revenue);
    }
    async create(newRevenue: Revenue): Promise<Revenue> {
        newRevenue = this.revenueRepository.create(newRevenue);
        const createdRevenue = await this.revenueRepository.save(newRevenue);
        return createdRevenue;
    }

    async delete(id: any): Promise<void> {
        await this.revenueRepository.delete(id);
    }
}
