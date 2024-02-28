import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/product';
import { ProductStoreGateway } from '../interfaces/product-store-gateway.interface';
import { ProductORM } from '../interfaces/product.entity';
import { Repository } from 'typeorm';

export class ProductStoreTypeorm implements ProductStoreGateway {
    constructor(
        @InjectRepository(ProductORM)
        private readonly productRepository: Repository<ProductORM>,
    ) {}
    async getProductsByCategory(categoryId: any): Promise<Product[]> {
        throw new Error('Method not implemented.');
    }
    async get(id: any): Promise<Product> {
        throw new Error('Method not implemented.');
    }
    async create(product: Product): Promise<Product> {
        const newProduct = this.productRepository.create(product);
        return this.productRepository.save(newProduct);
    }
    async delete(id: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async update(product: Product): Promise<Product> {
        throw new Error('Method not implemented.');
    }
}
