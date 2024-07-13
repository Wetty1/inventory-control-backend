import { Inject, Injectable } from '@nestjs/common';
import { RevenueRepository } from '../repositories/revenue.repository';
import { UpdateRevenueDTO } from 'src/revenue/infra/dtos/update-revenue.dto';

@Injectable()
export class UpdateRevenueService {
    constructor(
        @Inject('RevenueRepository')
        private readonly revenueRepository: RevenueRepository,
    ) {}

    async execute(revenue: UpdateRevenueDTO) {
        const updatedRevenue = await this.revenueRepository.edit(revenue);
        return updatedRevenue;
    }
}
