import { Product } from 'src/catalog/domain/entity/product';
import { ProductRepository } from 'src/catalog/domain/repository/product.repository';

export class ProductInMemoryRepository implements ProductRepository {
    private supplies: Product[];

    constructor() {
        this.supplies = [];
    }

    async list(): Promise<Product[]> {
        return Promise.resolve(this.supplies);
    }
    async getByName(name: string): Promise<Product> {
        const Product = this.supplies.find(
            (Product) => Product.getName() === name,
        );
        return Promise.resolve(Product);
    }

    async getByCategory(categoryId: any): Promise<Product[]> {
        const supplies = this.supplies.filter(
            (Product) => Product.getCategoryId() === categoryId,
        );
        return Promise.resolve(supplies);
    }
    async get(id: any): Promise<Product> {
        const Product = this.supplies.find((Product) => Product.getId() === id);
        return Promise.resolve(Product);
    }
    async save(Product: Product): Promise<Product> {
        this.supplies.push(Product);
        return Promise.resolve(Product);
    }
    async delete(id: any): Promise<void> {
        const ProductIndex = this.supplies.findIndex(
            (Product) => Product.getId() === id,
        );
        this.supplies = this.supplies.slice(ProductIndex, 1);
        return Promise.resolve();
    }
    async update(Product: Product): Promise<Product> {
        const ProductIndex = this.supplies.findIndex(
            (value) => value.getId() === Product.getId(),
        );
        this.supplies[ProductIndex] = Product;
        return Promise.resolve(Product);
    }
}
