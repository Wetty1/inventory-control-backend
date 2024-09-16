import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../domain/product.repository';

@Injectable()
export class DeleteProduct {
    constructor(
        @Inject('ProductRepository')
        private readonly productRepository: ProductRepository,
    ) {}
    async execute(id: any) {
        await this.productRepository.delete(id);
    }
}
