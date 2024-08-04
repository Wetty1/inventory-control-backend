import { Product } from './product';
import { ProductRepository } from './product-repository';

export class ProductRepositoryInMemory implements ProductRepository {
    private products: Product[];

    constructor() {
        this.products = [];
    }

    saveProduct(product: any): Promise<Product> {
        this.products.push(
            Product.create(
                product.name,
                product.price,
                product.quantity,
                product.category,
            ),
        );
        return Promise.resolve(product);
    }
}
