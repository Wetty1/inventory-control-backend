import { Supplier } from 'src/stock/domain/supplier';
import { SupplierRepository } from 'src/stock/domain/supplier.repository';

export class SupplierInMemoryRepository implements SupplierRepository {
    private suppliers: any[] = [];
    async save(supplier: any): Promise<any> {
        this.suppliers.push(supplier);
        return Promise.resolve();
    }
    async findAll(): Promise<any[]> {
        return Promise.resolve(this.suppliers);
    }
    async get(id: string): Promise<Supplier> {
        const supplier = this.suppliers.find((value) => value.id === id);
        return Promise.resolve(supplier);
    }
}
