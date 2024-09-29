import { MovementRepository } from '../../../domain/movement.repository';
import { Movement } from '../../../domain/movement';

export class MovementInMemoryRepository implements MovementRepository {
    private movements: Movement[];

    constructor() {
        this.movements = [];
    }

    async save(movement: Movement): Promise<Movement> {
        const index = this.movements.findIndex(
            (movement) => movement.id === movement.id,
        );
        if (index > -1) {
            this.movements[index] = movement;
        } else {
            this.movements.push(movement);
        }

        return Promise.resolve(movement);
    }

    async get(id: string): Promise<Movement> {
        const movement = this.movements.find((value) => value.id === id);
        return Promise.resolve(movement);
    }

    async delete(id: string): Promise<void> {
        this.movements.splice(
            this.movements.findIndex((movement) => movement.id === id),
            1,
        );
        return Promise.resolve();
    }
    async list(): Promise<Movement[]> {
        const movements = this.movements;
        return Promise.resolve(movements);
    }
    async listBySupply(supplyId: string): Promise<Movement[]> {
        const movementFiltered = this.movements.filter(
            (movement) => movement.supply.id === supplyId,
        );
        return Promise.resolve(movementFiltered);
    }
}
