import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../domain/product.repository';

@Injectable()
export class ListSummaryProduct {
    constructor(
        @Inject('ProductRepository')
        private readonly productRepository: ProductRepository,
    ) {}
    async execute() {
        return this.productRepository.listAllSummaries();
    }
}
