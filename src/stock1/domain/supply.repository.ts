import { Supply } from './supply';

export interface SupplyRepository {
    list(): Promise<Supply[]>;
    get(id: any): Promise<Supply>;
    getByCategory(categoryId: any): Promise<Supply[]>;
    getByName(name: string): Promise<Supply>;
    save(product: Supply): Promise<Supply>;
    delete(id: any): Promise<void>;
}
