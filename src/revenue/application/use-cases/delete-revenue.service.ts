import { Inject, Injectable } from '@nestjs/common';
import { RevenueRepository } from '../repository/revenue.repository';

@Injectable()
export class DeleteRevenueService {
    constructor(
        @Inject('RevenueRepository')
        private readonly revenueRepository: RevenueRepository,
    ) {}

    async execute(id: string): Promise<void> {
        await this.revenueRepository.delete(id);
    }
}
