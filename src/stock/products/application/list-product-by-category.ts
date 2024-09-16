import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../domain/product.repository';

@Injectable()
export class ListProductByCategory {
    constructor(
        @Inject('ProductRepository')
        private readonly productRepository: ProductRepository,
    ) {}
    async execute(categoryId: any) {
        return this.productRepository.getProductsByCategory(categoryId);
    }
}
