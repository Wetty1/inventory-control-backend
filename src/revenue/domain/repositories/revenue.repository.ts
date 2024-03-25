import { Revenue } from '../entities/revenue';

export interface RevenueRepository {
    create(newRevenue: Revenue): Promise<Revenue>;
}
