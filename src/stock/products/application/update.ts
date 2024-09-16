import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../domain/product.repository';

@Injectable()
export class UpdateProduct {
    constructor(
        @Inject('ProductRepository')
        private readonly productRepository: ProductRepository,
    ) {}
    async execute(id: string, data) {
        const product = await this.productRepository.get(id);
        if (!product) {
            throw new Error('Product not found');
        }
        Object.assign(product, data);
        await this.productRepository.update(product);
        return product;
    }
}
