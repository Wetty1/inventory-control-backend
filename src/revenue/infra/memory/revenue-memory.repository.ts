import { Revenue } from 'src/revenue/domain/entity/revenue';
import { RevenueRepository } from 'src/revenue/domain/repository/revenue.repository';

export class RevenueMemoryRepository implements RevenueRepository {
    revenues: Revenue[];
    constructor() {
        this.revenues = [];
    }
    async save(revenue: Revenue): Promise<Revenue> {
        return new Promise((resolve) => {
            if (revenue.getId()) {
                resolve(this.edit(revenue));
            }
            resolve(this.create(revenue));
        });
    }
    async get(id: number): Promise<Revenue> {
        return new Promise((resolve) => {
            const revenue = this.revenues.find(
                (revenue) => revenue.getId() === id,
            );
            resolve(revenue);
        });
    }
    async delete(id: any): Promise<void> {
        return new Promise((resolve) => {
            const revenueIndex = this.revenues.findIndex(
                (revenue) => revenue.getId() === id,
            );
            this.revenues = this.revenues.slice(revenueIndex, 1);
            resolve();
        });
    }

    edit(revenue: Revenue): Revenue {
        const revenueIndex = this.revenues.findIndex(
            (revenueFound) => revenue.getId() === revenueFound.getId(),
        );
        this.revenues[revenueIndex] = revenue;
        return revenue;
    }

    create(revenue: Revenue): Revenue {
        this.revenues.push(revenue);
        return revenue;
    }
}
