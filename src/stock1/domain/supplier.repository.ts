import { Supplier } from './supplier';

export interface SupplierRepository {
    save(supplier: Supplier): Promise<Supplier>;
    findAll(): Promise<Supplier[]>;
    get(id: any): Promise<Supplier>;
}
