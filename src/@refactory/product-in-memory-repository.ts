import { Product } from './product';
import { ProductRepository } from './product-repository';

export class ProductInMemoryRepository implements ProductRepository {
    private products: Product[];

    constructor() {
        this.products = [];
    }
    async getByName(name: string): Promise<Product> {
        const product = this.products.find(
            (item) => item.name.getValue() == name,
        );
        Product.restore(
            product.id,
            product.name.getValue(),
            product.category,
            product.date,
        );
        return Promise.resolve(product);
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
