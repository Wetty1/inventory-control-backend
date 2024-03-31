import { Revenue } from 'src/revenue/domain/entities/revenue';
import { RevenueRepository } from 'src/revenue/domain/repositories/revenue.repository';

export class RevenueMemoryRepository implements RevenueRepository {
    revenues: Revenue[];
    constructor() {
        this.revenues = [];
    }

    async create(newRevenue: Revenue): Promise<Revenue> {
        this.revenues.push(newRevenue);
        return newRevenue;
    }
}
