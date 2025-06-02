import { Product } from '../entity/product';

export interface ProductRepository {
    get(id: any): Promise<Product>;
    getByName(name: string): Promise<Product>;
    save(product: Product): Promise<Product>;
    delete(id: any): Promise<void>;
}
