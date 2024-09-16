import { Moviment } from './moviment';

export interface MovimentRepository {
    get(id: string): Promise<Moviment>;
    save(moviment: Moviment): Promise<Moviment>;
    delete(id: string): Promise<void>;
    list(): Promise<Moviment[]>;
    listBySupply(supplyId: string): Promise<Moviment[]>;
}
