import { Revenue } from 'src/revenue/domain/entities/revenue';
import { RevenueRepository } from 'src/revenue/domain/repositories/revenue.repository';

export class RevenueTypeormRepository implements RevenueRepository {
    constructor() {}
    async create(newRevenue: Revenue): Promise<Revenue> {
        throw new Error('Method not implemented.');
    }
}
