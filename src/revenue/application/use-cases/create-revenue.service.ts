import { Inject, Injectable } from '@nestjs/common';
import { CreateRevenueDTO } from 'src/revenue/infra/dtos/create-revenue.dto';
import { RevenueRepository } from '../repository/revenue.repository';

@Injectable()
export class CreateRevenueService {
    constructor(
        @Inject('RevenueRepository')
        private readonly revenueRepository: RevenueRepository,
    ) {}
    async execute(newRevenue: CreateRevenueDTO) {
        return this.revenueRepository.create(newRevenue);
    }
}
