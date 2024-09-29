import { Movement } from './movement';

export interface MovementRepository {
    get(id: string): Promise<Movement>;
    save(movement: Movement): Promise<Movement>;
    delete(id: string): Promise<void>;
    list(): Promise<Movement[]>;
    listBySupply(supplyId: string): Promise<Movement[]>;
}
