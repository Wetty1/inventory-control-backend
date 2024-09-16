import { Supply } from 'src/stock1/domain/supply';
import { SupplyRepository } from 'src/stock1/domain/supply.repository';

export class SupplyInMemoryRepository implements SupplyRepository {
    private supplies: Supply[];

    constructor() {
        this.supplies = [];
    }
    async getByName(name: string): Promise<Supply> {
        const supply = this.supplies.find((supply) => supply.name === name);
        return Promise.resolve(supply);
    }

    async getByCategory(categoryId: any): Promise<Supply[]> {
        const supplies = this.supplies.filter(
            (supply) => supply.categoryId === categoryId,
        );
        return Promise.resolve(supplies);
    }
    async get(id: any): Promise<Supply> {
        const supply = this.supplies.find((supply) => supply.id === id);
        return Promise.resolve(supply);
    }
    async save(supply: Supply): Promise<Supply> {
        this.supplies.push(supply);
        return Promise.resolve(supply);
    }
    async delete(id: any): Promise<void> {
        const supplyIndex = this.supplies.findIndex(
            (supply) => supply.id === id,
        );
        this.supplies = this.supplies.slice(supplyIndex, 1);
        return Promise.resolve();
    }
    async update(supply: Supply): Promise<Supply> {
        const supplyIndex = this.supplies.findIndex(
            (value) => value.id === supply.id,
        );
        this.supplies[supplyIndex] = supply;
        return Promise.resolve(supply);
    }
}
