import { Product } from './product';
import { ProductRepository } from './product-repository';

export class ProductInMemoryRepository implements ProductRepository {
    private products: Product[];

    constructor() {
        this.products = [];
    }

    async saveProduct(product: any): Promise<Product> {
        const entity = Product.create(
            product.name,
            product.price,
            product.quantity,
            product.category,
        );
        this.products.push(entity);
        return this.products.find((item) => item.id == entity.id);
    }
}
