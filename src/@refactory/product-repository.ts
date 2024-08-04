import { Product } from './product';

export interface ProductRepository {
    saveProduct(product: any): Promise<Product>;
}
