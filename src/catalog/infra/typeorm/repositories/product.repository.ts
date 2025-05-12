import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductRepository } from 'src/catalog/domain/repository/product.repository';
import { ProductTypeorm } from '../entities/product.entity';
import { Product } from 'src/catalog/domain/entity/product';
<<<<<<< HEAD

export class CategoryTyperormRepository implements ProductRepository {
=======
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductTyperormRepository implements ProductRepository {
>>>>>>> origin/develop
    constructor(
        @InjectRepository(ProductTypeorm)
        private readonly productTypeormRepository: Repository<ProductTypeorm>,
    ) {}

    async get(id: any): Promise<Product> {
        const product = await this.productTypeormRepository.findOne(id);
        return ProductTypeorm.to(product);
    }
    async getByName(name: string): Promise<Product> {
        const product = await this.productTypeormRepository.findOne({
            where: {
                name: name,
            },
        });
        return ProductTypeorm.to(product);
    }
    async save(product: Product): Promise<Product> {
        const productTypeorm = ProductTypeorm.from(product);
        const productSaved =
            await this.productTypeormRepository.save(productTypeorm);
        return ProductTypeorm.to(productSaved);
    }
    async delete(id: any): Promise<void> {
        await this.productTypeormRepository.delete(id);
        return Promise.resolve();
    }
}
