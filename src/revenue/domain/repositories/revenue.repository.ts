import { Revenue } from '../entities/revenue';

export interface RevenueRepository {
    create(newRevenue: Revenue): Promise<Revenue>;
    list(startDate: string, endDate: string): Promise<Revenue[]>;
    edit(revenue: Revenue): Promise<Revenue>;
    delete(id: any): Promise<void>;
}
