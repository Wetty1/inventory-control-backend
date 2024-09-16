import { Product } from '../domain/product';

export interface ProductRepository {
    getProductsByCategory(categoryId: any): Promise<Product[]>;
    listAll(): Promise<Product[]>;
    listAllSummaries(): Promise<Product[]>;
    get(id: any): Promise<Product>;
    getByName(name: string): Promise<Product>;
    create(product: Product): Promise<Product>;
    delete(id: any): Promise<void>;
    update(product: Product): Promise<Product>;
    listAllWithEvents(): Promise<Product[]>;
}
