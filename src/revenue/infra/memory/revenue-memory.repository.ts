import { RevenueRepository } from 'src/revenue/application/repository/revenue.repository';
import { Revenue } from 'src/revenue/domain/entities/revenue';

export class RevenueMemoryRepository implements RevenueRepository {
    revenues: Revenue[];
    constructor() {
        this.revenues = [];
    }
    delete(id: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
    list(): Promise<Revenue[]> {
        throw new Error('Method not implemented.');
    }
    edit(revenue: Revenue): Promise<Revenue> {
        throw new Error('Method not implemented.');
    }

    async create(newRevenue: Revenue): Promise<Revenue> {
        this.revenues.push(newRevenue);
        return newRevenue;
    }
}
