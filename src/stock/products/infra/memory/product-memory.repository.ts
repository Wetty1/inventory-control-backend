import { ProductRepository } from '../../domain/Repositories/product.repository';
import { Product } from '../../domain/entities/product';

export class ProductMemoryRepository implements ProductRepository {
    private products: Product[];

    constructor() {
        this.products = [];
    }
    listAllSummaries(): Promise<Product[]> {
        throw new Error('Method not implemented.');
    }
    listAllWithEvents(): Promise<Product[]> {
        throw new Error('Method not implemented.');
    }
    async listAll(): Promise<Product[]> {
        return Promise.resolve(this.products);
    }
    async getProductsByCategory(categoryId: any): Promise<Product[]> {
        const products = this.products.filter(
            (product) => product.categoryId === categoryId,
        );
        return Promise.resolve(products);
    }
    async get(id: any): Promise<Product> {
        const product = this.products.find((product) => product.id === id);
        return Promise.resolve(product);
    }
    async create(product: Product): Promise<Product> {
        product.id = this.products.length + 1;
        this.products.push(product);
        return Promise.resolve(product);
    }
    async delete(id: any): Promise<void> {
        const productIndex = this.products.findIndex(
            (product) => product.id === id,
        );
        this.products = this.products.slice(productIndex, 1);
        return Promise.resolve();
    }
    async update(product: Product): Promise<Product> {
        const productIndex = this.products.findIndex(
            (p) => p.id === product.id,
        );
        this.products[productIndex] = product;
        return Promise.resolve(product);
    }
}
