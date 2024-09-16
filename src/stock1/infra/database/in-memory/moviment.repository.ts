import { MovimentRepository } from '../../../domain/moviment.repository';
import { Moviment } from '../../../domain/moviment';

export class MovimentInMemoryRepository implements MovimentRepository {
    private moviments: Moviment[];

    constructor() {
        this.moviments = [];
    }

    async save(moviment: Moviment): Promise<Moviment> {
        const index = this.moviments.findIndex(
            (moviment) => moviment.id === moviment.id,
        );
        if (index > -1) {
            this.moviments.push(moviment);
        } else {
            this.moviments[index] = moviment;
        }

        return Promise.resolve(moviment);
    }

    async get(id: string): Promise<Moviment> {
        const moviment = this.moviments.find((value) => value.id === id);
        return Promise.resolve(moviment);
    }

    async delete(id: string): Promise<void> {
        this.moviments.splice(
            this.moviments.findIndex((moviment) => moviment.id === id),
            1,
        );
        return Promise.resolve();
    }
    async list(): Promise<Moviment[]> {
        const moviments = this.moviments;
        return Promise.resolve(moviments);
    }
    async listBySupply(supplyId: string): Promise<Moviment[]> {
        const movimentFiltered = this.moviments.filter(
            (moviment) => moviment.supply.id === supplyId,
        );
        return Promise.resolve(movimentFiltered);
    }
}
