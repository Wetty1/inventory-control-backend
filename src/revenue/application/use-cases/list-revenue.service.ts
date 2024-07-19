import { Inject, Injectable } from '@nestjs/common';
import { RevenueRepository } from '../repository/revenue.repository';

@Injectable()
export class ListRevenueService {
    constructor(
        @Inject('RevenueRepository')
        private readonly revenueRepository: RevenueRepository,
    ) {}

    async execute(startDate: string, endDate: string) {
        return this.revenueRepository.list(startDate, endDate);
    }
}
