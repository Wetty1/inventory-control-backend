import { Revenue } from 'src/revenue/domain/entities/revenue';

export interface RevenueRepository {
    create(newRevenue: Partial<Revenue>): Promise<Revenue>;
    list(startDate: string, endDate: string): Promise<Revenue[]>;
    edit(revenue: Revenue): Promise<Revenue>;
    delete(id: any): Promise<void>;
}
