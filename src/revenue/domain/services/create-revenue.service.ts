import { Inject, Injectable } from '@nestjs/common';
import { RevenueRepository } from '../repositories/revenue.repository';
import { Revenue } from '../entities/revenue';

@Injectable()
export class CreateRevenueService {
    constructor(
        @Inject('RevenueRepository')
        private readonly revenueRepository: RevenueRepository,
    ) {}
    async execute(newRevenue: Revenue) {
        return this.revenueRepository.create(newRevenue);
    }
}
