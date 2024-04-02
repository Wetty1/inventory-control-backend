import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../../domain/entities/product';
import { Repository } from 'typeorm';
import { ProductRepository } from 'src/stock/products/domain/Repositories/product.repository';
import { ProductTypeorm } from '../entities/product.entity';

export class ProductStoreTypeorm implements ProductRepository {
    constructor(
        @InjectRepository(ProductTypeorm)
        private readonly productRepository: Repository<ProductTypeorm>,
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
