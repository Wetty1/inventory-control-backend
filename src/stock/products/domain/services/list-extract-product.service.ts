import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../Repositories/product.repository';

@Injectable()
export class ListExtractProductService {
    constructor(
        @Inject('ProductRepository')
        private readonly productRepository: ProductRepository,
    ) {}
    async execute() {
        return this.productRepository.listAllWithEvents();
    }
}
