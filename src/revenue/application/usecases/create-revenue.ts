import { Inject, Injectable } from '@nestjs/common';
import { CreateRevenueDTO } from 'src/revenue/infra/dtos/create-revenue.dto';
import { RevenueRepository } from '../../domain/repository/revenue.repository';
import { Revenue } from 'src/revenue/domain/entity/revenue';

@Injectable()
export class CreateRevenue {
    constructor(
        @Inject('RevenueRepository')
        private readonly revenueRepository: RevenueRepository,
    ) {}
    async execute(newRevenue: CreateRevenueDTO) {
        return this.revenueRepository.save(
            Revenue.create(newRevenue.value, newRevenue.date),
        );
    }
}
