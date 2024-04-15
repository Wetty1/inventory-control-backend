import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../Repositories/product.repository';

@Injectable()
export class ListProductByCategoryService {
    constructor(
        @Inject('ProductRepository')
        private readonly productRepository: ProductRepository,
    ) {}
    async execute(categoryId: any) {
        return this.productRepository.getProductsByCategory(categoryId);
    }
}
