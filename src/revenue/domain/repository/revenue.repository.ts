import { Revenue } from 'src/revenue/domain/entity/revenue';

export interface RevenueRepository {
    save(revenue: Revenue): Promise<Revenue>;
    delete(id: number): Promise<void>;
    get(id: number): Promise<Revenue>;
}
