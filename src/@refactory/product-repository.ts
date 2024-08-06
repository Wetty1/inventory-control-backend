import { Product } from './product';

export interface ProductRepository {
    saveProduct(product: Product): Promise<Product>;
}
