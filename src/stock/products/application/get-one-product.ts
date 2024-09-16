import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../domain/product.repository';

@Injectable()
export class GetOneProduct {
    constructor(
        @Inject('ProductRepository')
        private readonly productRepository: ProductRepository,
    ) {}

    async execute(id: string) {
        const product = await this.productRepository.get(id);
        return product;
    }
}
