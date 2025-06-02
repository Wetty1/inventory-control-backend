import { Inject, Injectable } from '@nestjs/common';
import { RevenueRepository } from '../../domain/repository/revenue.repository';

@Injectable()
export class DeleteRevenue {
    constructor(
        @Inject('RevenueRepository')
        private readonly revenueRepository: RevenueRepository,
    ) {}

    async execute(id: number): Promise<void> {
        await this.revenueRepository.delete(id);
    }
}
