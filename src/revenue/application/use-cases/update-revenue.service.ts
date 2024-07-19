import { Inject, Injectable } from '@nestjs/common';
import { UpdateRevenueDTO } from 'src/revenue/infra/dtos/update-revenue.dto';
import { RevenueRepository } from '../repository/revenue.repository';

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
